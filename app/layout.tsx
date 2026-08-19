import type { Metadata } from "next";
import { connection } from "next/server";
import "./styles/base.css";
import "./styles/components.css";
import "./styles/pages.css";
import "./styles/responsive.css";
import "./styles/checkout.css";
import "./styles/admin.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  return (
    <html lang="zh-CN">
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
      <body>{children}</body>
    </html>
  );
}