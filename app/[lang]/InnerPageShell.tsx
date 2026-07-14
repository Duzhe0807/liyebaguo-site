import Image from "next/image";
import Link from "next/link";
import type { Lang } from "../languages";
import { content } from "../content";

const routes = ["experience", "banquet-menu", "costume-experience", "show-times-prices", "location-booking", "about"];

export function InnerPageShell({ lang, title, eyebrow, summary, image, children, pageType, heroSize, relatedLinks }: {
  lang: Lang; title: string; eyebrow: string; summary: string; image?: string; children: React.ReactNode;
  pageType?: "content" | "utility" | "faq"; heroSize?: "experience" | "content" | "about" | "utility" | "faq";
  relatedLinks?: Array<{ href: string; label: string; meta: string }>;
}) {
  const t = content[lang];
  const isEn = lang === "en";
  const resolvedPageType = pageType ?? (eyebrow === "VISITOR GUIDE" ? "faq" : eyebrow === "SHOW TIMES & PRICES" || eyebrow === "LOCATION & BOOKING" ? "utility" : "content");
  const resolvedHeroSize = heroSize ?? (eyebrow === "THE EXPERIENCE" ? "experience" : eyebrow === "OUR STORY" ? "about" : resolvedPageType === "faq" ? "faq" : resolvedPageType === "utility" ? "utility" : "content");
  const labels = [t.navExperience, t.navBanquet, t.navCostume, isEn ? "Tickets" : "场次票价", t.navVisit, t.navAbout];
  const links = relatedLinks ?? (resolvedPageType === "content" ? [
    { href: `/${lang}/show-times-prices/`, label: isEn ? "Show Times & Prices" : "场次与票价", meta: isEn ? "Choose a session" : "选择场次" },
    { href: `/${lang}/location-booking/`, label: isEn ? "Book Now" : "立即预订", meta: isEn ? "Plan your visit" : "安排行程" },
  ] : resolvedPageType === "utility" ? [
    { href: `/${lang}/show-times-prices/`, label: isEn ? "Tickets" : "场次票价", meta: isEn ? "Compare options" : "对比票种" },
    { href: `/${lang}/location-booking/`, label: isEn ? "Location & Booking" : "地址与预订", meta: isEn ? "Get directions" : "导航与联系" },
  ] : []);
  const breadcrumb = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.brandName, item: `https://gongyanshow.com/${lang}/` },
      { "@type": "ListItem", position: 2, name: title },
    ],
  };
  return (
    <main className={`inner-page page-${resolvedPageType}`}>
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

      <details className="inner-mobile-nav"><summary>{isEn ? "Menu" : "菜单"}</summary><nav>{labels.map((label, index) => <Link href={`/${lang}/${routes[index]}/`} key={routes[index]}>{label}</Link>)}</nav></details>

      <section className={`inner-hero hero-${resolvedHeroSize}`}>
        {image ? <Image src={image} alt="" fill priority sizes="100vw" /> : null}
        <div className="inner-hero-shade" />
        <div className="inner-hero-copy">
          <nav className="breadcrumb" aria-label="Breadcrumb"><ol><li><Link href={`/${lang}/`}>{t.brandName}</Link></li><li aria-current="page">{title}</li></ol></nav>
          <p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{summary}</p>
        </div>
      </section>

      <div className="inner-content">{children}</div>

      {links.length ? <section className="related-pages"><p className="eyebrow">{isEn ? "CONTINUE PLANNING" : "继续了解"}</p><div>{links.map(link => <Link href={link.href} key={link.href}><small>{link.meta}</small><strong>{link.label}</strong><span>→</span></Link>)}</div></section> : null}

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
