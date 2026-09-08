"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Lang } from "../languages";

export function PageContents({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const [links, setLinks] = useState<{ id: string; label: string }[]>([]);
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".inner-content section"));
    const items = sections.flatMap((section, index) => {
      const heading = section.querySelector(":scope > h2");
      if (!heading?.textContent) return [];
      if (!section.id) section.id = `page-section-${index}`;
      return [{ id: section.id, label: heading.textContent }];
    });
    setLinks(items);
  }, [pathname]);
  if (links.length < 3) return null;
  const label = {zh:"本页内容",tw:"本頁內容",en:"On this page",ja:"このページの内容",ko:"페이지 목차"}[lang];
  return <nav className="page-contents" aria-label={label}>{links.map(link=><a key={link.id} href={`#${link.id}`}>{link.label}</a>)}</nav>;
}
