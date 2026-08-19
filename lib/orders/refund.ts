import { Prisma } from "@/generated/prisma/client";
import { OrderStatus, PaymentStatus, PaymentTransactionStatus, PaymentTransactionType, RefundStatus, TicketStatus } from "@/generated/prisma/enums";
import { getDb } from "../db";
import { getPaymentProvider } from "../payments";
import { newRefundNumber } from "../security/crypto";
import { OrderError } from "./service";

export async function refundOrder(input: { orderNo: string; amountCents: number; reason: string; operatorId: string; idempotencyKey: string }) {
  const db = getDb();
  const prepared = await db.$transaction(async (tx) => {
    const orderRef = await tx.order.findUnique({ where: { orderNo: input.orderNo }, select: { id: true } });
    if (!orderRef) throw new OrderError("ORDER_NOT_REFUNDABLE", "Order cannot be refunded", 409);
    await tx.$queryRaw`SELECT "id" FROM "orders" WHERE "id" = ${orderRef.id} FOR UPDATE`;
    const order = await tx.order.findUniqueOrThrow({ where: { id: orderRef.id }, include: { items: true, tickets: true } });
    if (order.status !== OrderStatus.PAID || order.paymentStatus !== PaymentStatus.PAID || order.paymentProvider !== "MOCK") {
      throw new OrderError("ORDER_NOT_REFUNDABLE", "Order cannot be refunded", 409);
    }
    if (order.tickets.some((ticket) => ticket.status === TicketStatus.USED)) {
      throw new OrderError("USED_TICKET", "A checked-in order cannot be refunded", 409);
    }
    const remaining = order.totalAmountCents - order.refundedAmountCents;
    if (input.amountCents !== remaining) throw new OrderError("FULL_REFUND_ONLY", "Phase 1 supports full refunds only", 400);
    if (await tx.paymentTransaction.findUnique({ where: { idempotencyKey: input.idempotencyKey } })) {
      throw new OrderError("DUPLICATE_REFUND", "Refund request already exists", 409);
    }
    const refund = await tx.refund.create({
      data: { refundNo: newRefundNumber(), orderId: order.id, amountCents: input.amountCents, reason: input.reason, operatorId: input.operatorId, status: RefundStatus.PROCESSING },
    });
    const transaction = await tx.paymentTransaction.create({
      data: { orderId: order.id, provider: "MOCK", type: PaymentTransactionType.REFUND, providerEventId: `refund_${refund.id}`, idempotencyKey: input.idempotencyKey, amountCents: input.amountCents, currency: order.currency, status: PaymentTransactionStatus.PENDING },
    });
    await tx.order.update({ where: { id: order.id }, data: { paymentStatus: PaymentStatus.REFUNDING } });
    await tx.auditLog.create({ data: { actorId: input.operatorId, action: "REFUND_REQUESTED", targetType: "Order", targetId: order.id, metadata: { refundNo: refund.refundNo, amountCents: input.amountCents, reason: input.reason } } });
    return { order, refund, transaction };
  }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });

  const provider = getPaymentProvider("MOCK");
  let result;
  try {
    result = await provider.refund({ orderNo: prepared.order.orderNo, amountCents: prepared.order.totalAmountCents, currency: prepared.order.currency, description: `Refund ${prepared.order.orderNo}` }, input.amountCents, input.idempotencyKey);
  } catch (error) {
    await db.$transaction([
      db.refund.update({ where: { id: prepared.refund.id }, data: { status: RefundStatus.FAILED } }),
      db.paymentTransaction.update({ where: { id: prepared.transaction.id }, data: { status: PaymentTransactionStatus.FAILED, failureCode: "PROVIDER_ERROR" } }),
      db.order.update({ where: { id: prepared.order.id }, data: { paymentStatus: PaymentStatus.PAID } }),
    ]);
    throw error;
  }
  if (result.status !== "SUCCEEDED") throw new OrderError("REFUND_PENDING", "Refund is not confirmed", 409);

  return db.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT "id" FROM "orders" WHERE "id" = ${prepared.order.id} FOR UPDATE`;
    const current = await tx.order.findUniqueOrThrow({ where: { id: prepared.order.id }, include: { items: true } });
    if (current.status === OrderStatus.REFUNDED) return current;
    if (current.status !== OrderStatus.PAID || current.paymentStatus !== PaymentStatus.REFUNDING) throw new OrderError("REFUND_STATE_CHANGED", "Refund state changed", 409);
    await tx.paymentTransaction.update({ where: { id: prepared.transaction.id }, data: { providerTransactionId: result.providerRefundId, status: PaymentTransactionStatus.SUCCEEDED } });
    await tx.refund.update({ where: { id: prepared.refund.id }, data: { status: RefundStatus.SUCCEEDED, providerRefundId: result.providerRefundId, completedAt: new Date() } });
    const quantity = current.items.reduce((sum, item) => sum + item.quantity, 0);
    await tx.show.update({ where: { id: current.showId }, data: { soldCount: { decrement: quantity } } });
    for (const item of current.items) {
      await tx.showTicketPrice.update({ where: { showId_ticketTypeId: { showId: current.showId, ticketTypeId: item.ticketTypeId } }, data: { soldCount: { decrement: item.quantity } } });
    }
    await tx.ticket.updateMany({ where: { orderId: current.id }, data: { status: TicketStatus.REFUNDED } });
    const updated = await tx.order.update({ where: { id: current.id }, data: { status: OrderStatus.REFUNDED, paymentStatus: PaymentStatus.REFUNDED, refundedAmountCents: current.totalAmountCents } });
    await tx.auditLog.create({ data: { actorId: input.operatorId, action: "ORDER_REFUNDED", targetType: "Order", targetId: current.id, metadata: { refundNo: prepared.refund.refundNo, amountCents: input.amountCents } } });
    return updated;
  }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
}