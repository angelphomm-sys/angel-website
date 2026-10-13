"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Placeholder } from "./Placeholder";
import { showNotes } from "@/lib/notes";

// A vertical clip inside an iPhone. The frame is a real device render with the screen cut out
// (public/images/mockups/iphone-16-frame.png, 757x1558); the video sits behind it in the screen
// rectangle and plays muted while it is on screen. No clip yet: the screen holds a placeholder.
const SCREEN = { left: 3.757, top: 1.271, width: 92.925, height: 97.602 }; // % of the frame

export function PhoneVideo({ video, poster, slides, alt, pending, className = "" }: { video?: string; poster?: string; slides?: string[]; alt: string; pending?: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);
  const [slide, setSlide] = useState(0);
  // A carousel advances on its own every 2.6s, the way a reader would swipe. Reduced motion holds the first slide.
  useEffect(() => {
    if (!slides || slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setSlide((i) => (i + 1) % slides.length), 2600);
    return () => window.clearInterval(id);
  }, [slides]);
  useEffect(() => {
    const v = ref.current; if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !reduce) { v.play().then(() => setOn(true)).catch(() => {}); }
      else { v.pause(); setOn(false); }
    }, { threshold: 0.4 });
    obs.observe(v); return () => obs.disconnect();
  }, []);
  return (
    <div className={`relative w-full ${className}`} style={{ aspectRatio: "757 / 1558" }}>
      <div className="absolute overflow-hidden bg-ink" style={{ left: `${SCREEN.left}%`, top: `${SCREEN.top}%`, width: `${SCREEN.width}%`, height: `${SCREEN.height}%`, borderRadius: "13.8% / 6.4%" }}>
        {slides && slides.length > 0 ? (
          <div className="absolute inset-0 bg-white">
            {slides.map((src, i) => (
              <Image key={src} src={src} alt={`${alt}, slide ${i + 1} of ${slides.length}`} fill sizes="(min-width: 1024px) 300px, 70vw" className={`object-contain transition-opacity duration-500 ${i === slide ? "opacity-100" : "opacity-0"}`} />
            ))}
            <div className="absolute inset-x-0 bottom-[6%] flex justify-center gap-1.5" aria-hidden="true">
              {slides.map((src, i) => <span key={src} className={`w-1.5 h-1.5 rounded-full ${i === slide ? "bg-ink" : "bg-ink/25"}`} />)}
            </div>
          </div>
        ) : video ? (
          <>
            {poster && <Image src={poster} alt={alt} fill sizes="(min-width: 1024px) 300px, 70vw" className={`object-cover transition-opacity duration-300 ${on ? "opacity-0" : "opacity-100"}`} />}
            <video ref={ref} src={video} poster={poster} muted loop playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover" aria-label={alt} />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-4 bg-mist">
            <Placeholder label={showNotes ? (pending ?? "[clip, pending]") : "coming soon"} ratio="9/16" tag="clip here" />
          </div>
        )}
        {/* the island sits over the screen, as it does on the device */}
        <div className="absolute left-1/2 -translate-x-1/2 bg-[#0c0c0e] rounded-full" style={{ top: "1.6%", width: "35%", height: "3.4%" }} aria-hidden="true" />
      </div>
      <Image src="/images/mockups/iphone-16-frame.png" alt="" fill sizes="(min-width: 1024px) 320px, 75vw" className="pointer-events-none select-none" priority={false} />
    </div>
  );
}
