import type { Lang } from "@/app/languages";

type PolicyItem = {
  label: string;
  title: string;
  description: string;
};

type BookingPolicyCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  items: [PolicyItem, PolicyItem, PolicyItem];
  forceMajeureTitle: string;
  forceMajeure: string;
  consent: string;
  faqQuestion: string;
  faqAnswer: string;
};

export const bookingPolicyCopy: Record<Lang, BookingPolicyCopy> = {
  zh: {
    eyebrow: "BOOKING POLICY",
    title: "退票与活动取消规则",
    intro: "为保障备餐、演出与现场接待安排，请在购票前阅读以下规则。",
    items: [
      { label: "未确认座位号", title: "随时可申请退款", description: "尚未由客服确认具体座位号的订单，可随时申请退款。" },
      { label: "已确认座位号", title: "提前 24 小时以上免费退", description: "已确认座位号的订单，在活动开始前 24 小时以上申请退款，不收取退票费用。" },
      { label: "活动开始前 24 小时内", title: "固定扣除人民币 100 元", description: "因已产生备餐及现场准备成本，退款时将扣除固定人民币 100 元费用。" },
    ],
    forceMajeureTitle: "不可抗力说明",
    forceMajeure: "如因不可抗力导致活动无法正常进行，活动供应方有权取消活动，并将尽可能及时通知已购票宾客。",
    consent: "提交订单即表示您已阅读并知悉退票与活动取消规则。",
    faqQuestion: "退票与活动取消规则是什么？",
    faqAnswer: "未确认座位号的订单可随时申请退款；已确认座位号的订单，在活动开始前 24 小时以上申请退款不收取退票费用，24 小时内退款将固定扣除人民币 100 元。如因不可抗力无法正常进行，活动供应方有权取消活动。",
  },
  tw: {
    eyebrow: "BOOKING POLICY",
    title: "退票與活動取消規則",
    intro: "為保障備餐、演出與現場接待安排，請在購票前閱讀以下規則。",
    items: [
      { label: "未確認座位號", title: "可隨時申請退款", description: "尚未由客服確認具體座位號的訂單，可隨時申請退款。" },
      { label: "已確認座位號", title: "提前 24 小時以上免費退", description: "已確認座位號的訂單，在活動開始前 24 小時以上申請退款，不收取退票費用。" },
      { label: "活動開始前 24 小時內", title: "固定扣除人民幣 100 元", description: "因已產生備餐及現場準備成本，退款時將扣除固定人民幣 100 元費用。" },
    ],
    forceMajeureTitle: "不可抗力說明",
    forceMajeure: "如因不可抗力導致活動無法正常進行，活動供應方有權取消活動，並將盡可能及時通知已購票賓客。",
    consent: "提交訂單即表示您已閱讀並知悉退票與活動取消規則。",
    faqQuestion: "退票與活動取消規則是什麼？",
    faqAnswer: "未確認座位號的訂單可隨時申請退款；已確認座位號的訂單，在活動開始前 24 小時以上申請退款不收取退票費用，24 小時內退款將固定扣除人民幣 100 元。如因不可抗力無法正常進行，活動供應方有權取消活動。",
  },
  en: {
    eyebrow: "BOOKING POLICY",
    title: "Refund and event cancellation policy",
    intro: "Please review these terms before booking so we can prepare dining, performance and guest services responsibly.",
    items: [
      { label: "Seat number not confirmed", title: "Refund requests accepted anytime", description: "An order may be refunded at any time before customer service confirms a specific seat number." },
      { label: "Seat number confirmed", title: "No fee more than 24 hours ahead", description: "No cancellation fee applies when a refund is requested more than 24 hours before the activity starts." },
      { label: "Within 24 hours of the activity", title: "Fixed RMB 100 fee", description: "A fixed RMB 100 fee will be deducted because meal preparation and on-site arrangements have already begun." },
    ],
    forceMajeureTitle: "Force majeure",
    forceMajeure: "If the activity cannot proceed because of force majeure, the activity provider reserves the right to cancel it and will notify booked guests as soon as reasonably possible.",
    consent: "By submitting your order, you acknowledge that you have read this refund and cancellation policy.",
    faqQuestion: "What is the refund and event cancellation policy?",
    faqAnswer: "Orders without a confirmed seat number may be refunded at any time. After a seat number is confirmed, refunds requested more than 24 hours before the activity carry no fee; requests within 24 hours incur a fixed RMB 100 fee. The provider may cancel the activity in the event of force majeure.",
  },
  ja: {
    eyebrow: "BOOKING POLICY",
    title: "払い戻し・催行中止規定",
    intro: "お食事、演出、会場準備のため、ご購入前に以下の規定をご確認ください。",
    items: [
      { label: "座席番号の確定前", title: "いつでも払い戻し申請可能", description: "カスタマーサービスが具体的な座席番号を確定する前は、いつでも払い戻しを申請できます。" },
      { label: "座席番号の確定後", title: "開始 24 時間前までは手数料なし", description: "活動開始の 24 時間より前に払い戻しを申請する場合、取消手数料はかかりません。" },
      { label: "活動開始 24 時間以内", title: "一律 100 人民元を差し引き", description: "料理および会場準備が始まっているため、払い戻し時に一律 100 人民元を差し引きます。" },
    ],
    forceMajeureTitle: "不可抗力について",
    forceMajeure: "不可抗力により活動を実施できない場合、主催者は活動を中止する権利を有し、予約済みのお客様へ可能な限り速やかにご連絡します。",
    consent: "注文を送信すると、払い戻し・催行中止規定を確認し同意したものとみなされます。",
    faqQuestion: "払い戻し・催行中止規定を教えてください。",
    faqAnswer: "座席番号の確定前はいつでも払い戻しを申請できます。確定後は、活動開始の 24 時間より前であれば手数料はかかりません。24 時間以内は一律 100 人民元を差し引きます。不可抗力の場合、主催者は活動を中止することがあります。",
  },
  ko: {
    eyebrow: "BOOKING POLICY",
    title: "환불 및 행사 취소 규정",
    intro: "식사, 공연 및 현장 준비를 위해 구매 전에 아래 규정을 확인해 주세요.",
    items: [
      { label: "좌석 번호 확정 전", title: "언제든 환불 신청 가능", description: "고객센터에서 구체적인 좌석 번호를 확정하기 전에는 언제든 환불을 신청할 수 있습니다." },
      { label: "좌석 번호 확정 후", title: "24시간 이전 수수료 없음", description: "행사 시작 24시간 이전에 환불을 신청하면 취소 수수료가 부과되지 않습니다." },
      { label: "행사 시작 24시간 이내", title: "고정 RMB 100 공제", description: "식사와 현장 준비가 이미 시작되므로 환불 시 고정 RMB 100이 공제됩니다." },
    ],
    forceMajeureTitle: "불가항력 안내",
    forceMajeure: "불가항력으로 행사를 정상 진행할 수 없는 경우, 행사 제공자는 행사를 취소할 권리가 있으며 예약 고객에게 가능한 한 신속하게 안내합니다.",
    consent: "주문을 제출하면 환불 및 행사 취소 규정을 읽고 확인한 것으로 간주됩니다.",
    faqQuestion: "환불 및 행사 취소 규정은 어떻게 되나요?",
    faqAnswer: "좌석 번호 확정 전에는 언제든 환불을 신청할 수 있습니다. 확정 후에는 행사 시작 24시간 이전까지 수수료가 없으며, 24시간 이내에는 고정 RMB 100이 공제됩니다. 불가항력의 경우 행사 제공자가 행사를 취소할 수 있습니다.",
  },
};
