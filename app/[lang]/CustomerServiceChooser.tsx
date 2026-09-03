import { customerServiceUrl, whatsappId, whatsappUrl } from "../customerService";
import type { Lang } from "../languages";

const labels: Record<Lang, { choose: string; service: string; online: string }> = {
  zh: { choose: "选择在线客服", service: "在线客服", online: "在线客服" },
  tw: { choose: "選擇線上客服", service: "線上客服", online: "線上客服" },
  en: { choose: "Choose customer service", service: "Service", online: "Customer service" },
  ja: { choose: "カスタマーサービスを選択", service: "サポート", online: "カスタマーサービス" },
  ko: { choose: "고객센터 선택", service: "고객센터", online: "온라인 고객센터" },
};

export function CustomerServiceChooser({ lang = "zh", compact = false }: { lang?: Lang; compact?: boolean }) {
  const t = labels[lang];
  return (
    <details className={`customer-service-chooser${compact ? " compact" : ""}`}>
      <summary aria-label={t.choose}>
        {t.service}
      </summary>
      <div className="customer-service-menu">
        <a href={whatsappUrl} target="_blank" rel="noreferrer">
          <span>WhatsApp</span>
          <small>{whatsappId}</small>
        </a>
        <a href={customerServiceUrl} target="_blank" rel="noreferrer">
          <span>WeChat Support</span>
          <small>{t.online}</small>
        </a>
      </div>
    </details>
  );
}
