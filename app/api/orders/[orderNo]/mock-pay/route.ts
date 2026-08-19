import { mockPayOrder } from "@/lib/orders/service";
import { consumeRateLimit, requestSubject } from "@/lib/security/rate-limit";
import { apiError, assertJsonRequest, assertSameOrigin, bearerToken } from "@/lib/security/request";
import { mockPaySchema } from "@/lib/validation/checkout";

export async function POST(request: Request, { params }: { params: Promise<{ orderNo: string }> }) {
  try {
    assertSameOrigin(request);
    assertJsonRequest(request, 4096);
    const allowed = await consumeRateLimit("mock-pay", requestSubject(request), 10, 10 * 60);
    if (!allowed) return Response.json({ error: "RATE_LIMITED" }, { status: 429 });
    const { orderNo } = await params;
    const { idempotencyKey } = mockPaySchema.parse(await request.json());
    const order = await mockPayOrder(orderNo, bearerToken(request), idempotencyKey);
    return Response.json({ orderNo: order.orderNo, status: order.status, paymentStatus: order.paymentStatus }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return apiError(error);
  }
}