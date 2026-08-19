import { Prisma } from "@/generated/prisma/client";
import { OrderStatus, PaymentProviderCode, PaymentStatus, PaymentTransactionStatus, PaymentTransactionType, ShowStatus } from "@/generated/prisma/enums";
import { getDb } from "../db";
import { getPaymentTimeoutMinutes } from "../env";
import { getPaymentProvider } from "../payments";
import { createTicketToken, newOrderNumber, newTicketNumber, randomToken, sha256 } from "../security/crypto";

export class OrderError extends Error {
  constructor(public readonly code: string, message: string, public readonly status = 400) {
    super(message);
  }
}

export interface CreateOrderInput {
  showId: string;
  items: Array<{ ticketTypeId: string; quantity: number }>;
  customer: {
    name: string;
    email: string;
    phone: string;
    country?: string;
    locale: "zh" | "tw" | "en" | "ja" | "ko";
    dietaryNotes?: string;
  };
}

const ticketNameField = {
  zh: "nameZh", tw: "nameZhHant", en: "nameEn", ja: "nameJa", ko: "nameKo",
} as const;

export function calculateOrderTotal(items: Array<{ unitPriceCents: number; quantity: number }>): number {
  return items.reduce((sum, item) => {
    if (!Number.isInteger(item.unitPriceCents) || item.unitPriceCents < 0 || !Number.isInteger(item.quantity) || item.quantity < 1) {
      throw new OrderError("INVALID_ORDER_ITEM", "Invalid order item");
    }
    return sum + item.unitPriceCents * item.quantity;
  }, 0);
}

function currentShanghaiDate(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

async function lockOrder(tx: Prisma.TransactionClient, orderId: string): Promise<void> {
  await tx.$queryRaw`SELECT "id" FROM "orders" WHERE "id" = ${orderId} FOR UPDATE`;
}

export async function listAvailableShows(date: string) {
  const parsedDate = new Date(`${date}T00:00:00.000Z`);
  if (Number.isNaN(parsedDate.getTime())) throw new OrderError("INVALID_DATE", "Invalid date");
  const shows = await getDb().show.findMany({
    where: { date: parsedDate, status: { in: [ShowStatus.AVAILABLE, ShowStatus.SOLD_OUT] } },
    include: { prices: { include: { ticketType: true }, orderBy: { ticketType: { sortOrder: "asc" } } } },
    orderBy: { showStart: "asc" },
  });
  return shows.map((show) => ({
    id: show.id,
    date: show.date.toISOString().slice(0, 10),
    sessionType: show.sessionType,
    gardenStart: show.gardenStart,
    gardenEnd: show.gardenEnd,
    showStart: show.showStart,
    showEnd: show.showEnd,
    status: show.status,
    remaining: Math.max(0, show.onlineCapacity - show.heldCount - show.soldCount),
    prices: show.prices.map((price) => ({
      ticketTypeId: price.ticketTypeId,
      code: price.ticketType.code,
      names: {
        zh: price.ticketType.nameZh, tw: price.ticketType.nameZhHant, en: price.ticketType.nameEn,
        ja: price.ticketType.nameJa, ko: price.ticketType.nameKo,
      },
      description: { zh: price.ticketType.descriptionZh, en: price.ticketType.descriptionEn },
      priceCents: price.priceCents,
      currency: price.currency,
      includesCostume: price.ticketType.includesCostume,
      featured: price.ticketType.isFeatured,
    })),
  }));
}

export async function createOrder(input: CreateOrderInput) {
  const db = getDb();
  const totalQuantity = input.items.reduce((sum, item) => sum + item.quantity, 0);
  const accessToken = randomToken();
  const expiresAt = new Date(Date.now() + getPaymentTimeoutMinutes() * 60_000);

  const order = await db.$transaction(async (tx) => {
    const show = await tx.show.findUnique({
      where: { id: input.showId },
      include: { prices: { include: { ticketType: true } } },
    });
    if (!show || show.status !== ShowStatus.AVAILABLE) throw new OrderError("SHOW_UNAVAILABLE", "Show is not available", 409);
    if (show.date.toISOString().slice(0, 10) < currentShanghaiDate()) throw new OrderError("SHOW_ENDED", "Show has ended", 409);
    const now = new Date();
    if ((show.saleStart && show.saleStart > now) || (show.saleEnd && show.saleEnd <= now)) {
      throw new OrderError("SALES_CLOSED", "Sales are closed", 409);
    }

    const requested = input.items.map((item) => {
      const price = show.prices.find((entry) => entry.ticketTypeId === item.ticketTypeId);
      if (!price || price.ticketType.status !== "ACTIVE") throw new OrderError("TICKET_UNAVAILABLE", "Ticket type is unavailable", 409);
      const nameField = ticketNameField[input.customer.locale];
      return { item, price, ticketName: price.ticketType[nameField] };
    });

    const inventoryRows = await tx.$queryRaw<Array<{ id: string }>>`
      UPDATE "shows"
      SET "heldCount" = "heldCount" + ${totalQuantity}, "updatedAt" = NOW()
      WHERE "id" = ${show.id}
        AND "status" = 'AVAILABLE'::"ShowStatus"
        AND "heldCount" + "soldCount" + ${totalQuantity} <= "onlineCapacity"
      RETURNING "id"
    `;
    if (inventoryRows.length !== 1) throw new OrderError("INSUFFICIENT_INVENTORY", "Not enough tickets remaining", 409);

    for (const entry of requested) {
      await tx.showTicketPrice.update({
        where: { showId_ticketTypeId: { showId: show.id, ticketTypeId: entry.item.ticketTypeId } },
        data: { heldCount: { increment: entry.item.quantity } },
      });
    }

    const subtotalCents = calculateOrderTotal(requested.map((entry) => ({ unitPriceCents: entry.price.priceCents, quantity: entry.item.quantity })));
    return tx.order.create({
      data: {
        orderNo: newOrderNumber(), accessTokenHash: sha256(accessToken), showId: show.id,
        customerName: input.customer.name, customerEmail: input.customer.email.toLowerCase(),
        customerPhone: input.customer.phone, customerCountry: input.customer.country,
        locale: input.customer.locale, dietaryNotes: input.customer.dietaryNotes,
        subtotalCents, totalAmountCents: subtotalCents, currency: "CNY", expiresAt,
        items: {
          create: requested.map((entry) => ({
            ticketTypeId: entry.item.ticketTypeId, ticketCodeSnapshot: entry.price.ticketType.code,
            ticketNameSnapshot: entry.ticketName, unitPriceCents: entry.price.priceCents,
            quantity: entry.item.quantity, subtotalCents: entry.price.priceCents * entry.item.quantity,
          })),
        },
      },
      include: { items: true, show: true },
    });
  }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });

  return { order, accessToken };
}

export async function getPublicOrder(orderNo: string, accessToken: string) {
  const order = await getDb().order.findFirst({
    where: { orderNo, accessTokenHash: sha256(accessToken) },
    include: { show: true, items: true, tickets: { orderBy: { ticketNo: "asc" } } },
  });
  if (!order) throw new OrderError("ORDER_NOT_FOUND", "Order not found", 404);
  return {
    ...order,
    accessTokenHash: undefined,
    tickets: order.tickets.map((ticket) => ({
      id: ticket.id, ticketNo: ticket.ticketNo, ticketType: ticket.ticketType, status: ticket.status,
      token: createTicketToken(ticket.id).token,
    })),
  };
}

async function releaseExpiredOrder(tx: Prisma.TransactionClient, orderId: string): Promise<void> {
  await lockOrder(tx, orderId);
  const order = await tx.order.findUnique({ where: { id: orderId }, include: { items: true } });
  if (!order || order.status !== OrderStatus.PENDING_PAYMENT || order.expiresAt > new Date()) return;
  const quantity = order.items.reduce((sum, item) => sum + item.quantity, 0);
  await tx.order.update({ where: { id: order.id }, data: { status: OrderStatus.EXPIRED, expiredAt: new Date() } });
  await tx.show.update({ where: { id: order.showId }, data: { heldCount: { decrement: quantity } } });
  for (const item of order.items) {
    await tx.showTicketPrice.update({
      where: { showId_ticketTypeId: { showId: order.showId, ticketTypeId: item.ticketTypeId } },
      data: { heldCount: { decrement: item.quantity } },
    });
  }
}

export async function expireOrders(batchSize = 100): Promise<number> {
  const db = getDb();
  const expired = await db.order.findMany({
    where: { status: OrderStatus.PENDING_PAYMENT, expiresAt: { lte: new Date() } },
    select: { id: true }, take: batchSize, orderBy: { expiresAt: "asc" },
  });
  for (const order of expired) {
    await db.$transaction((tx) => releaseExpiredOrder(tx, order.id), { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
  }
  return expired.length;
}

export async function confirmPayment(orderId: string, event: {
  provider: PaymentProviderCode;
  providerTransactionId: string;
  providerEventId: string;
  idempotencyKey: string;
  amountCents: number;
  currency: string;
}) {
  const db = getDb();
  return db.$transaction(async (tx) => {
    await lockOrder(tx, orderId);
    const order = await tx.order.findUniqueOrThrow({ where: { id: orderId }, include: { items: true, tickets: true } });
    if (order.status === OrderStatus.PAID) return order;
    if (order.status !== OrderStatus.PENDING_PAYMENT) throw new OrderError("ORDER_NOT_PAYABLE", "Order is not payable", 409);
    if (order.expiresAt <= new Date()) {
      throw new OrderError("ORDER_EXPIRED", "Order has expired", 409);
    }
    if (event.amountCents !== order.totalAmountCents || event.currency !== order.currency) {
      throw new OrderError("PAYMENT_MISMATCH", "Payment amount or currency mismatch", 409);
    }

    const duplicate = await tx.paymentTransaction.findFirst({
      where: { OR: [{ idempotencyKey: event.idempotencyKey }, { provider: event.provider, providerEventId: event.providerEventId }] },
    });
    if (!duplicate) {
      await tx.paymentTransaction.create({
        data: {
          orderId: order.id, provider: event.provider, type: PaymentTransactionType.PAYMENT,
          providerTransactionId: event.providerTransactionId, providerEventId: event.providerEventId,
          idempotencyKey: event.idempotencyKey, amountCents: event.amountCents, currency: event.currency,
          status: PaymentTransactionStatus.SUCCEEDED,
        },
      });
    }

    const quantity = order.items.reduce((sum, item) => sum + item.quantity, 0);
    await tx.show.update({
      where: { id: order.showId },
      data: { heldCount: { decrement: quantity }, soldCount: { increment: quantity } },
    });
    for (const item of order.items) {
      await tx.showTicketPrice.update({
        where: { showId_ticketTypeId: { showId: order.showId, ticketTypeId: item.ticketTypeId } },
        data: { heldCount: { decrement: item.quantity }, soldCount: { increment: item.quantity } },
      });
      for (let index = 0; index < item.quantity; index += 1) {
        const secure = createTicketToken();
        await tx.ticket.create({
          data: {
            id: secure.ticketId, ticketNo: newTicketNumber(), orderId: order.id, orderItemId: item.id,
            showId: order.showId, ticketType: item.ticketNameSnapshot, qrTokenHash: secure.tokenHash,
          },
        });
      }
    }

    const paid = await tx.order.update({
      where: { id: order.id },
      data: {
        status: OrderStatus.PAID, paymentStatus: PaymentStatus.PAID, paymentProvider: event.provider,
        providerTransactionId: event.providerTransactionId, paidAt: new Date(),
      },
      include: { items: true, tickets: true, show: true },
    });
    await tx.emailOutbox.create({
      data: { orderId: order.id, template: "PAID_CONFIRMATION", recipient: order.customerEmail, payload: { orderId: order.id } },
    });
    return paid;
  }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
}

export async function mockPayOrder(orderNo: string, accessToken: string, idempotencyKey: string) {
  const db = getDb();
  const order = await db.order.findFirst({ where: { orderNo, accessTokenHash: sha256(accessToken) }, include: { items: true } });
  if (!order) throw new OrderError("ORDER_NOT_FOUND", "Order not found", 404);
  if (order.status === OrderStatus.PENDING_PAYMENT && order.expiresAt <= new Date()) {
    await db.$transaction((tx) => releaseExpiredOrder(tx, order.id), { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
    throw new OrderError("ORDER_EXPIRED", "Order has expired", 409);
  }
  const provider = getPaymentProvider("MOCK");
  const paymentOrder = {
    orderNo: order.orderNo, amountCents: order.totalAmountCents, currency: order.currency,
    description: order.items.map((item) => `${item.ticketNameSnapshot} x ${item.quantity}`).join(", "),
  };
  const payment = await provider.createPayment(paymentOrder, idempotencyKey);
  return confirmPayment(order.id, {
    provider: PaymentProviderCode.MOCK,
    providerTransactionId: payment.providerTransactionId,
    providerEventId: payment.providerEventId,
    idempotencyKey,
    amountCents: order.totalAmountCents,
    currency: order.currency,
  });
}