import { z } from "zod";

export const checkoutItemSchema = z.object({
  ticketTypeId: z.string().min(1).max(64),
  quantity: z.number().int().min(1).max(20),
});

export const createOrderSchema = z.object({
  showId: z.string().min(1).max(64),
  items: z.array(checkoutItemSchema).min(1).max(3),
  customer: z.object({
    name: z.string().trim().min(1).max(80),
    email: z.string().trim().email().max(160),
    phone: z.string().trim().min(5).max(40),
    country: z.string().trim().max(80).optional(),
    locale: z.enum(["zh", "tw", "en", "ja", "ko"]),
    dietaryNotes: z.string().trim().max(500).optional(),
  }).strict(),
}).strict().superRefine((value, context) => {
  const ids = value.items.map((item) => item.ticketTypeId);
  if (new Set(ids).size !== ids.length) context.addIssue({ code: "custom", message: "Duplicate ticket type" });
  if (value.items.reduce((sum, item) => sum + item.quantity, 0) > 20) {
    context.addIssue({ code: "custom", message: "Maximum 20 tickets per order" });
  }
});

export const mockPaySchema = z.object({ idempotencyKey: z.string().min(16).max(128) }).strict();

export const adminLoginSchema = z.object({
  email: z.string().email().max(160),
  password: z.string().min(10).max(200),
  otp: z.string().regex(/^\d{6}$/),
}).strict();

export const checkinSchema = z.object({ token: z.string().min(40).max(512), showId: z.string().min(1).max(64) }).strict();

export const refundSchema = z.object({
  orderNo: z.string().min(10).max(40),
  amountCents: z.number().int().positive(),
  reason: z.string().trim().min(5).max(500),
  confirmation: z.literal("CONFIRM_REFUND"),
  idempotencyKey: z.string().min(16).max(128),
}).strict();