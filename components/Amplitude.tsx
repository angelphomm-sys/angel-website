"use client";
import { useEffect } from "react";

// Amplitude: autocapture (clicks, page views, form interactions) + session replay on 10% of sessions.
// Runs client-side only. Separate from components/Analytics.tsx, which is GA4.
// The SDK is imported inside the effect, after the key check, so a build with no key never downloads it.
const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY ?? "";

// Module scope, so initAll runs exactly once for the life of the app even though
// this component re-renders on every route change.
let started = false;

export function Amplitude() {
  useEffect(() => {
    if (!API_KEY) {
      console.warn("Amplitude API key missing, analytics disabled");
      return;
    }
    if (started) return;
    started = true;
    import("@amplitude/unified").then((amplitude) => {
      amplitude.initAll(API_KEY, { analytics: { autocapture: true }, sessionReplay: { sampleRate: 0.1 } });
    });
  }, []);

  return null;
}
