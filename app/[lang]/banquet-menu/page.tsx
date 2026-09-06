import Image from "next/image";
import type { Metadata } from "next";
import { languages, type Lang } from "../../languages";
import { pageMetadata } from "../../seo";
import { InnerPageShell, DetailFaq } from "../InnerPageShell";

export function generateStaticParams() { return languages.map((lang) => ({ lang })); }
export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata(lang, "banquetMenu");
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
    : lang === "ko" ? [
      ["매실 보이차주", "과일 향과 차 향으로 연회를 시작합니다", "환영"],
      ["고산 백모란차", "맑은 꽃향의 차", "차"],
      ["구하영락잔", "전통 그릇에 담은 섬세한 전채", "환영"],
      ["위저우 네 가지 맛", "충칭의 네 가지 애피타이저", "일반·VIP"],
      ["처마 아래 여섯 다과", "여섯 가지 디저트와 차 간식", "SVIP"],
      ["시그니처 맑은 닭육수", "세 가지 소스를 곁들인 부드러운 국물", "국물"],
      ["연회의 다섯 향", "연회 분위기를 여는 다섯 가지 요리", "환영"],
      ["상주 · 파산 운제", "고대 제례 테마 공연", "공연"],
      ["봉운 금미 요리", "연회 중반의 정교한 요리", "메인"],
      ["위진 · 답가향극", "위진 시대의 풍류를 담은 공연", "공연"],
      ["파산 버섯과 와규", "산지 버섯과 고급 와규", "소고기"],
      ["한당 · 왕의 행차", "한당 황실 테마 공연", "공연"],
      ["유기농 제철 채소", "신선한 유기농 채소 모둠", "채식"],
      ["송 · 마음속 대족", "송나라 문화 테마 공연", "공연"],
      ["치즈 토마토 돈가스 덮밥", "든든한 식사 요리", "식사"],
      ["명 · 봉화의 여걸", "명나라 영웅 테마 공연", "공연"],
      ["차가운 우유 디저트와 과일", "신선한 과일을 곁들인 디저트", "디저트"],
      ["근대 · 위저우 뱃이야기", "근대 충칭 강 문화를 담은 공연", "공연"],
    ] : [
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
    : lang === "ja" ? [["ベジタリアン対応", "お支払い前にご相談ください。"], ["アレルギー", "予約時に必ずお知らせください。"], ["お子様のお食事", "年齢と食事のご希望を予約時にお知らせください。"]]
    : lang === "ko" ? [["채식 옵션", "결제 전에 요청해 주세요."], ["알레르기", "예약 시 반드시 알려주세요."], ["어린이 식사", "예약 시 나이와 식사 요청을 알려주세요."]]
    : [
      ["素食安排", "请于付款前说明，由场地方确认。"],
      ["过敏备注", "请于预约时一并说明。"],
      ["儿童用餐", "请于预约时说明儿童年龄与饮食需求。"],
    ];

  const page = en ? { title: "Chongqing Banquet Menu at Liyan Baguo", summary: "Regional Sichuan and Chongqing flavours accompany the Banquet of Ba Kingdom at Liyan Baguo. Explore the dishes below for your lunch or dinner visit, then confirm your package and any family, group or dietary requirements with the team before booking.", tableTitle: "A table designed as part of the performance", tableText: "Serving rhythm, table setting and guest interaction are considered together, so the meal feels connected to the story rather than placed beside it.", dishes: "DISH DETAILS", flavours: "Flavours served with ceremony", atTable: "AT THE TABLE", atmosphere: "The banquet in full view", needs: "DIETARY NEEDS", needsTitle: "Tell us before the kitchen prepares", faqTitle: "Menu questions", faq: [["Is the menu fixed?", "Dishes may vary by season and selected package."], ["Can allergies be accommodated?", "Submit full details before payment so the venue can confirm."], ["Is costume included with a ticket?", "SVIP includes traditional costume and traditional headwear."]] }
    : lang === "ja" ? { title: "演芸と美食 · 巴渝の宴席", summary: "地方の味と礼を尽くすおもてなしを、公演に合わせたコースでお楽しみください。", tableTitle: "宴席も公演の一部に", tableText: "料理を出すリズム、卓上のしつらえ、交流を一つの物語として構成しています。", dishes: "料理のご紹介", flavours: "一皿ごとに広がる巴渝の味", atTable: "宴席の様子", atmosphere: "料理と公演が交わる空間", needs: "食事のご要望", needsTitle: "調理前にお知らせください", faqTitle: "メニューのよくある質問", faq: [["メニューは固定ですか？", "季節とプランにより料理が変わる場合があります。"], ["アレルギーに対応できますか？", "お支払い前に詳細をお知らせください。"], ["衣装は含まれますか？", "SVIPには伝統衣装と髪飾りが含まれます。"]] }
    : lang === "ko" ? { title: "공연과 미식 · 파위 연회", summary: "지역의 맛과 의식적인 환대가 공연 흐름에 맞춘 코스로 이어집니다.", tableTitle: "공연의 일부로 설계된 식탁", tableText: "요리 제공 순서, 테이블 연출과 방문객 참여를 하나의 이야기로 구성했습니다.", dishes: "요리 소개", flavours: "의식과 함께 즐기는 파위의 맛", atTable: "연회 현장", atmosphere: "요리와 공연이 어우러지는 공간", needs: "식이 요청", needsTitle: "조리 전에 알려주세요", faqTitle: "메뉴 자주 묻는 질문", faq: [["메뉴는 고정인가요?", "계절과 선택한 패키지에 따라 요리가 달라질 수 있습니다."], ["알레르기 대응이 가능한가요?", "결제 전에 상세 내용을 알려주세요."], ["티켓에 의상이 포함되나요?", "SVIP에는 전통 의상과 머리 장식이 포함됩니다."]] }
    : { title: "演艺美馔 · 巴渝风味宴席", summary: "菜单不只是菜名罗列，而是与演出节奏同步展开的巴渝待客之礼。", tableTitle: "让宴席成为演出的一部分", tableText: "上菜节奏、餐桌陈设与宾客互动被放在同一条叙事线上，让味道与舞台相互回应。", dishes: "菜品实拍", flavours: "风味入席，一菜一景", atTable: "宴席现场", atmosphere: "上菜仪式与用餐氛围", needs: "饮食需求", needsTitle: "有饮食需求，请提前说明", faqTitle: "菜单常见问题", faq: [["菜单是否固定？", "菜品可能随季节及所选套餐调整。"], ["过敏或忌口可以处理吗？", "请在付款前提供完整信息，由场地方确认。"], ["餐票是否包含古装？", "SVIP 席位赠送古装服饰和古装头饰。"]] };

  return <InnerPageShell lang={lang} eyebrow="BANQUET MENU" title={page.title} summary={page.summary} image="/images/banquet/service-procession.jpg">
    <section className="inner-section menu-intro">
      <div><p className="eyebrow">THE BANQUET</p><h2>{page.tableTitle}</h2><p>{page.tableText}</p></div>
      <figure><Image src="/images/banquet/service-table.png" alt={page.tableTitle} fill sizes="(max-width:800px) 92vw,52vw" /></figure>
    </section>
    <section className="inner-section banquet-dish-gallery"><p className="eyebrow">{page.dishes}</p><h2>{page.flavours}</h2><div className="dish-card-grid">{dishes.map(([name, desc, tag]) => <article key={name}><span className="dish-tag">{tag}</span><h3>{name}</h3><p>{desc}</p></article>)}</div></section>
    <section className="inner-section food-gallery"><p className="eyebrow">{page.atTable}</p><h2>{page.atmosphere}</h2><div className="food-gallery-grid"><figure className="main"><Image src="/images/banquet/service-procession.jpg" alt={page.atmosphere} fill sizes="(max-width:760px) 92vw,58vw" /></figure><figure><Image src="/images/banquet/service-ritual.webp" alt={page.atmosphere} fill sizes="(max-width:760px) 92vw,34vw" /></figure><figure><Image src="/images/banquet/service-table.png" alt={page.atmosphere} fill sizes="(max-width:760px) 92vw,34vw" /></figure></div></section>
    <div className="menu-support-grid">
      <section className="inner-section dietary-panel"><p className="eyebrow">{page.needs}</p><h2>{page.needsTitle}</h2><div className="dietary-card-grid">{dietaryTags.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>
      <DetailFaq title={page.faqTitle} items={page.faq.map(([question, answer]) => [question, answer] as const)} />
    </div>
  </InnerPageShell>;
}
