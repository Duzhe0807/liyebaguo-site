import Link from "next/link";
import type { Metadata } from "next";
import { languages, type Lang } from "../../languages";
import { siteSeo, getCanonicalPath, getHreflang } from "../../seo";
import { InnerPageShell, DetailFaq } from "../InnerPageShell";

export function generateStaticParams() { return languages.map((lang) => ({ lang })); }
export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> { const { lang } = await params; const seo = siteSeo[lang].showTimes; return { title: seo.title, description: seo.description, alternates: { canonical: getCanonicalPath(lang, "show-times-prices"), languages: getHreflang("show-times-prices") } }; }

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params; const en = lang === "en";
  const sessions = en ? [["Lunch", "11:20", "Garden visit"], ["Lunch", "12:05", "Welcome ritual"], ["Lunch", "12:30–14:10", "Banquet & show"], ["Dinner", "17:30", "Garden visit"], ["Dinner", "18:20", "Welcome ritual"], ["Dinner", "19:00–20:40", "Banquet & show"]] : [["午宴", "11:20", "午间游园"], ["午宴", "12:05", "午宴迎宾礼"], ["午宴", "12:30–14:10", "午宴餐秀"], ["晚宴", "17:30", "晚间游园"], ["晚宴", "18:20", "晚宴迎宾礼"], ["晚宴", "19:00–20:40", "晚宴餐秀"]];
  const tickets = en ? [
    { name: "Guest Seat", price: "¥238 / ¥316", zone: "Standard seating area", meal: true, costume: false, photo: false, audience: "First-time visitors" },
    { name: "VIP Seat", price: "¥296 / ¥458", zone: "Upgraded seating area", meal: true, costume: false, photo: false, audience: "Guests who value the view", recommended: true },
    { name: "SVIP Seat", price: "¥496 / ¥596", zone: "Premium seating area", meal: true, costume: true, photo: true, audience: "Costume and portrait keepsakes" },
  ] : [
    { name: "标准席", price: "¥238 / ¥316", zone: "标准席位区", meal: true, costume: false, photo: false, audience: "初次到访、重视完整餐秀体验" },
    { name: "贵宾席", price: "¥296 / ¥458", zone: "升级席位区", meal: true, costume: false, photo: false, audience: "更重视观演视角的宾客", recommended: true },
    { name: "尊享席", price: "¥496 / ¥596", zone: "尊享席位区", meal: true, costume: true, photo: true, audience: "希望体验华服并留下照片的宾客" },
  ];
  return <InnerPageShell lang={lang} eyebrow="SHOW TIMES & PRICES" title={en ? "Sessions, Seats & Prices" : "演出时间与票价"} summary={en ? "Compare lunch and dinner sessions, then choose the seating level that fits your visit." : "先看午宴与晚宴时间，再对比席位包含内容，快速完成选择。"} image="/audience-ritual.jpg">
    <section className="inner-section schedule-section"><p className="eyebrow">DAILY SCHEDULE</p><h2>{en ? "From arrival to the final scene" : "从入园到终幕的时间轴"}</h2><div className="schedule-grid">{sessions.map(([period, time, title]) => <article key={time + title}><small>{period}</small><time>{time}</time><strong>{title}</strong></article>)}</div></section>
    <section className="inner-section ticket-section"><p className="eyebrow">TICKETS</p><h2>{en ? "Compare what each seat includes" : "三种席位，清楚对比"}</h2><div className="ticket-grid">{tickets.map((ticket) => <article className={ticket.recommended ? "ticket-card recommended" : "ticket-card"} key={ticket.name}>{ticket.recommended ? <b>{en ? "Recommended" : "推荐"}</b> : null}<p className="ticket-zone">{ticket.zone}</p><h3>{ticket.name}</h3><span className="price">{ticket.price}</span><small>{en ? "Lunch / Dinner · per guest" : "午宴 / 晚宴 · 单人"}</small><ul><li className="yes">{en ? "Banquet meal included" : "包含宴席"}</li><li className={ticket.costume ? "yes" : "no"}>{ticket.costume ? (en ? "Costume styling included" : "包含华服妆造") : (en ? "Costume styling not included" : "不含华服妆造")}</li><li className={ticket.photo ? "yes" : "no"}>{ticket.photo ? (en ? "One retouched photograph" : "精修照片一张") : (en ? "Photography not included" : "不含摄影服务")}</li></ul><p className="ticket-audience"><span>{en ? "Best for" : "推荐人群"}</span>{ticket.audience}</p><Link className="button" href={`/${lang}/#booking`}>{en ? "Choose this seat" : "选择此席位"}</Link></article>)}</div></section>
    <section className="inner-section policy-panel"><p className="eyebrow">CANCELLATION</p><h2>{en ? "Cancellation and refund" : "取消与退款"}</h2><p>{en ? "Unused bookings may be cancelled at any time. The original booking channel will confirm processing and arrival time for the refund." : "未核销订单随时可退；退款渠道与到账时间以原预订渠道的实际处理结果为准。"}</p></section>
    <DetailFaq title={en ? "Ticket questions" : "票务常见问题"} items={en ? [["Are prices per person?", "Yes. Prices are listed per guest and show lunch / dinner."], ["What does SVIP include?", "The listed inclusions are costume styling and one retouched photograph in addition to the banquet show."], ["How do I confirm availability?", "Send a booking request with your date, session and party size."]] : [["票价是单人价格吗？", "是，价格依次为单人午宴 / 晚宴。"], ["尊享席包含什么？", "除餐秀外，页面所列包含华服妆造与精修照片一张。"], ["如何确认余位？", "提交日期、场次与人数后，由工作人员确认。"]]} />
  </InnerPageShell>;
}
