import Image from "next/image";
import Script from "next/script";
import { showNotes } from "@/lib/notes";

export function YouTube({ id, title }: { id: string; title: string }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-black aspect-video">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}

// TikTok's official oEmbed markup. embed.js swaps the blockquote for the player; until it loads
// (or if it is blocked), the blockquote stays a plain card with a link to the video.
// The box reserves the player's height (about 740px at 325 wide) so the swap does not push the page down.
export function TikTok({ url, title }: { url: string; title: string }) {
  const videoId = url.match(/video\/(\d+)/)?.[1];
  return (
    <div className="mx-auto w-full" style={{ maxWidth: 325 }}>
      <div style={{ minHeight: 740 }}>
        <blockquote className="tiktok-embed" cite={url} data-video-id={videoId} style={{ maxWidth: 325, minWidth: 0, margin: 0 }}>
          <section>
            <a href={url} target="_blank" rel="noopener noreferrer" title={title}>
              {title}
            </a>
          </section>
        </blockquote>
      </div>
      <p className="text-[13px] mt-2">
        <a href={url} target="_blank" rel="noopener noreferrer">
          Watch on TikTok
        </a>
      </p>
      <Script async src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />
    </div>
  );
}

// Instagram's official embed markup. embed.js swaps the blockquote for the post; until it loads
// (or if it is blocked), the blockquote stays a plain card with a link to the post.
// The box reserves most of the embed's height (a 4:5 post measured about 715px at 400 wide, about 640px on a phone)
// so the swap does not push the page down.
export function Instagram({ url, title }: { url: string; title: string }) {
  return (
    <div className="mx-auto w-full" style={{ maxWidth: 400 }}>
      <div style={{ minHeight: 640 }}>
        <blockquote className="instagram-media" data-instgrm-permalink={url} data-instgrm-version="14" style={{ maxWidth: 400, minWidth: 0, width: "100%", margin: 0 }}>
          <a href={url} target="_blank" rel="noopener noreferrer" title={title}>
            {title}
          </a>
        </blockquote>
      </div>
      <p className="text-[13px] mt-2">
        <a href={url} target="_blank" rel="noopener noreferrer">
          View on Instagram
        </a>
      </p>
      <Script async src="https://www.instagram.com/embed.js" strategy="lazyOnload" />
    </div>
  );
}

export function Figure({ src, alt, caption, ratio = "4/3" }: { src: string; alt: string; caption?: string; ratio?: string }) {
  return (
    <figure>
      <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: ratio }}>
        <Image src={src} alt={alt} fill sizes="(min-width: 768px) 720px, 100vw" className="object-cover" />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export function Gallery({ images, cols = 2 }: { images: { src: string; alt: string }[]; cols?: 2 | 3 }) {
  return (
    <div className={`grid gap-3 ${cols === 3 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2"}`}>
      {images.map((im) => (
        <div key={im.src} className="relative rounded-2xl overflow-hidden aspect-[4/5]">
          <Image src={im.src} alt={im.alt} fill sizes="(min-width: 768px) 360px, 50vw" className="object-cover" />
        </div>
      ))}
    </div>
  );
}

export function Todo({ children }: { children: React.ReactNode }) {
  // A bracket note: what still goes here. Shown unless NEXT_PUBLIC_SHOW_NOTES=false (lib/notes.ts).
  if (!showNotes) return null;
  return <div className="todo">[{children}]</div>;
}

export function LinkCard({ href, label, title }: { href: string; label: string; title: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="not-prose flex items-center justify-between gap-4 border-2 border-ink rounded-2xl bg-card p-4 no-underline hover:bg-mist transition-colors" style={{ textDecoration: "none" }}>
      <span className="flex flex-col gap-1">
        <span className="text-[12px] font-mono font-medium uppercase tracking-[0.08em] text-mid">{label}</span>
        <span className="font-sans font-semibold text-base leading-tight">{title}</span>
      </span>
      <span className="text-[12px] font-bold shrink-0">open ↗</span>
    </a>
  );
}
