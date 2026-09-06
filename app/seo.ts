import type { Metadata } from "next";
import { business } from "./business";
import type { Lang } from "./languages";
import { languages, langCodes } from "./languages";

export interface PageSeo {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export interface SiteSeo {
  home: PageSeo;
  experience: PageSeo;
  banquetMenu: PageSeo;
  costume: PageSeo;
  showTimes: PageSeo;
  location: PageSeo;
  faq: PageSeo;
  about: PageSeo;
}

const zh: SiteSeo = {
  home: {
    title: "重庆礼宴巴国｜沉浸式宫廷宴、巴渝餐秀与华服体验",
    description: "重庆礼宴巴国融合巴渝文化、美食、沉浸式宫廷表演与华服体验。查看演出时间、菜单、座位、地址、价格及预订方式。",
    ogTitle: "重庆礼宴巴国｜沉浸式巴渝宫廷宴",
    ogDescription: "融合巴渝文化、美食、沉浸式宫廷表演与华服体验。",
  },
  experience: {
    title: "体验概览｜重庆礼宴巴国",
    description: "重庆礼宴巴国沉浸式文化体验：礼乐演艺、巴渝宴席、华服妆造。一晚感受观演、用餐、互动与留影。",
  },
  banquetMenu: {
    title: "演艺美馔｜重庆礼宴巴国宫廷宴菜单",
    description: "重庆礼宴巴国巴渝风味宴席，以地方食材与宴席礼仪设计菜品与上菜节奏，呈现完整的待客体验。",
  },
  costume: {
    title: "华服体验｜重庆礼宴巴国汉服妆造与留影",
    description: "重庆礼宴巴国提供华服试穿、妆造与留影体验，与入席、演出衔接，留下东方审美纪念影像。",
  },
  showTimes: {
    title: "演出时间与价格｜重庆礼宴巴国",
    description: "查看重庆礼宴巴国演出时间、入场时间、票价、座位类型及预订方式。成人、VIP 及团队价格详情。",
  },
  location: {
    title: "地址与预订｜重庆礼宴巴国",
    description: "重庆礼宴巴国完整地址、交通指引、地图定位、联系电话及在线预订方式。",
  },
  faq: {
    title: "常见问题｜重庆礼宴巴国到访前须知",
    description: "海外游客参加礼宴体验、华服拍照、旅行社团队咨询等常见问题解答。",
  },
  about: {
    title: "品牌故事｜重庆礼宴巴国 Ba Kingdom Banquet",
    description: "礼宴巴国以巴渝文化为灵感，融合舞台演艺、礼乐仪式、地方风味与华服妆造，呈现沉浸式文化礼宴体验。",
  },
};

const en: SiteSeo = {
  home: {
    title: "Liyan Baguo | Banquet of Ba Kingdom in Chongqing",
    description: "Experience Liyan Baguo, Chongqing's immersive Banquet of Ba Kingdom, with traditional cuisine, live performances and costumes. Plan your visit and book.",
  },
  experience: {
    title: "Banquet Experience & Visitor Journey | Liyan Baguo",
    description: "Explore the Liyan Baguo visitor journey in Chongqing: garden activities, welcome rituals, a 110-minute banquet show and optional traditional costume styling.",
  },
  banquetMenu: {
    title: "Chongqing Banquet Menu & Dietary Requests | Liyan Baguo",
    description: "Explore Sichuan and Chongqing flavours at Liyan Baguo. See the banquet menu, dining arrangements and how to discuss allergies or dietary needs before booking.",
  },
  costume: {
    title: "Costume Packages & Styling at Liyan Baguo, Chongqing",
    description: "Compare traditional costume and headwear inclusions at Liyan Baguo in Chongqing. Plan sizes, styling time and photo needs before your banquet visit.",
  },
  showTimes: {
    title: "Chongqing Dinner Show Tickets & Times | Liyan Baguo",
    description: "Compare Liyan Baguo lunch and dinner show times, Guest, VIP and SVIP tickets in CNY. Confirm your date, package and seat number with the official team.",
  },
  location: {
    title: "Liyan Baguo Location, Directions & Booking | Chongqing",
    description: "Find Liyan Baguo in Baguocheng, Jiulongpo District, Chongqing. Get the Chinese address, map, arrival guidance and official WhatsApp or WeChat booking contacts.",
  },
  faq: {
    title: "Liyan Baguo FAQ | Banquet of Ba Kingdom Visitor Guide",
    description: "Plan your Banquet of Ba Kingdom visit: meal inclusions, arrival times, costume options, families, English support and official booking at Liyan Baguo.",
  },
  about: {
    title: "About Liyan Baguo | Banquet of Ba Kingdom, Chongqing",
    description: "Meet Liyan Baguo, the Chongqing brand behind the Banquet of Ba Kingdom. Discover how regional culture inspires its dining, performance and hospitality.",
  },
};

const tw: SiteSeo = {
  home: {
    title: "重慶禮宴巴國｜沉浸式宮廷宴、巴渝餐秀與華服體驗",
    description: "重慶禮宴巴國融合巴渝文化、美食、沉浸式宮廷表演與華服體驗。查看演出時間、菜單、座位、地址、價格及預訂方式。",
  },
  experience: {
    title: "體驗概覽｜重慶禮宴巴國",
    description: "重慶禮宴巴國沉浸式文化體驗：禮樂演藝、巴渝宴席、華服妝造。一晚感受觀演、用餐、互動與留影。",
  },
  banquetMenu: {
    title: "演藝美饌｜重慶禮宴巴國宮廷宴菜單",
    description: "重慶禮宴巴國巴渝風味宴席，以地方食材與宴席禮儀設計菜品與上菜節奏，呈現完整的待客體驗。",
  },
  costume: {
    title: "華服體驗｜重慶禮宴巴國漢服妝造與留影",
    description: "重慶禮宴巴國提供華服試穿、妝造與留影體驗，與入席、演出銜接，留下東方審美紀念影像。",
  },
  showTimes: {
    title: "演出時間與價格｜重慶禮宴巴國",
    description: "查看重慶禮宴巴國演出時間、入場時間、票價、座位類型及預訂方式。成人、VIP 及團隊價格詳情。",
  },
  location: {
    title: "地址與預訂｜重慶禮宴巴國",
    description: "重慶禮宴巴國完整地址、交通指引、地圖定位、聯繫電話及在線預訂方式。",
  },
  faq: {
    title: "常見問題｜重慶禮宴巴國到訪前須知",
    description: "海外遊客參加禮宴體驗、華服拍照、旅行社團隊諮詢等常見問題解答。",
  },
  about: {
    title: "品牌故事｜重慶禮宴巴國 Ba Kingdom Banquet",
    description: "禮宴巴國以巴渝文化為靈感，融合舞台演藝、禮樂儀式、地方風味與華服妝造，呈現沉浸式文化禮宴體驗。",
  },
};

const ja: SiteSeo = {
  home: {
    title: "重慶 礼宴巴国｜バーユー宮廷ディナーショーと華服体験",
    description: "重慶の礼宴巴国でバーユー料理、没入型宮廷パフォーマンス、伝統衣装体験をお楽しみください。公演時間、座席、アクセス、予約情報を掲載。",
  },
  experience: {
    title: "体験概要｜重慶 礼宴巴国",
    description: "重慶礼宴巴国の没入型文化体験：礼楽演芸、バーユー宴席、華服装束。観覧、食事、交流、記念撮影を一夜で。",
  },
  banquetMenu: {
    title: "演芸と美食｜重慶 礼宴巴国 宮廷宴メニュー",
    description: "重慶礼宴巴国のバーユー風味宴席。地方食材と宴席儀礼に基づくコース料理で完全なおもてなし体験を。",
  },
  costume: {
    title: "華服体験｜重慶 礼宴巴国 伝統衣装と撮影",
    description: "重慶礼宴巴国で華服の試着、装い、記念撮影を。入席や演目前後と組み合わせて東洋の美を一枚に。",
  },
  showTimes: {
    title: "公演時間と料金｜重慶 礼宴巴国",
    description: "重慶礼宴巴国の公演時間、入場時間、チケット料金、座席タイプ、予約方法をご確認ください。",
  },
  location: {
    title: "アクセスと予約｜重慶 礼宴巴国",
    description: "重慶礼宴巴国の住所、交通案内、地図、お問い合わせ先、オンライン予約はこちら。",
  },
  faq: {
    title: "よくある質問｜重慶 礼宴巴国 ご来場前のご案内",
    description: "海外からのお客様の参加、華服体験、旅行会社・団体のご相談など、よくある質問にお答えします。",
  },
  about: {
    title: "ブランドストーリー｜重慶 礼宴巴国",
    description: "礼宴巴国は巴渝文化を着想源に、舞台演芸、礼楽儀式、地方の味わい、華服の装いを融合した没入型文化礼宴です。",
  },
};

const ko: SiteSeo = {
  home: {
    title: "충칭 리옌바궈 ｜ 바위 궁정 디너쇼 & 화푸 체험",
    description: "충칭의 바 왕국 연회에서 바위 요리, 몰입형 궁정 공연, 전통 의상 체험을 즐겨보세요. 공연 시간, 좌석, 위치, 예약 정보 제공.",
  },
  experience: {
    title: "체험 개요 ｜ 충칭 리옌바궈",
    description: "충칭 리옌바궈의 몰입형 문화 체험: 예악 공연, 바위 연회, 전통 의상. 관람, 식사, 교류, 기념 촬영을 하룻밤에.",
  },
  banquetMenu: {
    title: "공연과 요리 ｜ 충칭 리옌바궈 궁정 연회 메뉴",
    description: "충칭 리옌바궈의 바위 풍미 연회. 지역 식재료와 연회 예절에 기반한 코스 요리로 완전한 환대 경험을.",
  },
  costume: {
    title: "전통 의상 체험 ｜ 충칭 리옌바궈 화푸와 촬영",
    description: "충칭 리옌바궈에서 전통 의상 시착, 단장, 기념 촬영을. 입장 및 공연 전후와 연계하여 동양적 아름다움을 담아보세요.",
  },
  showTimes: {
    title: "공연 시간과 가격 ｜ 충칭 리옌바궈",
    description: "충칭 리옌바궈의 공연 시간, 입장 시간, 티켓 가격, 좌석 유형, 예약 방법을 확인하세요.",
  },
  location: {
    title: "위치와 예약 ｜ 충칭 리옌바궈",
    description: "충칭 리옌바궈의 전체 주소, 교통 안내, 지도, 연락처, 온라인 예약 정보.",
  },
  faq: {
    title: "자주 묻는 질문 ｜ 충칭 리옌바궈 방문 전 안내",
    description: "해외 방문객 참여, 전통 의상 체험, 여행사 및 단체 문의 등 자주 묻는 질문에 대한 답변.",
  },
  about: {
    title: "브랜드 스토리 ｜ 충칭 리옌바궈",
    description: "리옌바궈는 바위 문화에서 영감을 받아 무대 공연, 예악 의식, 지역의 맛, 전통 의상을 융합한 몰입형 문화 연회입니다.",
  },
};

export const siteSeo: Record<Lang, SiteSeo> = { zh, tw, en, ja, ko };

export function getCanonicalPath(lang: Lang, page: string): string {
  const base = business.url;
  if (page === "home") return `${base}/${lang}/`;
  return `${base}/${lang}/${page}/`;
}

export function getHreflang(page: string): Record<string, string> {
  const base = business.url;
  const result: Record<string, string> = {};
  for (const lang of languages) {
    const code = langCodes[lang];
    if (page === "home") result[code] = `${base}/${lang}/`;
    else result[code] = `${base}/${lang}/${page}/`;
  }
  result["x-default"] = getCanonicalPath("en", page);
  return result;
}

export const pageRoutes = {
  home: "home", experience: "experience", banquetMenu: "banquet-menu",
  costume: "costume-experience", showTimes: "show-times-prices",
  location: "location-booking", faq: "faq", about: "about",
} as const;

export function pageMetadata(lang: Lang, key: keyof SiteSeo): Metadata {
  const seo = siteSeo[lang][key];
  const path = pageRoutes[key];
  const url = getCanonicalPath(lang, path);
  const image = { url: business.url + (seo.ogImage || business.image), width: 1920, height: 1080, alt: "Ceremonial performance at Liyan Baguo in Chongqing" };
  const ogLocales: Record<Lang, string> = { zh: "zh_CN", tw: "zh_TW", en: "en_US", ja: "ja_JP", ko: "ko_KR" };
  return {
    title: seo.title, description: seo.description,
    robots: { index: true, follow: true, "max-image-preview": "large" },
    alternates: { canonical: url, languages: getHreflang(path) },
    openGraph: { title: seo.ogTitle || seo.title, description: seo.ogDescription || seo.description, url, type: "website", siteName: business.name, locale: ogLocales[lang], alternateLocale: languages.filter(l => l !== lang).map(l => ogLocales[l]), images: [image] },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description, images: [image.url] },
  };
}
