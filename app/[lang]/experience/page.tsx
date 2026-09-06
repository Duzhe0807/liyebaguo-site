import Image from "next/image";
import type { Metadata } from "next";
import { languages, type Lang } from "../../languages";
import { pageMetadata } from "../../seo";
import { InnerPageShell, FeatureRow, DetailFaq } from "../InnerPageShell";

export function generateStaticParams() { return languages.map((lang) => ({ lang })); }
export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata(lang, "experience");
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const en = lang === "en";
  const stages = en ? [
    { number: "01", time: "30 min before", title: "Arrival & Welcome", text: "Garden visit, booking confirmation and a short welcome ritual.", image: "/images/gallery-sea-2.webp" },
    { number: "02", time: "110 minutes", title: "Banquet & Performance", text: "Ba-Yu dishes, music, dance and storytelling unfold around the table.", image: "/audience-ritual.jpg" },
    { number: "03", time: "By package", title: "Costume & Keepsake", text: "Traditional dress, styling and photography options for selected guests.", image: "/images/gallery-hmt-1.webp" },
  ] : lang === "ja" ? [
    { number: "01", time: "30分前", title: "入園・お出迎え", text: "巴国城に到着後、予約を確認し、庭園散策と出迎えの儀を体験します。", image: "/images/gallery-sea-2.webp" },
    { number: "02", time: "約110分", title: "宴席・公演", text: "巴渝料理、音楽、舞踊と物語が食卓を囲んで展開します。", image: "/audience-ritual.jpg" },
    { number: "03", time: "プランによる", title: "衣装・記念撮影", text: "対象プランでは伝統衣装、着付け、記念撮影を楽しめます。", image: "/images/gallery-hmt-1.webp" },
  ] : lang === "ko" ? [
    { number: "01", time: "30분 전", title: "입장·환영", text: "바궈청 도착 후 예약을 확인하고 정원 산책과 환영 의식을 체험합니다.", image: "/images/gallery-sea-2.webp" },
    { number: "02", time: "약 110분", title: "연회·공연", text: "파위 요리, 음악, 무용과 이야기가 식탁 주변에서 펼쳐집니다.", image: "/audience-ritual.jpg" },
    { number: "03", time: "패키지별 상이", title: "의상·기념 촬영", text: "선택한 패키지에 따라 전통 의상, 스타일링과 기념 촬영을 즐길 수 있습니다.", image: "/images/gallery-hmt-1.webp" },
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
  ] : lang === "ja" ? [
    ["没入型公演", "音楽、舞踊、儀礼が遠い舞台ではなく、お食事の空間で展開します。"],
    ["重慶の味", "公演の進行に合わせて巴渝の料理をご提供します。"],
    ["伝統衣装", "SVIPには伝統衣装と髪飾りが含まれます。"],
    ["丁寧なおもてなし", "1公演最大約160名で、テーブルごとのサービスを大切にします。"],
  ] : lang === "ko" ? [
    ["몰입형 공연", "음악, 무용과 의식이 멀리 있는 무대가 아니라 식사 공간 안에서 펼쳐집니다."],
    ["충칭의 맛", "공연 흐름에 맞춰 파위 지역 요리가 차례로 제공됩니다."],
    ["전통 의상", "SVIP에는 전통 의상과 머리 장식이 포함됩니다."],
    ["세심한 서비스", "회차당 최대 약 160명으로 테이블별 세심한 서비스를 제공합니다."],
  ] : [
    ["沉浸演出", "音乐、舞蹈与礼仪围绕用餐空间发生，而非传统镜框舞台。"],
    ["地方风味", "巴渝味道按演出节奏逐道上桌，味觉与舞台同步。"],
    ["古装造型", "SVIP 席位赠送古装服饰和古装头饰，为整场体验增添仪式感。"],
    ["适度规模", "每场上限约 160 人，服务仍能细致到桌。"],
  ];
  const page = lang === "en" ? { title: "The Liyan Baguo Visitor Journey", summary: "Plan your Banquet of Ba Kingdom visit in Chongqing: garden and welcome activities, a 110-minute meal and show, and optional costume preparation. Lunch and dinner sessions welcome travellers, families and groups; confirm arrangements with the official team.", acts: "THREE ACTS", actsTitle: "Your visit, in three acts", expect: "WHAT TO EXPECT", expectTitle: "What to expect at the banquet", rows: [["Performance around the table", "Music, dance and ritual unfold around the dining experience, keeping every scene close to the guest.", "Live performance beside the banquet"], ["Chongqing flavour, served as ceremony", "A paced banquet draws on local flavour and ceremonial hospitality. Dietary needs should be shared before confirmation.", "Guests dining in the banquet hall"], ["Dress for the story", "SVIP includes traditional costume and traditional headwear. Available styles depend on the session.", "Traditional costume styling"]], gallery: "Moments from the banquet", before: "Before you arrive", note: "Arrive before the garden time shown for your session and keep your booking contact available.", faq: [["How long does the experience take?", "The banquet show runs about 110 minutes. Allow extra time for the garden and any costume service."], ["Is costume styling included?", "It depends on the selected ticket. Check the inclusions on the Tickets page before booking."], ["Can international visitors follow the show?", "The experience is highly visual. Language support can be requested when booking."]] }
    : lang === "ja" ? { title: "巴国礼宴体験", summary: "お出迎え、巴渝の宴席、ライブ公演、伝統衣装を一つの夜に。", acts: "三幕の体験", actsTitle: "一夜を彩る三つの場面", expect: "体験の魅力", expectTitle: "心に残る理由", rows: [["食卓を囲むライブ公演", "音楽、舞踊と儀礼が宴席の周りで展開し、物語を間近に感じられます。", "宴席のそばで行われる公演"], ["儀礼とともに味わう重慶料理", "地方の味とおもてなしを、公演の進行に合わせてお楽しみください。", "宴席会場でのお食事"], ["物語の衣装をまとう", "SVIPには伝統衣装と髪飾りが含まれます。", "伝統衣装のスタイリング"]], gallery: "礼宴のひととき", before: "ご来場前に", note: "選択した公演の庭園散策開始前に到着し、予約連絡先を確認できる状態にしてください。", faq: [["体験時間は？", "公演と宴席は約110分です。庭園散策や衣装体験には追加時間をご予定ください。"], ["衣装は含まれますか？", "券種により異なります。予約前にチケットページをご確認ください。"], ["中国語がわからなくても楽しめますか？", "視覚的な演出が中心です。言語サポートは予約時にご相談ください。"]] }
    : lang === "ko" ? { title: "바 왕국 연회 체험", summary: "환영 의식, 파위 연회, 라이브 공연과 전통 의상을 한 번의 저녁에 경험하세요.", acts: "세 장면", actsTitle: "세 장면으로 이어지는 특별한 밤", expect: "체험 포인트", expectTitle: "오래 기억되는 이유", rows: [["식탁 주변에서 펼쳐지는 공연", "음악, 무용과 의식이 연회 주변에서 펼쳐져 이야기를 가까이에서 느낄 수 있습니다.", "연회 곁의 라이브 공연"], ["의식과 함께 즐기는 충칭의 맛", "지역의 맛과 환대가 공연 흐름에 맞춰 이어집니다.", "연회장에서 식사하는 방문객"], ["이야기 속 의상을 입다", "SVIP에는 전통 의상과 머리 장식이 포함됩니다.", "전통 의상 스타일링"]], gallery: "연회 현장 순간", before: "방문 전 안내", note: "선택한 회차의 정원 산책 시작 전에 도착하고 예약 연락처를 확인할 수 있도록 준비해 주세요.", faq: [["체험 시간은 얼마나 되나요?", "연회 공연은 약 110분이며 정원 산책과 의상 체험 시간은 별도입니다."], ["의상 스타일링이 포함되나요?", "선택한 티켓에 따라 다르므로 예약 전 티켓 페이지를 확인해 주세요."], ["중국어를 몰라도 즐길 수 있나요?", "시각적 연출 중심이며 언어 지원은 예약 시 요청할 수 있습니다."]] }
    : { title: "巴国礼宴体验", summary: "迎宾、宴席、演出与华服留影，共同组成一场可观、可食、可参与的文化晚宴。", acts: "三幕沉浸", actsTitle: "一晚三幕，渐入佳境", expect: "体验亮点", expectTitle: "为什么宾客会记住这一晚", rows: [["演出，就在宴席之间发生", "音乐、舞蹈与礼仪围绕宴席展开，让宾客自然进入故事。", "宴席近旁的现场演出"], ["巴渝味道，以礼相待", "多道宴席以重庆地方风味与待客礼序为线索，特殊饮食需求请提前说明。", "宾客在宴席现场用餐"], ["换上古装，成为画面的一部分", "SVIP 席位赠送古装服饰和古装头饰。", "古装服饰与头饰造型"]], gallery: "礼宴现场片段", before: "到访前常见问题", note: "请在所选场次的游园时间前抵达，并保持预约电话畅通。", faq: [["完整体验需要多久？", "餐秀约 110 分钟，游园和华服服务需另外预留时间。"], ["华服妆造是否包含？", "取决于所选票种，请查看票价页的包含项目。"], ["海外游客是否容易理解？", "演出以视觉叙事为主，语言协助可在预约时提出。"]] };
  return <InnerPageShell lang={lang} eyebrow="THE EXPERIENCE" title={page.title} summary={page.summary} image="/hero-red.jpg">
    <section className="inner-section experience-acts"><p className="eyebrow">{page.acts}</p><h2>{page.actsTitle}</h2><div className="act-line">{stages.map(({ number, time, title, text, image }) => <article key={number}><figure><Image src={image} alt={title} fill sizes="(max-width:760px) 92vw,30vw" /></figure><span className="act-number">{number}</span><small>{time}</small><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="inner-section experience-highlights"><p className="eyebrow">{page.expect}</p><h2>{page.expectTitle}</h2><div className="highlight-grid">{highlights.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <FeatureRow kicker="LIVE PERFORMANCE" title={page.rows[0][0]} text={page.rows[0][1]} image="/sleeve-dance.jpg" caption={page.rows[0][2]} />
    <FeatureRow reverse kicker="BA-YU BANQUET" title={page.rows[1][0]} text={page.rows[1][1]} image="/images/gallery-hmt-4.webp" caption={page.rows[1][2]} />
    <FeatureRow kicker="COSTUME EXPERIENCE" title={page.rows[2][0]} text={page.rows[2][1]} image="/images/gallery-hmt-1.webp" caption={page.rows[2][2]} />
    <section className="inner-section experience-gallery"><p className="eyebrow">GALLERY</p><h2>{page.gallery}</h2><div className="editorial-gallery"><figure className="portrait"><Image src="/images/gallery-western-4.webp" alt={page.gallery} fill sizes="(max-width:700px) 92vw,35vw" /></figure><figure><Image src="/audience-ritual.jpg" alt={page.gallery} fill sizes="(max-width:700px) 92vw,55vw" /></figure><figure><Image src="/sleeve-dance.jpg" alt={page.gallery} fill sizes="(max-width:700px) 46vw,28vw" /></figure><figure><Image src="/hero-red.jpg" alt={page.gallery} fill sizes="(max-width:700px) 46vw,28vw" /></figure></div></section>
    <DetailFaq title={page.before} note={page.note} items={page.faq.map(([question, answer]) => [question, answer] as const)} />
  </InnerPageShell>;
}
