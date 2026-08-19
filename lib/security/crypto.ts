import { createHash, createHmac, randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import { getServerEnv } from "../env";

export function randomToken(bytes = 32): string {
  return randomBytes(bytes).toString("base64url");
}

export function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export function newOrderNumber(now = new Date()): string {
  const date = now.toISOString().slice(0, 10).replaceAll("-", "");
  return `LY${date}${randomBytes(5).toString("hex").toUpperCase()}`;
}

export function newTicketNumber(): string {
  return `T${randomBytes(7).toString("hex").toUpperCase()}`;
}

export function newRefundNumber(): string {
  return `R${Date.now()}${randomBytes(3).toString("hex").toUpperCase()}`;
}

function ticketSignature(ticketId: string): string {
  return createHmac("sha256", getServerEnv().TICKET_SIGNING_SECRET)
    .update(`ticket:v1:${ticketId}`)
    .digest("base64url");
}

export function createTicketToken(ticketId: string = randomUUID()): { ticketId: string; token: string; tokenHash: string } {
  const encodedId = Buffer.from(ticketId).toString("base64url");
  const token = `v1.${encodedId}.${ticketSignature(ticketId)}`;
  return { ticketId, token, tokenHash: sha256(token) };
}

export function verifyTicketToken(token: string): string | null {
  const [version, encodedId, signature] = token.split(".");
  if (version !== "v1" || !encodedId || !signature) return null;
  try {
    const ticketId = Buffer.from(encodedId, "base64url").toString("utf8");
    const expected = Buffer.from(ticketSignature(ticketId));
    const received = Buffer.from(signature);
    if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null;
    return ticketId;
  } catch {
    return null;
  }
}