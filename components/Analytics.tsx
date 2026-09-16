"use client";
import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { GA_ID } from "@/lib/analytics";

// Loads GA4 and sends a page_view on every client-side route change.
export function Analytics() {
  const path = usePathname();
  useEffect(() => { if (GA_ID && window.gtag) window.gtag("event", "page_view", { page_path: path }); }, [path]);
  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{send_page_view:false});`}</Script>
    </>
  );
}
