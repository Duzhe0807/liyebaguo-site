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
  const chapters = en
    ? [["I", "Welcome tea & wine", "Tea, fruit wine and ceremonial sweets open the evening."], ["II", "The Ba-Yu table", "Broth, seasonal vegetables and mountain ingredients follow the show rhythm."], ["III", "Main & finish", "Rich savoury courses lead into rice, fruit and a chilled dessert."]]
    : [["壹", "迎宾茶酒", "以茶、果酒与宴前茶点开启这一席待客之礼。"], ["贰", "巴渝宴席", "汤品、时蔬与山野食材随演出节奏依次上桌。"], ["叁", "主食收宴", "浓郁主菜之后，以米饭、鲜果与清甜收尾。"]];
  const dishes = en
    ? [["Plum Pu’er Wine", "A bright opening with tea fragrance", "welcome"], ["White Peony Tea", "A clean, floral pause before the meal", "tea"], ["Clear Chicken Broth", "Warm and delicate", "broth"], ["Seasonal Vegetables", "Prepared to the season", "vegetarian"], ["Ba Mountain Mushrooms", "Earthy mountain flavour", "vegetarian"], ["Wagyu Pairing", "A richer main-course moment", "meat"], ["Pork Chop Rice", "A satisfying savoury finish", "contains pork"], ["Chilled Milk Dessert", "Cool, soft and lightly sweet", "dairy"], ["Seasonal Fruit", "Fresh closing notes", "fruit"]]
    : [["青梅普洱酒", "果香与茶香开启宴席", "迎宾"], ["高山白牡丹", "清雅花香，为入席留一段停顿", "茶饮"], ["清鸡汤", "温润清鲜的宴席前奏", "汤品"], ["时令蔬菜", "随季节调整的新鲜搭配", "素食"], ["巴山野菌", "山野香气与巴渝风味", "素食"], ["和牛搭配", "宴席中段更浓郁的主菜", "牛肉"], ["猪排饭", "饱满咸香的主食收束", "含猪肉"], ["酒酿冻奶", "清凉柔滑的甜品", "含乳"], ["时令鲜果", "以清爽果香结束宴席", "鲜果"]];
  const dishPhotos = ["dish-steaming.jpg", "dish-sweets.jpg", "dish-dessert.png", "dish-appetizer.png", "dish-soup.png", "dish-platter.png"];

  return <InnerPageShell lang={lang} eyebrow="BANQUET MENU" title={en ? "A Ba-Yu Banquet at the Centre of the Show" : "演艺美馔 · 巴渝风味宴席"} summary={en ? "Local flavour and ceremonial hospitality meet in a paced menu served alongside the performance." : "菜单不只是菜名罗列，而是与演出节奏同步展开的巴渝待客之礼。"} image="/images/banquet/service-procession.jpg">
    <section className="inner-section menu-intro">
      <div><p className="eyebrow">THE BANQUET</p><h2>{en ? "A table designed as part of the performance" : "让宴席成为演出的一部分"}</h2><p>{en ? "Serving rhythm, table setting and guest interaction are considered together, so the meal feels connected to the story rather than placed beside it." : "上菜节奏、餐桌陈设与宾客互动被放在同一条叙事线上，让味道与舞台相互回应。"}</p></div>
      <figure><Image src="/images/banquet/service-table.png" alt={en ? "Serving a guest at the banquet table" : "宴席现场上菜服务"} fill sizes="(max-width:800px) 92vw,52vw" /></figure>
    </section>
    <section className="inner-section menu-chapters"><p className="eyebrow">THREE MOVEMENTS</p><h2>{en ? "A menu in three movements" : "一席三章，循序上菜"}</h2><div>{chapters.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="inner-section food-gallery"><p className="eyebrow">AT THE TABLE</p><h2>{en ? "The banquet in full view" : "宴席现场与上菜氛围"}</h2><div><figure><Image src="/images/banquet/service-procession.jpg" alt={en ? "Ceremonial serving procession" : "宴席上菜仪式"} fill sizes="(max-width:760px) 92vw,58vw" /></figure><figure><Image src="/images/banquet/service-ritual.webp" alt={en ? "Dishes presented during the performance" : "演出中的菜品呈现"} fill sizes="(max-width:760px) 92vw,34vw" /></figure><figure><Image src="/images/banquet/service-table.png" alt={en ? "Table-side banquet service" : "宴席桌边服务"} fill sizes="(max-width:760px) 92vw,34vw" /></figure></div></section>
    <section className="inner-section banquet-dish-gallery"><p className="eyebrow">DISH DETAILS</p><h2>{en ? "Flavours served with ceremony" : "菜品实拍 · 风味入席"}</h2><div>{dishPhotos.map((photo, index) => <figure key={photo}><Image src={`/images/banquet/${photo}`} alt={en ? `Banquet dish presentation ${index + 1}` : `宴席菜品实拍 ${index + 1}`} fill sizes="(max-width:760px) 92vw,33vw" /></figure>)}</div></section>
    <div className="menu-support-grid">
      <section className="inner-section dietary-panel"><p className="eyebrow">DIETARY NEEDS</p><h2>{en ? "Tell us before the kitchen prepares" : "有饮食需求，请提前说明"}</h2><div><article><span>01</span><h3>{en ? "Allergies" : "过敏与忌口"}</h3><p>{en ? "List ingredients that must be avoided when booking." : "预约时写明必须避开的食材。"}</p></article><article><span>02</span><h3>{en ? "Vegetarian needs" : "素食需求"}</h3><p>{en ? "Submit the request before payment for confirmation." : "付款前提交，由场地方确认可安排内容。"}</p></article><article><span>03</span><h3>{en ? "Children" : "儿童用餐"}</h3><p>{en ? "Add the child’s age and dining needs to the request." : "请在预约中说明儿童年龄和用餐需求。"}</p></article></div></section>
      <DetailFaq title={en ? "Menu questions" : "菜单常见问题"} items={en ? [["Is the menu fixed?", "Dishes may vary by season and selected package."], ["Can allergies be accommodated?", "Submit full details before payment so the venue can confirm."], ["Is costume styling part of the menu ticket?", "Only the SVIP ticket lists costume styling and one retouched photograph."]] : [["菜单是否固定？", "菜品可能随季节及所选套餐调整。"], ["过敏或忌口可以处理吗？", "请在付款前提供完整信息，由场地方确认。"], ["餐票是否包含华服？", "尊享席包含华服妆造与精修照片一张。"]]} />
    </div>
  </InnerPageShell>;
}
