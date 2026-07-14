import { languages, type Lang } from "../../languages";
import { siteSeo, getCanonicalPath, getHreflang } from "../../seo";
import { content } from "../../content";
import type { Metadata } from "next";

export function generateStaticParams() { return languages.map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  const seo = siteSeo[lang].costume;
  return {
    title: seo.title, description: seo.description,
    alternates: { canonical: getCanonicalPath(lang, "costume"), languages: getHreflang("costume") },
    openGraph: { title: seo.title, description: seo.description, url: getCanonicalPath(lang, "costume"), type: "website" },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const t = content[lang];
  return (
    <main className="page-content">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol><li><a href={`/${lang}/`}>{t.brandName}</a></li><li aria-current="page">{t.navCostume}</li></ol>
      </nav>
      <section>
        <h1>{lang === "en" ? "Hanfu & Costume Experience" : "华服体验与妆造留影"}</h1>
        <p>{t.featureThreeCopy}</p>
      </section>
      <section>
        <h2>{t.factCostume}</h2>
        <p>{lang === "en" ? "Step into the grandeur of ancient China. Choose from a curated collection of Hanfu and dynasty costumes, with professional styling and makeup assistance. Capture your transformation in dedicated photo moments throughout the venue — before the banquet, between performances, or as a grand finale to your evening." : "穿上精心挑选的华服，搭配专业妆造，在充满东方美学的场景中留下纪念影像。可选择在入席前、演出间隙或礼宴结束后拍摄，为这一晚留下独特的文化印记。"}</p>
      </section>
      <a href={`/${lang}/location-booking/`} className="cta-button">{t.bookCta}</a>
    </main>
  );
}
