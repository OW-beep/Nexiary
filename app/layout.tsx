import type { Metadata } from "next";
import Script from "next/script";
import { Newsreader, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AffiliateClickTracker from "@/components/AffiliateClickTracker";
import { siteConfig } from "@/lib/site-config";

// display: 見出し用セリフ（日記/目録のクラシックな雰囲気）
const display = Newsreader({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});
// body: 本文用サンセリフ
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});
// mono: 日付・カテゴリタグなど「カタログ番号」的表示用
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name}｜${siteConfig.tagline}`,
    template: `%s｜${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  verification: {
    google: "KYZp6leIoJkmXQipodIUtUhXTopgEfgqFiQ7eJZuRZA",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteConfig.url}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ];

  return (
    <html lang="ja" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <AffiliateClickTracker />
      </body>
    </html>
  );
}
