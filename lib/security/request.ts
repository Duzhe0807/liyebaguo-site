import { getServerEnv } from "../env";

export function assertJsonRequest(request: Request, maxBytes = 32_768): void {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) throw new Response("Unsupported media type", { status: 415 });
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > maxBytes) throw new Response("Request too large", { status: 413 });
}

export function assertSameOrigin(request: Request): void {
  const origin = request.headers.get("origin");
  const expected = new URL(getServerEnv().PUBLIC_SITE_URL).origin;
  if (!origin || origin !== expected) throw new Response("Forbidden", { status: 403 });
}

export function bearerToken(request: Request): string {
  const value = request.headers.get("authorization");
  if (!value?.startsWith("Bearer ")) throw new Response("Unauthorized", { status: 401 });
  const token = value.slice(7).trim();
  if (token.length < 32 || token.length > 256) throw new Response("Unauthorized", { status: 401 });
  return token;
}

export function apiError(error: unknown): Response {
  if (error instanceof Response) return error;
  const candidate = error as { code?: string; status?: number; message?: string; issues?: unknown };
  if (candidate.issues) return Response.json({ error: "VALIDATION_ERROR", details: candidate.issues }, { status: 400 });
  if (candidate.code && candidate.status) return Response.json({ error: candidate.code, message: candidate.message }, { status: candidate.status });
  console.error("API_ERROR", error instanceof Error ? error.name : "UnknownError");
  return Response.json({ error: "INTERNAL_ERROR" }, { status: 500 });
}