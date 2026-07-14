import { languages, type Lang } from "../../languages";
import { siteSeo, getCanonicalPath, getHreflang } from "../../seo";
import type { Metadata } from "next";

export function generateStaticParams() { return languages.map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  const seo = siteSeo[lang].location;
  return {
    title: seo.title, description: seo.description,
    alternates: { canonical: getCanonicalPath(lang, "location"), languages: getHreflang("location") },
    openGraph: { title: seo.title, description: seo.description, url: getCanonicalPath(lang, "location"), type: "website" },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const isEn = lang === "en";
  return (
    <main className="page-content">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol><li><a href={`/${lang}/`}>{isEn ? "Ba Kingdom Banquet" : "礼宴巴国"}</a></li><li aria-current="page">{isEn ? "Location & Booking" : "地址与预订"}</li></ol>
      </nav>

      <section><h1>{isEn ? "Location & Booking" : "地址与预订"}</h1></section>

      <section>
        <h2>{isEn ? "Address" : "地址"}</h2>
        <p>Baguocheng, Jiulongpo District, Chongqing, China</p>
        <p>中国重庆市九龙坡区巴国城</p>
      </section>

      <section>
        <h2>{isEn ? "Hours" : "营业时间"}</h2>
        <p>{isEn ? "Daily 10:00 – 21:00" : "每日 10:00 – 21:00"}</p>
        <p>{isEn ? "Lunch: Garden 11:20 / Ritual 12:05 / Show 12:30–14:10" : "午宴：游园 11:20 / 迎宾礼 12:05 / 餐秀 12:30–14:10"}</p>
        <p>{isEn ? "Dinner: Garden 17:30 / Ritual 18:20 / Show 19:00–20:40" : "晚宴：游园 17:30 / 迎宾礼 18:20 / 餐秀 19:00–20:40"}</p>
      </section>

      <section>
        <h2>{isEn ? "Maps" : "地图导航"}</h2>
        <a href="https://maps.app.goo.gl/ZddotMySGkJYsjFh7" target="_blank" rel="noreferrer">Google Maps</a>
        {" | "}
        <a href="https://j.map.baidu.com/76/_1tc" target="_blank" rel="noreferrer">百度地图</a>
      </section>

      <section>
        <h2>{isEn ? "Contact" : "联系方式"}</h2>
        <p>📞 +86 173 8301 7612</p>
        <p>✉️ liaorenxi23@gmail.com</p>
        <p>💬 WeChat: cqlybg8866</p>
      </section>

      <section>
        <h2>{isEn ? "Cancellation" : "取消政策"}</h2>
        <p>{isEn ? "Free cancellation anytime before use." : "未核销随时可退。"}</p>
      </section>

      <section>
        <h2>{isEn ? "Accessibility" : "无障碍"}</h2>
        <p>{isEn ? "Wheelchair accessible." : "支持无障碍通行。"}</p>
      </section>

      <a href={`/${lang}/#booking`} className="cta-button">{isEn ? "Book Now" : "立即预订"}</a>
    </main>
  );
}
