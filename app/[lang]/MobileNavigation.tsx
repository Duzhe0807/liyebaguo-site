"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Globe, List, X } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import { content } from "../content";
import { languages, type Lang } from "../languages";
import { guideLinks } from "../guideLinks";

const copy = {
  zh: { menu: "菜单", close: "关闭菜单", home: "首页", plan: "计划到访", explore: "探索礼宴", times: "场次与票价", language: "语言" },
  tw: { menu: "選單", close: "關閉選單", home: "首頁", plan: "計劃到訪", explore: "探索禮宴", times: "場次與票價", language: "語言" },
  en: { menu: "Menu", close: "Close menu", home: "Home", plan: "Plan your visit", explore: "Explore the banquet", times: "Show times & prices", language: "Language" },
  ja: { menu: "メニュー", close: "メニューを閉じる", home: "ホーム", plan: "来場のご案内", explore: "礼宴を知る", times: "公演時間・料金", language: "言語" },
  ko: { menu: "메뉴", close: "메뉴 닫기", home: "홈", plan: "방문 안내", explore: "연회 둘러보기", times: "공연 시간·요금", language: "언어" },
};
const languageNames = { zh: "简体中文", tw: "繁體中文", en: "English", ja: "日本語", ko: "한국어" };

export function MobileNavigation({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const c = content[lang];
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const close = () => dialog.current?.close();
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 981px)");
    const onResize = () => { if (desktop.matches) dialog.current?.close(); };
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = previous;
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);
  const languageHref = (next: Lang) => {
    const rest = pathname.split("/").filter(Boolean).slice(1).join("/");
    if (next !== "en" && guideLinks.some(guide => guide.slug === rest)) return `/${next}/experience/`;
    return rest ? `/${next}/${rest}/` : `/${next}/`;
  };
  const groups = [
    { title: t.plan, items: [["show-times-prices", t.times], ["location-booking", c.navVisit], ["faq", "FAQ"]] },
    { title: t.explore, items: [["experience", c.navExperience], ["banquet-menu", c.navBanquet], ["costume-experience", c.navCostume], ["about", c.navAbout]] },
  ];
  return <div className="mobile-navigation">
    <button className="mobile-menu-trigger" type="button" aria-haspopup="dialog" aria-expanded={open} aria-controls="mobile-site-menu" onClick={() => { dialog.current?.showModal(); setOpen(true); }}>
      <List size={23} aria-hidden="true" /><span>{t.menu}</span>
    </button>
    <dialog ref={dialog} id="mobile-site-menu" className="mobile-menu-dialog" aria-label={t.menu} onClose={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className="mobile-menu-content">
        <div className="mobile-menu-heading">
          <Link href={`/${lang}/`} onClick={close}>LIYAN BAGUO</Link>
          <button type="button" autoFocus aria-label={t.close} onClick={close}><X size={24} /></button>
        </div>
        <nav aria-label={t.menu}>
          <Link className="mobile-menu-home" href={`/${lang}/`} aria-current={pathname.replace(/\/$/, "") === `/${lang}` ? "page" : undefined} onClick={close}>{t.home}<ArrowRight size={18} aria-hidden="true" /></Link>
          {groups.map(group => <section className="mobile-menu-group" key={group.title}>
            <h2>{group.title}</h2>
            {group.items.map(([route, label]) => <Link key={route} href={`/${lang}/${route}/`} aria-current={pathname.split("/").filter(Boolean)[1] === route ? "page" : undefined} onClick={close}>{label}<ArrowRight size={18} aria-hidden="true" /></Link>)}
          </section>)}
        </nav>
        <section className="mobile-menu-languages">
          <h2><Globe size={18} aria-hidden="true" />{t.language}</h2>
          <nav aria-label={t.language}>{languages.map(next => <Link key={next} href={languageHref(next)} hrefLang={next === "tw" ? "zh-TW" : next} aria-current={next === lang ? "true" : undefined} onClick={close}>{languageNames[next]}</Link>)}</nav>
        </section>
      </div>
    </dialog>
  </div>;
}
