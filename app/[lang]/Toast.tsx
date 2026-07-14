"use client";

import type { Content } from "../content";

export function Toast({ t }: { t: Content }) {
  return (
    <div className="toast" role="status" aria-live="polite">
      {t.toastText}
    </div>
  );
}
