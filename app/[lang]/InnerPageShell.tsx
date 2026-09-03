"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import type { Lang } from "../languages";
import { langCodes } from "../languages";
import { content } from "../content";
import { HtmlLang } from "./HtmlLang";
import { Phone } from "@phosphor-icons/react";
import { CustomerServiceChooser } from "./CustomerServiceChooser";

const routes = ["experience", "banquet-menu", "costume-experience", "show-times-prices", "location-booking", "about"];

type RelatedLink = { href: string; label: string; meta: string };

const shellCopy: Record<Lang, {
  tickets: string; showTimes: string; chooseSession: string; bookNow: string; planVisit: string;
  locationBooking: string; directions: string; sendRequest: string; compare: string; menu: string;
  navAria: string; continuePlanning: string; footer: string; call: string;
  cta: Record<string, [string, string]>;
}> = {
  zh: { tickets: "场次票价", showTimes: "场次与票价", chooseSession: "选择场次", bookNow: "立即预订", planVisit: "安排行程", locationBooking: "地址与预订", directions: "导航与联系", sendRequest: "提交预约", compare: "对比票种", menu: "菜单", navAria: "主导航", continuePlanning: "继续了解", footer: "重庆沉浸式巴渝文化餐秀", call: "拨打电话", cta: { experience: ["进入完整的巴国礼宴之夜", "选择场次，让宴席、演出与礼仪在同一段旅程中展开。"], banquet: ["预订一席巴渝风味宴", "在席间品尝地方风味，也让演出围绕餐桌发生。"], costume: ["为重庆之行留下一组华服影像", "提前确认服装套餐、妆造时间与拍摄需求。"], tickets: ["选择场次与席位", "对比午宴、晚宴和席位包含内容，再提交预订。"], location: ["出发前确认路线", "打开常用地图、保存地址，并完成预约。"], about: ["到宴席现场感受这段故事", "看巴渝灵感如何成为一晚的味道、音乐、华服与待客之礼。"], faq: ["准备安排行程？", "查看票价和路线，再提交希望到访的日期。"] } },
  tw: { tickets: "場次票價", showTimes: "場次與票價", chooseSession: "選擇場次", bookNow: "立即預訂", planVisit: "安排行程", locationBooking: "地址與預訂", directions: "導航與聯絡", sendRequest: "提交預約", compare: "比較票種", menu: "選單", navAria: "主導覽", continuePlanning: "繼續了解", footer: "重慶沉浸式巴渝文化餐秀", call: "撥打電話", cta: { experience: ["進入完整的巴國禮宴之夜", "選擇場次，讓宴席、演出與禮儀在同一段旅程中展開。"], banquet: ["預訂一席巴渝風味宴", "在席間品嚐地方風味，也讓演出圍繞餐桌發生。"], costume: ["為重慶之行留下一組華服影像", "提前確認服裝套餐、妝造時間與拍攝需求。"], tickets: ["選擇場次與席位", "比較午宴、晚宴和席位包含內容，再提交預訂。"], location: ["出發前確認路線", "開啟常用地圖、儲存地址並完成預約。"], about: ["到宴席現場感受這段故事", "看巴渝靈感如何成為一晚的味道、音樂、華服與待客之禮。"], faq: ["準備安排行程？", "查看票價和路線，再提交希望到訪的日期。"] } },
  en: { tickets: "Tickets", showTimes: "Show Times & Prices", chooseSession: "Choose a session", bookNow: "Book Now", planVisit: "Plan your visit", locationBooking: "Location & Booking", directions: "Get directions", sendRequest: "Send a request", compare: "Compare options", menu: "Menu", navAria: "Main navigation", continuePlanning: "CONTINUE PLANNING", footer: "Immersive Ba-Yu dinner show in Chongqing", call: "Call us", cta: { experience: ["Step into the complete Ba Kingdom evening", "Choose a session and experience the banquet, performance and ritual as one journey."], banquet: ["Reserve a seat at the Ba-Yu banquet", "Pair regional flavours with a live performance unfolding around your table."], costume: ["Dress for your Chongqing keepsake", "Confirm a costume package, styling time and photography needs before arrival."], tickets: ["Choose your session and seating", "Compare lunch and dinner times, then send your preferred seat request."], location: ["Confirm the route before you set out", "Open your preferred map, save the address and complete your booking request."], about: ["Experience the story around the table", "See how Ba-Yu inspiration becomes an evening of flavour, music, costume and hospitality."], faq: ["Ready to plan your visit?", "Review tickets and directions, then send the team your preferred date."] } },
  ja: { tickets: "公演・料金", showTimes: "公演時間・料金", chooseSession: "公演を選ぶ", bookNow: "今すぐ予約", planVisit: "来場を計画", locationBooking: "アクセス・予約", directions: "アクセスを見る", sendRequest: "予約を送信", compare: "チケットを比較", menu: "メニュー", navAria: "メインナビゲーション", continuePlanning: "次のご案内", footer: "重慶の没入型巴渝文化ディナーショー", call: "電話する", cta: { experience: ["巴国礼宴の世界へ", "公演を選び、宴席・演芸・儀礼を一つの旅としてお楽しみください。"], banquet: ["巴渝の宴席を予約", "地方の味とテーブルを囲むライブ公演をお楽しみください。"], costume: ["重慶の旅に華服の思い出を", "衣装プラン、着付け時間、撮影のご希望を事前にご確認ください。"], tickets: ["公演と座席を選ぶ", "ランチ・ディナーの時間と内容を比較してご予約ください。"], location: ["出発前にアクセスを確認", "地図で住所を保存してからご来場ください。"], about: ["食卓を囲む物語を体験", "巴渝の文化が料理、音楽、衣装、おもてなしへ変わる一夜をご覧ください。"], faq: ["ご来場の準備はできましたか？", "料金とアクセスを確認し、ご希望の日付をお知らせください。"] } },
  ko: { tickets: "공연·요금", showTimes: "공연 시간·요금", chooseSession: "회차 선택", bookNow: "지금 예약", planVisit: "방문 계획", locationBooking: "위치·예약", directions: "길찾기", sendRequest: "예약 신청", compare: "티켓 비교", menu: "메뉴", navAria: "주요 메뉴", continuePlanning: "계속 둘러보기", footer: "충칭 몰입형 파위 문화 디너쇼", call: "전화하기", cta: { experience: ["바 왕국 연회의 밤으로", "회차를 선택하고 연회, 공연과 의식을 하나의 여정으로 경험해 보세요."], banquet: ["파위 연회 좌석 예약", "지역의 맛과 테이블 주변에서 펼쳐지는 라이브 공연을 함께 즐겨보세요."], costume: ["충칭 여행에 전통 의상 추억을", "의상 패키지, 스타일링 시간과 촬영 요청을 미리 확인하세요."], tickets: ["회차와 좌석 선택", "점심·저녁 시간과 좌석 포함 사항을 비교한 뒤 예약하세요."], location: ["출발 전 경로 확인", "사용하는 지도에서 주소를 저장하고 예약을 완료하세요."], about: ["식탁에서 펼쳐지는 이야기", "파위의 영감이 음식, 음악, 의상과 환대로 이어지는 밤을 만나보세요."], faq: ["방문을 준비하셨나요?", "요금과 경로를 확인하고 원하는 날짜를 보내주세요."] } },
};

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
  const ui = shellCopy[lang];
  const theme = themeFromEyebrow(eyebrow);
  const resolvedPageType = pageType ?? (theme === "faq" ? "faq" : theme === "tickets" || theme === "location" ? "utility" : "content");
  const resolvedHeroSize = heroSize ?? (theme === "experience" ? "experience" : theme === "about" ? "about" : resolvedPageType === "faq" ? "faq" : resolvedPageType === "utility" ? "utility" : "content");
  const labels = [t.navExperience, t.navBanquet, t.navCostume, ui.tickets, t.navVisit, t.navAbout];
  const defaultContentLinks: RelatedLink[] = [
    { href: `/${lang}/show-times-prices/`, label: ui.showTimes, meta: ui.chooseSession },
    { href: `/${lang}/location-booking/`, label: ui.bookNow, meta: ui.planVisit },
  ];
  const defaultUtilityLinks: RelatedLink[] = theme === "tickets" ? [
    { href: `/${lang}/location-booking/`, label: ui.locationBooking, meta: ui.directions },
    { href: `/${lang}/#booking`, label: ui.bookNow, meta: ui.sendRequest },
  ] : [
    { href: `/${lang}/show-times-prices/`, label: ui.tickets, meta: ui.compare },
    { href: `/${lang}/#booking`, label: ui.bookNow, meta: ui.sendRequest },
  ];
  const links = relatedLinks ?? (resolvedPageType === "content" ? defaultContentLinks : resolvedPageType === "utility" ? defaultUtilityLinks : []);
  const [ctaTitle, ctaText] = ui.cta[theme];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const switchLangHref = (l: string) => {
    const parts = pathname.split("/").filter(Boolean);
    const rest = parts.slice(1).join("/");
    return rest ? `/${l}/${rest}/` : `/${l}/`;
  };
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
        <nav className="nav inner-nav" aria-label={ui.navAria}>
          {labels.map((label, index) => <Link href={`/${lang}/${routes[index]}/`} key={routes[index]}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <nav className="language-switcher" aria-label="Language">
            <Link className={lang === "zh" ? "active" : ""} href={switchLangHref("zh")}>简</Link>
            <Link className={lang === "tw" ? "active" : ""} href={switchLangHref("tw")}>繁</Link>
            <Link className={lang === "en" ? "active" : ""} href={switchLangHref("en")}>EN</Link>
            <Link className={lang === "ja" ? "active" : ""} href={switchLangHref("ja")}>日</Link>
            <Link className={lang === "ko" ? "active" : ""} href={switchLangHref("ko")}>KR</Link>
          </nav>
          <Link className="button compact" href={`/${lang}/#booking`}>{t.bookCta}</Link>
        </div>
      </header>

      <details className="inner-mobile-nav" open={mobileMenuOpen} onToggle={(e) => setMobileMenuOpen((e.currentTarget as HTMLDetailsElement).open)}>
        <summary>{ui.menu}</summary>
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

      {links.length ? <section className="related-pages"><p className="eyebrow">{ui.continuePlanning}</p><div>{links.map((link) => <Link href={link.href} key={link.href}><small>{link.meta}</small><strong>{link.label}</strong><span aria-hidden="true">→</span></Link>)}</div></section> : null}

      <section className="inner-cta">
        <p className="eyebrow">RESERVATIONS</p><h2>{ctaTitle}</h2><p>{ctaText}</p>
        <Link className="button" href={`/${lang}/#booking`}>{t.bookCta}</Link>
      </section>

      <footer className="inner-footer"><div className="wordmark"><strong>{t.brandName}</strong><span>LIYAN BAGUO</span></div><p>{ui.footer}</p><div><Link href={`/${lang}/about/`}>{t.navAbout}</Link><Link href={`/${lang}/faq/`}>FAQ</Link></div></footer>
      <div className="inner-mobile-book">
        <a href="tel:+8617383017612" aria-label={ui.call}><Phone size={20} weight="fill" /></a>
        <CustomerServiceChooser compact lang={lang} />
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
