import Image from "next/image";

// Every post cover renders here: blog cards, the read-next cards, and the post hero.
// Covers are exported at exactly 16:9 (2400 x 1350, see covers-inbox/README.md), and this frame is 16:9 too,
// so object-cover fills it without cutting the title text set into the image. Centered in case a file is a hair off.

// Card widths match the grids that hold them: the page is max 1440px with 80px gutters (20px under md), gap-6 between cards.
const cardSizes = {
  /** /blog: 1 column, 2 from md, 3 from lg. */
  grid: "(min-width: 1440px) 411px, (min-width: 1024px) calc((100vw - 208px) / 3), (min-width: 768px) calc((100vw - 184px) / 2), calc(100vw - 40px)",
  /** Read next under a post: 1 column, 3 from md. */
  row: "(min-width: 1440px) 411px, (min-width: 768px) calc((100vw - 208px) / 3), calc(100vw - 40px)",
} as const;

// The hero is capped at the reading column (760px, the post body's middle grid column): centered over it from lg,
// left-aligned with it below lg, where the body is a single left-aligned column.
const heroSizes = "(min-width: 920px) 760px, (min-width: 768px) calc(100vw - 160px), calc(100vw - 40px)";

export type CoverImageProps = {
  src?: string;
  alt: string;
  variant: "card" | "hero";
  /** Card only: which grid the card sits in, for `sizes`. */
  layout?: keyof typeof cardSizes;
  /** Preload the image. The hero always does (it is the page's largest paint); on /blog only the first card does. */
  priority?: boolean;
  /** Hero only: a photo credit, shown as a caption. Cards never show it. */
  credit?: string;
  creditUrl?: string;
};

export function CoverImage({ src, alt, variant, layout = "grid", priority, credit, creditUrl }: CoverImageProps) {
  if (variant === "card") {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-mist aspect-[16/9]">
        {src ? (
          <Image src={src} alt={alt} fill sizes={cardSizes[layout]} {...(priority ? { preload: true } : {})} className="object-cover object-center transition-transform duration-300 motion-safe:group-hover:scale-[1.03]" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center"><span className="hand text-[20px] text-mid">no cover yet</span></div>
        )}
      </div>
    );
  }
  if (!src) return null;
  const frame = (
    <div className="relative overflow-hidden rounded-3xl bg-mist aspect-[16/9]">
      <Image src={src} alt={alt} fill sizes={heroSizes} preload fetchPriority="high" className="object-cover object-center" />
    </div>
  );
  return (
    <figure className="w-full max-w-[760px] lg:mx-auto">
      {frame}
      {credit && (
        <figcaption className="mt-2 font-mono text-[12px] font-medium tracking-[0.02em] text-ink">
          {creditUrl ? <a href={creditUrl} target="_blank" rel="noopener" className="underline decoration-accent decoration-[1.5px] underline-offset-[3px] hover:text-accent-deep">{credit}</a> : credit}
        </figcaption>
      )}
    </figure>
  );
}
