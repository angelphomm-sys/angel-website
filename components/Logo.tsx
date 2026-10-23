// Angel's marks, traced from her 2026-10-22 logo files (public/brand/*.svg). Each file is one shape filled with currentColor.
// They are drawn here as a CSS mask over a currentColor fill, so the mark takes whatever text color its parent sets
// (cream on oxblood, near-black on paper) and the path data loads once, cached, instead of riding inline in every page.
// Height comes from the className (h-*); the width follows from the file's own aspect ratio.

const marks = {
  monogram: { src: "/brand/ap-monogram.svg", ratio: "1788 / 1204" },
  asterisk: { src: "/brand/ap-asterisk.svg", ratio: "1204 / 1276" },
  horizontal: { src: "/brand/ap-wordmark-horizontal.svg", ratio: "5376 / 392" },
  stacked: { src: "/brand/ap-wordmark-stacked.svg", ratio: "5324 / 1204" },
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

/** The header lockup: the AP monogram in red beside the horizontal wordmark in near-black. The wordmark drops out on the
 *  narrowest phones; the monogram stays. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 md:gap-3.5 ${className}`}>
      <BrandMark variant="monogram" className="h-8 md:h-9 text-red" />
      <BrandMark variant="horizontal" className="h-[12px] md:h-[14px] max-[359px]:hidden" />
    </span>
  );
}
