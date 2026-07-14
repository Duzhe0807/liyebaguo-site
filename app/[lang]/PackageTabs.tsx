"use client";

import type { Content } from "../content";

export function PackageTabs({ t }: { t: Content }) {
  return (
    <>
      <div className="package-tabs" role="tablist">
        <button className="tab active" type="button" data-package="visitor">{t.packageVisitor}</button>
        <button className="tab" type="button" data-package="vip">{t.packageVip}</button>
        <button className="tab" type="button" data-package="group">{t.packageGroup}</button>
      </div>
      <div
        className="package-copy"
        aria-live="polite"
        data-visitor-title={t.packageVisitorTitle}
        data-visitor-copy={t.packageVisitorCopy}
        data-vip-title={t.packageVipTitle}
        data-vip-copy={t.packageVipCopy}
        data-group-title={t.packageGroupTitle}
        data-group-copy={t.packageGroupCopy}
      >
        <h3>{t.packageVisitorTitle}</h3>
        <p>{t.packageVisitorCopy}</p>
      </div>
    </>
  );
}
