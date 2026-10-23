import Link from "next/link";
import { provenance as provenanceLabels, workLinks, type Provenance } from "@/lib/site";
import { work, linkFor, proofFor, type WorkItem } from "@/lib/work";
import { VideoTile } from "./VideoTile";

// One card, used on /work and on home. The work is the visual; the words run
// where it came from, title, then the link. Home's rows add the one-line blurb beside the image.
export type CardData = {
  key: string; href?: string; title: string; provenance: Provenance;
  poster: string; video?: string; focus?: string; linkLabel: string; blurb?: string;
  brand?: string; proof?: string;
};

export const cardFor = (w: WorkItem): CardData => ({
  key: w.slug,
  href: w.caseStudy ? `/case/${w.slug}` : linkFor(w),
  title: w.title,
  provenance: w.provenance,
  poster: w.preview.poster,
  video: w.preview.video,
  focus: w.preview.focus,
  linkLabel: w.caseStudy ? workLinks[w.discipline] : "follow the project →",
  blurb: w.blurb,
  brand: w.brand,
  proof: proofFor(w),
});

// "JJ Coffee Co · spec work". The brand is left off when the title already names it.
const eyebrowFor = (c: CardData) =>
  c.brand && !c.title.toLowerCase().includes(c.brand.toLowerCase()) ? `${c.brand} · ${provenanceLabels[c.provenance]}` : provenanceLabels[c.provenance];

function To({ href, className, children, hidden }: { href: string; className: string; children: React.ReactNode; hidden?: boolean }) {
  const a11y = hidden ? { tabIndex: -1, "aria-hidden": true as const } : {};
  return href.startsWith("http")
    ? <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...a11y}>{children}</a>
    : <Link href={href} className={className} {...a11y}>{children}</Link>;
}

// Every card image is a fixed-ratio window, cropped with object-cover at the item's `focus`, so tall
// artwork never makes a card taller than one screen. Ratios are set through --r because VideoTile takes the ratio inline.
// row: 4/3 under md, 16/10 from md, capped at 240px and 360px tall. stack: 4/3 then 16/9, capped at 180px on lg (home's bento column).
const frames = {
  row: "w-full [--r:4/3] md:[--r:16/10] max-h-[240px] md:max-h-[360px]",
  stack: "w-full [--r:4/3] md:[--r:16/9] max-h-[240px] md:max-h-[360px] lg:max-h-[160px]",
} as const;
const focusCls = "[&_img]:[object-position:var(--focus,50%_50%)] [&_video]:[object-position:var(--focus,50%_50%)]";

// "row" is the large /work card: image left, words right from md up. "stack" puts the words under the image.
// `small` shrinks the stack card's type for a narrow column.
// `half` splits a row card evenly, `flip` puts the image on the right, `withBlurb` adds the one-line blurb: home's alternating rows.
// `lead` is home's bento lead, a stack card: row-sized image window (full lead width, 360px tall at most) and row-sized type,
// stretched to the stacked pair's height. On lg its image drops the ratio and cap and flexes to fill what the words leave, so the words sit right under it.
export function WorkCard({ card, layout = "row", titleAs: Title = "h3", small = false, lead = false, half = false, flip = false, withBlurb = false }: { card: CardData; layout?: "row" | "stack"; titleAs?: "h2" | "h3"; small?: boolean; lead?: boolean; half?: boolean; flip?: boolean; withBlurb?: boolean }) {
  const row = layout === "row";
  const tile = <VideoTile video={card.video} poster={card.poster} alt={card.title} ratio="var(--r)" focusable={false} className={`${frames[lead ? "row" : layout]} ${focusCls} ${lead ? "lg:[--r:auto] lg:max-h-none lg:flex-1" : ""}`} />;
  const rowCls = half
    ? "grid gap-5 md:gap-10 lg:gap-14 md:items-center md:grid-cols-2"
    : "grid gap-5 md:gap-10 md:items-center md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]";
  const big = row || lead;
  const focus = card.focus ? ({ "--focus": card.focus } as React.CSSProperties) : undefined;
  return (
    <article className={row ? rowCls : `flex flex-col ${small ? "gap-3" : "gap-4"} ${lead ? "lg:h-full" : ""}`} style={focus}>
      {card.href ? <To href={card.href} className={`group block ${lead ? "lg:flex-1 lg:flex lg:flex-col" : ""} ${flip ? "md:order-2" : ""}`} hidden>{tile}</To> : <div className={flip ? "md:order-2" : undefined}>{tile}</div>}
      <div className={`flex flex-col ${big ? "gap-3 md:gap-4" : small ? "gap-2" : "gap-3"} ${flip ? "md:order-1" : ""}`}>
        {/* Where the piece came from: a plain label above the title, not a pill. */}
        <span className="text-[12px] font-mono font-medium uppercase tracking-[0.08em] text-mid leading-snug">{eyebrowFor(card)}</span>
        <Title className={`font-display font-semibold tracking-[-0.015em] leading-tight ${big ? "text-[28px] md:text-[40px]" : small ? "text-[21px] md:text-[23px]" : "text-[23px] md:text-[26px]"}`}>{card.title}</Title>
        {withBlurb && card.blurb && !card.blurb.startsWith("[") && <p className="text-[16px] md:text-[17px] leading-relaxed text-mid max-w-[52ch]">{card.blurb}</p>}
        {card.href && (
          <To href={card.href} className="hit font-mono text-[13px] font-medium tracking-[0.02em] border-b-2 border-accent hover:text-accent-deep hover:border-accent-deep self-start">{card.linkLabel}</To>
        )}
      </div>
    </article>
  );
}

export function ProjectList({ items = work, extra = [] }: { items?: WorkItem[]; extra?: CardData[] }) {
  return (
    <div className="flex flex-col gap-10">
      {[...items.map(cardFor), ...extra].map((c) => <WorkCard key={c.key} card={c} />)}
    </div>
  );
}
