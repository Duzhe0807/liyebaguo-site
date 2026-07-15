import Image from "next/image";
import type { Metadata } from "next";
import { languages, type Lang } from "../../languages";
import { siteSeo, getCanonicalPath, getHreflang } from "../../seo";
import { InnerPageShell, FeatureRow, DetailFaq } from "../InnerPageShell";

export function generateStaticParams() { return languages.map((lang) => ({ lang })); }
export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params; const seo = siteSeo[lang].experience;
  return { title: seo.title, description: seo.description, alternates: { canonical: getCanonicalPath(lang, "experience"), languages: getHreflang("experience") }, openGraph: { title: seo.title, description: seo.description, url: getCanonicalPath(lang, "experience"), type: "website" }, twitter: { card: "summary_large_image", title: seo.title, description: seo.description } };
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params; const en = lang === "en";
  const stages = en ? [
    { number: "01", time: "30 min before", title: "Arrival & Welcome", text: "Garden visit, booking confirmation and a short welcome ritual.", image: "/images/gallery-sea-2.webp" },
    { number: "02", time: "110 minutes", title: "Banquet & Performance", text: "Ba-Yu dishes, music, dance and storytelling unfold around the table.", image: "/audience-ritual.jpg" },
    { number: "03", time: "By package", title: "Costume & Keepsake", text: "Traditional dress, styling and photography options for selected guests.", image: "/images/gallery-hmt-1.webp" },
  ] : [
    { number: "01", time: "提前 30 分钟", title: "入园迎宾", text: "抵达巴国城、核对预约，游园后参加迎宾礼。", image: "/images/gallery-sea-2.webp" },
    { number: "02", time: "约 110 分钟", title: "入席观演", text: "巴渝宴席随音乐、舞蹈与舞台叙事依次展开。", image: "/audience-ritual.jpg" },
    { number: "03", time: "按所选套餐", title: "华服留影", text: "传统服装、妆造与纪念拍摄按预约内容体验。", image: "/images/gallery-hmt-1.webp" },
  ];
  const highlights = en ? [
    ["Immersive performance", "Live music, dance and ritual take place within the dining space, not on a distant stage."],
    ["Regional cuisine", "Chongqing flavours are served in a paced sequence matched to the show."],
    ["Traditional styling", "SVIP includes traditional costume and traditional headwear."],
    ["Small group feel", "Up to 160 guests per session, keeping service attentive and personal."],
  ] : [
    ["沉浸演出", "音乐、舞蹈与礼仪围绕用餐空间发生，而非传统镜框舞台。"],
    ["地方风味", "巴渝味道按演出节奏逐道上桌，味觉与舞台同步。"],
    ["古装造型", "SVIP 席位赠送古装服饰和古装头饰，为整场体验增添仪式感。"],
    ["适度规模", "每场上限约 160 人，服务仍能细致到桌。"],
  ];
  const faq: Array<[string, string]> = en ? [["How long does the experience take?", "The banquet show runs about 110 minutes. Allow extra time for the garden and any costume service."], ["Is costume styling included?", "It depends on the selected ticket. Check the inclusions on the Tickets page before booking."], ["Can international visitors follow the show?", "The experience is highly visual. Language support can be requested when booking."]] : [["完整体验需要多久？", "餐秀约 110 分钟，游园和华服服务需另外预留时间。"], ["华服妆造是否包含？", "取决于所选票种，请在预订前查看票价页的包含项目。"], ["海外游客是否容易理解？", "演出以视觉叙事为主，语言协助可在预约时提出。"]];
  return <InnerPageShell lang={lang} eyebrow="THE EXPERIENCE" title={en ? "The Ba Kingdom Banquet Experience" : "巴国礼宴体验"} summary={en ? "A three-act evening of welcome ritual, Ba-Yu dining, live performance and traditional costume options." : "迎宾、宴席、演出与华服留影，共同组成一场可观、可食、可参与的文化晚宴。"} image="/hero-red.jpg">
    <section className="inner-section experience-acts"><p className="eyebrow">{en ? "THREE ACTS" : "三幕沉浸"}</p><h2>{en ? "Your evening, in three acts" : "一晚三幕，渐入佳境"}</h2><div className="act-line">{stages.map(({ number, time, title, text, image }) => <article key={number}><figure><Image src={image} alt={title} fill sizes="(max-width:760px) 92vw,30vw" /></figure><span className="act-number">{number}</span><small>{time}</small><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="inner-section experience-highlights"><p className="eyebrow">{en ? "WHAT TO EXPECT" : "体验亮点"}</p><h2>{en ? "Why guests remember this evening" : "为什么宾客会记住这一晚"}</h2><div className="highlight-grid">{highlights.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <FeatureRow kicker="LIVE PERFORMANCE" title={en ? "Performance around the table" : "演出，就在宴席之间发生"} text={en ? "Music, dance and ritual unfold around the dining experience, keeping every scene close to the guest." : "音乐、舞蹈与礼仪围绕宴席展开，让宾客不必面对传统镜框式舞台，也能自然进入故事。"} image="/sleeve-dance.jpg" caption={en ? "Live performance beside the banquet" : "宴席近旁的现场演出"} />
    <FeatureRow reverse kicker="BA-YU BANQUET" title={en ? "Chongqing flavour, served as ceremony" : "巴渝味道，以礼相待"} text={en ? "A paced banquet draws on local flavour and ceremonial hospitality. Dietary needs should be shared before confirmation." : "多道宴席以重庆地方风味与待客礼序为线索，忌口、过敏或特殊饮食需求请在确认前说明。"} image="/images/gallery-hmt-4.webp" caption={en ? "Guests dining in the banquet hall" : "宾客在宴席现场用餐"} />
    <FeatureRow kicker="COSTUME EXPERIENCE" title={en ? "Dress for the story" : "换上古装，成为画面的一部分"} text={en ? "SVIP includes traditional costume and traditional headwear. Available styles depend on the session." : "SVIP 席位赠送古装服饰和古装头饰，可选款式以实际预约为准。"} image="/images/gallery-hmt-1.webp" caption={en ? "Traditional costume styling" : "古装服饰与头饰造型"} />
    <section className="inner-section experience-gallery"><p className="eyebrow">GALLERY</p><h2>{en ? "Moments from the banquet" : "礼宴现场片段"}</h2><div className="editorial-gallery"><figure className="portrait"><Image src="/images/gallery-western-4.webp" alt={en ? "Guests in traditional costume" : "宾客华服合影"} fill sizes="(max-width:700px) 92vw,35vw" /></figure><figure><Image src="/audience-ritual.jpg" alt={en ? "Audience ritual" : "现场礼仪互动"} fill sizes="(max-width:700px) 92vw,55vw" /></figure><figure><Image src="/sleeve-dance.jpg" alt={en ? "Sleeve dance" : "水袖演出"} fill sizes="(max-width:700px) 46vw,28vw" /></figure><figure><Image src="/hero-red.jpg" alt={en ? "Red stage performance" : "红色舞台演出"} fill sizes="(max-width:700px) 46vw,28vw" /></figure></div></section>
    <DetailFaq title={en ? "Before you arrive" : "到访前常见问题"} note={en ? "Arrive before the garden time shown for your session and keep your booking contact available." : "请在所选场次的游园时间前抵达，并保持预约电话畅通。"} items={faq} />
  </InnerPageShell>;
}
