import { languages, type Lang } from "../../languages";
import { siteSeo, getCanonicalPath, getHreflang } from "../../seo";
import { content } from "../../content";
import type { Metadata } from "next";

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  const seo = siteSeo[lang].banquetMenu;
  return {
    title: seo.title, description: seo.description,
    alternates: { canonical: getCanonicalPath(lang, "banquetMenu"), languages: getHreflang("banquetMenu") },
    openGraph: { title: seo.title, description: seo.description, url: getCanonicalPath(lang, "banquetMenu"), type: "website" },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const t = content[lang];
  return (
    <main className="page-content">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol><li><a href={`/${lang}/`}>{t.brandName}</a></li><li aria-current="page">{t.navBanquet}</li></ol>
      </nav>
      <section>
        <h1>{lang === "en" ? "Banquet Menu: Ba-Yu Cuisine" : "演艺美馔 — 巴渝风味宴席"}</h1>
        <p>{t.featureTwoCopy}</p>
      </section>
      <section>
        <h2>{t.factCuisine}</h2>
        <p>{lang === "en" ? "A curated multi-course banquet inspired by Chongqing's rich culinary heritage. Each dish reflects the ceremonial dining traditions of ancient Ba Kingdom, using seasonal local ingredients and time-honored preparation methods." : "以巴渝地方风味为根基，结合宴席礼仪设计的菜品体系。每道菜品融入巴国宴饮传统，选用时令食材与传统烹制方式，呈现完整的待客之道。"}</p>
      </section>
      <section>
        <h2>{t.packageEyebrow}</h2>
        <div><h3>{t.packageVisitorTitle}</h3><p>{t.packageVisitorCopy}</p></div>
        <div><h3>{t.packageVipTitle}</h3><p>{t.packageVipCopy}</p></div>
        <div><h3>{t.packageGroupTitle}</h3><p>{t.packageGroupCopy}</p></div>
      </section>
      <a href={`/${lang}/location-booking/`} className="cta-button">{t.bookCta}</a>
    </main>
  );
}
