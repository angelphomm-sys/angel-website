import type { Metadata, Viewport } from "next";
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

// The browser bar and the home-screen splash take the oxblood, as the app icon does.
export const viewport: Viewport = { themeColor: "#421F23" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Angel's faces, from her Adobe Fonts web project (kit ttt0zqg): IvyOra Display, Benton Modern Text, Ballinger Mono, Bookmania.
            The kit is allowed on angelphommachan.com, www, *.vercel.app, and localhost. Families and fallbacks live in app/globals.css. */}
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://use.typekit.net/ttt0zqg.css" />
      </head>
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
