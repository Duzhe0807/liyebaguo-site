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
    : [
      ["01", "文化灵感", "巴渝待客方式、地方风味与重庆城市气质构成项目起点。"],
      ["02", "舞台语言", "音乐、编舞与视觉场景将文化线索转译为当代表演。"],
      ["03", "华服与餐桌", "服装、器皿、上菜节奏与宾客互动被放进同一套体验系统。"],
      ["04", "一席发生", "每一晚由演员、服务团队与入席宾客共同完成这场礼宴。"],
    ];

  return <InnerPageShell lang={lang} eyebrow="OUR STORY" title={en ? "Where History Comes to the Table" : "让历史入席，让巴渝被看见"} summary={en ? "Ba Kingdom Banquet translates Ba-Yu culture into an evening of performance, ceremony, regional cuisine and dress." : "礼宴巴国以巴渝文化为灵感，用舞台、礼仪、地方风味与华服，共同讲述一晚的重庆故事。"} image="/images/gallery-western-3.webp">
    <section className="inner-section story-origin"><div><p className="eyebrow">{en ? "THE IDEA" : "缘起"}</p><h2>{en ? "Not a museum display — a shared table" : "不是陈列文化，而是共同入席"}</h2><p>{en ? "The project begins with a simple question: can visitors understand a place not only by reading about it, but by tasting, hearing and taking part in it? Hospitality became the thread connecting performance, food and costume." : "项目从一个简单的问题开始：人们能否不只通过阅读了解一座城市，而是在味道、声音与参与中感受它？于是，待客之礼成为连接演出、饮食与华服的线索。"}</p></div><figure><Image src="/images/gallery-sea-3.webp" alt={en ? "Guests and performers at the venue" : "宾客与演员在现场互动"} fill sizes="(max-width:800px) 92vw,50vw" /></figure></section>
    <section className="inner-section team-section"><p className="eyebrow">{en ? "THE TEAM" : "幕后团队"}</p><h2>{en ? "People behind the evening" : "让这一晚成立的人"}</h2><div className="team-grid"><figure><Image src="/images/gallery-western-2.webp" alt={en ? "Performers preparing" : "演员准备中"} fill sizes="(max-width:760px) 92vw,28vw" /><figcaption>{en ? "Performers & storytellers" : "演员与叙事者"}</figcaption></figure><figure><Image src="/images/gallery-sea-2.webp" alt={en ? "Service team" : "服务团队"} fill sizes="(max-width:760px) 92vw,28vw" /><figcaption>{en ? "Hospitality team" : "接待团队"}</figcaption></figure><figure><Image src="/images/gallery-western-3.webp" alt={en ? "Creative team" : "创意团队"} fill sizes="(max-width:760px) 92vw,28vw" /><figcaption>{en ? "Creative direction" : "创意统筹"}</figcaption></figure></div></section>
    <section className="inner-section making-grid"><p className="eyebrow">{en ? "FOUR DISCIPLINES" : "四艺合一"}</p><h2>{en ? "Four disciplines, one evening" : "四种设计，共同完成一晚"}</h2><div>{disciplines.map(([icon, title, text]) => <article key={title}><span>{icon}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="inner-section vertical-timeline">
      <div className="section-header">
        <p className="eyebrow">{en ? "FROM INSPIRATION TO BANQUET" : "从灵感到餐桌"}</p>
        <h2>{en ? "How the story reaches the table" : "故事如何抵达餐桌"}</h2>
      </div>
      <div className="timeline-grid">{timeline.map(([number, title, text]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
    </section>
    <section className="inner-section backstage-gallery"><p className="eyebrow">{en ? "BEHIND THE EVENING" : "幕后片段"}</p><h2>{en ? "People complete the scene" : "最终让场景成立的，是现场的人"}</h2><div><figure><Image src="/images/gallery-western-2.webp" alt={en ? "Banquet performance atmosphere" : "宴席演出氛围"} fill sizes="55vw" /></figure><figure><Image src="/images/gallery-sea-2.webp" alt={en ? "Outdoor guest gathering" : "户外宾客互动"} fill sizes="35vw" /></figure><figure><Image src="/images/gallery-western-3.webp" alt={en ? "Guests and performers on stage" : "宾客与演员舞台合影"} fill sizes="35vw" /></figure></div></section>
    <DetailFaq title={en ? "About the brand" : "关于品牌"} items={en ? [["Is this a historical reenactment?", "It is a contemporary cultural interpretation rather than a literal reconstruction."], ["Where is the experience based?", "In Baguocheng, Jiulongpo District, Chongqing."]] : [["这是历史复原演出吗？", "这是当代文化表达，并非对某一历史时期的原样复刻。"], ["体验位于哪里？", "位于重庆市九龙坡区巴国城。"]]} />
  </InnerPageShell>;
}
