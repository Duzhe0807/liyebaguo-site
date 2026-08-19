"use client";

import { ArrowLeft, CalendarBlank, ChatCircleDots, Check, CheckCircle, Clock, Minus, Plus, ShieldCheck } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Lang } from "@/app/languages";
import { checkoutCopy } from "./copy";

type TicketPrice = {
  ticketTypeId: string; code: string; names: Record<Lang, string>; description: { zh: string; en: string };
  priceCents: number; currency: string; includesCostume: boolean; featured: boolean;
};
type Show = {
  id: string; sessionType: "LUNCH" | "DINNER"; gardenStart: string; gardenEnd: string;
  showStart: string; showEnd: string; remaining: number; prices: TicketPrice[];
};

function tomorrow(): string {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10);
}

export function CheckoutFlow({ lang }: { lang: Lang }) {
  const t = checkoutCopy[lang];
  const router = useRouter();
  const [date, setDate] = useState(tomorrow);
  const [shows, setShows] = useState<Show[]>([]);
  const [showId, setShowId] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const selectedShow = shows.find((show) => show.id === showId);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError(""); setShowId(""); setQuantities({});
    fetch(`/api/shows?date=${date}`, { signal: controller.signal, cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("availability")))
      .then((data: { shows: Show[] }) => { setShows(data.shows); setShowId(data.shows[0]?.id ?? ""); })
      .catch((cause) => { if (cause.name !== "AbortError") setError(t.error); })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [date, t.error]);

  const selectedItems = useMemo(() => selectedShow?.prices
    .map((ticket) => ({ ...ticket, quantity: quantities[ticket.ticketTypeId] ?? 0 }))
    .filter((ticket) => ticket.quantity > 0) ?? [], [selectedShow, quantities]);
  const total = selectedItems.reduce((sum, ticket) => sum + ticket.priceCents * ticket.quantity, 0);
  const count = selectedItems.reduce((sum, ticket) => sum + ticket.quantity, 0);

  const adjust = (ticketTypeId: string, delta: number) => {
    setQuantities((current) => {
      if (delta > 0 && count >= Math.min(20, selectedShow?.remaining ?? 20)) return current;
      const next = Math.max(0, Math.min(20, (current[ticketTypeId] ?? 0) + delta));
      return { ...current, [ticketTypeId]: next };
    });
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedShow || count < 1 || count > selectedShow.remaining) { setError(t.empty); return; }
    setSubmitting(true); setError("");
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/orders", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          showId: selectedShow.id,
          items: selectedItems.map((ticket) => ({ ticketTypeId: ticket.ticketTypeId, quantity: ticket.quantity })),
          customer: {
            name: data.get("name"), email: data.get("email"), phone: data.get("phone"), country: data.get("country") || undefined,
            locale: lang, dietaryNotes: data.get("notes") || undefined,
          },
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "order");
      sessionStorage.setItem(`order:${result.orderNo}`, result.accessToken);
      router.push(`/${lang}/order/${result.orderNo}`);
    } catch {
      setError(t.error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="checkout-shell">
      <header className="checkout-header">
        <Link href={`/${lang}/`}><ArrowLeft />{t.back}</Link>
        <div><strong>礼宴巴国</strong><span>LIYAN BAGUO</span></div>
        <span className="secure-label"><ShieldCheck />Secure checkout</span>
      </header>
      <div className="checkout-intro"><p>OFFICIAL BOOKING</p><h1>{t.title}</h1><span>{t.subtitle}</span><ol className="checkout-process" aria-label="Booking process"><li><b>1</b><span>{t.processDate}</span></li><li><b>2</b><span>{t.processTickets}</span></li><li><b>3</b><span>{t.processDetails}</span></li><li><b>4</b><span>{t.processSeat}</span></li></ol></div>
      <section className="checkout-seat-notice"><ChatCircleDots /><div><strong>{t.seatNoticeTitle}</strong><p>{t.seatNotice}</p></div></section>
      <form className="checkout-layout" onSubmit={submit}>
        <div className="checkout-main">
          <section className="checkout-step">
            <div className="step-title"><span>01</span><div><small>{t.date}</small><h2>{t.session}</h2></div></div>
            <label className="checkout-date"><CalendarBlank /><input type="date" value={date} min={new Date().toISOString().slice(0, 10)} onChange={(event) => setDate(event.target.value)} /></label>
            {loading ? <p className="checkout-muted">{t.loading}</p> : shows.length === 0 ? <p className="checkout-empty">{t.noShows}</p> : (
              <div className="session-options">
                {shows.map((show) => <button key={show.id} type="button" aria-pressed={showId === show.id} className={showId === show.id ? "active" : ""} onClick={() => { setShowId(show.id); setQuantities({}); }}>
                  <CheckCircle className="session-check" weight="fill" />
                  <span>{show.sessionType === "LUNCH" ? t.lunch : t.dinner}</span>
                  <strong><Clock />{show.showStart}–{show.showEnd}</strong>
                  <small>{t.garden} {show.gardenStart}–{show.gardenEnd}</small>
                  <em>{show.remaining} {t.remaining}</em>
                </button>)}
              </div>
            )}
          </section>
          <section className="checkout-step">
            <div className="step-title"><span>02</span><div><small>{t.tickets}</small><h2>{t.tickets}</h2></div></div>
            <p className="seat-category-note"><ChatCircleDots />{t.seatNoticeTitle}</p>
            <div className="ticket-options">
              {selectedShow?.prices.map((ticket) => <article key={ticket.ticketTypeId} className={ticket.featured ? "featured" : ""}>
                <div><small>{ticket.code}</small><h3>{ticket.names[lang]}</h3><p>{lang === "zh" || lang === "tw" ? ticket.description.zh : ticket.description.en}</p>{ticket.includesCostume ? <em><Check />Costume included</em> : null}</div>
                <div className="ticket-buy"><strong>¥{(ticket.priceCents / 100).toFixed(0)}</strong><div className="quantity"><button type="button" aria-label="Decrease" disabled={(quantities[ticket.ticketTypeId] ?? 0) === 0} onClick={() => adjust(ticket.ticketTypeId, -1)}><Minus /></button><span>{quantities[ticket.ticketTypeId] ?? 0}</span><button type="button" aria-label="Increase" disabled={count >= Math.min(20, selectedShow.remaining)} onClick={() => adjust(ticket.ticketTypeId, 1)}><Plus /></button></div></div>
              </article>)}
            </div>
          </section>
          <section className="checkout-step">
            <div className="step-title"><span>03</span><div><small>{t.contact}</small><h2>{t.contact}</h2></div></div>
            <div className="checkout-fields">
              <label><span>{t.name}</span><input name="name" required maxLength={80} autoComplete="name" /></label>
              <label><span>{t.email}</span><input name="email" type="email" required maxLength={160} autoComplete="email" /></label>
              <label><span>{t.phone}</span><input name="phone" required maxLength={40} autoComplete="tel" /></label>
              <label><span>{t.country}</span><input name="country" maxLength={80} autoComplete="country-name" /></label>
              <label className="wide"><span>{t.notes}</span><textarea name="notes" maxLength={500} /></label>
            </div>
          </section>
        </div>
        <aside className="order-summary">
          <p>04 · {t.payment}</p><h2>{t.summary}</h2>
          {selectedItems.length ? selectedItems.map((item) => <div className="summary-line" key={item.ticketTypeId}><span>{item.names[lang]} × {item.quantity}</span><strong>¥{(item.priceCents * item.quantity / 100).toFixed(0)}</strong></div>) : <p className="checkout-muted">{t.empty}</p>}
          {selectedShow ? <div className="summary-session"><CalendarBlank /><span>{date}<small>{selectedShow.sessionType === "LUNCH" ? t.lunch : t.dinner} · {selectedShow.showStart}–{selectedShow.showEnd}</small></span></div> : null}
          <div className="summary-seat-note"><ChatCircleDots /><span><strong>{t.seatNoticeTitle}</strong><small>{t.seatNotice}</small></span></div>
          <div className="summary-total"><span>{t.total}</span><strong>¥{(total / 100).toFixed(0)}</strong></div>
          <button className="checkout-submit" disabled={submitting || count < 1 || !selectedShow}>{submitting ? t.creating : t.create}</button>
          <small className="mock-notice"><ShieldCheck />{t.notice}</small>
          {error ? <p className="checkout-error" role="alert">{error}</p> : null}
        </aside>
        <div className="checkout-mobile-bar"><span>{t.total}<strong>¥{(total / 100).toFixed(0)}</strong></span><button disabled={submitting || count < 1 || !selectedShow}>{submitting ? t.creating : t.create}</button></div>
      </form>
    </main>
  );
}
