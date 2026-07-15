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
  const en = lang === "en";
  const groups: Group[] = en
    ? [
      { name: "Booking", items: [["How do I reserve?", "Use the booking form and wait for schedule confirmation before making travel plans."], ["Can groups enquire?", "Yes. Add your preferred date, party size and event needs in the group form."]] },
      { name: "Tickets", items: [["What does each ticket include?", "Inclusions vary by ticket type. Check the Tickets page before booking."], ["Are prices shown per guest?", "Yes. The listed figures show lunch / dinner prices per guest."]] },
      { name: "Food", items: [["Can dietary needs be accommodated?", "Submit allergies and restrictions before payment so the venue can confirm what is possible."]] },
      { name: "Costume", items: [["Is costume styling included?", "Only selected ticket types include costume styling. Confirm the inclusion on the Tickets page."]] },
      { name: "Transportation", items: [["Where is the venue?", "Baguocheng, Jiulongpo District, Chongqing."], ["How should I plan public transport?", "Use the live route to Baguocheng in your preferred map app and follow its current station and exit guidance."]] },
      { name: "Children & Accessibility", items: [["Are children welcome?", "Add the child's age and dining needs to the booking request so the team can confirm the suitable ticket."], ["Is the venue accessible?", "The venue information states wheelchair access is supported. Contact the team before arrival if assistance is needed."]] },
      { name: "Cancellation", items: [["Can I cancel a booking?", "Unused bookings may be cancelled. The original booking channel will confirm refund processing and timing."]] },
    ]
    : [
      { name: "预订", items: [["如何预订？", "填写预订表单，收到场次确认后再安排行程。"], ["团队可以咨询吗？", "可以，请在团队表单填写日期、人数和活动需求。"]] },
      { name: "票务", items: [["不同票种包含什么？", "每种票的包含项目不同，请先查看“场次与票价”页面。"], ["票价是单人价格吗？", "是，页面所列数字依次为单人午宴 / 晚宴价格。"]] },
      { name: "餐饮", items: [["可以处理饮食限制吗？", "请在付款前提交过敏和忌口信息，由场地方确认能否安排。"]] },
      { name: "华服", items: [["票价包含华服妆造吗？", "仅部分票种可能包含华服或妆造，请以“场次与票价”页面的最终说明为准。"]] },
      { name: "交通", items: [["场地在哪里？", "中国重庆市九龙坡区巴国城。"], ["怎样规划公共交通？", "请在常用地图中实时规划至“巴国城”，车站与出口以出发当天导航为准。"]] },
      { name: "儿童与无障碍", items: [["儿童可以参加吗？", "请在预约中说明儿童年龄与用餐需求，由工作人员确认适合的票种。"], ["场地是否提供无障碍通行？", "场地信息显示支持轮椅通行，如需协助请在到场前联系。"]] },
      { name: "取消与退款", items: [["可以取消订单吗？", "未核销订单可以取消；退款渠道与到账时间以原预订渠道实际处理为准。"]] },
    ];

  return (
    <InnerPageShell
      lang={lang}
      eyebrow="VISITOR GUIDE"
      title={en ? "Frequently Asked Questions" : "常见问题 · 到访前须知"}
      summary={en ? "Quick answers by topic, without making you search through a long page." : "按主题快速查找预订、票务、餐饮、交通和取消规则。"}
      pageType="faq"
      heroSize="faq"
    >
      <nav className="faq-category-nav" aria-label={en ? "FAQ categories" : "问题分类"}>
        {groups.map((group, index) => <a href={`#faq-${index}`} key={group.name}>{group.name}</a>)}
      </nav>
      <div className="faq-page-wrap">
        {groups.map((group, index) => (
          <section className="inner-section inner-faq" id={`faq-${index}`} key={group.name}>
            <p className="eyebrow">{en ? "FAQ" : "常见问题"}</p>
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
