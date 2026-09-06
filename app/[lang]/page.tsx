import { languages, type Lang, langCodes } from "../languages";
import { pageMetadata } from "../seo";
import { HomePage } from "./HomePage";
import { InteractiveScripts } from "../InteractiveScripts";
import { JsonLdWebsite } from "../JsonLd";
import type { Metadata } from "next";

const langToLocale: Record<Lang, string> = {
  zh: "zh",
  tw: "zh-hant",
  en: "en",
  ja: "ja",
  ko: "ko",
};

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata(lang, "home");
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const locale = langToLocale[lang] as "zh" | "zh-hant" | "en" | "ja" | "ko";

  return (
    <>
      <JsonLdWebsite />
      <HomePage locale={locale} />
      <InteractiveScripts />
    </>
  );
}
