export function JsonLdOrganization() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "礼宴巴国",
          alternateName: ["Ba Kingdom Banquet", "Li Yan Ba Guo", "Chongqing Ba Kingdom Banquet"],
          url: "https://gongyanshow.com/",
          logo: "https://gongyanshow.com/images/liyan-baguo-logo.png",
          telephone: "+86 173 8301 7612",
          email: "liaorenxi23@gmail.com",
          sameAs: [
            "https://maps.app.goo.gl/ZddotMySGkJYsjFh7",
          ],
        }),
      }}
    />
  );
}

export function JsonLdLocalBusiness() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "礼宴巴国 Ba Kingdom Banquet",
          alternateName: ["Li Yan Ba Guo", "Chongqing Ba Kingdom Banquet"],
          url: "https://gongyanshow.com/",
          image: "https://gongyanshow.com/images/liyan-baguo-logo.png",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Baguocheng",
            addressLocality: "重庆市",
            addressRegion: "九龙坡区",
            addressCountry: "CN",
          },
          geo: { "@type": "GeoCoordinates", latitude: "29.5174", longitude: "106.4856" },
          telephone: "+86 173 8301 7612",
          priceRange: "¥238 - ¥596",
          openingHours: "Mo-Su 10:00-21:00",
          hasMap: "https://maps.app.goo.gl/ZddotMySGkJYsjFh7",
        }),
      }}
    />
  );
}

export function JsonLdBreadcrumb(items: { name: string; url: string }[]) {
  const listItems = items.map((item, i) => ({
    "@type": "ListItem" as const,
    position: i + 1,
    name: item.name,
    item: item.url,
  }));
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: listItems,
        }),
      }}
    />
  );
}

export function JsonLdFAQPage(questions: { question: string; answer: string }[]) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: questions.map((q) => ({
            "@type": "Question",
            name: q.question,
            acceptedAnswer: { "@type": "Answer", text: q.answer },
          })),
        }),
      }}
    />
  );
}
