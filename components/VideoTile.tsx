"use client";
import { useRef, useState } from "react";
import Image from "next/image";

// Poster by default; plays muted on hover/focus (Graza-style). Falls back to the poster when there is no clip.
export function VideoTile({ video, poster, alt, ratio = "4/5", className = "", label, focusable = true }: { video?: string; poster: string; alt: string; ratio?: string; className?: string; label?: string; focusable?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const start = () => { const v = ref.current; if (!v) return; v.currentTime = 0; v.play().then(() => setPlaying(true)).catch(() => {}); };
  const stop = () => { const v = ref.current; if (!v) return; v.pause(); setPlaying(false); };
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-ink ${className}`} style={{ aspectRatio: ratio }} onMouseEnter={start} onMouseLeave={stop} onFocus={start} onBlur={stop} tabIndex={video && focusable ? 0 : -1}>
      <Image src={poster} alt={alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className={`object-cover transition-opacity duration-300 ${playing ? "opacity-0" : "opacity-100"}`} />
      {video && <video ref={ref} src={video} muted loop playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover" aria-hidden="true" />}
      {video && (
        <span className="absolute top-3 left-3 inline-flex items-center gap-2 bg-ink/85 text-white rounded-full px-3 py-1.5 text-[11px] font-bold">
          <span className={`w-2 h-2 rounded-full ${playing ? "bg-accent" : "bg-white/60"}`} />{playing ? "playing" : "hover to play"}
        </span>
      )}
      {label && <span className="absolute bottom-3 left-3 bg-white text-ink rounded-full px-3 py-1.5 text-[11px] font-bold">{label}</span>}
    </div>
  );
}
