import { refundOrder } from "@/lib/orders/refund";
import { requireAdmin } from "@/lib/security/admin-auth";
import { apiError, assertJsonRequest, assertSameOrigin } from "@/lib/security/request";
import { refundSchema } from "@/lib/validation/checkout";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request); assertJsonRequest(request, 8192);
    const user = await requireAdmin("refund:write");
    const body = refundSchema.parse(await request.json());
    const order = await refundOrder({ ...body, operatorId: user.id });
    return Response.json({ orderNo: order.orderNo, status: order.status, paymentStatus: order.paymentStatus });
  } catch (error) { return apiError(error); }
}