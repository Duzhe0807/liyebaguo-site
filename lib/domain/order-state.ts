export type OrderState =
  | "PENDING_PAYMENT"
  | "PAID"
  | "CANCELLED"
  | "EXPIRED"
  | "PARTIALLY_REFUNDED"
  | "REFUNDED";

const allowedTransitions: Record<OrderState, readonly OrderState[]> = {
  PENDING_PAYMENT: ["PAID", "CANCELLED", "EXPIRED"],
  PAID: ["PARTIALLY_REFUNDED", "REFUNDED"],
  PARTIALLY_REFUNDED: ["REFUNDED"],
  CANCELLED: [],
  EXPIRED: [],
  REFUNDED: [],
};

export function canTransitionOrder(from: OrderState, to: OrderState): boolean {
  return allowedTransitions[from].includes(to);
}

export function assertOrderTransition(from: OrderState, to: OrderState): void {
  if (!canTransitionOrder(from, to)) throw new Error(`Invalid order transition: ${from} -> ${to}`);
}