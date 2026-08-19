import { sha256 } from "./crypto";
import { getDb } from "../db";

export async function consumeRateLimit(scope: string, subject: string, limit: number, windowSeconds: number): Promise<boolean> {
  const db = getDb();
  const key = sha256(`${scope}:${subject}`);
  const rows = await db.$queryRaw<Array<{ count: number }>>`
    INSERT INTO "request_throttles" ("key", "count", "windowStart", "expiresAt")
    VALUES (${key}, 1, NOW(), NOW() + (${windowSeconds} * INTERVAL '1 second'))
    ON CONFLICT ("key") DO UPDATE SET
      "count" = CASE WHEN "request_throttles"."expiresAt" <= NOW() THEN 1 ELSE "request_throttles"."count" + 1 END,
      "windowStart" = CASE WHEN "request_throttles"."expiresAt" <= NOW() THEN NOW() ELSE "request_throttles"."windowStart" END,
      "expiresAt" = CASE WHEN "request_throttles"."expiresAt" <= NOW() THEN NOW() + (${windowSeconds} * INTERVAL '1 second') ELSE "request_throttles"."expiresAt" END
    RETURNING "count"
  `;
  return (rows[0]?.count ?? limit + 1) <= limit;
}

export function requestSubject(request: Request): string {
  if (process.env.TRUSTED_PROXY !== "true") return "direct-client";
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return request.headers.get("x-real-ip") || forwarded || "unknown-proxy-client";
}