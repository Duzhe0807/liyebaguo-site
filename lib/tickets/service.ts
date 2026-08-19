import { Prisma } from "@/generated/prisma/client";
import { TicketStatus } from "@/generated/prisma/enums";
import { getDb } from "../db";
import { sha256, verifyTicketToken } from "../security/crypto";

export async function checkInTicket(token: string, expectedShowId: string, operatorId: string) {
  const ticketId = verifyTicketToken(token);
  if (!ticketId) return { result: "INVALID" as const };
  const db = getDb();
  return db.$transaction(async (tx) => {
    const updated = await tx.ticket.updateMany({
      where: { id: ticketId, showId: expectedShowId, qrTokenHash: sha256(token), status: TicketStatus.VALID },
      data: { status: TicketStatus.USED, checkedInAt: new Date(), checkedInById: operatorId },
    });
    const ticket = await tx.ticket.findUnique({
      where: { id: ticketId }, include: { show: true, order: { select: { customerName: true, orderNo: true } } },
    });
    const result = updated.count === 1 ? "CHECKED_IN" : ticket?.showId !== expectedShowId ? "WRONG_SHOW" : ticket?.status === TicketStatus.USED ? "ALREADY_USED" : ticket ? "NOT_VALID" : "INVALID";
    await tx.auditLog.create({
      data: { actorId: operatorId, action: `TICKET_${result}`, targetType: "Ticket", targetId: ticketId },
    });
    return { result, ticket };
  }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
}