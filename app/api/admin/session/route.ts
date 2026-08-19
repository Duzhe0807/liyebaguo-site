import { requireAdmin } from "@/lib/security/admin-auth";
import { apiError } from "@/lib/security/request";

export async function GET() {
  try { const user = await requireAdmin("ticket:read"); return Response.json({ user: { email: user.email, role: user.role } }); }
  catch (error) { return apiError(error); }
}