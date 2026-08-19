import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { languages, type Lang } from "@/app/languages";
import { OrderStatusView } from "./OrderStatus";

export const metadata: Metadata = { title: "Order | Liyan Baguo", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function OrderPage({ params }: { params: Promise<{ lang: Lang; orderNo: string }> }) {
  const { lang, orderNo } = await params;
  if (!languages.includes(lang)) notFound();
  return <OrderStatusView lang={lang} orderNo={orderNo} />;
}