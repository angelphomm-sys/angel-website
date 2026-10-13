"use client";
import { useState } from "react";
import Image from "next/image";

// One résumé page at a time, with arrows to flip between them. The images are rendered from the PDF;
// re-export them (public/images/resume/resume-page-N.jpg) whenever the PDF changes.
const PDF = "/Angel_Phommachan_Resume.pdf";
const PAGES = 2;

export function ResumePreview() {
  const [page, setPage] = useState(1);
  const btn = "grid place-items-center w-11 h-11 rounded-full border-2 border-ink font-mono text-[16px] hover:bg-ink hover:text-cream transition-colors disabled:opacity-25 disabled:pointer-events-none";
  return (
    <div className="flex flex-col gap-4 w-full max-w-[520px]">
      <a href={PDF} target="_blank" rel="noopener noreferrer" className="block rounded-xl overflow-hidden border border-line bg-white shadow-[0_1px_2px_rgba(28,19,16,0.06),0_8px_24px_rgba(28,19,16,0.08)] hover:shadow-[0_2px_4px_rgba(28,19,16,0.08),0_12px_32px_rgba(28,19,16,0.12)] transition-shadow">
        {/* Both pages load up front so flipping is instant; only the current one shows. */}
        {Array.from({ length: PAGES }, (_, i) => i + 1).map((n) => (
          <Image key={n} src={`/images/resume/resume-page-${n}.jpg`} alt={`Page ${n} of Angel Phommachan's résumé`} width={1600} height={2071} sizes="(min-width: 600px) 520px, 100vw" loading="eager" className={n === page ? "block w-full h-auto" : "hidden"} />
        ))}
      </a>
      <div className="flex items-center justify-center gap-5">
        <button type="button" className={btn} onClick={() => setPage((p) => p - 1)} disabled={page === 1} aria-label="Previous page">←</button>
        <span className="font-mono text-[13px] tabular-nums" aria-live="polite">page {page} of {PAGES}</span>
        <button type="button" className={btn} onClick={() => setPage((p) => p + 1)} disabled={page === PAGES} aria-label="Next page">→</button>
      </div>
    </div>
  );
}
