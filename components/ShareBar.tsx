"use client";
import { useState } from "react";
import { track } from "@/lib/analytics";
import { utm, linkedinShare } from "@/lib/utm";

// Share to LinkedIn (the engagement layer that matters) or copy a tagged link. Both are counted.
export function ShareBar({ slug, path, title }: { slug: string; path: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const url = utm(path, "linkedin");
  const copy = async () => { try { await navigator.clipboard.writeText(utm(path, "linkedin", "social", "share")); setCopied(true); setTimeout(() => setCopied(false), 1800); track(`share_${slug}`); } catch {} };
  return (
    <div id="share" className="flex flex-wrap items-center gap-3 scroll-mt-24">
      <span className="hand text-[16px] text-mid">share it with your take:</span>
      <a href={linkedinShare(url)} target="_blank" rel="noopener noreferrer" onClick={() => track(`share_${slug}`)} className="hit inline-flex items-center gap-2 font-mono text-[13px] font-medium tracking-[0.02em] border-b-2 border-accent hover:text-accent-deep hover:border-accent-deep" aria-label={`share on LinkedIn: ${title}`}>share on LinkedIn ↗</a>
      <button type="button" onClick={copy} className="hit font-mono text-[13px] font-medium tracking-[0.02em] border-b-2 border-accent hover:text-accent-deep hover:border-accent-deep">{copied ? "copied" : "copy link"}</button>
    </div>
  );
}
