"use client";
import { useState } from "react";
import { track } from "@/lib/analytics";
import { utm, linkedinShare, xShare, emailShare } from "@/lib/utm";
import { Icon } from "./Icon";

// Share buttons for a post: LinkedIn, X, email, and copy link. Each link carries its own UTM source,
// so the stats page shows which channel a shared visit came from, and each click is counted.
export function ShareMenu({ slug, path, title, label }: { slug: string; path: string; title: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const btn = "hit inline-flex items-center justify-center w-10 h-10 rounded-full border border-line text-ink hover:border-accent hover:text-accent-deep transition-colors";
  const copy = async () => {
    track(`share_${slug}_copy`);
    try { await navigator.clipboard.writeText(utm(path, "copy")); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard blocked: nothing to undo */ }
  };
  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Share this post" role="group">
      {label && <span className="text-[15px] font-semibold mr-1">{label}</span>}
      <a className={btn} href={linkedinShare(utm(path, "linkedin"))} target="_blank" rel="noopener noreferrer" onClick={() => track(`share_${slug}_linkedin`)} aria-label="Share on LinkedIn"><Icon name="linkedin" size={18} /></a>
      <a className={btn} href={xShare(utm(path, "x"), title)} target="_blank" rel="noopener noreferrer" onClick={() => track(`share_${slug}_x`)} aria-label="Share on X"><Icon name="x" size={16} /></a>
      <a className={btn} href={emailShare(utm(path, "email"), title)} onClick={() => track(`share_${slug}_email`)} aria-label="Share by email"><Icon name="mail" size={18} /></a>
      <button type="button" className={btn} onClick={copy} aria-label={copied ? "Link copied" : "Copy link"}><Icon name="link" size={18} /></button>
      <span aria-live="polite" className="text-[13px] font-medium text-mid">{copied ? "Link copied" : ""}</span>
    </div>
  );
}
