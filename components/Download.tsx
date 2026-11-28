"use client";
import { track } from "@/lib/analytics";

// A free download inside a post: one title, one line on what's inside, and a button per file format.
// Each click is counted as cta_download_<slug>_<format>.
export function Download({ slug, title, description, files }: { slug: string; title: string; description: string; files: { href: string; format: string; label: string }[] }) {
  return (
    <div className="not-prose border-2 border-ink rounded-2xl bg-card p-5 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-accent">Free download</span>
        <span className="font-semibold text-[19px] leading-tight">{title}</span>
        <span className="text-[15px] leading-snug">{description}</span>
      </div>
      <div className="flex flex-wrap gap-3">
        {files.map((f) => (
          <a key={f.href} href={f.href} download onClick={() => track(`cta_download_${slug}_${f.format}`)} className="inline-flex items-center min-h-11 bg-accent text-cream rounded-full px-5 text-[15px] font-semibold hover:bg-accent-deep transition-colors no-underline" style={{ textDecoration: "none" }}>
            {f.label}
          </a>
        ))}
      </div>
    </div>
  );
}
