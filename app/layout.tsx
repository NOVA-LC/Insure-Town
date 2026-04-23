import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono, Caveat } from "next/font/google";
import { content, brand } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(content.seo.site_url),
  title: content.seo.title,
  description: content.seo.description,
  applicationName: brand.name,
  authors: [{ name: brand.host }],
  keywords: [
    "insurance podcast",
    "Heath Shearon",
    "Insurance Town",
    "keynote speaker",
    "insurance training",
    "insurance consulting",
  ],
  openGraph: {
    title: content.seo.title,
    description: content.seo.description,
    url: content.seo.site_url,
    siteName: brand.name,
    images: [{ url: content.seo.og_image, width: 1400, height: 1400 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: content.seo.title,
    description: content.seo.description,
    images: [content.seo.og_image],
  },
  robots: { index: true, follow: true },
};

const podcastSeriesJsonLd = {
  "@context": "https://schema.org",
  "@type": "PodcastSeries",
  name: brand.name,
  description: content.seo.description,
  url: content.seo.site_url,
  image: content.seo.og_image,
  webFeed: content.episodes_feed.rss,
  author: { "@type": "Person", name: brand.host },
  inLanguage: "en-US",
};

const latestEpisodeJsonLd = {
  "@context": "https://schema.org",
  "@type": "PodcastEpisode",
  name: content.latest_episode.title,
  episodeNumber: content.latest_episode.number,
  datePublished: content.latest_episode.date,
  partOfSeries: { "@type": "PodcastSeries", name: brand.name },
  url: content.latest_episode.apple,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} ${caveat.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(podcastSeriesJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(latestEpisodeJsonLd),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
