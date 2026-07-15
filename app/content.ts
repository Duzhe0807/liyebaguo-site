import type { Lang } from "./languages";

export interface Content {
  brandName: string;
  brandRoman: string;
  navExperience: string;
  navBanquet: string;
  navCostume: string;
  navVisit: string;
  navAbout: string;
  heroEyebrow: string;
  heroTitleA: string;
  heroTitleB: string;
  heroBrand: string;
  heroCopy: string;
  ritualOne: string;
  ritualTwo: string;
  ritualThree: string;
  ritualFour: string;
  bookCta: string;
  trailerCta: string;
  scrollCue: string;
  dateLabel: string;
  guestLabel: string;
  guestTwo: string;
  guestFour: string;
  guestGroup: string;
  languageLabel: string;
  seatStandard: string;
  seatVip: string;
  seatGroup: string;
  requestCta: string;
  factDuration: string;
  factCuisine: string;
  factCostume: string;
  factLanguage: string;
  featureOneTitle: string;
  featureOneCjk: string;
  featureOneCopy: string;
  featureTwoTitle: string;
  featureTwoCjk: string;
  featureTwoCopy: string;
  featureThreeTitle: string;
  featureThreeCjk: string;
  featureThreeCopy: string;
  discoverLink: string;
  journeyEyebrow: string;
  journeyTitle: string;
  stepOne: string;
  stepTwo: string;
  stepThree: string;
  stepFour: string;
  stepFive: string;
  packageEyebrow: string;
  packageTitle: string;
  packageVisitor: string;
  packageVip: string;
  packageGroup: string;
  packageVisitorTitle: string;
  packageVisitorCopy: string;
  packageVipTitle: string;
  packageVipCopy: string;
  packageGroupTitle: string;
  packageGroupCopy: string;
  vipEyebrow: string;
  vipTitle: string;
  vipCopy: string;
  vipOne: string;
  vipTwo: string;
  vipThree: string;
  inquireCta: string;
  faqEyebrow: string;
  faqTitle: string;
  faqOneQ: string;
  faqOneA: string;
  faqTwoQ: string;
  faqTwoA: string;
  faqThreeQ: string;
  faqThreeA: string;
  footerCopy: string;
  toastText: string;
}

const zh: Content = {
  brandName: "礼宴巴国",
  brandRoman: "Ba Kingdom Banquet",
  navExperience: "体验概览",
  navBanquet: "演艺美馔",
  navCostume: "华服体验",
  navVisit: "到访指引",
  navAbout: "品牌故事",
  heroEyebrow: "巴渝文化主题沉浸式礼宴",
  heroTitleA: "以巴渝礼乐为引",
  heroTitleB: "入席一场东方礼宴",
  heroBrand: "礼宴巴国",
  heroCopy:
    "礼宴巴国取巴渝风物为灵感，融舞台演艺、礼乐仪式、地方风味、华服妆造与沉浸场景于一体，为到访重庆的宾客呈上一晚可观、可食、可赏、可忆的文化宴飨。",
  ritualOne: "礼乐演艺",
  ritualTwo: "巴渝风味",
  ritualThree: "华服妆造",
  ritualFour: "入席留影",
  bookCta: "预订席位",
  trailerCta: "观看介绍视频",
  scrollCue: "向下探赏",
  dateLabel: "到访日期",
  guestLabel: "宾客人数",
  guestTwo: "2 位宾客",
  guestFour: "4 位宾客",
  guestGroup: "5 位及以上团队咨询",
  languageLabel: "体验类型",
  seatStandard: "标准体验",
  seatVip: "贵宾接待",
  seatGroup: "团队接待",
  requestCta: "提交档期咨询",
  factDuration: "约 90 分钟礼宴体验",
  factCuisine: "巴渝风味宴席",
  factCostume: "华服妆造与留影",
  factLanguage: "预约与到访指引",
  featureOneTitle: "Ritual Performance",
  featureOneCjk: "礼乐演艺",
  featureOneCopy:
    "以乐、舞、礼与舞台视觉为笔，勾勒巴渝文化意象。宾客于席间观演，自迎宾至开席，逐段进入仪式氛围。",
  featureTwoTitle: "Ceremonial Dining",
  featureTwoCjk: "礼宴美馔",
  featureTwoCopy:
    "循地方风味与宴席礼序，设计菜品与上菜节奏，使观演、用餐与互动前后相承，形成一席完整的待客体验。",
  featureThreeTitle: "Costume & Photo Experience",
  featureThreeCjk: "华服妆造",
  featureThreeCopy:
    "提供华服试穿、妆造与留影动线建议，可衔接入席、迎宾或演出前后，为宾客留下东方审美的纪念影像。",
  discoverLink: "查看体验详情",
  journeyEyebrow: "礼宴动线",
  journeyTitle: "一晚五段入席体验",
  stepOne: "迎宾入场",
  stepTwo: "礼宴开席",
  stepThree: "礼乐演艺",
  stepFour: "华服留影",
  stepFive: "合影送别",
  packageEyebrow: "选择适合的到访方式",
  packageTitle: "为不同出行与接待场景安排礼遇",
  packageVisitor: "游客到访",
  packageVip: "贵宾接待",
  packageGroup: "团队合作",
  packageVisitorTitle: "巴渝文化礼宴体验",
  packageVisitorCopy:
    "适合初次到访重庆或希望轻松了解巴渝文化的宾客；在一晚之内体验观演、用餐、互动与纪念留影。",
  packageVipTitle: "商务与私人礼遇",
  packageVipCopy:
    "适合商务宴请、重要来宾和私人庆典；可按需求协助席位、菜单、入场动线与接待服务，具体安排以确认方案为准。",
  packageGroupTitle: "旅行社与团队接待",
  packageGroupCopy:
    "适合入境旅游、研学交流、企业团建和文化交流行程；可根据人数、日期、预算与时间安排提供接待建议。",
  vipEyebrow: "专属接待",
  vipTitle: "VIP 与私人活动",
  vipCopy:
    "面向贵宾接待、企业活动、私人庆典及文化交流团体；可根据场地档期与活动需求，协助安排独立空间、菜单沟通、流程统筹与现场服务。",
  vipOne: "可协助安排独立空间或团队席位",
  vipTwo: "可根据需求沟通菜单与用餐标准",
  vipThree: "提供活动流程协调与现场接待支持",
  inquireCta: "提交咨询",
  faqEyebrow: "到访前须知",
  faqTitle: "海外宾客常见问题",
  faqOneQ: "海外游客可以参加礼宴体验吗？",
  faqOneA:
    "可以。我们提供清晰的预约、到访与入席指引；文化内容以直观的演艺、礼仪与场景呈现，适合不同文化背景的宾客参与。",
  faqTwoQ: "可以体验华服和拍照吗？",
  faqTwoA:
    "可以。华服、妆造与留影可根据所选套餐与预约时段安排，建议提前咨询可选款式、人数与拍摄时间。",
  faqThreeQ: "旅行社、商务团队或私人活动如何咨询？",
  faqThreeA:
    "请通过咨询表单提交日期、人数、预算、席位类型与特殊需求；工作人员将根据档期与接待能力进一步确认方案。",
  footerCopy:
    "位于重庆的巴渝文化主题礼宴体验，将演艺、宴饮、华服与入席仪式融入同一晚的到访行程。",
  toastText: "咨询信息已提交。工作人员将根据档期、人数与需求进一步确认方案。",
};

const tw: Content = {
  brandName: "禮宴巴國",
  brandRoman: "Ba Kingdom Banquet",
  navExperience: "體驗概覽",
  navBanquet: "演藝美饌",
  navCostume: "華服體驗",
  navVisit: "到訪指引",
  navAbout: "品牌故事",
  heroEyebrow: "巴渝文化主題沉浸式禮宴",
  heroTitleA: "以巴渝禮樂為引",
  heroTitleB: "入席一場東方禮宴",
  heroBrand: "禮宴巴國",
  heroCopy:
    "禮宴巴國取巴渝風物為靈感，融舞台演藝、禮樂儀式、地方風味、華服妝造與沉浸場景於一體，為到訪重慶的賓客呈上一晚可觀、可食、可賞、可憶的文化宴饗。",
  ritualOne: "禮樂演藝",
  ritualTwo: "巴渝風味",
  ritualThree: "華服妝造",
  ritualFour: "入席留影",
  bookCta: "預訂席位",
  trailerCta: "觀看介紹影片",
  scrollCue: "向下探賞",
  dateLabel: "到訪日期",
  guestLabel: "賓客人數",
  guestTwo: "2 位賓客",
  guestFour: "4 位賓客",
  guestGroup: "5 位及以上團隊諮詢",
  languageLabel: "體驗類型",
  seatStandard: "標準體驗",
  seatVip: "貴賓接待",
  seatGroup: "團隊接待",
  requestCta: "提交檔期諮詢",
  factDuration: "約 90 分鐘禮宴體驗",
  factCuisine: "巴渝風味宴席",
  factCostume: "華服妝造與留影",
  factLanguage: "預約與到訪指引",
  featureOneTitle: "Ritual Performance",
  featureOneCjk: "禮樂演藝",
  featureOneCopy:
    "以樂、舞、禮與舞台視覺為筆，勾勒巴渝文化意象。賓客於席間觀演，自迎賓至開席，逐段進入儀式氛圍。",
  featureTwoTitle: "Ceremonial Dining",
  featureTwoCjk: "禮宴美饌",
  featureTwoCopy:
    "循地方風味與宴席禮序，設計菜品與上菜節奏，使觀演、用餐與互動前後相承，形成一席完整的待客體驗。",
  featureThreeTitle: "Costume & Photo Experience",
  featureThreeCjk: "華服妝造",
  featureThreeCopy:
    "提供華服試穿、妝造與留影動線建議，可銜接入席、迎賓或演出前後，為賓客留下東方審美的紀念影像。",
  discoverLink: "查看體驗詳情",
  journeyEyebrow: "禮宴動線",
  journeyTitle: "一晚五段入席體驗",
  stepOne: "迎賓入場",
  stepTwo: "禮宴開席",
  stepThree: "禮樂演藝",
  stepFour: "華服留影",
  stepFive: "合影送別",
  packageEyebrow: "選擇適合的到訪方式",
  packageTitle: "為不同出行與接待場景安排禮遇",
  packageVisitor: "遊客到訪",
  packageVip: "貴賓接待",
  packageGroup: "團隊合作",
  packageVisitorTitle: "巴渝文化禮宴體驗",
  packageVisitorCopy:
    "適合初次到訪重慶或希望輕鬆了解巴渝文化的賓客；在一晚之內體驗觀演、用餐、互動與紀念留影。",
  packageVipTitle: "商務與私人禮遇",
  packageVipCopy:
    "適合商務宴請、重要來賓和私人慶典；可按需求協助席位、菜單、入場動線與接待服務，具體安排以確認方案為準。",
  packageGroupTitle: "旅行社與團隊接待",
  packageGroupCopy:
    "適合入境旅遊、研學交流、企業團建和文化交流行程；可根據人數、日期、預算與時間安排提供接待建議。",
  vipEyebrow: "專屬接待",
  vipTitle: "VIP 與私人活動",
  vipCopy:
    "面向貴賓接待、企業活動、私人慶典及文化交流團體；可根據場地檔期與活動需求，協助安排獨立空間、菜單溝通、流程統籌與現場服務。",
  vipOne: "可協助安排獨立空間或團隊席位",
  vipTwo: "可根據需求溝通菜單與用餐標準",
  vipThree: "提供活動流程協調與現場接待支持",
  inquireCta: "提交諮詢",
  faqEyebrow: "到訪前須知",
  faqTitle: "海外賓客常見問題",
  faqOneQ: "海外遊客可以參加禮宴體驗嗎？",
  faqOneA:
    "可以。我們提供清晰的預約、到訪與入席指引；文化內容以直觀的演藝、禮儀與場景呈現，適合不同文化背景的賓客參與。",
  faqTwoQ: "可以體驗華服和拍照嗎？",
  faqTwoA:
    "可以。華服、妝造和留影可根據所選套餐與預約時段安排，建議提前諮詢可選款式、人數與拍攝時間。",
  faqThreeQ: "旅行社、商務團隊或私人活動如何諮詢？",
  faqThreeA:
    "請通過諮詢表單提交日期、人數、預算、席位類型與特殊需求；工作人員將根據檔期與接待能力進一步確認方案。",
  footerCopy:
    "位於重慶的巴渝文化主題禮宴體驗，將演藝、宴飲、華服與入席儀式融入同一晚的到訪行程。",
  toastText: "諮詢信息已提交。工作人員將根據檔期、人數與需求進一步確認方案。",
};

const en: Content = {
  brandName: "礼宴巴国",
  brandRoman: "Ba Kingdom Banquet",
  navExperience: "Experience",
  navBanquet: "The Banquet",
  navCostume: "The Costume",
  navVisit: "Plan Your Visit",
  navAbout: "About Us",
  heroEyebrow: "Chongqing immersive cultural banquet",
  heroTitleA: "A Royal Banquet",
  heroTitleB: "Across A Thousand Years",
  heroBrand: "礼宴巴国",
  heroCopy:
    "A ceremonial evening of palace performance, Ba-Yu cuisine, dynasty costume and live theatre staged around the dining table.",
  ritualOne: "礼乐演艺",
  ritualTwo: "巴渝风味",
  ritualThree: "华服妆造",
  ritualFour: "入席留影",
  bookCta: "Reserve Your Seat",
  trailerCta: "Watch Trailer",
  scrollCue: "Scroll to discover",
  dateLabel: "Date",
  guestLabel: "Guests",
  guestTwo: "2 Guests",
  guestFour: "4 Guests",
  guestGroup: "Group Inquiry",
  languageLabel: "Experience Type",
  seatStandard: "Standard Seating",
  seatVip: "VIP Reception",
  seatGroup: "Group Arrangement",
  requestCta: "Check Availability",
  factDuration: "90-minute immersive show",
  factCuisine: "Ceremonial palace cuisine",
  factCostume: "Dynasty costume styling",
  factLanguage: "Clear visitor guidance",
  featureOneTitle: "Ritual Performance",
  featureOneCjk: "礼乐演艺",
  featureOneCopy:
    "Epic stage production brings the legends of Ba Kingdom to life through music, dance, ritual and visual grandeur.",
  featureTwoTitle: "Ceremonial Dining",
  featureTwoCjk: "礼宴美馔",
  featureTwoCopy:
    "A curated multi-course banquet inspired by local ingredients, ritual hospitality and the flavours of Chongqing.",
  featureThreeTitle: "Costume & Photo Experience",
  featureThreeCjk: "华服妆造",
  featureThreeCopy:
    "Step into the grandeur of ancient Ba with refined styling, photo moments and a deeper sense of arrival.",
  discoverLink: "Discover",
  journeyEyebrow: "Your imperial journey",
  journeyTitle: "One evening, five moments",
  stepOne: "Arrival & Welcome",
  stepTwo: "Royal Banquet",
  stepThree: "Palace Performance",
  stepFour: "Costume Experience",
  stepFive: "Photo & Farewell",
  packageEyebrow: "Choose your seat",
  packageTitle: "Hospitality for every occasion",
  packageVisitor: "Visitors",
  packageVip: "VIP Guests",
  packageGroup: "Groups",
  packageVisitorTitle: "Signature cultural evening",
  packageVisitorCopy:
    "Best for first-time international visitors who want a complete performance, dining and cultural photo experience.",
  packageVipTitle: "Business & Private Hospitality",
  packageVipCopy:
    "Tailored for corporate dining, distinguished guests and private celebrations. Seating, menu, arrival flow and hospitality can be arranged to meet your needs.",
  packageGroupTitle: "Travel Trade & Group Reception",
  packageGroupCopy:
    "Built for inbound tourism, study exchanges, corporate retreats and cultural itineraries. Reception advice can be provided based on group size, date, budget and schedule.",
  vipEyebrow: "Exclusive",
  vipTitle: "VIP & Private Events",
  vipCopy:
    "Ideal for VIP guests, corporate events, celebrations and cultural delegations. Tailored experiences with private space, bespoke menus and dedicated service.",
  vipOne: "Private halls up to 200 guests",
  vipTwo: "Custom menus curated by the culinary team",
  vipThree: "Dedicated event coordination",
  inquireCta: "Send an Enquiry",
  faqEyebrow: "Before you arrive",
  faqTitle: "Useful visitor notes",
  faqOneQ: "Is the experience suitable for overseas visitors?",
  faqOneA:
    "Yes. The site and visitor flow are designed with clear arrival guidance, culture-first storytelling and a straightforward booking path.",
  faqTwoQ: "Can guests join in costume?",
  faqTwoA:
    "Costume styling can be arranged before or around the banquet experience, depending on the selected package.",
  faqThreeQ: "How should travel partners contact the team?",
  faqThreeA:
    "Use the inquiry form for group, VIP and agency cooperation. The team can coordinate schedule, language, seating and menu needs.",
  footerCopy:
    "An immersive palace banquet experience in Chongqing, where history, performance, cuisine and costume unite.",
  toastText:
    "Your request has been received. The team will confirm availability shortly.",
};

const ja: Content = {
  brandName: "礼宴巴国",
  brandRoman: "Ba Kingdom Banquet",
  navExperience: "体験",
  navBanquet: "宴と料理",
  navCostume: "衣装体験",
  navVisit: "アクセス",
  navAbout: "私たちについて",
  heroEyebrow: "巴渝文化をテーマにした没入型礼宴",
  heroTitleA: "巴渝の礼楽を導きとして",
  heroTitleB: "東方の礼宴にご入席ください",
  heroBrand: "礼宴巴国",
  heroCopy:
    "礼宴巴国は巴渝文化から着想を得て、舞台演芸、礼楽儀式、地方の味わい、華服の装い、没入型の空間を融合し、重慶を訪れる皆様に、観て、味わい、触れ合い、思い出を残す一夜の文化体験をお届けいたします。",
  ritualOne: "礼楽演芸",
  ritualTwo: "巴渝の味",
  ritualThree: "華服装束",
  ritualFour: "記念撮影",
  bookCta: "ご予約",
  trailerCta: "紹介動画を見る",
  scrollCue: "スクロールして探索",
  dateLabel: "訪問日",
  guestLabel: "人数",
  guestTwo: "2名",
  guestFour: "4名",
  guestGroup: "5名以上の団体",
  languageLabel: "体験タイプ",
  seatStandard: "スタンダード",
  seatVip: "VIP受付",
  seatGroup: "団体受付",
  requestCta: "空き状況を確認する",
  factDuration: "約90分の礼宴体験",
  factCuisine: "巴渝風味の宴席",
  factCostume: "華服の装いと撮影",
  factLanguage: "予約・アクセス案内",
  featureOneTitle: "Ritual Performance",
  featureOneCjk: "礼楽演芸",
  featureOneCopy:
    "音楽、舞踊、儀礼と舞台美術が調和し、巴渝文化の世界を描き出します。ご来賓は席に着いたまま、迎賓から開宴までの儀式の情緒をお楽しみいただけます。",
  featureTwoTitle: "Ceremonial Dining",
  featureTwoCjk: "礼宴美食",
  featureTwoCopy:
    "地方の風味と宴席のしきたりに基づき、料理と提供のリズムを構成。観覧、お食事、ふれあいが一つにつながる、丁寧なおもてなしをお楽しみください。",
  featureThreeTitle: "Costume & Photo Experience",
  featureThreeCjk: "華服装束",
  featureThreeCopy:
    "華服の試着や装い、記念撮影の流れをご提案します。ご入席やお迎え、演目前後と組み合わせて、東洋の美を感じる一枚をお残しいただけます。",
  discoverLink: "詳細を見る",
  journeyEyebrow: "礼宴の流れ",
  journeyTitle: "一夜五幕の体験",
  stepOne: "お出迎え",
  stepTwo: "開宴",
  stepThree: "礼楽演芸",
  stepFour: "華服と撮影",
  stepFive: "記念撮影とお見送り",
  packageEyebrow: "ご利用シーンに合わせて",
  packageTitle: "さまざまなおもてなし",
  packageVisitor: "一般旅行客",
  packageVip: "VIP接待",
  packageGroup: "団体受付",
  packageVisitorTitle: "巴渝文化礼宴体験",
  packageVisitorCopy:
    "初めて重慶を訪れる方や、気軽に巴渝文化に触れたい方に最適です。観覧、お食事、ふれあい、記念撮影を一晩でお楽しみいただけます。",
  packageVipTitle: "ビジネス・プライベート接待",
  packageVipCopy:
    "法人接待、賓客、プライベート祝賀向けです。座席、お品書き、入場動線、接遇サービスを必要に応じて調整いたします（確定はご確認後）。",
  packageGroupTitle: "旅行会社・団体受付",
  packageGroupCopy:
    "訪中旅行、スタディツアー、企業研修、文化交流向けです。人数、日程、ご予算、時間に応じた受付プランをご提案いたします。",
  vipEyebrow: "特別接待",
  vipTitle: "VIP・貸切イベント",
  vipCopy:
    "賓客接待、企業行事、個人祝賀、文化交流団体向けです。会場の空き状況や催事内容に応じて、独立空間、メニュー相談、進行調整、現場サービスを手配いたします。",
  vipOne: "独立空間または団体席の手配が可能",
  vipTwo: "ご要望に応じたお品書きと食事水準の相談",
  vipThree: "イベント進行の調整と現場接待サポート",
  inquireCta: "お問い合わせ",
  faqEyebrow: "ご来場前のご案内",
  faqTitle: "海外からのお客様によくあるご質問",
  faqOneQ: "海外からの旅行者でも参加できますか？",
  faqOneA:
    "はい。ご予約からご来場、ご入席までわかりやすいご案内をご用意しております。文化内容は直感的な演芸と所作で構成されており、多様な背景のお客様にご参加いただけます。",
  faqTwoQ: "華服を着て写真を撮れますか？",
  faqTwoA:
    "はい。ご希望のプランとお時間に応じて華服・装い・撮影を手配いたします。事前に種類・人数・撮影時間をご相談ください。",
  faqThreeQ: "旅行会社や企業、個人グループの相談方法は？",
  faqThreeA:
    "お問い合わせフォームより日付、人数、ご予算、席種、特別なご要望をお送りください。空き状況と受入体制を確認のうえ、担当者よりご連絡いたします。",
  footerCopy:
    "重慶にて巴渝文化をテーマにした礼宴体験。演芸、宴席、華服、入席のしきたりを一夜の訪問に織り込みます。",
  toastText: "お問い合わせを受け付けました。担当者が日程・人数・ご要望を確認のうえ、ご連絡いたします。",
};

const ko: Content = {
  brandName: "礼宴巴国",
  brandRoman: "Ba Kingdom Banquet",
  navExperience: "체험",
  navBanquet: "공연과 요리",
  navCostume: "전통 의상",
  navVisit: "방문 안내",
  navAbout: "소개",
  heroEyebrow: "파위 문화 테마 몰입형 연회",
  heroTitleA: "파위의 예악을 따라",
  heroTitleB: "동양의 연회에 입석하세요",
  heroBrand: "礼宴巴国",
  heroCopy:
    "리옌 바궈는 파위 문화에서 영감을 받아 무대 공연, 예악 의식, 지역의 맛, 전통 의상과 몰입형 공간을 하나로 엮어, 충칭을 방문하는 분들께 보고, 느끼고, 참여하고, 추억으로 남기는 특별한 하룻밤을 선사합니다.",
  ritualOne: "예악 공연",
  ritualTwo: "파위의 맛",
  ritualThree: "전통 의상",
  ritualFour: "기념 촬영",
  bookCta: "좌석 예약",
  trailerCta: "소개 영상 보기",
  scrollCue: "스크롤하여 탐색",
  dateLabel: "방문일",
  guestLabel: "인원",
  guestTwo: "2명",
  guestFour: "4명",
  guestGroup: "5명 이상 단체",
  languageLabel: "체험 유형",
  seatStandard: "스탠다드",
  seatVip: "VIP 접대",
  seatGroup: "단체 접대",
  requestCta: "예약 가능 여부 확인",
  factDuration: "약 90분 연회 체험",
  factCuisine: "파위 풍미 연회",
  factCostume: "전통 의상과 촬영",
  factLanguage: "예약 및 방문 안내",
  featureOneTitle: "Ritual Performance",
  featureOneCjk: "예악 공연",
  featureOneCopy:
    "음악과 무용, 의례와 무대가 어우러져 파위 문화의 이야기를 그려냅니다. 자리에 앉아 영빈부터 개연까지 이어지는 의식의 분위기를 여유롭게 느껴보세요.",
  featureTwoTitle: "Ceremonial Dining",
  featureTwoCjk: "예연 미식",
  featureTwoCopy:
    "지역의 맛과 연회 예절을 담아 코스와 서빙 리듬을 구성했습니다. 관람, 식사, 교류가 자연스럽게 이어지는 완성된 경험을 만나보세요.",
  featureThreeTitle: "Costume & Photo Experience",
  featureThreeCjk: "전통 의상",
  featureThreeCopy:
    "전통 의상 시착과 단장, 기념 촬영 동선을 제안해 드립니다. 입장과 환영, 공연 전후를 연결해 동양의 아름다움을 담은 한 장을 남겨보세요.",
  discoverLink: "자세히 보기",
  journeyEyebrow: "연회 동선",
  journeyTitle: "하룻밤 다섯 장면의 체험",
  stepOne: "환영 입장",
  stepTwo: "연회 개연",
  stepThree: "예악 공연",
  stepFour: "전통 의상과 촬영",
  stepFive: "기념 촬영과 환송",
  packageEyebrow: "방문 유형 선택",
  packageTitle: "다양한 상황에 맞춘 환대",
  packageVisitor: "일반 여행객",
  packageVip: "VIP 접대",
  packageGroup: "단체 협력",
  packageVisitorTitle: "파위 문화 연회 체험",
  packageVisitorCopy:
    "처음 충칭을 방문하시거나 파위 문화를 가볍게 접하고 싶은 분께 추천드립니다. 관람, 식사, 교류, 기념 촬영을 하룻밤에 즐기실 수 있습니다.",
  packageVipTitle: "비즈니스 및 프라이빗 환대",
  packageVipCopy:
    "법인 접대, 귀빈, 개인 경축 행사에 적합합니다. 좌석, 메뉴, 입장 동선, 접객 서비스를 필요에 맞게 조정해 드립니다(확정은 협의 후).",
  packageGroupTitle: "여행사 및 단체 접수",
  packageGroupCopy:
    "인바운드 여행, 연수 교류, 기업 워크숍, 문화 교류 일정에 적합합니다. 인원, 날짜, 예산, 시간에 맞춰 접수 방안을 제안해 드립니다.",
  vipEyebrow: "특별 접대",
  vipTitle: "VIP & 프라이빗 이벤트",
  vipCopy:
    "귀빈 접대, 기업 행사, 개인 경축, 문화 교류 단체를 위한 맞춤형 서비스입니다. 장소 일정과 행사 내용에 따라 독립 공간, 메뉴 상담, 진행 조율, 현장 서비스를 지원해 드립니다.",
  vipOne: "독립 공간 또는 단체 좌석 배정 가능",
  vipTwo: "요청에 따른 메뉴와 식사 수준 상담",
  vipThree: "행사 진행 조율 및 현장 접객 지원",
  inquireCta: "문의하기",
  faqEyebrow: "방문 전 안내",
  faqTitle: "해외 방문객 자주 묻는 질문",
  faqOneQ: "해외 여행객도 참여할 수 있나요?",
  faqOneA:
    "네. 예약부터 방문, 입석까지 명확한 안내를 제공합니다. 문화 콘텐츠는 직관적인 공연과 의례로 구성되어 다양한 문화적 배경의 분들께서도 편하게 참여하실 수 있습니다.",
  faqTwoQ: "전통 의상을 입고 사진을 찍을 수 있나요?",
  faqTwoA:
    "네. 선택하신 패키지와 예약 시간에 따라 전통 의상, 단장, 촬영을 진행할 수 있습니다. 사전에 종류, 인원, 촬영 시간을 상담해 주세요.",
  faqThreeQ: "여행사, 기업, 개인 단체의 상담 방법은?",
  faqThreeA:
    "문의 양식을 통해 날짜, 인원, 예산, 좌석 유형, 특별 요청 사항을 보내 주세요. 담당자가 일정과 수용 가능 여부를 확인한 후 연락드립니다.",
  footerCopy:
    "충칭에서 펼쳐지는 파위 문화 테마 연회 체험. 공연, 연회, 전통 의상, 입석 의식을 하룻밤의 방문으로 엮습니다.",
  toastText: "문의가 접수되었습니다. 담당자가 일정, 인원, 요청 사항을 확인한 후 연락드리겠습니다.",
};

export const content: Record<Lang, Content> = { zh, tw, en, ja, ko };
