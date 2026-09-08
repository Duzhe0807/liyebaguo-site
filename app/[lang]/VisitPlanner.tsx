import Link from "next/link";
import type { Lang } from "../languages";
import { business } from "../business";
import { siteCopy } from "../siteNavigation";
import { CustomerServiceChooser } from "./CustomerServiceChooser";

export function VisitPlanner({ lang }: { lang: Lang }) {
  const t = siteCopy[lang];
  return <section className="visit-planner" id="plan-visit">
    <div className="planner-intro"><p className="eyebrow">{t.plan}</p><h2>{t.planTitle}</h2><p>{t.planText}</p><small>{t.time}</small></div>
    <div className="planner-sessions">{business.sessions.map((session,i)=><article key={session.name}><h3>{i === 0 ? t.lunch : t.dinner}</h3><dl><div><dt>{t.garden}</dt><dd>{session.garden}</dd></div><div><dt>{t.show}</dt><dd>{session.start}–{session.end}</dd></div></dl></article>)}</div>
    <div className="planner-actions"><Link href={`/${lang}/show-times-prices/`}>{t.nav[3]} <span aria-hidden="true">→</span></Link><Link href={`/${lang}/location-booking/`}>{t.nav[4]} <span aria-hidden="true">→</span></Link><CustomerServiceChooser booking lang={lang} className="button" /></div>
  </section>;
}
