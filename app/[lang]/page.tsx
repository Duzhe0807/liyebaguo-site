import { languages, type Lang, langCodes } from "../languages";
import { siteSeo, getHreflang, getCanonicalPath } from "../seo";
import { HomePage } from "./HomePage";
import { InteractiveScripts } from "../InteractiveScripts";
import { JsonLdOrganization, JsonLdLocalBusiness } from "../JsonLd";
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
  const seo = siteSeo[lang].home;
  return {
    title: seo.title,
    description: seo.description,
    robots: "index, follow, max-image-preview:large",
    alternates: {
      canonical: getCanonicalPath(lang, "home"),
      languages: getHreflang("home"),
    },
    openGraph: {
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      url: getCanonicalPath(lang, "home"),
      type: "website",
      siteName: "Ba Kingdom Banquet",
      locale: langCodes[lang],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const locale = langToLocale[lang] as "zh" | "zh-hant" | "en" | "ko";

  return (
    <>
      <JsonLdOrganization />
      <JsonLdLocalBusiness />
      <HomePage locale={locale} />
      <InteractiveScripts />
    </>
  );
}
