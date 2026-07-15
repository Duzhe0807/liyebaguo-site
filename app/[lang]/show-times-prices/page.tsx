import Link from "next/link";
import { CheckIcon, XIcon, StarIcon } from "./TicketIcons";
import type { Metadata } from "next";
import { languages, type Lang } from "../../languages";
import { siteSeo, getCanonicalPath, getHreflang } from "../../seo";
import { InnerPageShell, DetailFaq } from "../InnerPageShell";

export function generateStaticParams() { return languages.map((lang) => ({ lang })); }
export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> { const { lang } = await params; const seo = siteSeo[lang].showTimes; return { title: seo.title, description: seo.description, alternates: { canonical: getCanonicalPath(lang, "show-times-prices"), languages: getHreflang("show-times-prices") } }; }

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params; const en = lang === "en";
  const lunch = en ? ["Garden visit", "Welcome ritual", "Banquet & show"] : ["午间游园", "午宴迎宾礼", "午宴餐秀"];
  const dinner = en ? ["Garden visit", "Welcome ritual", "Banquet & show"] : ["晚间游园", "晚宴迎宾礼", "晚宴餐秀"];
  const lunchTimes = ["11:20", "12:05", "12:30–14:10"];
  const dinnerTimes = ["17:30", "18:20", "19:00–20:40"];
  const tickets = en ? [
    { name: "Guest Seat", price: "¥238 / ¥316", zone: "Standard seating area", meal: true, costume: false, headwear: false, audience: "First-time visitors" },
    { name: "VIP Seat", price: "¥296 / ¥458", zone: "Upgraded seating area", meal: true, costume: false, headwear: false, audience: "Guests who value the view" },
    { name: "SVIP Seat", price: "¥496 / ¥596", zone: "Premium seating area", meal: true, costume: true, headwear: true, audience: "Guests who want a complete traditional costume look", recommended: true },
  ] : [
    { name: "标准席", price: "¥238 / ¥316", zone: "标准席位区", meal: true, costume: false, headwear: false, audience: "初次到访、重视完整餐秀体验" },
    { name: "贵宾席", price: "¥296 / ¥458", zone: "升级席位区", meal: true, costume: false, headwear: false, audience: "更重视观演视角的宾客" },
    { name: "SVIP 席位", price: "¥496 / ¥596", zone: "SVIP 席位区", meal: true, costume: true, headwear: true, audience: "希望体验完整古装造型的宾客", recommended: true },
  ];
  const labels = en ? { lunch: "Lunch", dinner: "Dinner", priceNote: "Lunch / Dinner · per guest", bestFor: "Best for", choose: "Choose this seat", meal: "Banquet meal", costume: "Traditional costume", headwear: "Traditional headwear" }
    : { lunch: "午宴", dinner: "晚宴", priceNote: "午宴 / 晚宴 · 单人", bestFor: "推荐人群", choose: "选择此席位", meal: "包含宴席", costume: "古装服饰", headwear: "古装头饰" };

  return <InnerPageShell lang={lang} eyebrow="SHOW TIMES & PRICES" title={en ? "Sessions, Seats & Prices" : "演出时间与票价"} summary={en ? "Compare lunch and dinner sessions, then choose the seating level that fits your visit." : "先看午宴与晚宴时间，再对比席位包含内容，快速完成选择。"} image="/audience-ritual.jpg">
    <section className="inner-section schedule-section">
      <p className="eyebrow">DAILY SCHEDULE</p>
      <h2>{en ? "From arrival to the final scene" : "从入园到终幕的时间轴"}</h2>
      <div className="schedule-timeline">
        {[ { label: labels.lunch, times: lunchTimes, steps: lunch }, { label: labels.dinner, times: dinnerTimes, steps: dinner } ].map((session) => (
          <div className="timeline-row" key={session.label}>
            <span className="timeline-label">{session.label}</span>
            <div className="timeline-track">
              {session.steps.map((step, index) => (
                <article key={step + index}>
                  <time>{session.times[index]}</time>
                  <strong>{step}</strong>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="inner-section ticket-section">
      <p className="eyebrow">TICKETS</p>
      <h2>{en ? "Compare what each seat includes" : "三种席位，清楚对比"}</h2>
      <div className="ticket-grid">
        {tickets.map((ticket) => (
          <article className={ticket.recommended ? "ticket-card recommended" : "ticket-card"} key={ticket.name}>
            {ticket.recommended ? <b className="recommended-badge"><StarIcon /> {en ? "Recommended" : "推荐"}</b> : null}
            <p className="ticket-zone">{ticket.zone}</p>
            <h3>{ticket.name}</h3>
            <span className="price">{ticket.price}</span>
            <small>{labels.priceNote}</small>
            <ul className="feature-list">
              <li className={ticket.meal ? "yes" : "no"}><span>{ticket.meal ? <CheckIcon /> : <XIcon />}</span>{labels.meal}</li>
              <li className={ticket.costume ? "yes" : "no"}><span>{ticket.costume ? <CheckIcon /> : <XIcon />}</span>{labels.costume}</li>
              <li className={ticket.headwear ? "yes" : "no"}><span>{ticket.headwear ? <CheckIcon /> : <XIcon />}</span>{labels.headwear}</li>
            </ul>
            <p className="ticket-audience"><span>{labels.bestFor}</span>{ticket.audience}</p>
            <Link className="button" href={`/${lang}/#booking`}>{labels.choose}</Link>
          </article>
        ))}
      </div>
    </section>

    <section className="inner-section policy-panel"><p className="eyebrow">CANCELLATION</p><h2>{en ? "Cancellation and refund" : "取消与退款"}</h2><p>{en ? "Unused bookings may be cancelled at any time. The original booking channel will confirm processing and arrival time for the refund." : "未核销订单随时可退；退款渠道与到账时间以原预订渠道的实际处理结果为准。"}</p></section>
    <DetailFaq title={en ? "Ticket questions" : "票务常见问题"} items={en ? [["Are prices per person?", "Yes. Prices are listed per guest and show lunch / dinner."], ["What does SVIP include?", "In addition to the banquet show, SVIP includes traditional costume and traditional headwear."], ["How do I confirm availability?", "Send a booking request with your date, session and party size."]] : [["票价是单人价格吗？", "是，价格依次为单人午宴 / 晚宴。"], ["SVIP 席位包含什么？", "除餐秀外，SVIP 席位赠送古装服饰和古装头饰。"], ["如何确认余位？", "提交日期、场次与人数后，由工作人员确认。"]]} />
  </InnerPageShell>;
}
