"use client";
import { useState } from "react";
import { track } from "@/lib/analytics";
import { utm, linkedinShare } from "@/lib/utm";

// The conversation block at the end of a post. Comments live on LinkedIn, where the readers are:
// with `linkedinPost` set (the post's LinkedIn thread) it sends people there; until then it invites them
// to share the post with their take. Copy link and a private "say hi" sit beside it. Every click is counted.
export function ShareBar({ slug, path, title, linkedinPost }: { slug: string; path: string; title: string; linkedinPost?: string }) {
  const [copied, setCopied] = useState(false);
  const url = utm(path, "linkedin");
  const copy = async () => { try { await navigator.clipboard.writeText(utm(path, "linkedin", "social", "share")); setCopied(true); setTimeout(() => setCopied(false), 1800); track(`share_${slug}`); } catch {} };
  const link = "hit inline-flex items-center gap-2 font-mono text-[13px] font-medium tracking-[0.02em] border-b-2 border-accent hover:text-accent-deep hover:border-accent-deep";
  return (
    <section id="share" aria-labelledby="conversation-title" className="scroll-mt-24 rounded-3xl border-2 border-line p-5 md:p-6 flex flex-col gap-3">
      <h2 id="conversation-title" className="text-h3 font-display font-semibold tracking-[-0.015em] leading-none">Join the conversation</h2>
      <p className="text-[16px] leading-relaxed max-w-[60ch]">
        {linkedinPost
          ? "The comments for this post live on LinkedIn. Add your take there, and I'll reply."
          : "The comments for my posts live on LinkedIn. Share this one with your take and tag me, and I'll reply there."}
      </p>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        {linkedinPost ? (
          <a href={linkedinPost} target="_blank" rel="noopener noreferrer" onClick={() => track(`share_${slug}`)} className={link} aria-label={`join the conversation on LinkedIn: ${title}`}>join the conversation on LinkedIn ↗</a>
        ) : (
          <a href={linkedinShare(url)} target="_blank" rel="noopener noreferrer" onClick={() => track(`share_${slug}`)} className={link} aria-label={`share on LinkedIn: ${title}`}>share on LinkedIn ↗</a>
        )}
        {linkedinPost && <a href={linkedinShare(url)} target="_blank" rel="noopener noreferrer" onClick={() => track(`share_${slug}`)} className={link} aria-label={`share on LinkedIn: ${title}`}>share it ↗</a>}
        <button type="button" onClick={copy} className={link}>{copied ? "copied" : "copy link"}</button>
        <a href="/contact" className={link}>or say hi privately →</a>
      </div>
    </section>
  );
}
