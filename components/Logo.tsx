// Angel's marks, traced from her identity sheet (public/brand/*.svg). Each file is one shape filled with currentColor.
// They are drawn here as a CSS mask over a currentColor fill, so the mark takes whatever text color its parent sets
// (cream on oxblood, near-black on paper) and the path data loads once, cached, instead of riding inline in every page.
// Height comes from the className (h-*); the width follows from the file's own aspect ratio.

const marks = {
  monogram: { src: "/brand/ap-monogram.svg", ratio: "665.2 / 607.9" },
  horizontal: { src: "/brand/ap-wordmark-horizontal.svg", ratio: "1963.4 / 181.7" },
  stacked: { src: "/brand/ap-wordmark-stacked.svg", ratio: "1969.7 / 467.2" },
} as const;

export type MarkVariant = keyof typeof marks;

/** One mark. Pass `label` when it stands alone; leave it off when a link around it already names it. */
export function BrandMark({ variant, className = "", label }: { variant: MarkVariant; className?: string; label?: string }) {
  const m = marks[variant];
  const mask = `url(${m.src}) center / contain no-repeat`;
  const a11y = label ? { role: "img" as const, "aria-label": label } : { "aria-hidden": true as const };
  return (
    <span
      {...a11y}
      className={`inline-block shrink-0 bg-current [forced-color-adjust:none] ${className}`}
      style={{ aspectRatio: m.ratio, WebkitMask: mask, mask }}
    />
  );
}

/** The circle badge from the sheet: the monogram on a solid round ground. Colors, size, and display come from className
 *  (bg-*, text-*, w-*, h-*, and flex or inline-flex, so a caller can also hide it with hidden lg:flex). */
export function MarkBadge({ className = "inline-flex", markClassName = "h-[58%]", label }: { className?: string; markClassName?: string; label?: string }) {
  return (
    <span className={`items-center justify-center rounded-full shrink-0 ${className}`} {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}>
      <BrandMark variant="monogram" className={`${markClassName} translate-x-[2%]`} />
    </span>
  );
}

/** Monogram plus horizontal wordmark: the header lockup. The wordmark drops out on the narrowest phones; the monogram stays. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 md:gap-3 ${className}`}>
      <BrandMark variant="monogram" className="h-9 md:h-10" />
      <BrandMark variant="horizontal" className="h-[13px] md:h-[15px] max-[359px]:hidden" />
    </span>
  );
}
