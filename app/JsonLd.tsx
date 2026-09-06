import { business } from "./business";

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function JsonLdOrganization() {
  return <JsonLd data={{
    "@context": "https://schema.org", "@type": "Organization",
    "@id": business.url + "/#organization", name: business.name,
    alternateName: business.aliases, description: business.description,
    url: business.url + "/en/", logo: business.url + business.logo,
    telephone: business.phone, email: business.email,
  }} />;
}

export function JsonLdWebsite() {
  return <JsonLd data={{
    "@context": "https://schema.org", "@type": "WebSite",
    "@id": business.url + "/#website", url: business.url + "/",
    name: business.name, alternateName: "礼宴巴国",
    publisher: { "@id": business.url + "/#organization" },
    inLanguage: ["zh-CN", "zh-TW", "en", "ja", "ko"],
  }} />;
}

export function JsonLdLocalBusiness() {
  return <JsonLd data={{
    "@context": "https://schema.org", "@type": ["LocalBusiness", "TouristAttraction"],
    "@id": business.url + "/#venue", name: business.name,
    alternateName: business.aliases, description: business.description,
    url: business.url + "/en/location-booking/", image: business.url + business.image,
    parentOrganization: { "@id": business.url + "/#organization" },
    address: { "@type": "PostalAddress", streetAddress: business.streetAddress, addressLocality: business.city, addressRegion: business.city, addressCountry: business.country },
    telephone: business.phone, hasMap: business.map,
  }} />;
}

export function JsonLdBreadcrumb({ items }: { items: { name: string; url: string }[] }) {
  return <JsonLd data={{
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: item.url })),
  }} />;
}

export function JsonLdFAQPage({ questions }: { questions: { question: string; answer: string }[] }) {
  return <JsonLd data={{
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: questions.map(({ question, answer }) => ({
      "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  }} />;
}
