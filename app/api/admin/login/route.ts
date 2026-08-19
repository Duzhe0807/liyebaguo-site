import { verify as verifyPassword } from "@node-rs/argon2";
import { verify as verifyOtp } from "otplib";
import { getDb } from "@/lib/db";
import { createAdminSession } from "@/lib/security/admin-auth";
import { consumeRateLimit, requestSubject } from "@/lib/security/rate-limit";
import { apiError, assertJsonRequest, assertSameOrigin } from "@/lib/security/request";
import { adminLoginSchema } from "@/lib/validation/checkout";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request); assertJsonRequest(request, 4096);
    const body = adminLoginSchema.parse(await request.json());
    const allowed = await consumeRateLimit("admin-login", requestSubject(request), 5, 15 * 60);
    if (!allowed) return Response.json({ error: "RATE_LIMITED" }, { status: 429, headers: { "Retry-After": "900" } });
    const db = getDb();
    const user = await db.adminUser.findUnique({ where: { email: body.email.toLowerCase() } });
    const locked = user?.lockedUntil && user.lockedUntil > new Date();
    const passwordOk = user && !locked ? await verifyPassword(user.passwordHash, body.password) : false;
    const otpResult = user && passwordOk ? await verifyOtp({ secret: user.totpSecret, token: body.otp, epochTolerance: 30 }) : { valid: false };
    if (!user || !user.isActive || locked || !passwordOk || !otpResult.valid) {
      if (user && !locked) {
        const failures = user.failedLogins + 1;
        await db.adminUser.update({ where: { id: user.id }, data: { failedLogins: failures, lockedUntil: failures >= 5 ? new Date(Date.now() + 15 * 60_000) : null } });
      }
      return Response.json({ error: "INVALID_CREDENTIALS" }, { status: 401 });
    }
    await db.adminUser.update({ where: { id: user.id }, data: { failedLogins: 0, lockedUntil: null, lastLoginAt: new Date() } });
    await createAdminSession(user.id);
    await db.auditLog.create({ data: { actorId: user.id, action: "ADMIN_LOGIN", targetType: "AdminUser", targetId: user.id } });
    return Response.json({ ok: true, role: user.role });
  } catch (error) { return apiError(error); }
}