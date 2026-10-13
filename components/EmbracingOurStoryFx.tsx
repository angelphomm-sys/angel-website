"use client";

import { useEffect, useState } from "react";

/**
 * The live pieces of the Embracing Our Story case study.
 * Everything else on that page renders on the server.
 * The read-progress line is the site's own (CaseProgress), so the campaign red stays inside its block.
 */

// The reveal-on-scroll pass over anything marked [data-reveal]. Renders nothing.
export function EmbracingFx() {
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("eos-js");

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let io: IntersectionObserver | undefined;
    if (!still && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            (e.target as HTMLElement).dataset.in = "1";
            io?.unobserve(e.target);
          }
        },
        { rootMargin: "0px 0px -8% 0px" },
      );
      for (const el of els) io.observe(el);
    } else {
      for (const el of els) el.dataset.in = "1";
    }

    return () => {
      io?.disconnect();
      html.classList.remove("eos-js");
    };
  }, []);

  return null;
}

// Doors open at 11:00 on April 17, 2027, America/Denver (MDT, UTC-6).
const DOORS = "2027-04-17T11:00:00-06:00";

export function EmbracingCountdown({ className }: { className?: string }) {
  const [label, setLabel] = useState("counting…");

  useEffect(() => {
    const target = new Date(DOORS).getTime();
    const tick = () => {
      const left = target - Date.now();
      if (left <= 0) { setLabel("Sabaidee Pi Mai"); return; }
      const d = Math.floor(left / 864e5);
      const h = Math.floor(left / 36e5) % 24;
      const m = Math.floor(left / 6e4) % 60;
      const s = Math.floor(left / 1e3) % 60;
      setLabel(`${d}d ${h}h ${m}m ${s}s`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <b className={className}>{label}</b>;
}
