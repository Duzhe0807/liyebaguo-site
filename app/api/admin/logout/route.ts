import { destroyAdminSession } from "@/lib/security/admin-auth";
import { apiError, assertSameOrigin } from "@/lib/security/request";

export async function POST(request: Request) {
  try { assertSameOrigin(request); await destroyAdminSession(); return Response.json({ ok: true }); }
  catch (error) { return apiError(error); }
}