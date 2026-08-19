import { beforeAll, describe, expect, it } from "vitest";

beforeAll(() => {
  process.env.DATABASE_URL = "postgresql://test:test@127.0.0.1:5432/test";
  process.env.SESSION_SECRET = "test-session-secret-with-at-least-32-characters";
  process.env.TICKET_SIGNING_SECRET = "test-ticket-secret-with-at-least-32-characters";
  process.env.MOCK_PAYMENT_ENABLED = "true";
});

describe("secure ticket token", () => {
  it("round-trips a signed random ticket id", async () => {
    const { createTicketToken, verifyTicketToken } = await import("@/lib/security/crypto");
    const generated = createTicketToken();
    expect(generated.token).not.toContain(generated.ticketId);
    expect(verifyTicketToken(generated.token)).toBe(generated.ticketId);
  });

  it("rejects a modified signature", async () => {
    const { createTicketToken, verifyTicketToken } = await import("@/lib/security/crypto");
    const generated = createTicketToken();
    expect(verifyTicketToken(`${generated.token.slice(0, -1)}x`)).toBeNull();
  });
});