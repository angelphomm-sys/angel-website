// A frame for an image that does not exist yet. Says what belongs there, so a page reads as finished
// while staying honest. Never used for anything that could pass as real work.
export function Placeholder({ label, ratio = "4/3", tint, tag = "image here" }: { label: string; ratio?: string; tint?: string; tag?: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-grey/60 flex items-center justify-center p-6 text-center" style={{ aspectRatio: ratio, background: tint ?? "var(--color-mist)" }}>
      <div className="absolute inset-0 opacity-[0.5]" aria-hidden="true" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent 0 10px, var(--color-line) 10px 11px)" }} />
      <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-[0.1em] bg-paper/90 rounded-full px-2.5 py-1 text-mid">{tag}</span>
      <span className="hand relative text-[19px] md:text-[21px] leading-tight text-mid max-w-[280px]">{label.replace(/^\[|\]$/g, "")}</span>
    </div>
  );
}
