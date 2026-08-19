export interface PaymentOrder {
  orderNo: string;
  amountCents: number;
  currency: string;
  description: string;
}

export interface PaymentResult {
  providerTransactionId: string;
  providerEventId: string;
  status: "PENDING" | "SUCCEEDED" | "FAILED";
  checkoutUrl?: string;
}

export interface RefundResult {
  providerRefundId: string;
  status: "PENDING" | "SUCCEEDED" | "FAILED";
}

export interface VerifiedWebhook {
  valid: boolean;
  providerEventId?: string;
  orderNo?: string;
  amountCents?: number;
  currency?: string;
  status?: "PENDING" | "SUCCEEDED" | "FAILED";
}

export interface PaymentProvider {
  readonly code: "MOCK" | "WECHAT" | "ALIPAY" | "PAYPAL";
  createPayment(order: PaymentOrder, idempotencyKey: string): Promise<PaymentResult>;
  queryPayment(order: PaymentOrder): Promise<PaymentResult>;
  closePayment(order: PaymentOrder): Promise<void>;
  refund(order: PaymentOrder, amountCents: number, idempotencyKey: string): Promise<RefundResult>;
  verifyWebhook(request: Request): Promise<VerifiedWebhook>;
}