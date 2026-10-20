import Image from "next/image";
import type { Book } from "./Shelf";

// Films and shows as posters, not books. A real poster shows when `cover` is set in lib/shelf.ts; until
// then each card is a type-only poster in the pick's color. Hover, focus, or a tap lifts the poster and
// fades in the favorite quote and the lesson behind it.
export function Screen({ picks }: { picks: Book[] }) {
  const items = picks.filter((p) => !p.title.trim().startsWith("["));
  return (
    <div className="grid grid-cols-3 gap-x-3 md:gap-x-5 gap-y-8 max-w-[720px]">
      {items.map((p) => (
        <figure key={p.title} className="group m-0 flex flex-col gap-3 min-w-0">
          <div
            className="relative aspect-[2/3] rounded-[14px] overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-accent shadow-[0_2px_4px_rgba(28,19,16,0.10),0_12px_28px_rgba(28,19,16,0.16)] transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-1.5 motion-safe:group-hover:rotate-[-0.6deg]"
            style={{ background: p.color, color: p.ink ?? "#fff" }}
            tabIndex={0}
            aria-label={`${p.title}, ${p.author ?? p.kind}${p.quote ? `. Favorite quote: ${p.quote}${p.lesson ? `. ${p.lesson}` : ""}` : p.why ? `. ${p.why}` : ""}`}
          >
            {p.cover ? (
              <Image src={p.cover} alt={`${p.title} poster`} fill sizes="(min-width: 768px) 230px, 30vw" className="object-cover" />
            ) : (
              <div className="absolute inset-0 flex flex-col justify-between p-3 md:p-5">
                {/* A thin inset frame, like a printed one-sheet. */}
                <div className="absolute inset-1.5 md:inset-2.5 rounded-[8px] border border-current opacity-30 pointer-events-none" aria-hidden="true" />
                <span className="relative font-mono text-[9px] md:text-[11px] font-medium uppercase tracking-[0.14em] opacity-85">{p.kind === "show" ? "series" : p.kind}</span>
                <span className="relative font-display text-[16px] sm:text-[22px] md:text-[28px] leading-[1.02] tracking-[-0.01em] text-balance">{p.title}</span>
              </div>
            )}
            {(p.quote || p.why) && (
              <div className="absolute inset-0 flex flex-col justify-end gap-1.5 p-3 md:p-4 bg-gradient-to-t from-black/90 via-black/70 to-black/20 text-white opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-within:opacity-100 transition-opacity duration-300 motion-reduce:transition-none">
                {p.quote ? (
                  <>
                    <span className="hand text-[13px] md:text-[16px] leading-snug">&ldquo;{p.quote}&rdquo;</span>
                    {p.quoteBy && <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.08em] opacity-80">{p.quoteBy}</span>}
                    {p.lesson && <span className="text-[11px] md:text-[13px] leading-snug mt-1 pt-1.5 border-t border-white/30">{p.lesson}</span>}
                  </>
                ) : (
                  <span className="text-[13px] leading-snug">{p.why}</span>
                )}
              </div>
            )}
          </div>
          <figcaption className="flex flex-col gap-0.5 px-0.5">
            <span className="text-[13px] md:text-[15px] font-bold leading-tight">{p.title}</span>
            {p.author && <span className="font-mono text-[11px] md:text-[12px] text-mid">{p.author}</span>}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
