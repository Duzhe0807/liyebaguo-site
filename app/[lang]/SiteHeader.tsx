"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "@phosphor-icons/react";
import { languages, type Lang } from "../languages";
import { localizedPath, siteCopy, siteRoutes } from "../siteNavigation";
import { CustomerServiceChooser } from "./CustomerServiceChooser";
import { MobileNavigation } from "./MobileNavigation";

export function SiteHeader({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const router = useRouter();
  const t = siteCopy[lang];
  return <header className="site-header unified-header">
    <a className="skip-link" href="#main-content">{t.skip}</a>
    <Link className="wordmark" href={`/${lang}/`} aria-label={`Liyan Baguo · ${t.home}`}><strong>礼宴巴国</strong><span>LIYAN BAGUO</span></Link>
    <nav className="nav" aria-label={t.explore}>{siteRoutes.map((route, i) => <Link key={route} href={`/${lang}/${route}/`} aria-current={pathname.split("/")[2] === route ? "page" : undefined}>{t.nav[i]}</Link>)}</nav>
    <div className="header-actions">
      <label className="site-language"><Globe size={18} aria-hidden="true" /><select aria-label="Language" value={lang} onChange={event => router.push(localizedPath(pathname, event.target.value as Lang))}>{languages.map(code => <option key={code} value={code}>{({ zh:"简体中文", tw:"繁體中文", en:"English", ja:"日本語", ko:"한국어" })[code]}</option>)}</select></label>
      <CustomerServiceChooser booking lang={lang} className="button compact" />
      <MobileNavigation lang={lang} />
    </div>
  </header>;
}
