import { getDb } from "@/lib/db";
import { maskEmail, maskPhone, requireAdmin } from "@/lib/security/admin-auth";
import { apiError } from "@/lib/security/request";

export async function GET(request: Request) {
  try {
    await requireAdmin("order:read");
    const query = new URL(request.url).searchParams;
    const status = query.get("status") || undefined;
    const orders = await getDb().order.findMany({
      where: status ? { status: status as never } : undefined,
      include: { show: true, items: true }, orderBy: { createdAt: "desc" }, take: 100,
    });
    return Response.json({ orders: orders.map((order) => ({
      id: order.id, orderNo: order.orderNo, status: order.status, paymentStatus: order.paymentStatus,
      customerName: order.customerName, customerEmail: maskEmail(order.customerEmail), customerPhone: maskPhone(order.customerPhone),
      totalAmountCents: order.totalAmountCents, currency: order.currency, createdAt: order.createdAt,
      show: { date: order.show.date, sessionType: order.show.sessionType, showStart: order.show.showStart },
      items: order.items.map((item) => ({ name: item.ticketNameSnapshot, quantity: item.quantity })),
    })) }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) { return apiError(error); }
}