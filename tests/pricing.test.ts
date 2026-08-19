import { describe, expect, it } from "vitest";
import { calculateOrderTotal } from "@/lib/orders/service";
import { createOrderSchema } from "@/lib/validation/checkout";

describe("server-side pricing", () => {
  it("calculates totals from integer database prices", () => {
    expect(calculateOrderTotal([{ unitPriceCents: 23800, quantity: 2 }, { unitPriceCents: 59600, quantity: 1 }])).toBe(107200);
  });

  it("does not accept client price, subtotal or discount fields", () => {
    const result = createOrderSchema.safeParse({
      showId: "show_1", items: [{ ticketTypeId: "guest", quantity: 1, price: 1 }],
      customer: { name: "Guest", email: "guest@example.com", phone: "12345678", locale: "en" },
      total: 1, discount: 999999,
    });
    expect(result.success).toBe(false);
  });
});