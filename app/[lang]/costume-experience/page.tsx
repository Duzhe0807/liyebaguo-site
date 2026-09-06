import Image from "next/image";
import type { Metadata } from "next";
import { languages, type Lang } from "../../languages";
import { pageMetadata } from "../../seo";
import { InnerPageShell, DetailFaq } from "../InnerPageShell";

export function generateStaticParams() { return languages.map((lang) => ({ lang })); }
export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata(lang, "costume");
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
    : lang === "ja" ? [["選ぶ", "スタイル、色、サイズ、空き状況を確認"], ["着付け", "券種に応じてヘア・メイクを実施"], ["撮影", "指定の場面で撮影し、含まれる写真サービスを利用"]]
    : lang === "ko" ? [["선택", "스타일, 색상, 사이즈와 예약 가능 여부 확인"], ["스타일링", "티켓에 따라 헤어와 메이크업 진행"], ["촬영", "지정된 공간에서 촬영하고 포함된 사진 서비스 이용"]]
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
    : lang === "ja" ? [["伝統衣装", "SVIPに含まれます", true], ["伝統髪飾り", "SVIPに含まれます", true]]
    : lang === "ko" ? [["전통 의상", "SVIP 포함", true], ["전통 머리 장식", "SVIP 포함", true]]
    : [
      ["古装服饰", "SVIP 席位赠送", true],
      ["古装头饰", "SVIP 席位赠送", true],
    ];
  const lookLabels = en ? ["Palace elegance", "Outdoor garden portrait", "Group memory", "Stage atmosphere"] : lang === "ja" ? ["宮廷の装い", "庭園ポートレート", "グループの思い出", "舞台の雰囲気"] : lang === "ko" ? ["궁중의 우아함", "정원 야외 촬영", "단체 추억", "무대 분위기"] : ["宫廷雅致", "园林外景", "亲友合影", "舞台氛围"];
  const looks = [
    ["/images/gallery-hmt-1.webp", lookLabels[0]],
    ["/images/gallery-hmt-3.webp", lookLabels[1]],
    ["/images/gallery-western-4.webp", lookLabels[2]],
    ["/images/gallery-hmt-4.webp", lookLabels[3]],
  ];
  const page = en ? { title: "Costume Packages & Styling at Liyan Baguo", summary: "Plan traditional Chinese costume and headwear for your Banquet of Ba Kingdom visit in Chongqing. Compare ticket inclusions and discuss sizes, preparation and photo time with the official team before reserving.", lookbook: "LOOKBOOK", looks: "Four ways to step into the scene", flow: "HOW IT WORKS", flowTitle: "From fitting to photograph", included: "WHAT IS INCLUDED", includedTitle: "What SVIP includes", faqTitle: "Costume questions", faq: [["What does SVIP include?", "SVIP includes traditional costume and traditional headwear."], ["Can I choose a style?", "Choices depend on availability, size and session."], ["When should I arrive?", "The team will provide an arrival time after the costume service is confirmed."]] }
    : lang === "ja" ? { title: "伝統衣装 · 着付けと撮影", summary: "衣装選びから着付け、撮影まで、華服を礼宴の物語に取り入れます。", lookbook: "スタイル紹介", looks: "場面に溶け込む四つの装い", flow: "体験の流れ", flowTitle: "試着から撮影まで", included: "含まれる内容", includedTitle: "SVIPに含まれるもの", faqTitle: "衣装のよくある質問", faq: [["SVIPには何が含まれますか？", "伝統衣装と髪飾りが含まれます。"], ["スタイルを選べますか？", "在庫、サイズ、公演時間により異なります。"], ["何時に到着すればよいですか？", "衣装サービス確定後にご案内します。"]] }
    : lang === "ko" ? { title: "전통 의상 · 스타일링과 촬영", summary: "의상 선택부터 스타일링과 촬영까지 전통 의상을 연회 여정에 자연스럽게 더합니다.", lookbook: "스타일 미리보기", looks: "장면에 어울리는 네 가지 스타일", flow: "체험 과정", flowTitle: "피팅부터 촬영까지", included: "포함 사항", includedTitle: "SVIP 포함 내용", faqTitle: "의상 자주 묻는 질문", faq: [["SVIP에는 무엇이 포함되나요?", "전통 의상과 머리 장식이 포함됩니다."], ["스타일을 선택할 수 있나요?", "재고, 사이즈와 회차에 따라 달라집니다."], ["언제 도착해야 하나요?", "의상 서비스 확정 후 도착 시간을 안내합니다."]] }
    : { title: "华服体验 · 妆造与留影", summary: "从选款、妆造到场景留影，让华服自然融入整场礼宴。", lookbook: "造型预览", looks: "四种融入场景的方式", flow: "体验流程", flowTitle: "从试穿到留影", included: "包含内容", includedTitle: "SVIP 赠送项目", faqTitle: "古装常见问题", faq: [["SVIP 赠送什么？", "SVIP 席位赠送古装服饰和古装头饰。"], ["可以现场选款吗？", "可选范围取决于库存、尺码和预约时段。"], ["需要提前多久到？", "确认古装服务后，工作人员会告知对应到场时间。"]] };

  return <InnerPageShell lang={lang} eyebrow="COSTUME EXPERIENCE" title={page.title} summary={page.summary} image="/images/gallery-hmt-1.webp">
    <section className="inner-section costume-lookbook"><p className="eyebrow">{page.lookbook}</p><h2>{page.looks}</h2><div className="lookbook-grid">{looks.map(([src, caption]) => <figure key={src}><Image src={src} alt={caption} fill sizes="(max-width:760px) 92vw,23vw" /><figcaption>{caption}</figcaption></figure>)}</div></section>
    <section className="inner-section styling-flow"><p className="eyebrow">{page.flow}</p><h2>{page.flowTitle}</h2><div>{steps.map(([title, text], index) => <article key={title}><figure><Image src={index === 0 ? "/images/gallery-hmt-1.webp" : index === 1 ? "/images/gallery-hmt-3.webp" : "/images/gallery-western-4.webp"} alt={title} fill sizes="(max-width:760px) 92vw,30vw" /></figure><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="inner-section costume-inclusions"><p className="eyebrow">{page.included}</p><h2>{page.includedTitle}</h2><div className="inclusion-table">{inclusions.map(([service, ticket, included]) => <article key={service}><span className={included ? "included" : "not-included"}>{included ? "✓" : "—"}</span><div><h3>{service}</h3><p>{ticket}</p></div></article>)}</div></section>
    <DetailFaq title={page.faqTitle} items={page.faq.map(([question, answer]) => [question, answer] as const)} />
  </InnerPageShell>;
}
