import { languages, type Lang } from "../../languages";
import { siteSeo, getCanonicalPath, getHreflang } from "../../seo";
import { content } from "../../content";
import type { Metadata } from "next";

export function generateStaticParams() { return languages.map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  const seo = siteSeo[lang].showTimes;
  return {
    title: seo.title, description: seo.description,
    alternates: { canonical: getCanonicalPath(lang, "showTimes"), languages: getHreflang("showTimes") },
    openGraph: { title: seo.title, description: seo.description, url: getCanonicalPath(lang, "showTimes"), type: "website" },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  };
}

function ContentZh() {
  return (
    <main className="page-content">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol><li><a href="/zh/">礼宴巴国</a></li><li aria-current="page">演出时间与价格</li></ol>
      </nav>
      <section><h1>演出时间与价格</h1></section>
      
      <section>
        <h2>午宴时间</h2>
        <table><tbody>
          <tr><td>游园活动</td><td>11:20 – 11:55</td></tr>
          <tr><td>迎宾礼</td><td>12:05 – 12:10</td></tr>
          <tr><td>餐秀</td><td>12:30 – 14:10</td></tr>
        </tbody></table>
      </section>

      <section>
        <h2>晚宴时间</h2>
        <table><tbody>
          <tr><td>游园活动</td><td>17:30 – 18:15</td></tr>
          <tr><td>迎宾礼</td><td>18:20 – 18:30</td></tr>
          <tr><td>餐秀</td><td>19:00 – 20:40</td></tr>
        </tbody></table>
      </section>

      <section>
        <h2>票价</h2>
        <table>
          <thead><tr><th>席位</th><th>午餐</th><th>晚餐</th></tr></thead>
          <tbody>
            <tr><td>Guest Seat 标准席</td><td>¥238</td><td>¥316</td></tr>
            <tr><td>VIP Seat 贵宾席</td><td>¥296</td><td>¥458</td></tr>
            <tr><td>SVIP Seat 尊享席</td><td>¥496</td><td>¥596</td></tr>
          </tbody>
        </table>
        <p>所有票种均包含游园、迎宾礼、餐秀演出与宴席。SVIP 席额外包含华服妆造与精修照片一张。团队咨询请通过<a href="/zh/location-booking/">预订页面</a>提交。</p>
      </section>

      <section>
        <h2>菜单参考</h2>
        <h3>餐前</h3>
        <ul>
          <li>巴渝精萃青梅普洱酒</li><li>经典高山白牡丹</li><li>九霞璎珞盏</li>
          <li>星檐六饴</li><li>招牌清鸡汤（配蘸料三味碟）</li><li>清筵五馥</li>
        </ul>
        <h3>餐中</h3>
        <ul>
          <li>凤韵锦眉肴</li><li>巴山野菌素食拼和牛</li><li>生机盎然有机蔬菜拼</li>
          <li>芝士茄汁猪扒饭</li><li>酒糟冻奶鲜果</li>
        </ul>
      </section>

      <section>
        <h2>取消政策</h2>
        <p>未核销随时可退。</p>
      </section>

      <section>
        <h2>无障碍设施</h2>
        <p>本场地支持无障碍通行。</p>
      </section>

      <a href="/zh/location-booking/" className="cta-button">咨询预订</a>
    </main>
  );
}

function ContentEn() {
  return (
    <main className="page-content">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol><li><a href="/en/">Ba Kingdom Banquet</a></li><li aria-current="page">Show Times &amp; Prices</li></ol>
      </nav>
      <section><h1>Show Times &amp; Prices</h1></section>

      <section>
        <h2>Lunch Session</h2>
        <table><tbody>
          <tr><td>Garden Visit</td><td>11:20 – 11:55</td></tr>
          <tr><td>Welcome Ritual</td><td>12:05 – 12:10</td></tr>
          <tr><td>Banquet &amp; Show</td><td>12:30 – 14:10</td></tr>
        </tbody></table>
      </section>

      <section>
        <h2>Dinner Session</h2>
        <table><tbody>
          <tr><td>Garden Visit</td><td>17:30 – 18:15</td></tr>
          <tr><td>Welcome Ritual</td><td>18:20 – 18:30</td></tr>
          <tr><td>Banquet &amp; Show</td><td>19:00 – 20:40</td></tr>
        </tbody></table>
      </section>

      <section>
        <h2>Pricing</h2>
        <table>
          <thead><tr><th>Seat</th><th>Lunch</th><th>Dinner</th></tr></thead>
          <tbody>
            <tr><td>Guest Seat</td><td>¥238</td><td>¥316</td></tr>
            <tr><td>VIP Seat</td><td>¥296</td><td>¥458</td></tr>
            <tr><td>SVIP Seat</td><td>¥496</td><td>¥596</td></tr>
          </tbody>
        </table>
        <p>All seats include garden visit, welcome ritual, banquet show and dining. SVIP includes Hanfu costume styling and one retouched photo. For group inquiries, please use the <a href="/en/location-booking/">booking page</a>.</p>
      </section>

      <section>
        <h2>Sample Menu</h2>
        <h3>Starters</h3>
        <ul>
          <li>Ba-Yu Green Plum Pu&apos;er Wine</li><li>Classic High-Mountain White Peony Tea</li>
          <li>Nine Glow Jade Cup</li><li>Star Eaves Six Sweets</li>
          <li>Signature Clear Chicken Soup (with three dipping sauces)</li><li>Pure Feast Five Grains</li>
        </ul>
        <h3>Main Course</h3>
        <ul>
          <li>Phoenix Brows Delicacy</li><li>Ba Mountain Wild Mushroom Platter &amp; Wagyu</li>
          <li>Organic Seasonal Vegetable Platter</li><li>Cheese Tomato Pork Chop Rice</li><li>Fermented Rice Chilled Fresh Fruit</li>
        </ul>
      </section>

      <section>
        <h2>Cancellation Policy</h2>
        <p>Free cancellation anytime before use.</p>
      </section>

      <section>
        <h2>Accessibility</h2>
        <p>Wheelchair accessible.</p>
      </section>

      <a href="/en/location-booking/" className="cta-button">Book Now</a>
    </main>
  );
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  if (lang === "en") return <ContentEn />;
  return <ContentZh />;
}
