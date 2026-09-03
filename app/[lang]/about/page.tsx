import Image from "next/image";
import type { Metadata } from "next";
import { languages, type Lang } from "../../languages";
import { siteSeo, getCanonicalPath, getHreflang } from "../../seo";
import { InnerPageShell, DetailFaq } from "../InnerPageShell";

export function generateStaticParams() { return languages.map((lang) => ({ lang })); }
export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> { const { lang } = await params; const seo = siteSeo[lang].about; return { title: seo.title, description: seo.description, alternates: { canonical: getCanonicalPath(lang, "about"), languages: getHreflang("about") } }; }

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params; const en = lang === "en";
  const disciplines = en
    ? [
      ["舞", "Stage & choreography", "Movement is arranged around the dining space so the performance remains close to the guest."],
      ["衣", "Costume", "Colour, silhouette and ornament help each scene remain legible in changing light."],
      ["乐", "Music", "Rhythm supports the transitions between welcome, dining and theatrical scenes."],
      ["味", "Cuisine", "Serving order and flavour intensity move with the emotional pace of the evening."],
    ]
    : lang === "ja" ? [["舞", "舞台・振付", "客席の近くで物語を感じられるよう、動きを食事空間に配置します。"], ["衣", "衣装", "色、輪郭、装飾が場面と照明を引き立てます。"], ["楽", "音楽", "お出迎え、宴席、公演の場面をリズムでつなぎます。"], ["味", "料理", "提供順と味の強弱を一夜の物語に合わせます。"]]
    : lang === "ko" ? [["무", "무대·안무", "공연이 방문객 가까이에서 이어지도록 움직임을 식사 공간에 배치합니다."], ["의", "의상", "색상, 실루엣과 장식이 장면과 조명을 선명하게 만듭니다."], ["악", "음악", "환영, 식사와 공연 장면을 리듬으로 연결합니다."], ["미", "요리", "서빙 순서와 맛의 흐름을 저녁의 감정선에 맞춥니다."]]
    : [
      ["舞", "舞美与编舞", "动作围绕用餐空间展开，让表演始终与宾客保持近距离。"],
      ["衣", "服装造型", "以色彩、轮廓和发饰回应不同场景与灯光。"],
      ["乐", "音乐叙事", "音乐节奏连接迎宾、入席与演出段落。"],
      ["味", "菜品节奏", "上菜顺序与味道浓淡随整晚情绪逐步展开。"],
    ];
  const timeline = en
    ? [
      ["01", "Cultural inspiration", "Ba-Yu hospitality, local flavour and the atmosphere of Chongqing form the starting point."],
      ["02", "Stage language", "Music, choreography and visual scenes turn cultural references into a contemporary performance."],
      ["03", "Costume & table", "Dress, tableware, serving rhythm and guest interaction are designed as one system."],
      ["04", "A living banquet", "The final work is completed each evening by the performers, service team and guests around the table."],
    ]
    : lang === "ja" ? [["01", "文化からの着想", "巴渝のおもてなし、地方の味、重慶の雰囲気が出発点です。"], ["02", "舞台表現", "音楽、振付、映像で文化の要素を現代の公演へ変換します。"], ["03", "衣装と食卓", "衣装、器、配膳、交流を一つの体験として設計します。"], ["04", "生きた宴席", "出演者、サービスチーム、来場者が毎夜一緒に完成させます。"]]
    : lang === "ko" ? [["01", "문화적 영감", "파위의 환대, 지역의 맛과 충칭의 분위기에서 시작합니다."], ["02", "무대 언어", "음악, 안무와 장면으로 문화적 요소를 현대 공연으로 풀어냅니다."], ["03", "의상과 식탁", "의상, 기물, 서빙 흐름과 방문객 참여를 하나의 체험으로 설계합니다."], ["04", "살아 있는 연회", "배우, 서비스팀과 방문객이 매일 밤 함께 완성합니다."]]
    : [
      ["01", "文化灵感", "巴渝待客方式、地方风味与重庆城市气质构成项目起点。"],
      ["02", "舞台语言", "音乐、编舞与视觉场景将文化线索转译为当代表演。"],
      ["03", "华服与餐桌", "服装、器皿、上菜节奏与宾客互动被放进同一套体验系统。"],
      ["04", "一席发生", "每一晚由演员、服务团队与入席宾客共同完成这场礼宴。"],
    ];

  const page = en ? { title: "Where History Comes to the Table", summary: "Ba Kingdom Banquet translates Ba-Yu culture into an evening of performance, ceremony, regional cuisine and dress.", idea: "THE IDEA", ideaTitle: "Not a museum display — a shared table", ideaText: "Can visitors understand a place by tasting, hearing and taking part in it? Hospitality connects performance, food and costume.", team: "THE TEAM", teamTitle: "People behind the evening", teamLabels: ["Performers & storytellers", "Hospitality team", "Creative direction"], disciplines: "FOUR DISCIPLINES", disciplinesTitle: "Four disciplines, one evening", timeline: "FROM INSPIRATION TO BANQUET", timelineTitle: "How the story reaches the table", behind: "BEHIND THE EVENING", behindTitle: "People complete the scene", faqTitle: "About the brand", faq: [["Is this a historical reenactment?", "It is a contemporary cultural interpretation rather than a literal reconstruction."], ["Where is the experience based?", "In Baguocheng, Jiulongpo District, Chongqing."]] }
    : lang === "ja" ? { title: "歴史を食卓へ、巴渝を目の前に", summary: "巴渝文化を舞台、儀礼、地方料理、華服で表現する重慶の一夜です。", idea: "発想", ideaTitle: "展示ではなく、同じ食卓を囲む", ideaText: "味わい、聴き、参加することで街を知ることはできるのか。おもてなしが公演、料理、衣装を結びます。", team: "チーム", teamTitle: "一夜を支える人々", teamLabels: ["出演者・語り手", "接遇チーム", "クリエイティブ統括"], disciplines: "四つの表現", disciplinesTitle: "四つの設計でつくる一夜", timeline: "着想から宴席まで", timelineTitle: "物語が食卓に届くまで", behind: "舞台裏", behindTitle: "人が場面を完成させる", faqTitle: "ブランドについて", faq: [["歴史を忠実に再現した公演ですか？", "原寸の再現ではなく、現代的な文化表現です。"], ["会場はどこですか？", "重慶市九龍坡区の巴国城です。"]] }
    : lang === "ko" ? { title: "역사를 식탁으로, 파위를 눈앞에", summary: "파위 문화를 무대, 의식, 지역 요리와 전통 의상으로 풀어낸 충칭의 밤입니다.", idea: "시작", ideaTitle: "전시가 아닌, 함께 앉는 식탁", ideaText: "맛보고 듣고 참여하며 도시를 이해할 수 있을까요? 환대가 공연, 음식과 의상을 하나로 연결합니다.", team: "팀", teamTitle: "이 밤을 만드는 사람들", teamLabels: ["배우·이야기 전달자", "서비스팀", "크리에이티브 디렉션"], disciplines: "네 가지 예술", disciplinesTitle: "네 가지 설계가 만드는 한밤", timeline: "영감에서 연회까지", timelineTitle: "이야기가 식탁에 도착하는 과정", behind: "무대 뒤", behindTitle: "사람이 장면을 완성합니다", faqTitle: "브랜드 소개", faq: [["역사를 그대로 재현한 공연인가요?", "문자 그대로의 복원이 아닌 현대적인 문화 해석입니다."], ["체험 장소는 어디인가요?", "충칭시 주룽포구 바궈청입니다."]] }
    : { title: "让历史入席，让巴渝被看见", summary: "礼宴巴国以巴渝文化为灵感，用舞台、礼仪、地方风味与华服，共同讲述一晚的重庆故事。", idea: "缘起", ideaTitle: "不是陈列文化，而是共同入席", ideaText: "人们能否在味道、声音与参与中感受一座城市？待客之礼成为连接演出、饮食与华服的线索。", team: "幕后团队", teamTitle: "让这一晚成立的人", teamLabels: ["演员与叙事者", "接待团队", "创意统筹"], disciplines: "四艺合一", disciplinesTitle: "四种设计，共同完成一晚", timeline: "从灵感到餐桌", timelineTitle: "故事如何抵达餐桌", behind: "幕后片段", behindTitle: "最终让场景成立的，是现场的人", faqTitle: "关于品牌", faq: [["这是历史复原演出吗？", "这是当代文化表达，并非对某一历史时期的原样复刻。"], ["体验位于哪里？", "位于重庆市九龙坡区巴国城。"]] };

  return <InnerPageShell lang={lang} eyebrow="OUR STORY" title={page.title} summary={page.summary} image="/images/gallery-western-3.webp">
    <section className="inner-section story-origin"><div><p className="eyebrow">{page.idea}</p><h2>{page.ideaTitle}</h2><p>{page.ideaText}</p></div><figure><Image src="/images/gallery-sea-3.webp" alt={page.ideaTitle} fill sizes="(max-width:800px) 92vw,50vw" /></figure></section>
    <section className="inner-section team-section"><p className="eyebrow">{page.team}</p><h2>{page.teamTitle}</h2><div className="team-grid">{["/images/gallery-western-2.webp", "/images/gallery-sea-2.webp", "/images/gallery-western-3.webp"].map((src, index) => <figure key={src}><Image src={src} alt={page.teamLabels[index]} fill sizes="(max-width:760px) 92vw,28vw" /><figcaption>{page.teamLabels[index]}</figcaption></figure>)}</div></section>
    <section className="inner-section making-grid"><p className="eyebrow">{page.disciplines}</p><h2>{page.disciplinesTitle}</h2><div>{disciplines.map(([icon, title, text]) => <article key={title}><span>{icon}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="inner-section vertical-timeline">
      <div className="section-header">
        <p className="eyebrow">{page.timeline}</p>
        <h2>{page.timelineTitle}</h2>
      </div>
      <div className="timeline-grid">{timeline.map(([number, title, text]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
    </section>
    <section className="inner-section backstage-gallery"><p className="eyebrow">{page.behind}</p><h2>{page.behindTitle}</h2><div><figure><Image src="/images/gallery-western-2.webp" alt={page.behindTitle} fill sizes="55vw" /></figure><figure><Image src="/images/gallery-sea-2.webp" alt={page.behindTitle} fill sizes="35vw" /></figure><figure><Image src="/images/gallery-western-3.webp" alt={page.behindTitle} fill sizes="35vw" /></figure></div></section>
    <DetailFaq title={page.faqTitle} items={page.faq.map(([question, answer]) => [question, answer] as const)} />
  </InnerPageShell>;
}
