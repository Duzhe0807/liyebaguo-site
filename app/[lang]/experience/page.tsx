import Image from "next/image";
import type { Metadata } from "next";
import { languages, type Lang } from "../../languages";
import { siteSeo, getCanonicalPath, getHreflang } from "../../seo";
import { InnerPageShell, FeatureRow, DetailFaq } from "../InnerPageShell";

export function generateStaticParams() { return languages.map((lang) => ({ lang })); }
export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> { const { lang } = await params; const seo = siteSeo[lang].experience; return { title: seo.title, description: seo.description, alternates: { canonical: getCanonicalPath(lang,"experience"), languages: getHreflang("experience") }, openGraph:{title:seo.title,description:seo.description,url:getCanonicalPath(lang,"experience"),type:"website"}, twitter:{card:"summary_large_image",title:seo.title,description:seo.description} }; }

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params; const en = lang === "en";
  const stages = en ? [["Arrival & Welcome","Enter the garden, collect your booking, and join the welcome ritual."],["Banquet & Performance","Ba-Yu dishes arrive alongside music, dance and theatrical storytelling."],["Costume & Keepsake","Add optional costume styling and capture photographs around the venue."]] : [["入园迎宾","抵达巴国城、核对预约，游园后参加迎宾礼。"],["入席观演","巴渝宴席随音乐、舞蹈与舞台叙事依次展开。"],["华服留影","可按套餐体验华服妆造，并在场内拍摄纪念照片。"]];
  const faq: Array<[string,string]> = en ? [["How long does the experience take?","The banquet show runs about 110 minutes. Allow extra time for the garden visit and optional costume styling."],["Is costume styling included?","It depends on the selected ticket or package. Confirm inclusions before booking."],["Can international visitors follow the show?","The experience is highly visual. English support can be requested in advance."]] : [["完整体验需要多久？","餐秀约 110 分钟，游园和可选华服妆造需额外预留时间。"],["华服妆造是否包含？","是否包含取决于所选票种或套餐，请在预订前确认。"],["海外游客是否容易理解？","演出以视觉叙事为主，可在预约时提前咨询英文支持。"]];
  return <InnerPageShell lang={lang} eyebrow="THE EXPERIENCE" title={en?"The Ba Kingdom Banquet Experience":"巴国礼宴体验"} summary={en?"A three-act evening of welcome ritual, Ba-Yu dining, live performance and optional traditional costume styling.":"迎宾、宴席、演出与华服留影，共同组成一场可观、可食、可参与的文化晚宴。"} image="/hero-red.jpg">
    <section className="inner-section"><p className="eyebrow">THREE ACTS</p><h2>{en?"Your evening, in three acts":"三幕沉浸体验"}</h2><div className="inner-process">{stages.map(([title,text],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <FeatureRow kicker="LIVE PERFORMANCE" title={en?"Performance around the table":"演出，就在宴席之间发生"} text={en?"Music, dance and ritual are staged around the dining experience, keeping the story close without turning the evening into a conventional theatre visit.":"音乐、舞蹈与礼仪围绕宴席展开。宾客无需面对传统镜框式舞台，也能自然进入巴渝故事。"} image="/sleeve-dance.jpg" />
    <FeatureRow reverse kicker="BA-YU BANQUET" title={en?"Chongqing flavour, served as ceremony":"巴渝味道，以礼相待"} text={en?"A multi-course banquet draws on local flavour and ceremonial hospitality. Dietary needs should be noted before confirmation.":"多道宴席以重庆地方风味与待客礼序为线索。忌口、过敏或特殊饮食需求请在确认前说明。"} image="/hero-banquet-cropped.jpg" />
    <FeatureRow kicker="COSTUME EXPERIENCE" title={en?"Dress for the story":"换上华服，成为画面的一部分"} text={en?"Selected packages can include traditional costume styling and a photo keepsake. Availability and inclusions vary by booking.":"部分套餐可安排传统服装、妆造与纪念留影；可选款式及包含项目以实际预约确认为准。"} image="/jade-dance.jpg" />
    <section className="inner-section"><p className="eyebrow">GALLERY</p><h2>{en?"Moments from the banquet":"礼宴现场片段"}</h2><div className="inner-gallery"><figure><Image src="/audience-ritual.jpg" alt={en?"Audience ritual":"现场礼仪互动"} fill sizes="(max-width:600px) 86vw,50vw" /></figure><figure><Image src="/sleeve-dance.jpg" alt={en?"Sleeve dance":"水袖演出"} fill sizes="30vw" /></figure><figure><Image src="/jade-dance.jpg" alt={en?"Costume performance":"华服演出"} fill sizes="30vw" /></figure></div></section>
    <DetailFaq title={en?"Before you arrive":"到访前常见问题"} items={faq} />
  </InnerPageShell>;
}
