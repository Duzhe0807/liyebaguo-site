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
    ? [
      ["Choose", "Confirm available style, colour and size"],
      ["Style", "Hair and makeup according to the ticket"],
      ["Photograph", "Use designated settings and receive the included image service"],
    ]
    : [
      ["选款", "确认可选风格、颜色、尺码与档期"],
      ["妆造", "按票种完成换装、发型或妆面"],
      ["留影", "在指定场景拍摄，并使用票种包含的照片服务"],
    ];
  const inclusions: [string, string, boolean][] = en
    ? [
      ["Traditional costume", "Included with SVIP", true],
      ["Traditional headwear", "Included with SVIP", true],
    ]
    : [
      ["古装服饰", "SVIP 席位赠送", true],
      ["古装头饰", "SVIP 席位赠送", true],
    ];
  const looks = [
    ["/images/gallery-hmt-1.webp", en ? "Palace elegance" : "宫廷雅致"],
    ["/images/gallery-hmt-3.webp", en ? "Outdoor garden portrait" : "园林外景"],
    ["/images/gallery-western-4.webp", en ? "Group memory" : "亲友合影"],
    ["/images/gallery-hmt-4.webp", en ? "Stage atmosphere" : "舞台氛围"],
  ];

  return <InnerPageShell lang={lang} eyebrow="COSTUME EXPERIENCE" title={en ? "Traditional Costume & Portrait Experience" : "华服体验 · 妆造与留影"} summary={en ? "Add traditional dress to the banquet journey, with styling and photo services confirmed by ticket." : "从选款、妆造到场景留影，让华服自然融入整场礼宴。"} image="/images/gallery-hmt-1.webp">
    <section className="inner-section costume-lookbook"><p className="eyebrow">{en ? "LOOKBOOK" : "造型预览"}</p><h2>{en ? "Four ways to step into the scene" : "四种融入场景的方式"}</h2><div className="lookbook-grid">{looks.map(([src, caption]) => <figure key={src}><Image src={src} alt={caption} fill sizes="(max-width:760px) 92vw,23vw" /><figcaption>{caption}</figcaption></figure>)}</div></section>
    <section className="inner-section styling-flow"><p className="eyebrow">{en ? "HOW IT WORKS" : "体验流程"}</p><h2>{en ? "From fitting to photograph" : "从试穿到留影"}</h2><div>{steps.map(([title, text], index) => <article key={title}><figure><Image src={index === 0 ? "/images/gallery-hmt-1.webp" : index === 1 ? "/images/gallery-hmt-3.webp" : "/images/gallery-western-4.webp"} alt={title} fill sizes="(max-width:760px) 92vw,30vw" /></figure><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="inner-section costume-inclusions"><p className="eyebrow">{en ? "WHAT IS INCLUDED" : "包含内容"}</p><h2>{en ? "What SVIP includes" : "SVIP 赠送项目"}</h2><div className="inclusion-table">{inclusions.map(([service, ticket, included]) => <article key={service}><span className={included ? "included" : "not-included"}>{included ? "✓" : "—"}</span><div><h3>{service}</h3><p>{ticket}</p></div></article>)}</div></section>
    <DetailFaq title={en ? "Costume questions" : "古装常见问题"} items={en ? [["What does SVIP include?", "SVIP includes traditional costume and traditional headwear."], ["Can I choose a style?", "Choices depend on availability, size and session."], ["When should I arrive?", "The team will provide an arrival time after the costume service is confirmed."]] : [["SVIP 赠送什么？", "SVIP 席位赠送古装服饰和古装头饰。"], ["可以现场选款吗？", "可选范围取决于库存、尺码和预约时段。"], ["需要提前多久到？", "确认古装服务后，工作人员会告知对应到场时间。"]]} />
  </InnerPageShell>;
}
