import { requireAdmin } from "@/lib/security/admin-auth";
import { consumeRateLimit } from "@/lib/security/rate-limit";
import { apiError, assertJsonRequest, assertSameOrigin } from "@/lib/security/request";
import { checkInTicket } from "@/lib/tickets/service";
import { checkinSchema } from "@/lib/validation/checkout";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request); assertJsonRequest(request, 4096);
    const user = await requireAdmin("ticket:checkin");
    if (!await consumeRateLimit("checkin", user.id, 120, 60)) return Response.json({ error: "RATE_LIMITED" }, { status: 429 });
    const { token, showId } = checkinSchema.parse(await request.json());
    const normalized = token.startsWith("LYTICKET:") ? token.slice(9) : token;
    return Response.json(await checkInTicket(normalized, showId, user.id));
  } catch (error) { return apiError(error); }
}