import Link from "next/link";
import { CheckIcon, XIcon, StarIcon } from "./TicketIcons";
import type { Metadata } from "next";
import { languages, type Lang } from "../../languages";
import { pageMetadata } from "../../seo";
import { InnerPageShell, DetailFaq } from "../InnerPageShell";

export function generateStaticParams() { return languages.map((lang) => ({ lang })); }
export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata(lang, "showTimes");
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const copy = {
    zh: { lunch: ["午间游园", "午宴迎宾礼", "午宴餐秀"], dinner: ["晚间游园", "晚宴迎宾礼", "晚宴餐秀"], labels: { lunch: "午宴", dinner: "晚宴", priceNote: "午宴 / 晚宴 · 单人", bestFor: "推荐人群", choose: "选择此席位", meal: "包含宴席", costume: "古装服饰", headwear: "古装头饰" }, title: "演出时间与票价", summary: "先看午宴与晚宴时间，再对比席位包含内容，快速完成选择。", schedule: "从入园到终幕的时间轴", compare: "三种席位，清楚对比", recommended: "推荐", cancellation: "取消与退款", policy: "未核销订单随时可退；退款渠道与到账时间以原预订渠道的实际处理结果为准。", faqTitle: "票务常见问题", faq: [["票价是单人价格吗？", "是，价格依次为单人午宴 / 晚宴。"], ["SVIP 席位包含什么？", "除餐秀外，SVIP 席位赠送古装服饰和古装头饰。"], ["如何确认余位？", "提交日期、场次与人数后，由工作人员确认。"]] },
    tw: { lunch: ["午間遊園", "午宴迎賓禮", "午宴餐秀"], dinner: ["晚間遊園", "晚宴迎賓禮", "晚宴餐秀"], labels: { lunch: "午宴", dinner: "晚宴", priceNote: "午宴 / 晚宴 · 單人", bestFor: "推薦人群", choose: "選擇此席位", meal: "包含宴席", costume: "古裝服飾", headwear: "古裝頭飾" }, title: "演出時間與票價", summary: "先看午宴與晚宴時間，再比較席位包含內容。", schedule: "從入園到終幕的時間軸", compare: "三種席位，清楚比較", recommended: "推薦", cancellation: "取消與退款", policy: "未核銷訂單可申請退款；退款渠道與到帳時間以原預訂渠道為準。", faqTitle: "票務常見問題", faq: [["票價是單人價格嗎？", "是，價格依次為單人午宴／晚宴。"], ["SVIP 包含什麼？", "除餐秀外，包含古裝服飾和古裝頭飾。"], ["如何確認餘位？", "提交日期、場次與人數後由工作人員確認。"]] },
    en: { lunch: ["Garden visit", "Welcome ritual", "Banquet & show"], dinner: ["Garden visit", "Welcome ritual", "Banquet & show"], labels: { lunch: "Lunch", dinner: "Dinner", priceNote: "Lunch / Dinner · per guest", bestFor: "Best for", choose: "Choose this seat", meal: "Banquet meal", costume: "Traditional costume", headwear: "Traditional headwear" }, title: "Liyan Baguo Tickets, Sessions & Prices", summary: "Compare lunch and dinner show tickets for the Banquet of Ba Kingdom in Chongqing. Prices are in Chinese yuan (CNY) per guest. Choose Guest, VIP or SVIP, confirm availability with the official team and contact customer service after purchase to arrange your seat number.", schedule: "From arrival to the final scene", compare: "Compare what each seat includes", recommended: "Recommended", cancellation: "Cancellation and refund", policy: "Confirm cancellation and rescheduling terms with your booking channel before payment. Refund eligibility depends on seat assignment and timing; contact customer service about your specific order.", faqTitle: "Ticket questions", faq: [["Are prices per person?", "Yes. Prices are listed per guest and show lunch / dinner."], ["What does SVIP include?", "In addition to the banquet show, SVIP includes traditional costume and traditional headwear."], ["How do I confirm availability?", "Send a booking request with your date, session and party size."]] },
    ja: { lunch: ["庭園散策", "出迎えの儀", "ランチ宴席・公演"], dinner: ["庭園散策", "出迎えの儀", "ディナー宴席・公演"], labels: { lunch: "ランチ", dinner: "ディナー", priceNote: "ランチ / ディナー · 1名", bestFor: "おすすめ", choose: "この席を選ぶ", meal: "宴席料理", costume: "伝統衣装", headwear: "伝統髪飾り" }, title: "公演時間・座席・料金", summary: "ランチとディナーの時間を確認し、ご希望に合う座席をお選びください。", schedule: "入園から終演まで", compare: "3種類の座席を比較", recommended: "おすすめ", cancellation: "キャンセル・返金", policy: "未使用の予約はキャンセルできます。返金方法と時期は予約経路よりご案内します。", faqTitle: "チケットのよくある質問", faq: [["料金は1名分ですか？", "はい。ランチ／ディナーの1名料金です。"], ["SVIPには何が含まれますか？", "宴席と公演に加え、伝統衣装と髪飾りが含まれます。"], ["空席の確認方法は？", "希望日、公演、人数を送信してください。"]] },
    ko: { lunch: ["전통 정원 산책", "점심 환영 의식", "점심 연회·공연"], dinner: ["전통 정원 산책", "저녁 환영 의식", "저녁 연회·공연"], labels: { lunch: "점심", dinner: "저녁", priceNote: "점심 / 저녁 · 1인", bestFor: "추천 대상", choose: "이 좌석 선택", meal: "연회 식사", costume: "전통 의상", headwear: "전통 머리 장식" }, title: "공연 시간·좌석·요금", summary: "점심과 저녁 회차를 비교하고 방문 목적에 맞는 좌석을 선택하세요.", schedule: "입장부터 마지막 장면까지", compare: "세 가지 좌석 비교", recommended: "추천", cancellation: "취소·환불", policy: "사용하지 않은 예약은 취소할 수 있습니다. 환불 방법과 시기는 예약 채널에서 안내합니다.", faqTitle: "티켓 자주 묻는 질문", faq: [["가격은 1인 기준인가요?", "네. 점심／저녁 1인 기준 가격입니다."], ["SVIP에는 무엇이 포함되나요?", "연회 공연 외에 전통 의상과 머리 장식이 포함됩니다."], ["잔여 좌석은 어떻게 확인하나요?", "희망 날짜, 회차와 인원을 보내주세요."]] },
  } as const;
  const t = copy[lang];
  const lunch = t.lunch;
  const dinner = t.dinner;
  const lunchTimes = ["11:20", "12:05", "12:30–14:10"];
  const dinnerTimes = ["17:30", "18:20", "19:00–20:40"];
  const tickets = lang === "en" ? [
    { name: "Guest Seat", price: "¥238 / ¥316", zone: "Standard seating area", meal: true, costume: false, headwear: false, audience: "First-time visitors" },
    { name: "VIP Seat", price: "¥296 / ¥458", zone: "Upgraded seating area", meal: true, costume: false, headwear: false, audience: "Guests who value the view" },
    { name: "SVIP Seat", price: "¥496 / ¥596", zone: "Premium seating area", meal: true, costume: true, headwear: true, audience: "Guests who want a complete traditional costume look", recommended: true },
  ] : lang === "ja" ? [
    { name: "ゲスト席", price: "¥238 / ¥316", zone: "スタンダード席", meal: true, costume: false, headwear: false, audience: "初めてご来場の方" },
    { name: "VIP席", price: "¥296 / ¥458", zone: "アップグレード席", meal: true, costume: false, headwear: false, audience: "観覧位置を重視する方" },
    { name: "SVIP席", price: "¥496 / ¥596", zone: "プレミアム席", meal: true, costume: true, headwear: true, audience: "伝統衣装を含む完全な体験をご希望の方", recommended: true },
  ] : lang === "ko" ? [
    { name: "일반석", price: "¥238 / ¥316", zone: "일반 좌석 구역", meal: true, costume: false, headwear: false, audience: "처음 방문하는 여행객" },
    { name: "VIP석", price: "¥296 / ¥458", zone: "업그레이드 좌석 구역", meal: true, costume: false, headwear: false, audience: "더 좋은 관람 위치를 원하는 고객" },
    { name: "SVIP석", price: "¥496 / ¥596", zone: "프리미엄 좌석 구역", meal: true, costume: true, headwear: true, audience: "전통 의상까지 포함한 전체 체험을 원하는 고객", recommended: true },
  ] : [
    { name: "标准席", price: "¥238 / ¥316", zone: "标准席位区", meal: true, costume: false, headwear: false, audience: "初次到访、重视完整餐秀体验" },
    { name: "贵宾席", price: "¥296 / ¥458", zone: "升级席位区", meal: true, costume: false, headwear: false, audience: "更重视观演视角的宾客" },
    { name: "SVIP 席位", price: "¥496 / ¥596", zone: "SVIP 席位区", meal: true, costume: true, headwear: true, audience: "希望体验完整古装造型的宾客", recommended: true },
  ];
  const labels = t.labels;

  return <InnerPageShell lang={lang} eyebrow="SHOW TIMES & PRICES" title={t.title} summary={t.summary} image="/audience-ritual.jpg">
    <section className="inner-section schedule-section">
      <p className="eyebrow">DAILY SCHEDULE</p>
      <h2>{t.schedule}</h2>
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
      <h2>{t.compare}</h2>
      <div className="ticket-grid">
        {tickets.map((ticket) => (
          <article className={ticket.recommended ? "ticket-card recommended" : "ticket-card"} key={ticket.name}>
            {ticket.recommended ? <b className="recommended-badge"><StarIcon /> {t.recommended}</b> : null}
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

    <section className="inner-section policy-panel"><p className="eyebrow">CANCELLATION</p><h2>{t.cancellation}</h2><p>{t.policy}</p></section>
    <DetailFaq title={t.faqTitle} items={t.faq} />
  </InnerPageShell>;
}
