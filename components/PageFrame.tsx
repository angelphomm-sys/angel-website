"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

type Box = { left: number; top: number; width: number; height: number };
type FrameVideo = Box & { src: string; poster: string };
type FrameOverlay = Box & { src: string };

const place = ({ left, top, width, height }: Box) => ({ left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` });

// A video laid on the screenshot at its spot on the page. It plays muted and looped while it is on screen, like a
// background video on a live site. With reduced motion set it stays on its poster.
function FrameClip({ src, poster, ...box }: FrameVideo) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    let seen = false;
    const sync = () => {
      if (seen && !still.matches) video.play().catch(() => {});
      else video.pause();
    };
    const watch = new IntersectionObserver(([entry]) => { seen = entry.isIntersecting; sync(); }, { rootMargin: "200px" });
    watch.observe(video);
    still.addEventListener("change", sync);
    return () => { watch.disconnect(); still.removeEventListener("change", sync); };
  }, []);
  return (
    <video ref={ref} src={src} poster={poster} muted loop playsInline preload="metadata" aria-hidden="true" disablePictureInPicture className="absolute block object-cover pointer-events-none" style={place(box)} />
  );
}

// An inline browser-style frame for a full page. The page is read here, on the case study,
// instead of behind a click out to the tool it was built in.
// With an embedUrl the frame holds the live page in an iframe; without one it holds the screenshot, which scrolls inside the frame.
// Videos play on the screenshot where they sit on the page, and overlays (cut from the same screenshot) go back on top of them.
export function PageFrame({ src, alt, url, width, height, embedUrl, link, videos, overlays }: { src: string; alt: string; url: string; width: number; height: number; embedUrl?: string; link?: { label: string; href: string }; videos?: FrameVideo[]; overlays?: FrameOverlay[] }) {
  const out = link ?? { label: "open full size", href: src };
  const plays = !embedUrl && !!videos?.length;
  return (
    <figure className="flex flex-col gap-2 m-0">
      <div className="overflow-hidden rounded-2xl border border-line bg-mist">
        <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
          <span className="flex gap-1.5 shrink-0" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-grey/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-grey/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-grey/60" />
          </span>
          <span className="text-[11px] text-mid truncate">{url}</span>
        </div>
        {embedUrl ? (
          <div className="w-full h-[50vh] md:h-[60vh] bg-paper">
            <iframe src={embedUrl} title={alt} loading="lazy" allowFullScreen className="block w-full h-full border-0" />
          </div>
        ) : (
          <div tabIndex={0} aria-label={`${alt}. Scrollable.`} className="max-h-[50vh] md:max-h-[60vh] overflow-y-auto bg-paper">
            <div className="relative">
              <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 1024px) 60vw, 100vw" className="block w-full h-auto" />
              {videos?.map((v) => <FrameClip key={v.src} {...v} />)}
              {overlays?.map((o) => (
                // eslint-disable-next-line @next/next/no-img-element -- a small transparent cut placed by percent; next/image adds nothing here
                <img key={o.src} src={o.src} alt="" aria-hidden="true" className="absolute block pointer-events-none" style={place(o)} />
              ))}
            </div>
          </div>
        )}
      </div>
      <figcaption className="text-[12px] text-mid flex flex-wrap items-center gap-x-3 gap-y-1">
        <span>{embedUrl ? "The live page, running inside the frame. Scroll it here." : plays ? "The page plays here the way it would live. Scroll inside the frame to see all of it." : "Scroll inside the frame to see the whole page."}</span>
        <a href={out.href} target="_blank" rel="noopener noreferrer" className="hit font-bold border-b border-grey/60 hover:text-accent-deep hover:border-accent-deep">{out.label} ↗</a>
      </figcaption>
    </figure>
  );
}
