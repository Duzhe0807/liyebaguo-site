import { z } from "zod";

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1),
  PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  ORDER_PAYMENT_TIMEOUT_MINUTES: z.coerce.number().int().min(5).max(60).default(15),
  MOCK_PAYMENT_ENABLED: z.enum(["true", "false"]).default("false"),
  TRUSTED_PROXY: z.enum(["true", "false"]).default("false"),
  SESSION_SECRET: z.string().min(32),
  TICKET_SIGNING_SECRET: z.string().min(32),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

let cached: ServerEnv | undefined;

export function getServerEnv(): ServerEnv {
  if (!cached) cached = serverEnvSchema.parse(process.env);
  return cached;
}

export function getPaymentTimeoutMinutes(): number {
  const value = Number(process.env.ORDER_PAYMENT_TIMEOUT_MINUTES ?? 15);
  return Number.isInteger(value) && value >= 5 && value <= 60 ? value : 15;
}