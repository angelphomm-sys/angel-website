"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { Phone } from "./SocialSpecRow";
import s from "./SocialSpecRow.module.css";
import { shippedIntro, shippedPosts, type ShippedPost } from "@/lib/shipped-social";
import type { SocialSpecPost } from "@/lib/social-spec";

// Published posts in the same phone as the spec row, but live: swipe the image (or use the arrows) to move
// through a carousel, like on Instagram. Swiping the image flips slides; swiping anywhere else scrolls the row.
// The slide window is overflow: clip, not hidden, so focusing an arrow can never scroll the track sideways.
export function ShippedPostsRow({ posts = shippedPosts, intro = shippedIntro }: { posts?: ShippedPost[]; intro?: string | null }) {
  return (
    <div className="flex flex-col gap-6">
      {intro && <p className="text-[18px] leading-relaxed max-w-[620px]">{intro}</p>}
      <ul className="flex gap-6 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 pb-2 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-3 xl:grid-cols-5 md:gap-x-8 md:gap-y-14 xl:gap-x-6 md:overflow-visible [scrollbar-width:none]">
        {posts.map((p) => (
          <li key={p.slug} className="shrink-0 w-[72vw] max-w-[300px] md:w-auto md:max-w-none snap-center flex flex-col items-center gap-4">
            <LivePhone post={p} />
            <div className="flex flex-col gap-1 text-center max-w-[300px]">
              <span className="text-[11px] font-mono font-medium uppercase tracking-[0.08em] text-mid">Shyft · {p.format}</span>
              <span className="text-[18px] font-display font-normal tracking-[-0.01em] leading-tight">{p.title}</span>
              <span className="text-[15px] leading-relaxed text-mid">{p.why}</span>
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="hit self-center mt-1 font-mono text-[12px] font-medium border-b border-accent hover:text-accent-deep">see it on Instagram ↗</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LivePhone({ post }: { post: ShippedPost }) {
  const [i, setI] = useState(0);
  const n = post.slides.length;
  const start = useRef<number | null>(null);
  const go = (d: number) => setI((v) => Math.min(n - 1, Math.max(0, v + d)));

  // The phone chrome reads a SocialSpecPost; only the handle, brand, and first caption line show.
  const chrome: SocialSpecPost = {
    slug: post.slug, brand: "Shyft", handle: post.handle, title: post.title, format: post.format,
    src: post.slides[0].src, alt: post.slides[0].alt, caption: [post.title], why: post.why,
    strategy: { pillar: "", audience: "", resonates: "" }, credit: "", ratio: post.ratio,
  };

  const arrow = "absolute top-1/2 -translate-y-1/2 z-[1] grid place-items-center w-[11cqw] h-[11cqw] min-w-7 min-h-7 rounded-full bg-white/85 text-black shadow text-[5cqw] leading-none";
  const media = (
    <div
      className="absolute inset-0 overflow-clip touch-pan-y"
      onPointerDown={(e) => { if (e.pointerType !== "mouse") start.current = e.clientX; }}
      onPointerUp={(e) => { if (start.current === null) return; const dx = e.clientX - start.current; start.current = null; if (Math.abs(dx) > 30) go(dx < 0 ? 1 : -1); }}
      onPointerCancel={() => { start.current = null; }}
      role="group"
      aria-roledescription="carousel"
      aria-label={`${post.title}, ${n} ${n === 1 ? "slide" : "slides"}`}
    >
      <div className="flex h-full transition-transform duration-300 ease-out motion-reduce:transition-none" style={{ transform: `translateX(-${i * 100}%)` }}>
        {post.slides.map((sl, k) => (
          <div key={sl.src} className="relative shrink-0 w-full h-full" aria-hidden={k !== i}>
            <Image src={sl.src} alt={sl.alt} fill sizes="(min-width: 1280px) 230px, (min-width: 768px) 30vw, 68vw" className="object-cover" draggable={false} />
          </div>
        ))}
      </div>
      {n > 1 && (
        <>
          <span className={s.count} aria-hidden="true">{i + 1}/{n}</span>
          {i > 0 && <button type="button" className={`${arrow} left-[2.5cqw]`} onClick={() => go(-1)} aria-label="Previous slide">‹</button>}
          {i < n - 1 && <button type="button" className={`${arrow} right-[2.5cqw]`} onClick={() => go(1)} aria-label="Next slide">›</button>}
        </>
      )}
    </div>
  );
  const dots = n > 1 ? (
    <span className={s.dots} aria-hidden="true">
      {post.slides.map((sl, k) => <span key={sl.src} style={{ background: k === i ? "#0095f6" : "#c7c7c7" }} />)}
    </span>
  ) : <span />;

  return <div className="w-full max-w-[300px] mx-auto"><Phone post={chrome} media={media} dots={dots} /></div>;
}
