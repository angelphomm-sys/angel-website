import Image from "next/image";

export function YouTube({ id, title }: { id: string; title: string }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-black aspect-video">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
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
  return <div className="todo">✎ {children}</div>;
}

export function LinkCard({ href, label, title }: { href: string; label: string; title: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="not-prose flex items-center justify-between gap-4 border-2 border-ink rounded-2xl bg-white p-4 no-underline hover:bg-mist transition-colors" style={{ textDecoration: "none" }}>
      <span className="flex flex-col gap-1">
        <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-mid">{label}</span>
        <span className="font-sans font-semibold text-base leading-tight">{title}</span>
      </span>
      <span className="text-[12px] font-bold shrink-0">open ↗</span>
    </a>
  );
}
