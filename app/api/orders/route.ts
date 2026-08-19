import { createOrder } from "@/lib/orders/service";
import { consumeRateLimit, requestSubject } from "@/lib/security/rate-limit";
import { apiError, assertJsonRequest, assertSameOrigin } from "@/lib/security/request";
import { createOrderSchema } from "@/lib/validation/checkout";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    assertJsonRequest(request);
    const input = createOrderSchema.parse(await request.json());
    const subject = requestSubject(request);
    const [ipAllowed, contactAllowed] = await Promise.all([
      consumeRateLimit("create-order-ip", subject, 5, 15 * 60),
      consumeRateLimit("create-order-contact", input.customer.email.toLowerCase(), 3, 15 * 60),
    ]);
    if (!ipAllowed || !contactAllowed) return Response.json({ error: "RATE_LIMITED" }, { status: 429, headers: { "Retry-After": "900" } });
    const result = await createOrder(input);
    return Response.json({
      orderNo: result.order.orderNo,
      accessToken: result.accessToken,
      expiresAt: result.order.expiresAt,
      totalAmountCents: result.order.totalAmountCents,
      currency: result.order.currency,
    }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return apiError(error);
  }
}