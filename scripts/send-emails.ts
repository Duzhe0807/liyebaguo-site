import "dotenv/config";
import nodemailer from "nodemailer";
import QRCode from "qrcode";
import { getDb } from "../lib/db";
import { createTicketToken } from "../lib/security/crypto";

async function claimOne() {
  return getDb().$transaction(async (tx) => {
    const rows = await tx.$queryRaw<Array<{ id: string }>>`
      SELECT "id" FROM "email_outbox"
      WHERE "status" = 'PENDING'::"OutboxStatus" AND "nextAttempt" <= NOW()
      ORDER BY "createdAt" ASC FOR UPDATE SKIP LOCKED LIMIT 1
    `;
    if (!rows[0]) return null;
    return tx.emailOutbox.update({ where: { id: rows[0].id }, data: { status: "PROCESSING", attempts: { increment: 1 } } });
  });
}

async function main() {
  const host = process.env.SMTP_HOST;
  const from = process.env.SMTP_FROM;
  if (!host || !from) { console.log("SMTP is not configured; email outbox was left untouched."); return; }
  const transport = nodemailer.createTransport({
    host, port: Number(process.env.SMTP_PORT ?? 587), secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } : undefined,
  });
  const outbox = await claimOne();
  if (!outbox) { console.log("No email is waiting."); return; }
  try {
    const order = await getDb().order.findUniqueOrThrow({ where: { id: outbox.orderId }, include: { show: true, items: true, tickets: true } });
    const english = order.locale === "en";
    const attachments = await Promise.all(order.tickets.map(async (ticket) => ({
      filename: `${ticket.ticketNo}.svg`, cid: `${ticket.id}@liyebaguo`,
      content: await QRCode.toString(`LYTICKET:${createTicketToken(ticket.id).token}`, { type: "svg", width: 360, margin: 1 }),
      contentType: "image/svg+xml",
    })));
    const itemLines = order.items.map((item) => `${item.ticketNameSnapshot} × ${item.quantity}`).join("<br>");
    const ticketLines = order.tickets.map((ticket) => `<p><strong>${ticket.ticketType}</strong> · ${ticket.ticketNo}<br><img width="220" src="cid:${ticket.id}@liyebaguo" alt="${ticket.ticketNo}"></p>`).join("");
    await transport.sendMail({
      from, to: order.customerEmail,
      subject: english ? `Your Ba Kingdom Banquet tickets · ${order.orderNo}` : `礼宴巴国电子票 · ${order.orderNo}`,
      html: `<h1>${english ? "Booking confirmed" : "预订已确认"}</h1><p>${english ? "Order" : "订单号"}: ${order.orderNo}</p><p>${String(order.show.date).slice(0,10)} · ${order.show.sessionType}<br>${english ? "Garden" : "游园"} ${order.show.gardenStart}–${order.show.gardenEnd}<br>${english ? "Dinner show" : "餐秀"} ${order.show.showStart}–${order.show.showEnd}</p><p>${itemLines}</p><p>${english ? "Total" : "金额"}: ¥${(order.totalAmountCents/100).toFixed(0)}</p><p>${order.show.venue}</p>${ticketLines}`,
      attachments,
    });
    await getDb().emailOutbox.update({ where: { id: outbox.id }, data: { status: "SENT", sentAt: new Date(), lastError: null } });
  } catch (error) {
    const terminal = outbox.attempts >= 5;
    await getDb().emailOutbox.update({ where: { id: outbox.id }, data: { status: terminal ? "FAILED" : "PENDING", nextAttempt: new Date(Date.now() + Math.min(60, 2 ** outbox.attempts) * 60_000), lastError: error instanceof Error ? error.name : "UnknownError" } });
    process.exitCode = 1;
  }
}

main().finally(() => getDb().$disconnect());