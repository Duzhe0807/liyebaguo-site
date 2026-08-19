import { describe, expect, it } from "vitest";
import { assertOrderTransition, canTransitionOrder } from "@/lib/domain/order-state";

describe("order state machine", () => {
  it("allows the documented forward transitions", () => {
    expect(canTransitionOrder("PENDING_PAYMENT", "PAID")).toBe(true);
    expect(canTransitionOrder("PENDING_PAYMENT", "EXPIRED")).toBe(true);
    expect(canTransitionOrder("PAID", "REFUNDED")).toBe(true);
  });

  it("rejects payment or reopening from terminal states", () => {
    expect(canTransitionOrder("EXPIRED", "PAID")).toBe(false);
    expect(canTransitionOrder("REFUNDED", "PAID")).toBe(false);
    expect(() => assertOrderTransition("CANCELLED", "PAID")).toThrow("Invalid order transition");
  });
});