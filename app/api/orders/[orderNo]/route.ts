import { getPublicOrder } from "@/lib/orders/service";
import { apiError, bearerToken } from "@/lib/security/request";

export async function GET(request: Request, { params }: { params: Promise<{ orderNo: string }> }) {
  try {
    const { orderNo } = await params;
    const order = await getPublicOrder(orderNo, bearerToken(request));
    return Response.json({ order }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    return apiError(error);
  }
}