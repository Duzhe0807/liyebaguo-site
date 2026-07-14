"use client";

import type { Content } from "../content";

export function BookingForm({ t }: { t: Content }) {
  return (
    <form className="booking-form">
      <label>
        <span>{t.dateLabel}</span>
        <input type="date" defaultValue="2026-07-18" />
      </label>
      <label>
        <span>{t.guestLabel}</span>
        <select>
          <option>{t.guestTwo}</option>
          <option>{t.guestFour}</option>
          <option>{t.guestGroup}</option>
        </select>
      </label>
      <label>
        <span>{t.languageLabel}</span>
        <select>
          <option>{t.seatStandard}</option>
          <option>{t.seatVip}</option>
          <option>{t.seatGroup}</option>
        </select>
      </label>
      <button type="submit" className="button primary">{t.requestCta}</button>
    </form>
  );
}
