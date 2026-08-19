import { cookies } from "next/headers";
import { AdminRole } from "@/generated/prisma/enums";
import { getDb } from "../db";
import { randomToken, sha256 } from "./crypto";

const COOKIE_NAME = process.env.NODE_ENV === "production" ? "__Host-liyan_admin" : "liyan_admin_dev";
const SESSION_HOURS = 8;

const rolePermissions: Record<AdminRole, readonly string[]> = {
  CHECKIN_STAFF: ["ticket:read", "ticket:checkin", "show:read"],
  OPERATOR: ["ticket:read", "ticket:checkin", "show:read", "order:read", "email:resend"],
  ADMIN: ["ticket:read", "ticket:checkin", "show:read", "order:read", "email:resend", "show:write", "refund:write", "admin:write"],
};

export async function createAdminSession(userId: string): Promise<void> {
  const token = randomToken(48);
  const expiresAt = new Date(Date.now() + SESSION_HOURS * 60 * 60 * 1000);
  await getDb().adminSession.create({ data: { userId, tokenHash: sha256(token), expiresAt } });
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", expires: expiresAt,
  });
}

export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (token) await getDb().adminSession.deleteMany({ where: { tokenHash: sha256(token) } });
  cookieStore.delete(COOKIE_NAME);
}

export async function requireAdmin(permission: string) {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) throw new Response("Unauthorized", { status: 401 });
  const session = await getDb().adminSession.findUnique({
    where: { tokenHash: sha256(token) }, include: { user: true },
  });
  if (!session || session.expiresAt <= new Date() || !session.user.isActive) throw new Response("Unauthorized", { status: 401 });
  if (!rolePermissions[session.user.role].includes(permission)) throw new Response("Forbidden", { status: 403 });
  await getDb().adminSession.update({ where: { id: session.id }, data: { lastSeenAt: new Date() } });
  return session.user;
}

export function maskEmail(value: string): string {
  const [name, domain] = value.split("@");
  return `${name.slice(0, 2)}***@${domain ?? "***"}`;
}

export function maskPhone(value: string): string {
  return value.length > 7 ? `${value.slice(0, 3)}****${value.slice(-4)}` : "***";
}