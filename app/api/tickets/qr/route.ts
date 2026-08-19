import QRCode from "qrcode";
import { getPublicOrder } from "@/lib/orders/service";
import { apiError, assertJsonRequest, assertSameOrigin, bearerToken } from "@/lib/security/request";
import { z } from "zod";

const schema = z.object({ orderNo: z.string().min(10).max(40), ticketId: z.string().uuid() }).strict();

export async function POST(request: Request) {
  try {
    assertSameOrigin(request); assertJsonRequest(request, 4096);
    const input = schema.parse(await request.json());
    const order = await getPublicOrder(input.orderNo, bearerToken(request));
    const ticket = order.tickets.find((entry) => entry.id === input.ticketId);
    if (!ticket) return Response.json({ error: "TICKET_NOT_FOUND" }, { status: 404 });
    const svg = await QRCode.toString(`LYTICKET:${ticket.token}`, { type: "svg", errorCorrectionLevel: "M", margin: 1, width: 360 });
    return new Response(svg, { headers: { "Content-Type": "image/svg+xml; charset=utf-8", "Cache-Control": "private, no-store", "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; sandbox" } });
  } catch (error) { return apiError(error); }
}