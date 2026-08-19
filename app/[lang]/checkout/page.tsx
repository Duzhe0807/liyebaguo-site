import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { languages, type Lang } from "@/app/languages";
import { CheckoutFlow } from "./CheckoutFlow";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  const english = lang === "en";
  return {
    title: english ? "Official Booking | Ba Kingdom Banquet" : "官方购票｜礼宴巴国",
    description: english ? "Choose a date, lunch or dinner session, and official tickets for Ba Kingdom Banquet in Chongqing." : "选择礼宴巴国到访日期、午宴或晚宴场次及官方席位。",
    robots: { index: false, follow: false },
  };
}

export default async function CheckoutPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  if (!languages.includes(lang)) notFound();
  return <CheckoutFlow lang={lang} />;
}