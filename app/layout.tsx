import type { Metadata, Viewport } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import { Amplitude } from "@/components/Amplitude";
import { site } from "@/lib/site";
import { og } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.seoDescription,
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : undefined,
  // The share image comes from app/opengraph-image.tsx; pages with their own picture (case studies, posts) set openGraph.images.
  openGraph: { ...og, title: `${site.name} · ${site.tagline}`, description: site.seoDescription },
  twitter: { card: "summary_large_image" },
};

// Angel's one family, from the brand sheet. Self-hosted at build time, with the width axis for condensed display lines.
const instrument = Instrument_Sans({ subsets: ["latin"], axes: ["wdth"], style: ["normal", "italic"], display: "swap", variable: "--font-instrument" });

// The browser bar and the home-screen splash take the brand red, as the app icon does.
export const viewport: Viewport = { themeColor: "#BB2426" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={instrument.variable}>
      <body className="antialiased min-h-screen flex flex-col">
        <a href="#main" className="skip-link">skip to content</a>
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <Amplitude />
      </body>
    </html>
  );
}
