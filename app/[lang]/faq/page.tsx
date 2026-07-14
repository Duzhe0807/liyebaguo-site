import { languages, type Lang } from "../../languages";
import { siteSeo, getCanonicalPath, getHreflang } from "../../seo";
import { content } from "../../content";
import type { Metadata } from "next";

export function generateStaticParams() { return languages.map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  const seo = siteSeo[lang].faq;
  return {
    title: seo.title, description: seo.description,
    alternates: { canonical: getCanonicalPath(lang, "faq"), languages: getHreflang("faq") },
    openGraph: { title: seo.title, description: seo.description, url: getCanonicalPath(lang, "faq"), type: "website" },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const t = content[lang];
  const isEn = lang === "en";
  const h1 = isEn ? "FAQ — Visitor Guide" : "常见问题 — 到访前须知";
  const body = isEn ? `<section><h2>Is the experience suitable for overseas visitors?</h2><p>Yes. The site and visitor flow are designed with clear arrival guidance, culture-first storytelling, and a straightforward booking path.</p></section>
        <section><h2>Can guests join in costume?</h2><p>Costume styling can be arranged before or around the banquet experience, depending on the selected package.</p></section>
        <section><h2>How should travel partners contact the team?</h2><p>Use the inquiry form for group, VIP, and agency cooperation. The team can coordinate schedule, language, seating, and menu needs.</p></section>
        <section><h2>TODO: Cancellation & Refund Policy</h2><p>取消和退款政策待补充。</p></section>
        <section><h2>TODO: Accessibility</h2><p>无障碍设施信息待补充。</p></section>` : `<section><h2>海外游客可以参加礼宴体验吗？</h2><p>可以。我们会提供清晰的预约、到访和入席指引；文化内容以直观的演艺、礼仪和场景呈现，适合不同文化背景的宾客参与。</p></section>
        <section><h2>可以体验华服和拍照吗？</h2><p>可以。华服、妆造和留影可根据所选套餐与预约时段安排，建议提前咨询可选款式、人数和拍摄时间。</p></section>
        <section><h2>旅行社、商务团队或私人活动如何咨询？</h2><p>请通过咨询表单提交日期、人数、预算、席位类型和特殊需求；工作人员会根据档期与接待能力进一步确认方案。</p></section>
        <section><h2>TODO: 取消和退款政策</h2><p>取消和退款政策待补充。</p></section>
        <section><h2>TODO: 无障碍设施</h2><p>无障碍及儿童相关信息待补充。</p></section>`;
  return (
    <main className="page-content">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol><li><a href={`/${lang}/`}>{t.brandName}</a></li><li aria-current="page">{h1}</li></ol>
      </nav>
      <section><h1>{h1}</h1></section>
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <a href={`/${lang}/location-booking/`} className="cta-button">{t.bookCta}</a>
    </main>
  );
}
