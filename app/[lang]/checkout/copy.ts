import type { Lang } from "@/app/languages";

const en = {
  back: "Back to website", title: "Book Ba Kingdom Banquet", subtitle: "Choose your date, session and seats. Inventory is held for 15 minutes after the order is created.",
  date: "Visit date", session: "Session", tickets: "Tickets", contact: "Guest details", payment: "Payment",
  lunch: "Lunch", dinner: "Dinner", garden: "Garden", show: "Dinner show", remaining: "online tickets left",
  noShows: "No online sessions are published for this date. Please choose another date or contact the team.", loading: "Checking sessions...",
  name: "Guest name", email: "Email", phone: "Phone / WhatsApp", country: "Country / region", notes: "Dietary needs or notes",
  summary: "Order summary", total: "Total", empty: "Select at least one ticket.", create: "Continue to mock payment", creating: "Locking tickets...",
  notice: "Phase 1 acceptance mode: no real payment will be charged.", error: "We could not create the order. Please check availability and try again.",
};

export type CheckoutCopy = typeof en;

export const checkoutCopy: Record<Lang, CheckoutCopy> = {
  en,
  zh: {
    back: "返回官网", title: "预订礼宴巴国", subtitle: "选择日期、场次与席位。订单创建后，库存保留 15 分钟。",
    date: "到访日期", session: "选择场次", tickets: "选择票种", contact: "宾客信息", payment: "支付",
    lunch: "午宴", dinner: "晚宴", garden: "游园活动", show: "餐秀表演", remaining: "张线上余票",
    noShows: "该日期暂未发布线上场次，请选择其他日期或联系客服。", loading: "正在查询场次...",
    name: "宾客姓名", email: "邮箱", phone: "手机 / WhatsApp", country: "国家 / 地区", notes: "忌口、过敏或备注",
    summary: "订单明细", total: "合计", empty: "请至少选择 1 张票。", create: "继续模拟支付", creating: "正在锁定席位...",
    notice: "一期验收模式：不会产生真实扣款。", error: "订单创建失败，请确认余票后重试。",
  },
  tw: {
    back: "返回官網", title: "預訂禮宴巴國", subtitle: "選擇日期、場次與席位。訂單建立後，庫存保留 15 分鐘。",
    date: "到訪日期", session: "選擇場次", tickets: "選擇票種", contact: "賓客資料", payment: "付款",
    lunch: "午宴", dinner: "晚宴", garden: "遊園活動", show: "餐秀表演", remaining: "張線上餘票",
    noShows: "該日期暫未發布線上場次，請選擇其他日期或聯絡客服。", loading: "正在查詢場次...",
    name: "賓客姓名", email: "電郵", phone: "手機 / WhatsApp", country: "國家 / 地區", notes: "飲食需求或備註",
    summary: "訂單明細", total: "合計", empty: "請至少選擇 1 張票。", create: "繼續模擬付款", creating: "正在鎖定席位...",
    notice: "一期驗收模式：不會產生真實扣款。", error: "訂單建立失敗，請確認餘票後重試。",
  },
  ja: {
    back: "公式サイトへ戻る", title: "礼宴巴国を予約", subtitle: "日付、公演、座席を選択してください。注文作成後、在庫は15分間確保されます。",
    date: "来場日", session: "公演を選択", tickets: "チケット", contact: "お客様情報", payment: "支払い",
    lunch: "昼宴", dinner: "夜宴", garden: "庭園体験", show: "ディナーショー", remaining: "枚のオンライン残席",
    noShows: "この日はオンライン公演が公開されていません。別の日を選ぶか、お問い合わせください。", loading: "公演を確認中...",
    name: "お名前", email: "メール", phone: "電話 / WhatsApp", country: "国・地域", notes: "食事制限・備考",
    summary: "注文内容", total: "合計", empty: "チケットを1枚以上選択してください。", create: "テスト決済へ進む", creating: "座席を確保中...",
    notice: "フェーズ1検収モード：実際の請求は発生しません。", error: "注文を作成できませんでした。残席を確認して再試行してください。",
  },
  ko: {
    back: "공식 사이트로 돌아가기", title: "리옌바궈 예약", subtitle: "날짜, 회차, 좌석을 선택하세요. 주문 생성 후 15분 동안 재고가 보류됩니다.",
    date: "방문일", session: "회차 선택", tickets: "티켓", contact: "방문객 정보", payment: "결제",
    lunch: "오찬", dinner: "만찬", garden: "정원 체험", show: "디너쇼", remaining: "장 온라인 잔여",
    noShows: "이 날짜에는 공개된 온라인 회차가 없습니다. 다른 날짜를 선택하거나 문의해 주세요.", loading: "회차 확인 중...",
    name: "이름", email: "이메일", phone: "전화 / WhatsApp", country: "국가 / 지역", notes: "식이 요청 또는 메모",
    summary: "주문 요약", total: "합계", empty: "티켓을 1장 이상 선택하세요.", create: "테스트 결제로 계속", creating: "좌석 확보 중...",
    notice: "1단계 검수 모드: 실제 결제는 발생하지 않습니다.", error: "주문을 만들 수 없습니다. 잔여 좌석을 확인하고 다시 시도하세요.",
  },
};