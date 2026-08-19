import { randomUUID } from "node:crypto";
import type { PaymentOrder, PaymentProvider, PaymentResult, RefundResult, VerifiedWebhook } from "./types";

export class MockPaymentProvider implements PaymentProvider {
  readonly code = "MOCK" as const;

  async createPayment(order: PaymentOrder, idempotencyKey: string): Promise<PaymentResult> {
    return {
      providerTransactionId: `mock_${order.orderNo}_${idempotencyKey.slice(0, 8)}`,
      providerEventId: `mock_event_${randomUUID()}`,
      status: "PENDING",
    };
  }

  async queryPayment(order: PaymentOrder): Promise<PaymentResult> {
    return {
      providerTransactionId: `mock_${order.orderNo}`,
      providerEventId: `mock_query_${order.orderNo}`,
      status: "PENDING",
    };
  }

  async closePayment(): Promise<void> {}

  async refund(order: PaymentOrder, amountCents: number, idempotencyKey: string): Promise<RefundResult> {
    return { providerRefundId: `mock_refund_${order.orderNo}_${amountCents}_${idempotencyKey.slice(0, 8)}`, status: "SUCCEEDED" };
  }

  async verifyWebhook(): Promise<VerifiedWebhook> {
    return { valid: false };
  }
}