"use client";

import type { Content } from "../content";

export function AccordionGroup({ t }: { t: Content }) {
  return (
    <div className="accordion">
      <button className="accordion-trigger" type="button">
        <span>{t.faqOneQ}</span>
        <i className="ri-add-line"></i>
      </button>
      <div className="accordion-panel">{t.faqOneA}</div>
      <button className="accordion-trigger" type="button">
        <span>{t.faqTwoQ}</span>
        <i className="ri-add-line"></i>
      </button>
      <div className="accordion-panel">{t.faqTwoA}</div>
      <button className="accordion-trigger" type="button">
        <span>{t.faqThreeQ}</span>
        <i className="ri-add-line"></i>
      </button>
      <div className="accordion-panel">{t.faqThreeA}</div>
    </div>
  );
}
