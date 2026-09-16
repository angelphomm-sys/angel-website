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
      <span className="hand text-[22px] text-mid">share it with your take:</span>
      <a href={linkedinShare(url)} target="_blank" rel="noreferrer" onClick={() => track(`share_${slug}`)} className="inline-flex items-center gap-2 text-[13px] font-bold bg-ink text-white rounded-full px-4 py-2 hover:bg-mid transition-colors" aria-label={`Share ${title} on LinkedIn`}>share on LinkedIn ↗</a>
      <button type="button" onClick={copy} className="text-[13px] font-bold border-2 border-ink rounded-full px-4 py-2 hover:bg-mist">{copied ? "copied" : "copy link"}</button>
    </div>
  );
}
