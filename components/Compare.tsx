"use client";
import { useRef, useState } from "react";
import Image from "next/image";

// Before / after slider. Drag the handle. If there is no after image yet, the right side is a labelled frame.
export function Compare({ before, after, afterLabel = "[the after goes here]", alt, ratio = "16/10", objectTop = true }: { before: string; after?: string; afterLabel?: string; alt: string; ratio?: string; objectTop?: boolean }) {
  const [pos, setPos] = useState(55);
  const ref = useRef<HTMLDivElement>(null);
  const move = (clientX: number) => { const r = ref.current?.getBoundingClientRect(); if (!r) return; setPos(Math.min(96, Math.max(4, ((clientX - r.left) / r.width) * 100))); };
  const fit = objectTop ? "object-cover object-top" : "object-cover";
  return (
    <div ref={ref} className="relative w-full overflow-hidden rounded-2xl border border-line bg-mist select-none touch-pan-y" style={{ aspectRatio: ratio }}
      onPointerMove={(e) => { if (e.buttons === 1) move(e.clientX); }} onPointerDown={(e) => move(e.clientX)}>
      {after ? <Image src={after} alt={`${alt}, after`} fill sizes="(min-width: 1024px) 60vw, 100vw" className={fit} /> : (
        <div className="absolute inset-y-0 right-0 flex items-center justify-center p-6 text-center" style={{ left: `${pos}%`, backgroundImage: "repeating-linear-gradient(45deg, transparent 0 10px, var(--color-line) 10px 11px)" }}><span className="hand text-[24px] md:text-[30px] leading-tight text-mid">{afterLabel.replace(/^\[|\]$/g, "")}</span></div>
      )}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt={`${alt}, before`} fill sizes="(min-width: 1024px) 60vw, 100vw" className={fit} />
      </div>
      <div className="absolute top-0 bottom-0 w-0.5 bg-ink" style={{ left: `${pos}%` }} />
      <button type="button" aria-label="Drag to compare" className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-ink text-white text-[13px] font-extrabold flex items-center justify-center shadow-[3px_3px_0_var(--color-ember)] cursor-ew-resize"
        style={{ left: `${pos}%` }}
        onKeyDown={(e) => { if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 4)); if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 4)); }}>⇔</button>
      <span className="absolute top-3 left-3 bg-white text-ink rounded-full px-3 py-1 text-[11px] font-bold">before</span>
      <span className="absolute top-3 right-3 bg-ink text-white rounded-full px-3 py-1 text-[11px] font-bold">after</span>
    </div>
  );
}
