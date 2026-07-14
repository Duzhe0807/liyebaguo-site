"use client";

import { langNames, type Lang } from "../languages";
import type { Content } from "../content";

export function MobileMenu({ currentLang, t }: { currentLang: Lang; t: Content }) {
  const langs: Lang[] = ["zh", "tw", "en", "ja", "ko"];
  return (
    <aside className="mobile-menu" aria-hidden="true">
      <div className="mobile-langs" aria-label="Mobile language selector">
        {langs.map((l) => (
          <a
            key={l}
            href={`/${l}/`}
            className={`lang-btn ${l === currentLang ? "active" : ""}`}
          >
            {langNames[l]}
          </a>
        ))}
      </div>
      <a href="#experience">{t.navExperience}</a>
      <a href="#banquet">{t.navBanquet}</a>
      <a href="#costume">{t.navCostume}</a>
      <a href="#visit">{t.navVisit}</a>
      <a href="#about">{t.navAbout}</a>
    </aside>
  );
}
