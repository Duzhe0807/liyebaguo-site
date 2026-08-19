"use client";

import { ArrowLeft, CalendarBlank, ChatCircleDots, CheckCircle, Clock, ShieldCheck, Ticket } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/app/languages";
import { customerServiceUrl, whatsappUrl } from "@/app/customerService";

type PublicOrder = {
  orderNo: string; status: string; paymentStatus: string; totalAmountCents: number; currency: string;
  expiresAt: string; customerName: string; show: { date: string; sessionType: "LUNCH" | "DINNER"; gardenStart: string; gardenEnd: string; showStart: string; showEnd: string; venue: string };
  items: Array<{ id: string; ticketNameSnapshot: string; quantity: number; subtotalCents: number }>;
  tickets: Array<{ id: string; ticketNo: string; ticketType: string; status: string }>;
};

const text = {
  zh: { back: "返回购票", title: "订单确认", unpaid: "席位已保留，请在倒计时结束前完成模拟支付。", paid: "支付已确认，电子票已生成。", expired: "订单已过期，锁定的席位已释放。", mock: "模拟支付", paying: "正在由服务器确认...", test: "验收模式，不会真实扣款", order: "订单号", session: "场次", total: "应付金额", tickets: "电子票", lunch: "午宴", dinner: "晚宴", qr: "显示核销码", missing: "当前浏览器没有订单访问凭证，请返回重新下单。" },
  en: { back: "Back to booking", title: "Order confirmation", unpaid: "Your tickets are held. Complete the mock payment before the timer expires.", paid: "Payment confirmed. Your e-tickets are ready.", expired: "This order expired and the held inventory was released.", mock: "Complete mock payment", paying: "Confirming on the server...", test: "Acceptance mode only. No real charge.", order: "Order number", session: "Session", total: "Total", tickets: "E-tickets", lunch: "Lunch", dinner: "Dinner", qr: "Show check-in QR", missing: "This browser does not have the secure order access token. Please start again." },
};

const seatCopy: Record<Lang, { title: string; body: string; wechat: string; whatsapp: string }> = {
  zh: { title: "下一步：联系客服确认座位号", body: "电子票已确认席位等级和数量，但具体座位号需人工安排。请将订单号发送给客服，客服会结合同行人数和现场余位确认座位。", wechat: "微信客服排座", whatsapp: "WhatsApp 排座" },
  tw: { title: "下一步：聯絡客服確認座位號", body: "電子票已確認席位等級和數量，但具體座位號需人工安排。請將訂單號傳送給客服確認座位。", wechat: "微信客服排座", whatsapp: "WhatsApp 排座" },
  en: { title: "Next: contact customer service to confirm your seat number", body: "Your e-ticket confirms the seating category and quantity. Send your order number to customer service so the team can arrange exact seats for your party.", wechat: "WeChat seat service", whatsapp: "WhatsApp seat service" },
  ja: { title: "次のステップ：座席番号をカスタマーサービスに確認", body: "電子チケットでは座席カテゴリーと枚数が確定しています。注文番号をカスタマーサービスへ送り、具体的な座席番号をご確認ください。", wechat: "WeChatで座席確認", whatsapp: "WhatsAppで座席確認" },
  ko: { title: "다음 단계: 고객센터에서 좌석 번호 확인", body: "전자 티켓은 좌석 등급과 수량을 확정합니다. 주문 번호를 고객센터에 보내 정확한 좌석 번호를 배정받으세요.", wechat: "WeChat 좌석 문의", whatsapp: "WhatsApp 좌석 문의" },
};

export function OrderStatusView({ lang, orderNo }: { lang: Lang; orderNo: string }) {
  const t = lang === "zh" || lang === "tw" ? text.zh : text.en;
  const seat = seatCopy[lang];
  const [order, setOrder] = useState<PublicOrder | null>(null);
  const [error, setError] = useState("");
  const [paying, setPaying] = useState(false);
  const [qr, setQr] = useState<Record<string, string>>({});
  const tokenRef = useRef<string | null>(null);

  async function load() {
    const token = tokenRef.current ?? sessionStorage.getItem(`order:${orderNo}`);
    tokenRef.current = token;
    if (!token) { setError(t.missing); return; }
    const response = await fetch(`/api/orders/${orderNo}`, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
    if (!response.ok) { setError(t.missing); return; }
    const body = await response.json(); setOrder(body.order);
  }
  useEffect(() => { void load(); }, [orderNo]);

  async function pay() {
    if (!tokenRef.current) return;
    setPaying(true); setError("");
    const response = await fetch(`/api/orders/${orderNo}/mock-pay`, {
      method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${tokenRef.current}` },
      body: JSON.stringify({ idempotencyKey: crypto.randomUUID() + crypto.randomUUID() }),
    });
    if (!response.ok) setError("Payment confirmation failed.");
    else await load();
    setPaying(false);
  }

  async function showQr(ticketId: string) {
    if (!tokenRef.current || qr[ticketId]) return;
    const response = await fetch("/api/tickets/qr", {
      method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${tokenRef.current}` },
      body: JSON.stringify({ orderNo, ticketId }),
    });
    if (response.ok) {
      const blob = await response.blob();
      setQr((current) => ({ ...current, [ticketId]: URL.createObjectURL(blob) }));
    }
  }

  return <main className="order-page">
    <header><Link href={`/${lang}/checkout`}><ArrowLeft />{t.back}</Link><strong>礼宴巴国</strong><span><ShieldCheck />Official booking</span></header>
    <section className="order-panel">
      <p className="order-eyebrow">ORDER STATUS</p><h1>{t.title}</h1>
      {error ? <p className="checkout-error">{error}</p> : !order ? <p className="checkout-muted">Loading...</p> : <>
        <div className={`order-state ${order.status.toLowerCase()}`}>{order.status === "PAID" ? <CheckCircle weight="fill" /> : <Clock />}<div><strong>{order.status}</strong><span>{order.status === "PAID" ? t.paid : order.status === "EXPIRED" ? t.expired : t.unpaid}</span></div></div>
        <dl className="order-facts"><div><dt>{t.order}</dt><dd>{order.orderNo}</dd></div><div><dt>{t.session}</dt><dd><CalendarBlank />{String(order.show.date).slice(0,10)} · {order.show.sessionType === "LUNCH" ? t.lunch : t.dinner}<small>{order.show.gardenStart}–{order.show.gardenEnd} / {order.show.showStart}–{order.show.showEnd}</small></dd></div><div><dt>{t.total}</dt><dd className="order-amount">¥{(order.totalAmountCents/100).toFixed(0)}</dd></div></dl>
        <div className="order-items">{order.items.map((item) => <div key={item.id}><span>{item.ticketNameSnapshot} × {item.quantity}</span><strong>¥{(item.subtotalCents/100).toFixed(0)}</strong></div>)}</div>
        {order.status === "PENDING_PAYMENT" ? <div className="mock-payment"><button onClick={pay} disabled={paying}>{paying ? t.paying : t.mock}</button><small><ShieldCheck />{t.test}</small></div> : null}
        {order.status === "PAID" ? <section className="seat-confirmation"><div><ChatCircleDots /><div><h2>{seat.title}</h2><p>{seat.body}</p></div></div><div className="seat-support-actions"><a href={customerServiceUrl} target="_blank" rel="noreferrer">{seat.wechat}</a><a className="secondary" href={whatsappUrl} target="_blank" rel="noreferrer">{seat.whatsapp}</a></div></section> : null}
        {order.tickets.length ? <section className="issued-tickets"><h2>{t.tickets}</h2>{order.tickets.map((ticket) => <article key={ticket.id}><div><Ticket /><span><strong>{ticket.ticketType}</strong><small>{ticket.ticketNo} · {ticket.status}</small></span></div>{qr[ticket.id] ? <img src={qr[ticket.id]} alt={`QR ${ticket.ticketNo}`} /> : <button onClick={() => showQr(ticket.id)}>{t.qr}</button>}</article>)}</section> : null}
      </>}
    </section>
  </main>;
}
