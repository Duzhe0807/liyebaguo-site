import Image from "next/image";
import type { Metadata } from "next";
import { languages, type Lang } from "../../languages";
import { siteSeo, getCanonicalPath, getHreflang } from "../../seo";
import { InnerPageShell, DetailFaq } from "../InnerPageShell";

export function generateStaticParams() { return languages.map((lang) => ({ lang })); }
export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  const seo = siteSeo[lang].banquetMenu;
  return { title: seo.title, description: seo.description, alternates: { canonical: getCanonicalPath(lang, "banquet-menu"), languages: getHreflang("banquet-menu") } };
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const en = lang === "en";
  const dishes = en
    ? [
      ["Plum Pu’er Wine", "A bright opening with tea fragrance", "welcome"],
      ["White Peony Tea", "A clean, floral pause before the meal", "tea"],
      ["Nine-Tinted Agate Cup", "Delicate appetizer in a traditional vessel", "welcome"],
      ["Four Tastes of Yuzhou", "Four appetizing small plates of Chongqing", "guest & vip"],
      ["Six Candies Under the Eaves", "Six refined sweets and tea snacks", "svip"],
      ["Signature Clear Chicken Broth", "Warm and delicate, with three dipping sauces", "broth"],
      ["Five Fragrances of the Banquet", "Five fragrant dishes setting the banquet tone", "welcome"],
      ["Shang-Zhou: Cloud Sacrifice", "Ancient ritual performance", "performance"],
      ["Phoenix-Eyebrow Delicacy", "An exquisite mid-banquet dish", "main"],
      ["Wei-Jin: Dancing in Clogs", "Wei-Jin elegance performance", "performance"],
      ["Ba Mountain Mushrooms & Wagyu", "Earthy mushrooms with premium wagyu", "wagyu"],
      ["Han-Tang: The King Arrives", "Han-Tang imperial performance", "performance"],
      ["Organic Seasonal Vegetables", "Fresh organic vegetable platter", "vegetarian"],
      ["Song: Great Contentment", "Song dynasty cultural performance", "performance"],
      ["Cheese Tomato Pork Chop Rice", "Satisfying savoury rice dish", "staple"],
      ["Ming: Heroines in Beacon Fire", "Ming dynasty heroic performance", "performance"],
      ["Chilled Milk Dessert & Fruit", "Cool dessert with fresh fruit", "dessert"],
      ["Modern: Legends of Yuzhou Boats", "Modern Chongqing river performance", "performance"],
    ]
    : [
      ["巴渝精萃青梅普洱酒", "果香与茶香开启宴席", "迎宾"],
      ["经典高山白牡丹", "清雅花香，为入席留一段停顿", "茶饮"],
      ["九霞璎珞盏", "以传统器皿承装的精致前菜", "迎宾"],
      ["渝州四韵（提篮四小碟）", "四种风味的重庆开胃小碟", "嘉宾·贵宾"],
      ["星檐六饴", "六道精致甜点与茶点", "SVIP"],
      ["招牌清鸡汤（配蘸料三味碟）", "温润清鲜，配三味蘸料", "汤品"],
      ["清筵五馥", "五道清香小菜营造宴席氛围", "迎宾"],
      ["商周·巴山云祭", "上古祭祀主题表演", "演出"],
      ["凤韵锦眉肴", "宴席中段精致菜肴", "主菜"],
      ["魏晋·踏歌响屐", "魏晋风骨主题表演", "演出"],
      ["巴山野菌素食拼和牛", "山野菌菇与和牛的搭配", "牛肉"],
      ["汉唐·王上驾到", "汉唐盛世主题表演", "演出"],
      ["生机盎然有机蔬菜拼", "新鲜有机蔬菜组合", "素食"],
      ["宋·心中大足", "宋代文化主题表演", "演出"],
      ["芝士茄汁猪扒饭", "咸香主食", "主食"],
      ["明·烽火巾帼", "明代英雄主题表演", "演出"],
      ["酒糟冻奶鲜果", "清凉甜品与鲜果", "甜品"],
      ["近代·渝州船说", "近代重庆主题表演", "演出"],
    ];
  const dishPhotos = ["dish-steaming.jpg", "dish-sweets.jpg", "dish-dessert.png", "dish-appetizer.png", "dish-soup.png", "dish-platter.png"];
  const dietaryTags = en
    ? [
      ["Vegetarian options", "Available on request before payment."],
      ["Allergies", "Must be declared at booking."],
      ["Children", "Portion sizes and needs shared at booking."],
    ]
    : [
      ["素食安排", "请于付款前说明，由场地方确认。"],
      ["过敏备注", "请于预约时一并说明。"],
      ["儿童用餐", "请于预约时说明儿童年龄与饮食需求。"],
    ];

  return <InnerPageShell lang={lang} eyebrow="BANQUET MENU" title={en ? "A Ba-Yu Banquet at the Centre of the Show" : "演艺美馔 · 巴渝风味宴席"} summary={en ? "Local flavour and ceremonial hospitality meet in a paced menu served alongside the performance." : "菜单不只是菜名罗列，而是与演出节奏同步展开的巴渝待客之礼。"} image="/images/banquet/service-procession.jpg">
    <section className="inner-section menu-intro">
      <div><p className="eyebrow">THE BANQUET</p><h2>{en ? "A table designed as part of the performance" : "让宴席成为演出的一部分"}</h2><p>{en ? "Serving rhythm, table setting and guest interaction are considered together, so the meal feels connected to the story rather than placed beside it." : "上菜节奏、餐桌陈设与宾客互动被放在同一条叙事线上，让味道与舞台相互回应。"}</p></div>
      <figure><Image src="/images/banquet/service-table.png" alt={en ? "Serving a guest at the banquet table" : "宴席现场上菜服务"} fill sizes="(max-width:800px) 92vw,52vw" /></figure>
    </section>
    <section className="inner-section banquet-dish-gallery"><p className="eyebrow">{en ? "DISH DETAILS" : "菜品实拍"}</p><h2>{en ? "Flavours served with ceremony" : "风味入席，一菜一景"}</h2><div className="dish-card-grid">{dishes.map(([name, desc, tag]) => <article key={name}><span className="dish-tag">{tag}</span><h3>{name}</h3><p>{desc}</p></article>)}</div></section>
    <section className="inner-section food-gallery"><p className="eyebrow">{en ? "AT THE TABLE" : "宴席现场"}</p><h2>{en ? "The banquet in full view" : "上菜仪式与用餐氛围"}</h2><div className="food-gallery-grid"><figure className="main"><Image src="/images/banquet/service-procession.jpg" alt={en ? "Ceremonial serving procession" : "宴席上菜仪式"} fill sizes="(max-width:760px) 92vw,58vw" /></figure><figure><Image src="/images/banquet/service-ritual.webp" alt={en ? "Dishes presented during the performance" : "演出中的菜品呈现"} fill sizes="(max-width:760px) 92vw,34vw" /></figure><figure><Image src="/images/banquet/service-table.png" alt={en ? "Table-side banquet service" : "宴席桌边服务"} fill sizes="(max-width:760px) 92vw,34vw" /></figure></div></section>
    <div className="menu-support-grid">
      <section className="inner-section dietary-panel"><p className="eyebrow">{en ? "DIETARY NEEDS" : "饮食需求"}</p><h2>{en ? "Tell us before the kitchen prepares" : "有饮食需求，请提前说明"}</h2><div className="dietary-card-grid">{dietaryTags.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>
      <DetailFaq title={en ? "Menu questions" : "菜单常见问题"} items={en ? [["Is the menu fixed?", "Dishes may vary by season and selected package."], ["Can allergies be accommodated?", "Submit full details before payment so the venue can confirm."], ["Is costume included with a ticket?", "SVIP includes traditional costume and traditional headwear."]] : [["菜单是否固定？", "菜品可能随季节及所选套餐调整。"], ["过敏或忌口可以处理吗？", "请在付款前提供完整信息，由场地方确认。"], ["餐票是否包含古装？", "SVIP 席位赠送古装服饰和古装头饰。"]]} />
    </div>
  </InnerPageShell>;
}
