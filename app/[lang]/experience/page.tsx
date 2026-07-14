import { languages, type Lang, langCodes } from "../../languages";
import { siteSeo, getCanonicalPath, getHreflang } from "../../seo";
import { content } from "../../content";
import type { Metadata } from "next";

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  const seo = siteSeo[lang].experience;
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: getCanonicalPath(lang, "experience"), languages: getHreflang("experience") },
    openGraph: { title: seo.title, description: seo.description, url: getCanonicalPath(lang, "experience"), type: "website" },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const t = content[lang];
  return (
    <main className="page-content">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol><li><a href={`/${lang}/`}>{t.brandName}</a></li><li aria-current="page">{t.navExperience}</li></ol>
      </nav>
      <section>
        <h1>{lang === "en" ? "The Ba Kingdom Banquet Experience" : "体验概览"}</h1>
        <p>{t.heroCopy}</p>
      </section>
      <section>
        <h2>{t.featureOneTitle} — {t.featureOneCjk}</h2>
        <p>{t.featureOneCopy}</p>
      </section>
      <section>
        <h2>{t.featureTwoTitle} — {t.featureTwoCjk}</h2>
        <p>{t.featureTwoCopy}</p>
      </section>
      <section>
        <h2>{t.featureThreeTitle} — {t.featureThreeCjk}</h2>
        <p>{t.featureThreeCopy}</p>
      </section>
      <section>
        <h2>{t.journeyEyebrow}: {t.journeyTitle}</h2>
        <ol>
          <li>{t.stepOne}</li><li>{t.stepTwo}</li><li>{t.stepThree}</li><li>{t.stepFour}</li><li>{t.stepFive}</li>
        </ol>
      </section>
      <a href={`/${lang}/location-booking/`} className="cta-button">{t.bookCta}</a>
    </main>
  );
}
