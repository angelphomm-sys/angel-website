import Image from "next/image";
import type { Book } from "./Shelf";

// "on my screen.": films and shows as posters, not books. A real poster shows when `cover` is set in
// lib/shelf.ts; until then each card is a simple type-only poster in the pick's color. Hover lifts the
// poster, and a "why" line (when filled) slides up over it.
export function Screen({ picks }: { picks: Book[] }) {
  const items = picks.filter((p) => !p.title.trim().startsWith("["));
  return (
    <div className="grid grid-cols-3 gap-x-3 md:gap-x-5 gap-y-8 max-w-[720px]">
      {items.map((p) => (
        <figure key={p.title} className="group m-0 flex flex-col gap-3 min-w-0">
          <div
            className="relative aspect-[2/3] rounded-[14px] overflow-hidden shadow-[0_2px_4px_rgba(28,19,16,0.10),0_12px_28px_rgba(28,19,16,0.16)] transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-1.5 motion-safe:group-hover:rotate-[-0.6deg]"
            style={{ background: p.color, color: p.ink ?? "#fff" }}
            tabIndex={0}
            aria-label={`${p.title}, ${p.author ?? p.kind}${p.why ? `. ${p.why}` : ""}`}
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
            {p.why && (
              <div className="absolute inset-x-0 bottom-0 p-4 pt-10 bg-gradient-to-t from-black/80 to-transparent text-white text-[14px] leading-snug translate-y-full group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-300">
                {p.why}
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
