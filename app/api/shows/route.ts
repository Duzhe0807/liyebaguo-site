import { listAvailableShows, listUpcomingShowDates } from "@/lib/orders/service";
import { apiError } from "@/lib/security/request";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    if (searchParams.get("upcoming") === "1") {
      return Response.json({ dates: await listUpcomingShowDates() }, { headers: { "Cache-Control": "private, no-store" } });
    }
    const date = searchParams.get("date");
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return Response.json({ error: "INVALID_DATE" }, { status: 400 });
    return Response.json({ shows: await listAvailableShows(date) }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    return apiError(error);
  }
}
