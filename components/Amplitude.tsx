"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import * as amplitude from "@amplitude/unified";

// Amplitude: autocapture (clicks, page views, form interactions) + session replay.
// Runs client-side only. Separate from components/Analytics.tsx, which is GA4.
const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY ?? "";

// Module scope, so initAll runs exactly once for the life of the app even though
// this component re-renders on every route change.
let started = false;

export function Amplitude() {
  const pathname = usePathname();

  useEffect(() => {
    if (!API_KEY) {
      console.warn("Amplitude API key missing, analytics disabled");
      return;
    }
    if (!started) {
      started = true;
      amplitude.initAll(API_KEY, { analytics: { autocapture: true }, sessionReplay: { sampleRate: 1 } });
    }
    // The landing page. Events fired before init finishes are queued by the SDK.
    if (pathname === "/") {
      amplitude.track('Viewed Home Page', { prompt_version: 'BA400.4' }); // helps improve this setup flow. Safe to remove once you've verified the event lands
    }
  }, [pathname]);

  return null;
}
