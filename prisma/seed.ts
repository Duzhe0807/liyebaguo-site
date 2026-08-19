import "dotenv/config";
import { hash } from "@node-rs/argon2";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { AdminRole, SessionType, ShowStatus } from "../generated/prisma/enums";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is required for seeding");

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: databaseUrl }) });

const ticketCatalog = [
  {
    code: "GUEST", nameZh: "嘉宾席", nameZhHant: "嘉賓席", nameEn: "Guest Seat", nameJa: "ゲスト席", nameKo: "게스트석",
    descriptionZh: "含古风游园、迎宾礼、宴席与礼乐演艺", descriptionEn: "Garden visit, welcome ritual, banquet and live cultural show",
    seatArea: "标准席位区", includesCostume: false, includesMakeup: false, includesPhoto: false, isFeatured: false, sortOrder: 1,
  },
  {
    code: "VIP", nameZh: "贵宾席", nameZhHant: "貴賓席", nameEn: "VIP Seat", nameJa: "VIP席", nameKo: "VIP석",
    descriptionZh: "升级席位与接待服务，含完整游园、宴席与演艺体验", descriptionEn: "Upgraded seating and hospitality with the full garden, banquet and show experience",
    seatArea: "贵宾席位区", includesCostume: false, includesMakeup: false, includesPhoto: false, isFeatured: false, sortOrder: 2,
  },
  {
    code: "SVIP", nameZh: "SVIP 席位", nameZhHant: "SVIP 席位", nameEn: "SVIP Seat", nameJa: "SVIP席", nameKo: "SVIP석",
    descriptionZh: "高级席位，赠送古装服饰和古装头饰", descriptionEn: "Premium seating with traditional costume and headwear included",
    seatArea: "SVIP 席位区", includesCostume: true, includesMakeup: false, includesPhoto: false, isFeatured: true, sortOrder: 3,
  },
] as const;

const prices = {
  LUNCH: { GUEST: 23800, VIP: 29600, SVIP: 49600 },
  DINNER: { GUEST: 31600, VIP: 45800, SVIP: 59600 },
} as const;

function dateOnly(value: string): Date {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error("SEED_SHOWS_FROM must be YYYY-MM-DD");
  return new Date(`${value}T00:00:00.000Z`);
}

async function seedShow(date: Date, sessionType: SessionType) {
  const schedule = sessionType === SessionType.LUNCH
    ? { gardenStart: "11:30", gardenEnd: "12:10", showStart: "12:30", showEnd: "14:20" }
    : { gardenStart: "18:00", gardenEnd: "18:40", showStart: "19:00", showEnd: "20:50" };

  const show = await prisma.show.upsert({
    where: { date_sessionType: { date, sessionType } },
    update: {},
    create: {
      date, sessionType, ...schedule, venue: "礼宴巴国 · 重庆巴国城", capacity: 160,
      onlineCapacity: 20, status: ShowStatus.AVAILABLE,
    },
  });

  for (const [code, priceCents] of Object.entries(prices[sessionType])) {
    const ticketType = await prisma.ticketType.findUniqueOrThrow({ where: { code } });
    await prisma.showTicketPrice.upsert({
      where: { showId_ticketTypeId: { showId: show.id, ticketTypeId: ticketType.id } },
      update: { priceCents },
      create: { showId: show.id, ticketTypeId: ticketType.id, priceCents, currency: "CNY" },
    });
  }
}

async function main() {
  for (const ticketType of ticketCatalog) {
    await prisma.ticketType.upsert({ where: { code: ticketType.code }, update: ticketType, create: ticketType });
  }

  const adminEmail = process.env.ADMIN_BOOTSTRAP_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD;
  const totpSecret = process.env.ADMIN_BOOTSTRAP_TOTP_SECRET;
  if (adminEmail && adminPassword && totpSecret) {
    if (adminPassword.length < 14) throw new Error("ADMIN_BOOTSTRAP_PASSWORD must contain at least 14 characters");
    await prisma.adminUser.upsert({
      where: { email: adminEmail },
      update: {},
      create: { email: adminEmail, passwordHash: await hash(adminPassword), totpSecret, role: AdminRole.ADMIN },
    });
  }

  const days = Number(process.env.SEED_SHOWS_DAYS ?? 0);
  const from = process.env.SEED_SHOWS_FROM;
  if (days > 0 && from) {
    const first = dateOnly(from);
    for (let offset = 0; offset < days; offset += 1) {
      const date = new Date(first);
      date.setUTCDate(date.getUTCDate() + offset);
      await seedShow(date, SessionType.LUNCH);
      await seedShow(date, SessionType.DINNER);
    }
  }
}

main().finally(() => prisma.$disconnect());