import Link from "next/link";

export type Book = { title: string; author?: string; kind: "book" | "film" | "album" | "campaign"; status?: string; why: string; color: string; ink?: string; reading?: boolean; cover?: string };

// Real covers as 3D books. Idle: a slight float. Hover: the book turns toward you and the cover opens to show what it taught her.
export function Shelf({ books, compact = false }: { books: Book[]; compact?: boolean }) {
  const w = compact ? 124 : 150; const h = Math.round(w * 1.5);
  return (
    <div className="bookshelf">
      <div className="grid grid-cols-3 lg:grid-cols-6 items-end gap-x-4 gap-y-10 px-2 pt-6 pb-2">
        {books.map((b, i) => (
          <div key={b.title} className="floaty flex flex-col items-center gap-4" style={{ animationDelay: `${-i * 0.9}s` }}>
            <div className="book3d" style={{ width: w, height: h, ["--depth" as string]: "14px" }} tabIndex={0} aria-label={`${b.title}${b.author ? ` by ${b.author}` : ""}. ${b.why}`}>
              <div className="back" style={{ background: b.color }} />
              <div className="spine" style={{ background: b.color }} />
              <div className="pages" />
              <div className="inside">
                <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-mid">{b.kind}{b.status ? ` · ${b.status}` : ""}</span>
                <span className="hand block text-[17px] leading-tight mt-1">taught me: {b.why}</span>
              </div>
              <div className="cover" style={{ background: b.color, color: b.ink ?? "#fff" }}>
                {b.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={b.cover} alt={`${b.title} cover`} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col justify-between p-3">
                    {b.kind === "film" && <span className="self-start text-[9px] font-bold uppercase tracking-[0.12em] border border-white/60 rounded px-1.5 py-0.5">film</span>}
                    <span className="text-[15px] font-extrabold leading-tight tracking-[-0.02em]">{b.title}</span>
                  </div>
                )}
                {b.reading && <span className="ribbon absolute -top-1 right-4 w-2.5 h-12 bg-accent rounded-b-sm" aria-hidden="true" />}
              </div>
            </div>
            <div className="flex flex-col items-center text-center max-w-[160px]">
              <span className="text-[14px] font-bold leading-tight">{b.title}</span>
              {b.author && <span className="text-[12px] text-mid">{b.author}</span>}
              {b.status && <span className="hand text-[16px] text-accent">{b.status}</span>}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[12px] text-mid"><span className="hand text-[18px]">three books, three films. hover one, it opens.</span><Link href="/about#shelf" className="font-bold hover:text-accent">the whole shelf →</Link></div>
    </div>
  );
}
