import { z } from "zod";
import { SessionType, ShowStatus } from "@/generated/prisma/enums";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/security/admin-auth";
import { apiError, assertJsonRequest, assertSameOrigin } from "@/lib/security/request";

const prices = z.object({ GUEST: z.number().int().positive(), VIP: z.number().int().positive(), SVIP: z.number().int().positive() }).strict();
const createSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), sessionType: z.enum(["LUNCH", "DINNER"]),
  onlineCapacity: z.number().int().min(0).max(160).default(20), prices,
}).strict();
const updateSchema = z.object({
  showId: z.string().min(1), onlineCapacity: z.number().int().min(0).max(160).optional(),
  status: z.enum(["DRAFT", "AVAILABLE", "SOLD_OUT", "CLOSED", "CANCELLED"]).optional(), prices: prices.partial().optional(),
}).strict();

export async function GET() {
  try {
    await requireAdmin("show:read");
    const shows = await getDb().show.findMany({ include: { prices: { include: { ticketType: true } } }, orderBy: [{ date: "desc" }, { showStart: "asc" }], take: 100 });
    return Response.json({ shows });
  } catch (error) { return apiError(error); }
}

export async function POST(request: Request) {
  try {
    assertSameOrigin(request); assertJsonRequest(request, 8192);
    const user = await requireAdmin("show:write");
    const input = createSchema.parse(await request.json());
    const schedule = input.sessionType === "LUNCH"
      ? { gardenStart: "11:30", gardenEnd: "12:10", showStart: "12:30", showEnd: "14:20" }
      : { gardenStart: "18:00", gardenEnd: "18:40", showStart: "19:00", showEnd: "20:50" };
    const date = new Date(`${input.date}T00:00:00.000Z`);
    const db = getDb();
    const show = await db.$transaction(async (tx) => {
      const created = await tx.show.create({ data: { date, sessionType: input.sessionType as SessionType, ...schedule, venue: "礼宴巴国 · 重庆巴国城", capacity: 160, onlineCapacity: input.onlineCapacity, status: ShowStatus.AVAILABLE } });
      const ticketTypes = await tx.ticketType.findMany({ where: { code: { in: ["GUEST", "VIP", "SVIP"] } } });
      for (const ticketType of ticketTypes) await tx.showTicketPrice.create({ data: { showId: created.id, ticketTypeId: ticketType.id, priceCents: input.prices[ticketType.code as keyof typeof input.prices], currency: "CNY" } });
      await tx.auditLog.create({ data: { actorId: user.id, action: "SHOW_CREATED", targetType: "Show", targetId: created.id, metadata: { date: input.date, sessionType: input.sessionType, onlineCapacity: input.onlineCapacity } } });
      return created;
    });
    return Response.json({ show }, { status: 201 });
  } catch (error) { return apiError(error); }
}

export async function PATCH(request: Request) {
  try {
    assertSameOrigin(request); assertJsonRequest(request, 8192);
    const user = await requireAdmin("show:write");
    const input = updateSchema.parse(await request.json());
    const db = getDb();
    const show = await db.$transaction(async (tx) => {
      const current = await tx.show.findUniqueOrThrow({ where: { id: input.showId } });
      if (input.onlineCapacity !== undefined && input.onlineCapacity < current.heldCount + current.soldCount) {
        throw new Response("Capacity cannot be below held and sold tickets", { status: 409 });
      }
      const updated = await tx.show.update({ where: { id: input.showId }, data: { onlineCapacity: input.onlineCapacity, status: input.status } });
      if (input.prices) {
        for (const [code, priceCents] of Object.entries(input.prices)) {
          const ticketType = await tx.ticketType.findUniqueOrThrow({ where: { code } });
          await tx.showTicketPrice.update({ where: { showId_ticketTypeId: { showId: input.showId, ticketTypeId: ticketType.id } }, data: { priceCents } });
        }
      }
      await tx.auditLog.create({ data: { actorId: user.id, action: "SHOW_UPDATED", targetType: "Show", targetId: input.showId, metadata: input } });
      return updated;
    });
    return Response.json({ show });
  } catch (error) { return apiError(error); }
}