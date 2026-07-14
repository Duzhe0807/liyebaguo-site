import Image from "next/image";
import Link from "next/link";
import type { Lang } from "../languages";
import { content } from "../content";

const routes = ["experience", "banquet-menu", "costume-experience", "location-booking", "about"];

export function InnerPageShell({ lang, title, eyebrow, summary, image, children }: {
  lang: Lang; title: string; eyebrow: string; summary: string; image: string; children: React.ReactNode;
}) {
  const t = content[lang];
  const isEn = lang === "en";
  const labels = [t.navExperience, t.navBanquet, t.navCostume, t.navVisit, t.navAbout];
  const breadcrumb = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.brandName, item: `https://gongyanshow.com/${lang}/` },
      { "@type": "ListItem", position: 2, name: title },
    ],
  };
  return (
    <main className="inner-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <header className="site-header inner-header">
        <Link className="wordmark" href={`/${lang}/`}><strong>礼宴巴国</strong><span>LIYAN BAGUO</span></Link>
        <nav className="nav inner-nav" aria-label={isEn ? "Main navigation" : "主导航"}>
          {labels.map((label, index) => <Link href={`/${lang}/${routes[index]}/`} key={routes[index]}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <nav className="language-switcher" aria-label="Language">
            <Link href="/zh/">简</Link><Link href="/tw/">繁</Link><Link href="/en/">EN</Link><Link href="/ja/">日</Link><Link href="/ko/">KR</Link>
          </nav>
          <Link className="button compact" href={`/${lang}/location-booking/`}>{isEn ? "Book Now" : "立即预订"}</Link>
        </div>
      </header>

      <section className="inner-hero">
        <Image src={image} alt="" fill priority sizes="100vw" />
        <div className="inner-hero-shade" />
        <div className="inner-hero-copy">
          <nav className="breadcrumb" aria-label="Breadcrumb"><ol><li><Link href={`/${lang}/`}>{t.brandName}</Link></li><li aria-current="page">{title}</li></ol></nav>
          <p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{summary}</p>
        </div>
      </section>

      <div className="inner-content">{children}</div>

      <section className="inner-cta">
        <p className="eyebrow">RESERVATIONS</p>
        <h2>{isEn ? "Make the banquet part of your Chongqing journey" : "把这一席巴国礼宴，加入你的重庆行程"}</h2>
        <p>{isEn ? "Choose a session, confirm your party size, and tell us about dietary or costume needs." : "选择场次并告知人数、饮食或华服需求，工作人员将进一步确认。"}</p>
        <Link className="button" href={`/${lang}/location-booking/`}>{isEn ? "View Booking Details" : "查看预订方式"}</Link>
      </section>

      <footer className="inner-footer"><div className="wordmark"><strong>礼宴巴国</strong><span>LIYAN BAGUO</span></div><p>{isEn ? "Immersive Ba-Yu dinner show in Chongqing" : "重庆沉浸式巴渝文化餐秀"}</p><div><Link href={`/${lang}/about/`}>{t.navAbout}</Link><Link href={`/${lang}/faq/`}>FAQ</Link></div></footer>
      <div className="inner-mobile-book"><Link href={`/${lang}/location-booking/`}>{isEn ? "Book Now" : "立即预订"}</Link></div>
    </main>
  );
}

export function DetailFaq({ title, items }: { title: string; items: Array<[string, string]> }) {
  return <section className="inner-section inner-faq"><p className="eyebrow">FAQ</p><h2>{title}</h2><div>{items.map(([q, a]) => <details key={q}><summary>{q}<span>＋</span></summary><p>{a}</p></details>)}</div></section>;
}

export function FeatureRow({ title, text, image, reverse = false, kicker }: { title: string; text: string; image: string; reverse?: boolean; kicker: string }) {
  return <article className={`inner-feature${reverse ? " reverse" : ""}`}><div className="inner-feature-media"><Image src={image} alt={title} fill sizes="(max-width: 760px) 100vw, 50vw" /></div><div className="inner-feature-copy"><p className="eyebrow">{kicker}</p><h2>{title}</h2><p>{text}</p></div></article>;
}
