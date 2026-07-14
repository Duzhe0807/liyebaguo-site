import { languages, type Lang } from "../../languages";
import { siteSeo, getCanonicalPath, getHreflang } from "../../seo";
import { content } from "../../content";
import type { Metadata } from "next";

export function generateStaticParams() { return languages.map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  const seo = siteSeo[lang].about;
  return {
    title: seo.title, description: seo.description,
    alternates: { canonical: getCanonicalPath(lang, "about"), languages: getHreflang("about") },
    openGraph: { title: seo.title, description: seo.description, url: getCanonicalPath(lang, "about"), type: "website" },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const t = content[lang];
  const isEn = lang === "en";
  const h1 = isEn ? "About — Our Story" : "关于 — 品牌故事";
  const body = isEn ? `<section><h2>Ba Kingdom Banquet — Where History Comes to the Table</h2>
        <p>Ba Kingdom Banquet (礼宴巴国) draws inspiration from the ancient Ba Kingdom civilization that flourished along the Yangtze River in what is now Chongqing. We blend stage performance, ritual ceremony, regional Ba-Yu cuisine, Hanfu costume styling, and immersive scenography into one unforgettable evening.</p>
        <p>Each night, guests are invited not just to dine, but to step into a living narrative — where music, dance, ritual, and flavor converge around the banquet table. From the welcome ceremony to the farewell portrait, every moment is designed to honour the art of hospitality as practiced in ancient Ba.</p></section>` : `<section><h2>礼宴巴国 — 让历史入席</h2>
        <p>礼宴巴国以古代巴国文明为灵感，融合舞台演艺、礼乐仪式、巴渝地方风味、华服妆造与沉浸式场景，呈现一晚可观、可食、可感的文化礼宴。</p>
        <p>每一晚，宾客不只是用餐，而是步入一段流动的叙事——音乐、舞蹈、礼仪与风味在宴席间交汇。从迎宾入场到合影送别，每一个环节都承载着巴渝待客之道的温度与仪式感。</p></section>`;
  return (
    <main className="page-content">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol><li><a href={`/${lang}/`}>{t.brandName}</a></li><li aria-current="page">{h1}</li></ol>
      </nav>
      <section><h1>{h1}</h1></section>
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <a href={`/${lang}/location-booking/`} className="cta-button">{t.bookCta}</a>
    </main>
  );
}
