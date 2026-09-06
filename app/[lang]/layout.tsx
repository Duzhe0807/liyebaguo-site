import { notFound } from "next/navigation";
import { languages, langCodes, type Lang } from "../languages";
import { JsonLdOrganization, JsonLdLocalBusiness } from "../JsonLd";

export const dynamicParams = false;
import "../styles/base.css";
import "../styles/components.css";
import "../styles/pages.css";
import "../styles/responsive.css";
import "../styles/seo.css";

export default async function LangLayout({ children, params }: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!languages.includes(lang as Lang)) notFound();
  return (
    <html lang={langCodes[lang as Lang]}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Noto+Serif+SC:wght@500;600;700&family=Noto+Sans+SC:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Noto+Serif+JP:wght@500;700&family=Noto+Serif+KR:wght@500;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css"
        />
      </head>
      <body><JsonLdOrganization /><JsonLdLocalBusiness />{children}</body>
    </html>
  );
}
