import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { guides } from "../../guides";
import { business } from "../../business";
import { CustomerServiceChooser } from "../CustomerServiceChooser";
import { JsonLd } from "../../JsonLd";
import { InnerPageShell, DetailFaq } from "../InnerPageShell";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map(({ slug }) => ({ lang: "en", guide: slug }));
}

function findGuide(lang: string, slug: string) {
  const guide = lang === "en" ? guides.find(item => item.slug === slug) : undefined;
  if (!guide) notFound();
  return guide;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; guide: string }> }): Promise<Metadata> {
  const { lang, guide: slug } = await params;
  const guide = findGuide(lang, slug);
  const url = `${business.url}/en/${guide.slug}/`;
  const image = { url: business.url + guide.image, alt: guide.imageAlt };
  return {
    title: guide.title, description: guide.description,
    robots: { index: true, follow: true, "max-image-preview": "large" },
    alternates: { canonical: url },
    openGraph: { title: guide.title, description: guide.description, url, type: "website", siteName: business.name, locale: "en_US", images: [image] },
    twitter: { card: "summary_large_image", title: guide.title, description: guide.description, images: [image.url] },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ lang: string; guide: string }> }) {
  const { lang, guide: slug } = await params;
  const guide = findGuide(lang, slug);
  const url = `${business.url}/en/${guide.slug}/`;
  return <InnerPageShell lang="en" title={guide.h1} summary={guide.intro} eyebrow="THE EXPERIENCE"
    image={guide.image} imageAlt={guide.imageAlt} heroSize="content"
    relatedLinks={guides.filter(item => item.slug !== slug).map(item => ({ href: `/en/${item.slug}/`, label: item.h1, meta: "Explore Liyan Baguo" }))}>
    <JsonLd data={{
      "@context": "https://schema.org", "@type": "WebPage", "@id": url + "#webpage",
      url, name: guide.h1, description: guide.description, inLanguage: "en",
      about: { "@id": business.url + "/#venue" },
      publisher: { "@id": business.url + "/#organization" },
      ...(slug === "banquet-of-ba-kingdom" ? {
        mainEntity: { "@type": "Service", "@id": business.url + "/#experience", name: business.product,
          alternateName: ["Ba Kingdom Banquet"], description: guide.intro,
          provider: { "@id": business.url + "/#organization" }, areaServed: "Chongqing, China",
          serviceType: "Cultural banquet and live performance" },
      } : {}),
    }} />
    <div className="guide-reading">
      {guide.sections.map(section => <section className="inner-section" key={section.title}>
        <h2>{section.title}</h2>
        {section.paragraphs.map(text => <p key={text}>{text}</p>)}
        <Link className="guide-text-link" href={section.link.href}>{section.link.label} &rarr;</Link>
      </section>)}
      <section className="inner-section">
        <h2>Plan your visit</h2>
        <p>All times below are Chongqing local time (UTC+8). Session availability and arrangements must be confirmed for your date.</p>
        <dl className="guide-sessions">{business.sessions.map(session => <div key={session.name}>
          <dt>{session.name}</dt><dd>Garden: {session.garden}<br />Banquet show: {session.start}-{session.end} (end time approximate)</dd>
        </div>)}</dl>
        <CustomerServiceChooser booking lang="en" className="button" />
      </section>
      <DetailFaq title="Questions before booking" items={guide.faq} />
    </div>
  </InnerPageShell>;
}
