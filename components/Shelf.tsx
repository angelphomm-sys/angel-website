import { showNotes } from "@/lib/notes";

export type Book = { title: string; author?: string; kind: "book" | "film" | "show" | "album" | "campaign"; status?: string; why: string; color: string; ink?: string; reading?: boolean; cover?: string; quote?: string; quoteBy?: string; lesson?: string; link?: { href: string; label: string } };

// Real covers as 3D books. Idle: a slight float. Hover, focus, or a tap: the book turns toward you and the cover
// swings open to her favorite quote and the lesson she took from it (lib/shelf.ts), or what it taught her when
// no quote is confirmed yet.
// A [bracketed] title is a pending entry in lib/shelf.ts. It is never drawn as a book; while notes show
// (lib/notes.ts), one bracket line under the shelf says how many picks are still to come.
export function Shelf({ books: all, compact = false }: { books: Book[]; compact?: boolean }) {
  const books = all.filter((b) => !b.title.trim().startsWith("["));
  const pending = all.filter((b) => b.title.trim().startsWith("["));
  const w = compact ? 124 : 150;
  return (
    <div className="bookshelf">
      <div className={`grid grid-cols-2 ${books.length === 4 ? "md:grid-cols-4" : `min-[400px]:grid-cols-3 ${books.length > 3 ? "lg:grid-cols-6" : ""}`} items-end gap-x-4 gap-y-10 px-2 pt-6 pb-2`}>
        {books.map((b, i) => (
          <div key={b.title} className="floaty flex flex-col items-center gap-4 min-w-0" style={{ animationDelay: `${-i * 0.9}s` }}>
            <div className="book3d" style={{ width: `min(${w}px, 100%)`, aspectRatio: "2 / 3", ["--depth" as string]: "14px" }} tabIndex={0} aria-label={`${b.title}${b.author ? ` by ${b.author}` : ""}. ${b.quote ? `Favorite quote: ${b.quote}${b.lesson ? `. ${b.lesson}` : ""}` : b.why}`}>
              <div className="back" style={{ background: b.color }} />
              <div className="spine" style={{ background: b.color }} />
              <div className="pages" />
              <div className="inside">
                <span className="text-[11px] font-mono font-medium uppercase tracking-[0.08em] text-mid">{b.kind}{b.status ? ` · ${b.status}` : ""}</span>
                {b.quote ? (
                  <>
                    <span className="hand block text-[14px] leading-snug mt-1">&ldquo;{b.quote}&rdquo;</span>
                    {b.quoteBy && <span className="block text-[10px] font-mono uppercase tracking-[0.06em] text-mid mt-1">{b.quoteBy}</span>}
                    {b.lesson && <span className="block text-[11px] leading-snug mt-2 pt-2 border-t border-line">{b.lesson}</span>}
                  </>
                ) : (
                  b.why && <span className="hand block text-[17px] leading-tight mt-1">taught me: {b.why}</span>
                )}
              </div>
              <div className="cover" style={{ background: b.color, color: b.ink ?? "#fff" }}>
                {b.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={b.cover} alt={`${b.title} cover`} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col justify-between p-3">
                    {b.kind !== "book" && <span className="self-start text-[9px] font-bold uppercase tracking-[0.12em] border border-white/60 rounded px-1.5 py-0.5">{b.kind}</span>}
                    <span className="text-[15px] font-display font-normal leading-tight tracking-[-0.01em]">{b.title}</span>
                  </div>
                )}
                {b.reading && <span className="ribbon absolute -top-1 right-4 w-2.5 h-12 bg-accent rounded-b-sm" aria-hidden="true" />}
              </div>
            </div>
            <div className="flex flex-col items-center text-center max-w-[160px] min-w-0 [overflow-wrap:anywhere]">
              <span className="text-[14px] font-bold leading-tight">{b.title}</span>
              {b.author && <span className="text-[12px] text-mid">{b.author}</span>}
              {b.status && <span className="hand text-[12px] text-accent-deep">{b.status}</span>}
              {b.link && <a href={b.link.href} className="hit mt-1 font-mono text-[11px] border-b border-accent hover:text-accent-deep">{b.link.label} →</a>}
            </div>
          </div>
        ))}
      </div>
      {showNotes && pending.length > 0 && (
        <p className="px-2 pt-2 text-[13px] font-medium">[{pending.length} {[...new Set(pending.map((b) => b.kind))].join(" and ")} {pending.length === 1 ? "pick" : "picks"}, pending: the {pending.length === 1 ? "title" : "titles"} and what each taught me]</p>
      )}
    </div>
  );
}
