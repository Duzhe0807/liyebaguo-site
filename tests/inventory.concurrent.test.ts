import { afterAll, beforeAll, describe, expect, it } from "vitest";

const databaseUrl = process.env.TEST_DATABASE_URL;
const suite = databaseUrl ? describe : describe.skip;

suite("PostgreSQL atomic inventory", () => {
  let db: import("@/generated/prisma/client").PrismaClient;
  let showId = "";
  let ticketTypeId = "";

  beforeAll(async () => {
    process.env.DATABASE_URL = databaseUrl;
    process.env.SESSION_SECRET = "test-session-secret-with-at-least-32-characters";
    process.env.TICKET_SIGNING_SECRET = "test-ticket-secret-with-at-least-32-characters";
    process.env.MOCK_PAYMENT_ENABLED = "true";
    const { PrismaPg } = await import("@prisma/adapter-pg");
    const { PrismaClient } = await import("@/generated/prisma/client");
    db = new PrismaClient({ adapter: new PrismaPg({ connectionString: databaseUrl! }) });
    const ticketType = await db.ticketType.create({ data: { code: `TEST_${Date.now()}`, nameZh: "测试", nameZhHant: "測試", nameEn: "Test", nameJa: "Test", nameKo: "Test", descriptionZh: "测试", descriptionEn: "Test", seatArea: "Test" } });
    ticketTypeId = ticketType.id;
    const show = await db.show.create({ data: { date: new Date("2099-01-01T00:00:00Z"), sessionType: "LUNCH", gardenStart: "11:30", gardenEnd: "12:10", showStart: "12:30", showEnd: "14:20", venue: "Test", capacity: 1, onlineCapacity: 1, status: "AVAILABLE", prices: { create: { ticketTypeId, priceCents: 23800 } } } });
    showId = show.id;
  });

  afterAll(async () => {
    if (!db) return;
    await db.order.deleteMany({ where: { showId } });
    await db.show.delete({ where: { id: showId } });
    await db.ticketType.delete({ where: { id: ticketTypeId } });
    await db.$disconnect();
  });

  it("allows at most one of 100 simultaneous buyers to hold the final ticket", async () => {
    const { createOrder } = await import("@/lib/orders/service");
    const attempts = await Promise.allSettled(Array.from({ length: 100 }, (_, index) => createOrder({ showId, items: [{ ticketTypeId, quantity: 1 }], customer: { name: `Buyer ${index}`, email: `buyer${index}@example.com`, phone: "12345678", locale: "en" } })));
    expect(attempts.filter((result) => result.status === "fulfilled")).toHaveLength(1);
    const show = await db.show.findUniqueOrThrow({ where: { id: showId } });
    expect(show.heldCount + show.soldCount).toBe(1);
  }, 30_000);
});