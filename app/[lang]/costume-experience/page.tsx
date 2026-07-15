import Image from "next/image";
import type { Metadata } from "next";
import { languages, type Lang } from "../../languages";
import { siteSeo, getCanonicalPath, getHreflang } from "../../seo";
import { InnerPageShell, DetailFaq } from "../InnerPageShell";

export function generateStaticParams() { return languages.map((lang) => ({ lang })); }
export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  const seo = siteSeo[lang].costume;
  return { title: seo.title, description: seo.description, alternates: { canonical: getCanonicalPath(lang, "costume-experience"), languages: getHreflang("costume-experience") } };
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const en = lang === "en";
  const steps = en
    ? [["Choose", "Confirm available style, colour and size"], ["Style", "Change, hair and makeup according to the ticket"], ["Photograph", "Use designated settings and receive the included image service"]]
    : [["选款", "确认可选风格、颜色、尺码与档期"], ["妆造", "按票种完成换装、发型或妆面"], ["留影", "在指定场景拍摄，并使用票种包含的照片服务"]];

  return <InnerPageShell lang={lang} eyebrow="COSTUME EXPERIENCE" title={en ? "Traditional Costume & Portrait Experience" : "华服体验 · 妆造与留影"} summary={en ? "Add traditional dress to the banquet journey, with styling and photo services confirmed by ticket." : "从选款、妆造到场景留影，让华服自然融入整场礼宴。"} image="/images/gallery-hmt-1.webp">
    <section className="inner-section styling-flow"><p className="eyebrow">HOW IT WORKS</p><h2>{en ? "From fitting to photograph" : "从试穿到留影"}</h2><div>{steps.map(([title, text], index) => <article key={title}><figure><Image src={["/images/gallery-hmt-1.webp", "/images/gallery-hmt-3.webp", "/images/gallery-western-4.webp"][index]} alt={title} fill sizes="(max-width:760px) 92vw,30vw" /></figure><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="inner-section costume-inclusions"><p className="eyebrow">PLAN YOUR STYLING</p><h2>{en ? "What to confirm before arrival" : "到场前确认这些内容"}</h2><div><article><small>{en ? "Included with" : "包含票种"}</small><strong>SVIP</strong><p>{en ? "Costume styling and one retouched photograph" : "华服妆造与精修照片一张"}</p></article><article><small>{en ? "Time" : "所需时间"}</small><strong>{en ? "Confirm when booking" : "预约时确认"}</strong><p>{en ? "Arrive at the time given by the team" : "按工作人员确认的时间提前到场"}</p></article><article><small>{en ? "Best for" : "适合人群"}</small><strong>{en ? "Portrait keepsakes" : "希望拍摄纪念照的宾客"}</strong><p>{en ? "Individuals, friends and family groups" : "个人、朋友同行与家庭宾客"}</p></article></div></section>
    <DetailFaq title={en ? "Costume questions" : "华服常见问题"} items={en ? [["Is makeup included?", "SVIP lists costume styling; confirm the exact hair and makeup service when booking."], ["Can I choose a style?", "Choices depend on availability, size and session."], ["When should I arrive?", "The team will provide an arrival time after the costume service is confirmed."]] : [["是否包含妆造？", "尊享席包含华服妆造，具体发型和妆面内容请在预订时确认。"], ["可以现场选款吗？", "可选范围取决于库存、尺码和预约时段。"], ["需要提前多久到？", "确认华服服务后，工作人员会告知对应到场时间。"]]} />
  </InnerPageShell>;
}
