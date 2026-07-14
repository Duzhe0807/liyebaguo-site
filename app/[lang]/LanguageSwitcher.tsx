"use client";

import { langNames, type Lang } from "../languages";

export function LanguageSwitcher({ currentLang }: { currentLang: Lang }) {
  const langs: Lang[] = ["zh", "tw", "en", "ja", "ko"];
  return (
    <div className="language-switcher" aria-label="Language selector">
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
  );
}
