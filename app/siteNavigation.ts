import type { Lang } from "./languages";
import { guideLinks } from "./guideLinks";

export const siteCopy = {
  zh: { nav: ["体验概览", "宴席美馔", "华服体验", "场次与价格", "地址与交通", "品牌故事"], home: "首页", help: "到访须知", explore: "探索礼宴", plan: "计划到访", lunch: "午宴", dinner: "晚宴", garden: "游园活动", show: "餐秀演出", time: "重庆当地时间 · UTC+8", planTitle: "先了解场次，再与客服确认", planText: "选择合适的时段，了解席位包含内容。具体日期、价格与座位安排由客服确认。", email: "通过邮件咨询", faq: "查看全部常见问题", previous: "上一组照片", next: "下一组照片", contact: "联系方式", skip: "跳到正文" },
  tw: { nav: ["體驗概覽", "宴席美饌", "華服體驗", "場次與價格", "地址與交通", "品牌故事"], home: "首頁", help: "到訪須知", explore: "探索禮宴", plan: "計劃到訪", lunch: "午宴", dinner: "晚宴", garden: "遊園活動", show: "餐秀演出", time: "重慶當地時間 · UTC+8", planTitle: "先了解場次，再與客服確認", planText: "選擇合適的時段，了解席位包含內容。日期、價格與座位安排由客服確認。", email: "透過郵件諮詢", faq: "查看全部常見問題", previous: "上一組照片", next: "下一組照片", contact: "聯絡方式", skip: "跳到正文" },
  en: { nav: ["Experience", "Dining", "Costumes", "Times & prices", "Getting here", "Our story"], home: "Home", help: "Before you visit", explore: "Explore Liyan Baguo", plan: "Plan your visit", lunch: "Lunch", dinner: "Dinner", garden: "Garden activities", show: "Banquet & show", time: "Chongqing local time · UTC+8", planTitle: "Find your time at the banquet", planText: "Explore the sessions and seating options, then contact our team to confirm your date, price and seating arrangements.", email: "Enquire by email", faq: "View all frequently asked questions", previous: "Previous photos", next: "Next photos", contact: "Contact", skip: "Skip to content" },
  ja: { nav: ["体験概要", "宴席料理", "衣装体験", "公演・料金", "アクセス", "ブランド紹介"], home: "ホーム", help: "来場前のご案内", explore: "礼宴を知る", plan: "来場を計画", lunch: "ランチ", dinner: "ディナー", garden: "庭園散策", show: "宴席・公演", time: "重慶現地時間 · UTC+8", planTitle: "公演を選んでスタッフに相談", planText: "時間と座席プランをご確認ください。日程、料金、座席の手配はスタッフがご案内します。", email: "メールで問い合わせ", faq: "よくある質問をすべて見る", previous: "前の写真", next: "次の写真", contact: "お問い合わせ", skip: "本文へスキップ" },
  ko: { nav: ["체험 소개", "연회 요리", "의상 체험", "공연·가격", "오시는 길", "브랜드 소개"], home: "홈", help: "방문 전 안내", explore: "연회 둘러보기", plan: "방문 계획", lunch: "점심", dinner: "저녁", garden: "정원 체험", show: "연회·공연", time: "충칭 현지 시간 · UTC+8", planTitle: "회차를 확인하고 문의하세요", planText: "회차와 좌석 구성을 살펴보세요. 날짜, 가격과 좌석 배정은 담당자가 확인해 드립니다.", email: "이메일로 문의", faq: "자주 묻는 질문 모두 보기", previous: "이전 사진", next: "다음 사진", contact: "연락처", skip: "본문으로 건너뛰기" },
};
export const siteRoutes = ["experience", "banquet-menu", "costume-experience", "show-times-prices", "location-booking", "about"];

export function localizedPath(pathname: string, lang: Lang) {
  const rest = pathname.split("/").filter(Boolean).slice(1).join("/");
  if (lang !== "en" && guideLinks.some(guide => guide.slug === rest)) return `/${lang}/experience/`;
  return `/${lang}/${rest ? rest + "/" : ""}`;
}
