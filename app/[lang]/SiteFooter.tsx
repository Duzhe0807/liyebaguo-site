import Link from "next/link";
import type { Lang } from "../languages";
import { siteCopy, siteRoutes } from "../siteNavigation";
import { business } from "../business";
import { customerServiceUrl, whatsappUrl } from "../customerService";

export function SiteFooter({ lang }: { lang: Lang }) {
  const t = siteCopy[lang];
  return <footer className="site-footer">
    <div className="footer-identity"><Link href={`/${lang}/`} className="wordmark"><strong>礼宴巴国</strong><span>LIYAN BAGUO</span></Link><p>Chongqing · Banquet of Ba Kingdom</p></div>
    <nav aria-label={t.explore}><h2>{t.explore}</h2>{[0,1,2,5].map(i=><Link key={i} href={`/${lang}/${siteRoutes[i]}/`}>{t.nav[i]}</Link>)}</nav>
    <nav aria-label={t.plan}><h2>{t.plan}</h2>{[3,4].map(i=><Link key={i} href={`/${lang}/${siteRoutes[i]}/`}>{t.nav[i]}</Link>)}<Link href={`/${lang}/faq/`}>{t.help}</Link></nav>
    <nav aria-label={t.contact}><h2>{t.contact}</h2><a href={whatsappUrl}>WhatsApp</a><a href={customerServiceUrl}>WeChat</a><a href={`tel:${business.phone.replaceAll(" ", "")}`}>{business.phone}</a><a href={`mailto:${business.email}`}>Email</a></nav>
  </footer>;
}
