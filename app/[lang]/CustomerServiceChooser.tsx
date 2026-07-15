import { customerServiceUrl, whatsappId, whatsappUrl } from "../customerService";

export function CustomerServiceChooser({ isEnglish = false, compact = false }: { isEnglish?: boolean; compact?: boolean }) {
  return (
    <details className={`customer-service-chooser${compact ? " compact" : ""}`}>
      <summary aria-label={isEnglish ? "Choose customer service" : "选择在线客服"}>
        {isEnglish ? "Service" : "在线客服"}
      </summary>
      <div className="customer-service-menu">
        <a href={whatsappUrl} target="_blank" rel="noreferrer">
          <span>WhatsApp</span>
          <small>{whatsappId}</small>
        </a>
        <a href={customerServiceUrl} target="_blank" rel="noreferrer">
          <span>WeChat Support</span>
          <small>{isEnglish ? "Customer service" : "在线客服"}</small>
        </a>
      </div>
    </details>
  );
}
