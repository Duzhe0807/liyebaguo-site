"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, ChatCircleDots, X } from "@phosphor-icons/react";
import { customerServiceUrl, whatsappId, whatsappUrl } from "../customerService";
import type { Lang } from "../languages";

const labels = {
  zh: { service: "在线客服", inquiry: "咨询档期", title: "联系客服确认档期", note: "官网不直接售票。请向客服提供日期、午宴或晚宴、人数，由客服确认余位、价格与席位安排。", close: "关闭", wechat: "企业微信客服" },
  tw: { service: "線上客服", inquiry: "諮詢檔期", title: "聯絡客服確認檔期", note: "官網不直接售票。請向客服提供日期、午宴或晚宴、人數，由客服確認餘位、價格與席位安排。", close: "關閉", wechat: "企業微信客服" },
  en: { service: "Contact us", inquiry: "Check availability", title: "Contact our booking team", note: "Tickets are not sold on this website. Share your date, lunch or dinner session and group size. Our team will confirm availability, prices and seating arrangements.", close: "Close", wechat: "WeChat support" },
  ja: { service: "お問い合わせ", inquiry: "空席を問い合わせ", title: "スタッフに空席を確認", note: "当サイトではチケットを販売していません。希望日、ランチまたはディナー、人数をお知らせください。スタッフが空席、料金、座席の手配をご案内します。", close: "閉じる", wechat: "WeChatサポート" },
  ko: { service: "고객센터", inquiry: "예약 가능 여부 문의", title: "고객센터에 일정 문의", note: "이 웹사이트에서는 티켓을 판매하지 않습니다. 희망 날짜, 점심 또는 저녁 회차, 인원을 알려주시면 담당자가 잔여 좌석, 가격과 좌석 배정을 안내합니다.", close: "닫기", wechat: "WeChat 고객센터" },
};

export function ServiceBookingNote({ lang }: { lang: Lang }) {
  return <p className="service-booking-note">{labels[lang].note}</p>;
}

export function CustomerServiceChooser({ lang = "zh", compact = false, booking = false, className = "" }: { lang?: Lang; compact?: boolean; booking?: boolean; className?: string }) {
  const t = labels[lang];
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    return () => {
      document.body.style.overflow = previous;
      trigger.current?.focus({ preventScroll: true });
    };
  }, [open]);
  const close = () => dialog.current?.close();
  return <>
    <button ref={trigger} type="button" className={`service-trigger ${compact ? "compact" : ""} ${className}`} aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}>
      {!booking && <ChatCircleDots size={20} aria-hidden="true" />}
      <span>{booking ? t.inquiry : t.service}</span>
    </button>
    {open && <dialog ref={dialog} className="service-dialog" aria-labelledby={id} aria-describedby={`${id}-note`} onClose={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className="service-dialog-content">
        <header><h2 id={id}>{t.title}</h2><button type="button" autoFocus onClick={close} aria-label={t.close}><X size={24} /></button></header>
        <p id={`${id}-note`}>{t.note}</p>
        <nav aria-label={t.service}>
          <a href={whatsappUrl}><span>WhatsApp<small>{whatsappId}</small></span><ArrowUpRight size={22} aria-hidden="true" /></a>
          <a href={customerServiceUrl}><span>{t.wechat}<small>WeChat</small></span><ArrowUpRight size={22} aria-hidden="true" /></a>
        </nav>
      </div>
    </dialog>}
  </>;
}
