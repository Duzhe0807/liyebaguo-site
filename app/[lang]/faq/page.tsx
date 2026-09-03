import type { Metadata } from "next";
import { languages, type Lang } from "../../languages";
import { siteSeo, getCanonicalPath, getHreflang } from "../../seo";
import { InnerPageShell } from "../InnerPageShell";

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  const seo = siteSeo[lang].faq;
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: getCanonicalPath(lang, "faq"), languages: getHreflang("faq") },
  };
}

type Group = { name: string; items: Array<[string, string]> };

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const groupsByLang: Record<Lang, Group[]> = {
    en: [
      { name: "Booking", items: [["How do I reserve?", "Choose WhatsApp or WeChat Support on the reservation section and wait for schedule confirmation before making travel plans."], ["Can groups enquire?", "Yes. Contact online support with your preferred date, party size and event needs."]] },
      { name: "Tickets", items: [["What does each ticket include?", "Inclusions vary by ticket type. Check the Tickets page before booking."], ["Are prices shown per guest?", "Yes. The listed figures show lunch / dinner prices per guest."]] },
      { name: "Food", items: [["Can dietary needs be accommodated?", "Submit allergies and restrictions before payment so the venue can confirm what is possible."]] },
      { name: "Costume", items: [["Is costume styling included?", "Only selected ticket types include costume styling. Confirm the inclusion on the Tickets page."]] },
      { name: "Transportation", items: [["Where is the venue?", "Baguocheng, Jiulongpo District, Chongqing."], ["How should I plan public transport?", "Use the live route to Baguocheng in your preferred map app and follow its current station and exit guidance."]] },
      { name: "Children & Accessibility", items: [["Are children welcome?", "Add the child's age and dining needs to the booking request so the team can confirm the suitable ticket."], ["Is the venue accessible?", "The venue information states wheelchair access is supported. Contact the team before arrival if assistance is needed."]] },
      { name: "Cancellation", items: [["Can I cancel a booking?", "Unused bookings may be cancelled. The original booking channel will confirm refund processing and timing."]] },
    ],
    zh: [
      { name: "预订", items: [["如何预订？", "填写预订表单，收到场次确认后再安排行程。"], ["团队可以咨询吗？", "可以，请在团队表单填写日期、人数和活动需求。"]] },
      { name: "票务", items: [["不同票种包含什么？", "每种票的包含项目不同，请先查看“场次与票价”页面。"], ["票价是单人价格吗？", "是，页面所列数字依次为单人午宴 / 晚宴价格。"]] },
      { name: "餐饮", items: [["可以处理饮食限制吗？", "请在付款前提交过敏和忌口信息，由场地方确认能否安排。"]] },
      { name: "华服", items: [["票价包含华服妆造吗？", "仅部分票种可能包含华服或妆造，请以“场次与票价”页面的最终说明为准。"]] },
      { name: "交通", items: [["场地在哪里？", "中国重庆市九龙坡区巴国城。"], ["怎样规划公共交通？", "请在常用地图中实时规划至“巴国城”，车站与出口以出发当天导航为准。"]] },
      { name: "儿童与无障碍", items: [["儿童可以参加吗？", "请在预约中说明儿童年龄与用餐需求，由工作人员确认适合的票种。"], ["场地是否提供无障碍通行？", "场地信息显示支持轮椅通行，如需协助请在到场前联系。"]] },
      { name: "取消与退款", items: [["可以取消订单吗？", "未核销订单可以取消；退款渠道与到账时间以原预订渠道实际处理为准。"]] },
    ],
    tw: [
      { name: "預訂", items: [["如何預訂？", "填寫預訂表單，收到場次確認後再安排行程。"], ["團隊可以諮詢嗎？", "可以，請提供日期、人數和活動需求。"]] },
      { name: "票務", items: [["不同票種包含什麼？", "每種票的包含項目不同，請先查看「場次與票價」頁面。"], ["票價是單人價格嗎？", "是，所列數字為單人午宴／晚宴價格。"]] },
      { name: "餐飲", items: [["可以處理飲食限制嗎？", "請在付款前提供過敏與忌口資料，由場地方確認。"]] },
      { name: "華服", items: [["票價包含華服妝造嗎？", "僅指定票種包含，請以票務頁說明為準。"]] },
      { name: "交通", items: [["場地在哪裡？", "中國重慶市九龍坡區巴國城。"], ["如何規劃公共交通？", "請使用常用地圖即時導航至巴國城。"]] },
      { name: "兒童與無障礙", items: [["兒童可以參加嗎？", "請在預訂時註明年齡和用餐需求。"], ["提供無障礙通行嗎？", "支援輪椅通行，如需協助請提前聯絡。"]] },
      { name: "取消與退款", items: [["可以取消訂單嗎？", "未核銷訂單可以取消，退款時間以原預訂渠道為準。"]] },
    ],
    ja: [
      { name: "予約", items: [["予約方法は？", "予約欄からWhatsAppまたはWeChatを選び、日程の確認後に旅程を確定してください。"], ["団体でも問い合わせできますか？", "はい。希望日、人数、催事内容をお知らせください。"]] },
      { name: "チケット", items: [["各チケットには何が含まれますか？", "内容は券種により異なります。公演・料金ページをご確認ください。"], ["料金は1名分ですか？", "はい。ランチ／ディナーの1名料金です。"]] },
      { name: "お食事", items: [["食事制限に対応できますか？", "お支払い前にアレルギーや制限をお知らせください。会場が対応可否を確認します。"]] },
      { name: "衣装", items: [["衣装体験は含まれますか？", "指定の券種のみ含まれます。チケットページでご確認ください。"]] },
      { name: "アクセス", items: [["会場はどこですか？", "中国・重慶市九龍坡区の巴国城です。"], ["公共交通機関の調べ方は？", "ご利用の地図アプリで巴国城までの最新経路をご確認ください。"]] },
      { name: "お子様・バリアフリー", items: [["子どもも参加できますか？", "予約時に年齢と食事のご希望をお知らせください。"], ["車椅子で利用できますか？", "車椅子での通行に対応しています。介助が必要な場合は事前にご連絡ください。"]] },
      { name: "キャンセル", items: [["予約をキャンセルできますか？", "未使用の予約はキャンセルできます。返金方法と時期は予約経路により異なります。"]] },
    ],
    ko: [
      { name: "예약", items: [["어떻게 예약하나요?", "예약 영역에서 WhatsApp 또는 WeChat 고객센터를 선택하고 회차 확인 후 여행 일정을 확정해 주세요."], ["단체 문의도 가능한가요?", "네. 희망 날짜, 인원과 행사 요청을 보내주세요."]] },
      { name: "티켓", items: [["티켓별 포함 사항은 무엇인가요?", "티켓 종류에 따라 다릅니다. 공연·요금 페이지를 확인해 주세요."], ["가격은 1인 기준인가요?", "네. 점심／저녁 1인 기준 가격입니다."]] },
      { name: "식사", items: [["식이 요청이 가능한가요?", "결제 전에 알레르기와 식이 제한을 알려주시면 가능 여부를 확인해 드립니다."]] },
      { name: "전통 의상", items: [["의상 스타일링이 포함되나요?", "일부 티켓에만 포함됩니다. 티켓 페이지에서 확인해 주세요."]] },
      { name: "교통", items: [["공연장은 어디인가요?", "중국 충칭시 주룽포구 바궈청입니다."], ["대중교통은 어떻게 확인하나요?", "사용하는 지도 앱에서 바궈청까지의 최신 경로를 확인해 주세요."]] },
      { name: "어린이·접근성", items: [["어린이도 참여할 수 있나요?", "예약 시 어린이 나이와 식사 요청을 알려주세요."], ["휠체어 이용이 가능한가요?", "휠체어 이동을 지원하며 도움이 필요하면 미리 문의해 주세요."]] },
      { name: "취소", items: [["예약을 취소할 수 있나요?", "사용하지 않은 예약은 취소할 수 있으며 환불 방법과 시기는 예약 채널에서 안내합니다."]] },
    ],
  };
  const pageCopy = {
    zh: ["常见问题 · 到访前须知", "按主题快速查找预订、票务、餐饮、交通和取消规则。", "问题分类", "常见问题"],
    tw: ["常見問題 · 到訪前須知", "按主題快速查找預訂、票務、餐飲、交通和取消規則。", "問題分類", "常見問題"],
    en: ["Frequently Asked Questions", "Quick answers by topic, without making you search through a long page.", "FAQ categories", "FAQ"],
    ja: ["よくある質問 · ご来場前の案内", "予約、チケット、食事、交通、キャンセルについて項目別にご案内します。", "質問カテゴリー", "よくある質問"],
    ko: ["자주 묻는 질문 · 방문 전 안내", "예약, 티켓, 식사, 교통과 취소 규정을 항목별로 확인하세요.", "질문 카테고리", "자주 묻는 질문"],
  } as const;
  const groups = groupsByLang[lang];
  const page = pageCopy[lang];

  return (
    <InnerPageShell
      lang={lang}
      eyebrow="VISITOR GUIDE"
      title={page[0]}
      summary={page[1]}
      pageType="faq"
      heroSize="faq"
    >
      <nav className="faq-category-nav" aria-label={page[2]}>
        {groups.map((group, index) => <a href={`#faq-${index}`} key={group.name}>{group.name}</a>)}
      </nav>
      <div className="faq-page-wrap">
        {groups.map((group, index) => (
          <section className="inner-section inner-faq" id={`faq-${index}`} key={group.name}>
            <p className="eyebrow">{page[3]}</p>
            <h2>{group.name}</h2>
            <div>
              {group.items.map(([question, answer], qIndex) => (
                <details key={question} open={index === 0 && qIndex === 0}>
                  <summary>{question}<span aria-hidden="true">＋</span></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </InnerPageShell>
  );
}
