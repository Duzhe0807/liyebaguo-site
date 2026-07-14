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
        { name: "Tickets", items: [["What does each ticket include?", "Inclusions vary by ticket type. Check the Tickets page before booking."], ["Are confirmed prices available?", "Current prices are marked TODO until the venue confirms them."]] },
        { name: "Food", items: [["Can dietary needs be accommodated?", "Submit allergies and restrictions before payment so the venue can confirm what is possible."]] },
        { name: "Costume", items: [["Is costume styling included?", "Only selected ticket types include costume styling. Confirm the inclusion on the Tickets page."]] },
        { name: "Transportation", items: [["Where is the venue?", "Baguocheng, Jiulongpo District, Chongqing."], ["Which metro station is nearest?", "TODO: the station and exit require venue confirmation."]] },
        { name: "Children & Accessibility", items: [["Are children welcome?", "TODO: age policy and child pricing require confirmation."], ["Is the venue accessible?", "TODO: step-free access and accessible seating require confirmation."]] },
        { name: "Cancellation", items: [["Can I cancel or change a booking?", "TODO: the official change, cancellation and refund policy requires confirmation."]] },
      ]
    : [
        { name: "预订", items: [["如何预订？", "填写预订表单，收到场次确认后再安排行程。"], ["团队可以咨询吗？", "可以，请在团队表单填写日期、人数和活动需求。"]] },
        { name: "票务", items: [["不同票种包含什么？", "每种票的包含项目不同，请先查看“场次与票价”页面。"], ["目前有正式价格吗？", "未经场地方确认的价格会明确标注为 TODO，不会编造。"]] },
        { name: "餐饮", items: [["可以处理饮食限制吗？", "请在付款前提交过敏和忌口信息，由场地方确认能否安排。"]] },
        { name: "华服", items: [["票价包含华服妆造吗？", "仅部分票种可能包含华服或妆造，请以“场次与票价”页面的最终说明为准。"]] },
        { name: "交通", items: [["场地在哪里？", "中国重庆市九龙坡区巴国城。"], ["最近的地铁站是哪里？", "TODO：车站与出口等待场地方确认。"]] },
        { name: "儿童与无障碍", items: [["儿童可以参加吗？", "TODO：年龄政策与儿童票价等待确认。"], ["场地是否提供无障碍通行？", "TODO：无障碍入口和座位安排等待确认。"]] },
        { name: "取消与退款", items: [["可以取消或改期吗？", "TODO：正式改期、取消与退款规则等待确认。"]] },
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
      {groups.map((group) => (
        <section className="inner-section inner-faq" key={group.name}>
          <p className="eyebrow">FAQ</p>
          <h2>{group.name}</h2>
          <div>
            {group.items.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<span>＋</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      ))}
    </InnerPageShell>
  );
}
