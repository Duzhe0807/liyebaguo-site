import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { languages, type Lang } from "../../languages";
import { siteSeo, getCanonicalPath, getHreflang } from "../../seo";
import { InnerPageShell, DetailFaq } from "../InnerPageShell";
import { customerServiceUrl, whatsappId, whatsappUrl } from "../../customerService";
import { CopyButton } from "../CopyButton";
import { PhoneIcon, MailIcon, WechatIcon, PinIcon, PlaneIcon, TrainIcon, TaxiIcon, CarIcon } from "./LocationIcons";

export function generateStaticParams() { return languages.map((lang) => ({ lang })); }
export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> { const { lang } = await params; const seo = siteSeo[lang].location; return { title: seo.title, description: seo.description, alternates: { canonical: getCanonicalPath(lang, "location-booking"), languages: getHreflang("location-booking") } }; }

const zhAddress = "中国重庆市九龙坡区巴国城";
const enAddress = "Baguocheng, Jiulongpo District, Chongqing, China";

const copy = {
  zh: {
    eyebrow: "LOCATION & BOOKING", title: "地址、交通与预订", summary: "保存中英文地址、打开常用地图，并在出发前确认场次。",
    venue: "重庆 · 巴国城", addressLabel: "中文地址", addressLabelEn: "英文地址", hours: "营业时间", hoursVal: "每日 10:00–21:00",
    mapTitle: "一键打开导航路线", mapEmbed: "重庆巴国城地图",
    gettingTitle: "选择适合你的到达方式", gettingSubtitle: "从重庆主要交通枢纽出发，约 30–60 分钟可抵达巴国城。",
    arrivals: [
      ["机场", "江北国际机场", "打车约 50 分钟；或乘坐地铁 10 号线 → 环线/2 号线，再换乘至巴国城附近站点。", "plane"],
      ["高铁站", "重庆西站 / 重庆北站", "打车约 25–40 分钟；地铁环线可直达巴国城附近。", "train"],
      ["市中心", "解放碑 / 洪崖洞", "打车约 30 分钟；地铁 1 号线 → 环线，再步行或短途打车。", "taxi"],
      ["自驾", "巴国城停车场", "导航“巴国城”，停车场入口在巴国城主入口东侧。", "car"],
    ],
    nearbyTitle: "周边还能怎么玩", nearbySubtitle: "把礼宴巴国安排在重庆文化之旅的一天里。",
    nearby: [
      ["磁器口古镇", "约 30 分钟车程，传统山城老街与小吃。"],
      ["洪崖洞", "约 30 分钟车程，重庆夜景地标。"],
      ["四川美术学院", "约 20 分钟车程，涂鸦街与当代艺术。"],
    ],
    contactTitle: "联系与预约", phone: "电话 · 点击拨号", email: "Email", wechat: "WeChat Support", book: "打开预订表单",
    faqTitle: "到访常见问题", faq: [
      ["应该提前多久到？", "请在所选场次的游园时间前抵达。"],
      ["可以使用哪些地图？", "页面提供百度地图、高德地图和 Google Maps 入口。"],
      ["司机应该导航到哪里？", "搜索“巴国城”，并在出发前核对页面完整中文地址。"],
    ],
  },
  "zh-hant": {
    eyebrow: "LOCATION & BOOKING", title: "地址、交通與預訂", summary: "保存中英文地址、打開常用地圖，並在出發前確認場次。",
    venue: "重慶 · 巴國城", addressLabel: "中文地址", addressLabelEn: "英文地址", hours: "營業時間", hoursVal: "每日 10:00–21:00",
    mapTitle: "一鍵打開導航路線", mapEmbed: "重慶巴國城地圖",
    gettingTitle: "選擇適合你的到達方式", gettingSubtitle: "從重慶主要交通樞紐出發，約 30–60 分鐘可抵達巴國城。",
    arrivals: [
      ["機場", "江北國際機場", "打車約 50 分鐘；或乘地鐵 10 號線 → 環線/2 號線，再轉乘至巴國城附近站點。", "plane"],
      ["高鐵站", "重慶西站 / 重慶北站", "打車約 25–40 分鐘；地鐵環線可直達巴國城附近。", "train"],
      ["市中心", "解放碑 / 洪崖洞", "打車約 30 分鐘；地鐵 1 號線 → 環線，再步行或短途打車。", "taxi"],
      ["自駕", "巴國城停車場", "導航“巴國城”，停車場入口在巴國城主入口東側。", "car"],
    ],
    nearbyTitle: "周邊還能怎麼玩", nearbySubtitle: "把禮宴巴國安排重慶文化之旅的一天裡。",
    nearby: [
      ["磁器口古鎮", "約 30 分鐘車程，傳統山城老街與小吃。"],
      ["洪崖洞", "約 30 分鐘車程，重慶夜景地標。"],
      ["四川美術學院", "約 20 分鐘車程，塗鴉街與當代藝術。"],
    ],
    contactTitle: "聯繫與預訂", phone: "電話 · 點擊撥號", email: "Email", wechat: "WeChat Support", book: "打開預訂表單",
    faqTitle: "到訪常見問題", faq: [
      ["應該提前多久到？", "請在所選場次的遊園時間前抵達。"],
      ["可以使用哪些地圖？", "頁面提供百度地圖、高德地圖和 Google Maps 入口。"],
      ["司機應該導航到哪裡？", "搜索“巴國城”，並在出發前核對頁面完整中文地址。"],
    ],
  },
  en: {
    eyebrow: "LOCATION & BOOKING", title: "Plan Your Visit", summary: "Save the bilingual address, open your preferred map, and confirm the session before setting out.",
    venue: "Ba Kingdom City, Chongqing", addressLabel: "Chinese", addressLabelEn: "English", hours: "Opening hours", hoursVal: "Daily 10:00–21:00",
    mapTitle: "Open the route in one tap", mapEmbed: "Map of Baguocheng Chongqing",
    gettingTitle: "Choose the most convenient arrival", gettingSubtitle: "From Chongqing's main transport hubs, Baguocheng is roughly 30–60 minutes away.",
    arrivals: [
      ["Airport", "Jiangbei International Airport", "About 50 minutes by taxi; or take Metro Line 10 → Loop Line / Line 2, then transfer to a station near Baguocheng.", "plane"],
      ["Railway", "Chongqing West / North Station", "About 25–40 minutes by taxi; the Metro Loop Line runs close to Baguocheng.", "train"],
      ["City center", "Jiefangbei / Hongyadong", "About 30 minutes by taxi; Metro Line 1 → Loop Line, then walk or take a short taxi ride.", "taxi"],
      ["Self-drive", "Baguocheng parking", "Navigate to “巴国城”; the parking entrance is on the east side of the main gate.", "car"],
    ],
    nearbyTitle: "What to do nearby", nearbySubtitle: "Fit Liyan Baguo into a full day of Chongqing culture.",
    nearby: [
      ["Ciqikou Ancient Town", "About 30 minutes by car — traditional mountain streets and local snacks."],
      ["Hongyadong", "About 30 minutes by car — Chongqing's iconic riverside night view."],
      ["Sichuan Fine Arts Institute", "About 20 minutes by car — graffiti street and contemporary art."],
    ],
    contactTitle: "Contact and booking", phone: "Phone · tap to call", email: "Email", wechat: "WeChat Support", book: "Open booking form",
    faqTitle: "Arrival questions", faq: [
      ["When should I arrive?", "Arrive before the garden visit time shown for your session."],
      ["Which map can I use?", "Direct Baidu Maps, Amap and Google Maps links are provided above."],
      ["Where should a driver navigate?", "Use the Chinese name “巴国城” and verify the full address before departure."],
    ],
  },
  ja: {
    eyebrow: "LOCATION & BOOKING", title: "アクセスと予約", summary: "中日英の住所を保存し、お好みの地図アプリで経路を確認してからお出かけください。",
    venue: "重慶 · 巴国城", addressLabel: "中国語", addressLabelEn: "英語", hours: "営業時間", hoursVal: "毎日 10:00–21:00",
    mapTitle: "地図アプリで経路を開く", mapEmbed: "重慶巴国城の地図",
    gettingTitle: "最適なアクセス方法", gettingSubtitle: "重慶の主要交通拠点から巴国城まで約30〜60分です。",
    arrivals: [
      ["空港", "江北国際空港", "タクシーで約50分；または地下鉄10号線→環状線/2号線で巴国城近くの駅へ。", "plane"],
      ["鉄道", "重慶西駅 / 重慶北駅", "タクシーで約25〜40分；環状線で巴国城近くまで行けます。", "train"],
      ["中心部", "解放碑 / 洪崖洞", "タクシーで約30分；地下鉄1号線→環状線、あとは徒歩または短距離タクシー。", "taxi"],
      ["レンタカー", "巴国城駐車場", "「巴国城」とナビ設定。駐車場入口は正門の東側です。", "car"],
    ],
    nearbyTitle: "周辺で楽しめること", nearbySubtitle: "礼宴巴国を重慶文化の1日に組み込んでください。",
    nearby: [
      ["磁器口古鎮", "車で約30分。伝統的な山の街並みと小吃。"],
      ["洪崖洞", "車で約30分。重慶の夜景スポット。"],
      ["四川美術学院", "車で約20分。グラフィティストリートと現代アート。"],
    ],
    contactTitle: "お問い合わせと予約", phone: "電話 · タップで発信", email: "Email", wechat: "WeChat Support", book: "予約フォームを開く",
    faqTitle: "よくあるアクセスの質問", faq: [
      ["何分前に到着すべきですか？", "選択されたセッションの庭園散策時間までに到着してください。"],
      ["どの地図が使えますか？", "百度地図、高德地図、Google Maps のリンクを用意しています。"],
      ["ドライバーはどこを目指せばいいですか？", "「巴国城」で検索し、出発前に住所を確認してください。"],
    ],
  },
  ko: {
    eyebrow: "LOCATION & BOOKING", title: "방문 안내 및 예약", summary: "중영 주소를 저장하고, 선호하는 지도 앱으로 경로를 확인한 후 출발하세요.",
    venue: "충칭 · 바궈청", addressLabel: "중국어", addressLabelEn: "영어", hours: "영업 시간", hoursVal: "매일 10:00–21:00",
    mapTitle: "지도 앱에서 경로 열기", mapEmbed: "충칭 바궈청 지도",
    gettingTitle: "편리한 도착 방법 선택", gettingSubtitle: "충칭 주요 교통 허브에서 바궈청까지 약 30~60분이 소요됩니다.",
    arrivals: [
      ["공항", "장베이 국제공항", "택시로 약 50분； 또는 지하철 10호선 → 순환선/2호선, 바궈청 인근 역으로 환승.", "plane"],
      ["기차역", "충칭 서역 / 북역", "택시로 약 25~40분； 순환선이 바궈청 인근을 지납니다.", "train"],
      ["도심", "지에팡베이 / 홍야동", "택시로 약 30분； 지하철 1호선 → 순환선, 이후 도보 또는 짧은 택시.", "taxi"],
      ["자가용", "바궈청 주차장", "‘바궈청’으로 내비 설정. 주차장 입구는 정문 동쪽에 있습니다.", "car"],
    ],
    nearbyTitle: "주변 관광", nearbySubtitle: "리옌 바궈를 충칭 문화 투어의 하루에 함께 계획해보세요.",
    nearby: [
      ["쯔치커우 고진", "차로 약 30분. 전통 산성 거리와 길거리 음식."],
      ["홍야동", "차로 약 30분. 충칭의 야경 랜드마크."],
      ["사천미술학원", "차로 약 20분. 그래피티 거리와 현대 미술."],
    ],
    contactTitle: "연락 및 예약", phone: "전화 · 탭하여 걸기", email: "Email", wechat: "WeChat Support", book: "예약 폼 열기",
    faqTitle: "자주 묻는 방문 질문", faq: [
      ["얼마나 일찍 도착해야 하나요?", "선택한 세션의 정원 산책 시간 전에 도착하세요."],
      ["어떤 지도를 사용할 수 있나요?", "바이두 지도, 가오더 지도, Google Maps 링크를 제공합니다."],
      ["기사는 어디로 안내해야 하나요?", "‘바궈청’을 검색하고 출발 전 전체 주소를 확인하세요."],
    ],
  },
} as const;

const iconMap: Record<string, React.ComponentType<{ size?: number; weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone" }>> = {
  plane: PlaneIcon, train: TrainIcon, taxi: TaxiIcon, car: CarIcon,
};

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params; const t = copy[lang === "tw" ? "zh-hant" : lang] ?? copy.en;
  return <InnerPageShell lang={lang} eyebrow={t.eyebrow} title={t.title} summary={t.summary} image="/images/gallery-sea-1.webp">
    <section className="inner-section location-lead">
      <div className="address-panel">
        <p className="eyebrow">VENUE ADDRESS</p>
        <h2>{t.venue}</h2>
        <div className="address-line"><span>{t.addressLabel}</span><strong>{zhAddress}</strong><CopyButton value={zhAddress} label={t.addressLabel} copiedLabel={t.addressLabel} /></div>
        <div className="address-line"><span>{t.addressLabelEn}</span><strong>{enAddress}</strong><CopyButton value={enAddress} label={t.addressLabelEn} copiedLabel={t.addressLabelEn} /></div>
        <div className="venue-hours"><span>{t.hours}</span><strong>{t.hoursVal}</strong></div>
      </div>
      <figure><Image src="/images/gallery-sea-4.webp" alt={t.mapEmbed} fill sizes="(max-width:800px) 92vw,44vw" /></figure>
    </section>

    <section className="inner-section map-section">
      <p className="eyebrow">MAP & NAVIGATION</p>
      <h2>{t.mapTitle}</h2>
      <div className="map-embed"><iframe title={t.mapEmbed} src="https://www.google.com/maps?q=%E9%87%8D%E5%BA%86%E5%B7%B4%E5%9B%BD%E5%9F%8E&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
      <div className="map-actions refined"><a href="https://j.map.baidu.com/76/_1tc" target="_blank" rel="noreferrer">百度地图</a><a href="https://uri.amap.com/search?keyword=%E5%B7%B4%E5%9B%BD%E5%9F%8E&city=%E9%87%8D%E5%BA%86" target="_blank" rel="noreferrer">高德地图</a><a href="https://maps.app.goo.gl/ZddotMySGkJYsjFh7" target="_blank" rel="noreferrer">Google Maps</a></div>
    </section>

    <section className="inner-section arrival-grid">
      <p className="eyebrow">GETTING HERE</p>
      <h2>{t.gettingTitle}</h2>
      <p className="arrival-subtitle">{t.gettingSubtitle}</p>
      <div className="arrival-cards">
        {t.arrivals.map(([label, place, text, key]) => {
          const Icon = iconMap[key];
          return <article key={key}><span className="arrival-icon" aria-hidden="true"><Icon size={22} weight="light" /></span><div><h3><small>{label}</small><strong>{place}</strong></h3><p>{text}</p></div></article>;
        })}
      </div>
    </section>

    <section className="inner-section nearby-section">
      <p className="eyebrow">NEARBY</p>
      <h2>{t.nearbyTitle}</h2>
      <p className="nearby-subtitle">{t.nearbySubtitle}</p>
      <div className="nearby-cards">
        {t.nearby.map(([title, text]) => <article key={title}><PinIcon size={20} weight="fill" /><h3>{title}</h3><p>{text}</p></article>)}
      </div>
    </section>

    <section className="inner-section contact-cards">
      <p className="eyebrow">CONTACT</p>
      <h2>{t.contactTitle}</h2>
      <div className="contact-methods">
        <a href="tel:+8617383017612"><PhoneIcon size={22} /><div><small>{t.phone}</small><strong>+86 173 8301 7612</strong></div></a>
        <a href="mailto:liaorenxi23@gmail.com"><MailIcon size={22} /><div><small>{t.email}</small><strong>liaorenxi23@gmail.com</strong></div></a>
        <a href={whatsappUrl} target="_blank" rel="noreferrer"><WechatIcon size={22} /><div><small>WhatsApp</small><strong>{whatsappId}</strong></div></a>
        <a href={customerServiceUrl} target="_blank" rel="noreferrer"><WechatIcon size={22} /><div><small>{t.wechat}</small><strong>Open WeChat Support</strong></div></a>
      </div>
      <Link className="button" href={`/${lang}/#booking`}>{t.book}</Link>
    </section>

    <DetailFaq title={t.faqTitle} items={t.faq} />
  </InnerPageShell>;
}
