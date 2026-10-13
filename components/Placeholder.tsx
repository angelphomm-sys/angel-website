// A frame for an image that does not exist yet. Says what belongs there, so a page reads as finished
// while staying honest. Never used for anything that could pass as real work.
// Deliberately quiet: a thin dashed edge and muted text, capped short so a pending image never
// takes more room on the page than the work around it.
export function Placeholder({ label, ratio = "4/3", tint, tag = "image here" }: { label: string; ratio?: string; tint?: string; tag?: string }) {
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-dashed border-grey/50 flex flex-col items-center justify-center gap-1.5 p-4 text-center min-h-[96px] max-h-[220px]"
      style={{ aspectRatio: ratio, background: tint ?? "var(--color-mist)" }}
    >
      <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-grey">{tag}</span>
      <span className="text-[13px] leading-snug text-mid max-w-[260px]">{label.replace(/^\[|\]$/g, "")}</span>
    </div>
  );
}
