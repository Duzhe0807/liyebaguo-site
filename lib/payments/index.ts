import { getServerEnv } from "../env";
import { MockPaymentProvider } from "./mock";
import type { PaymentProvider } from "./types";

export function getPaymentProvider(code: "MOCK"): PaymentProvider {
  if (code === "MOCK" && getServerEnv().MOCK_PAYMENT_ENABLED === "true") return new MockPaymentProvider();
  throw new Error("Payment provider is not enabled");
}

export type { PaymentProvider, PaymentOrder, PaymentResult, RefundResult, VerifiedWebhook } from "./types";