"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Lang } from "../languages";
import { langCodes } from "../languages";
import { content } from "../content";
import { HtmlLang } from "./HtmlLang";
import { Phone } from "@phosphor-icons/react";
import { CustomerServiceChooser } from "./CustomerServiceChooser";

const routes = ["experience", "banquet-menu", "costume-experience", "show-times-prices", "location-booking", "about"];

type RelatedLink = { href: string; label: string; meta: string };

function themeFromEyebrow(eyebrow: string) {
  if (eyebrow === "THE EXPERIENCE") return "experience";
  if (eyebrow === "BANQUET MENU") return "banquet";
  if (eyebrow === "COSTUME EXPERIENCE") return "costume";
  if (eyebrow === "SHOW TIMES & PRICES") return "tickets";
  if (eyebrow === "LOCATION & BOOKING") return "location";
  if (eyebrow === "OUR STORY") return "about";
  return "faq";
}

export function InnerPageShell({ lang, title, eyebrow, summary, image, children, pageType, heroSize, relatedLinks }: {
  lang: Lang;
  title: string;
  eyebrow: string;
  summary: string;
  image?: string;
  children: React.ReactNode;
  pageType?: "content" | "utility" | "faq";
  heroSize?: "experience" | "content" | "about" | "utility" | "faq";
  relatedLinks?: RelatedLink[];
}) {
  const t = content[lang];
  const isEn = lang === "en";
  const theme = themeFromEyebrow(eyebrow);
  const resolvedPageType = pageType ?? (theme === "faq" ? "faq" : theme === "tickets" || theme === "location" ? "utility" : "content");
  const resolvedHeroSize = heroSize ?? (theme === "experience" ? "experience" : theme === "about" ? "about" : resolvedPageType === "faq" ? "faq" : resolvedPageType === "utility" ? "utility" : "content");
  const labels = [t.navExperience, t.navBanquet, t.navCostume, isEn ? "Tickets" : "场次票价", t.navVisit, t.navAbout];
  const defaultContentLinks: RelatedLink[] = [
    { href: `/${lang}/show-times-prices/`, label: isEn ? "Show Times & Prices" : "场次与票价", meta: isEn ? "Choose a session" : "选择场次" },
    { href: `/${lang}/location-booking/`, label: isEn ? "Book Now" : "立即预订", meta: isEn ? "Plan your visit" : "安排行程" },
  ];
  const defaultUtilityLinks: RelatedLink[] = theme === "tickets" ? [
    { href: `/${lang}/location-booking/`, label: isEn ? "Location & Booking" : "地址与预订", meta: isEn ? "Get directions" : "导航与联系" },
    { href: `/${lang}/#booking`, label: isEn ? "Book Now" : "立即预订", meta: isEn ? "Send a request" : "提交预约" },
  ] : [
    { href: `/${lang}/show-times-prices/`, label: isEn ? "Tickets" : "场次票价", meta: isEn ? "Compare options" : "对比票种" },
    { href: `/${lang}/#booking`, label: isEn ? "Book Now" : "立即预订", meta: isEn ? "Send a request" : "提交预约" },
  ];
  const links = relatedLinks ?? (resolvedPageType === "content" ? defaultContentLinks : resolvedPageType === "utility" ? defaultUtilityLinks : []);
  const ctaCopy: Record<string, [string, string]> = isEn ? {
    experience: ["Step into the complete Ba Kingdom evening", "Choose a session and experience the banquet, performance and ritual as one journey."],
    banquet: ["Reserve a seat at the Ba-Yu banquet", "Pair regional flavours with a live performance unfolding around your table."],
    costume: ["Dress for your Chongqing keepsake", "Confirm a costume package, styling time and photography needs before arrival."],
    tickets: ["Choose your session and seating", "Compare lunch and dinner times, then send your preferred seat request."],
    location: ["Confirm the route before you set out", "Open your preferred map, save the address and complete your booking request."],
    about: ["Experience the story around the table", "See how Ba-Yu inspiration becomes an evening of flavour, music, costume and hospitality."],
    faq: ["Ready to plan your visit?", "Review tickets and directions, then send the team your preferred date."],
  } : {
    experience: ["进入完整的巴国礼宴之夜", "选择场次，让宴席、演出与礼仪在同一段旅程中展开。"],
    banquet: ["预订一席巴渝风味宴", "在席间品尝地方风味，也让演出围绕餐桌发生。"],
    costume: ["为重庆之行留下一组华服影像", "提前确认服装套餐、妆造时间与拍摄需求。"],
    tickets: ["选择场次与席位", "对比午宴、晚宴和席位包含内容，再提交预订。"],
    location: ["出发前确认路线", "打开常用地图、保存地址，并完成预约。"],
    about: ["到宴席现场感受这段故事", "看巴渝灵感如何成为一晚的味道、音乐、华服与待客之礼。"],
    faq: ["准备安排行程？", "查看票价和路线，再提交希望到访的日期。"],
  };
  const [ctaTitle, ctaText] = ctaCopy[theme];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.brandName, item: `https://gongyanshow.com/${lang}/` },
      { "@type": "ListItem", position: 2, name: title },
    ],
  };

  return (
    <main className={`inner-page page-${resolvedPageType} theme-${theme}`}>
      <HtmlLang lang={langCodes[lang]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <header className="site-header inner-header">
        <Link className="wordmark" href={`/${lang}/`}><strong>礼宴巴国</strong><span>LIYAN BAGUO</span></Link>
        <nav className="nav inner-nav" aria-label={isEn ? "Main navigation" : "主导航"}>
          {labels.map((label, index) => <Link href={`/${lang}/${routes[index]}/`} key={routes[index]}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <nav className="language-switcher" aria-label="Language">
            <Link className={lang === "zh" ? "active" : ""} href="/zh/">简</Link>
            <Link className={lang === "tw" ? "active" : ""} href="/tw/">繁</Link>
            <Link className={lang === "en" ? "active" : ""} href="/en/">EN</Link>
            <Link className={lang === "ja" ? "active" : ""} href="/ja/">日</Link>
            <Link className={lang === "ko" ? "active" : ""} href="/ko/">KR</Link>
          </nav>
          <Link className="button compact" href={`/${lang}/#booking`}>{t.bookCta}</Link>
        </div>
      </header>

      <details className="inner-mobile-nav" open={mobileMenuOpen} onToggle={(e) => setMobileMenuOpen((e.currentTarget as HTMLDetailsElement).open)}>
        <summary>{isEn ? "Menu" : "菜单"}</summary>
        <nav>{labels.map((label, index) => <Link href={`/${lang}/${routes[index]}/`} key={routes[index]} onClick={() => setMobileMenuOpen(false)}>{label}</Link>)}</nav>
      </details>

      <section className={`inner-hero hero-${resolvedHeroSize}`}>
        {image ? <Image src={image} alt={title} fill priority sizes="100vw" /> : null}
        <div className="inner-hero-shade" />
        <div className="inner-hero-copy">
          <nav className="breadcrumb" aria-label="Breadcrumb"><ol><li><Link href={`/${lang}/`}>{t.brandName}</Link></li><li aria-current="page">{title}</li></ol></nav>
          <p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{summary}</p>
        </div>
      </section>

      <div className="inner-content">{children}</div>

      {links.length ? <section className="related-pages"><p className="eyebrow">{isEn ? "CONTINUE PLANNING" : "继续了解"}</p><div>{links.map((link) => <Link href={link.href} key={link.href}><small>{link.meta}</small><strong>{link.label}</strong><span aria-hidden="true">→</span></Link>)}</div></section> : null}

      <section className="inner-cta">
        <p className="eyebrow">RESERVATIONS</p><h2>{ctaTitle}</h2><p>{ctaText}</p>
        <Link className="button" href={`/${lang}/#booking`}>{t.bookCta}</Link>
      </section>

      <footer className="inner-footer"><div className="wordmark"><strong>礼宴巴国</strong><span>LIYAN BAGUO</span></div><p>{isEn ? "Immersive Ba-Yu dinner show in Chongqing" : "重庆沉浸式巴渝文化餐秀"}</p><div><Link href={`/${lang}/about/`}>{t.navAbout}</Link><Link href={`/${lang}/faq/`}>FAQ</Link></div></footer>
      <div className="inner-mobile-book">
        <a href="tel:+8617383017612" aria-label={isEn ? "Call us" : "拨打电话"}><Phone size={20} weight="fill" /></a>
        <CustomerServiceChooser compact isEnglish={isEn} />
        <Link className="book" href={`/${lang}/#booking`}>{t.bookCta}</Link>
      </div>
    </main>
  );
}

export function DetailFaq({ title, items, note }: { title: string; items: ReadonlyArray<readonly [string, string]>; note?: string }) {
  return <section className="inner-section inner-faq">{note ? <p className="visit-note">{note}</p> : null}<p className="eyebrow">FAQ</p><h2>{title}</h2><div>{items.map(([q, a]) => <details key={q}><summary>{q}<span aria-hidden="true">＋</span></summary><p>{a}</p></details>)}</div></section>;
}

export function FeatureRow({ title, text, image, reverse = false, kicker, caption }: { title: string; text: string; image: string; reverse?: boolean; kicker: string; caption?: string }) {
  return <article className={`inner-feature${reverse ? " reverse" : ""}`}><figure className="inner-feature-media"><Image src={image} alt={title} fill sizes="(max-width: 760px) 100vw, 50vw" />{caption ? <figcaption>{caption}</figcaption> : null}</figure><div className="inner-feature-copy"><p className="eyebrow">{kicker}</p><h2>{title}</h2><p>{text}</p></div></article>;
}
