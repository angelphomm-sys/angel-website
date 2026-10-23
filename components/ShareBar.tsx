"use client";
import { track } from "@/lib/analytics";
import { utm, linkedinShare } from "@/lib/utm";

// The end of a post: one line and one link. Comments live on LinkedIn, so with `linkedinPost` set (the post's
// LinkedIn thread) the link goes there; until then it shares the post. The click is counted.
export function ShareBar({ slug, path, title, linkedinPost }: { slug: string; path: string; title: string; linkedinPost?: string }) {
  const href = linkedinPost ?? linkedinShare(utm(path, "linkedin"));
  return (
    <section id="share" aria-label="Talk about this post" className="scroll-mt-24 border-t border-line pt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2">
      <p className="text-[17px] m-0">Have a take on this?</p>
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={() => track(`share_${slug}`)} aria-label={`${linkedinPost ? "Comment" : "Share it"} on LinkedIn: ${title}`} className="hit text-[17px] font-semibold border-b-2 border-accent hover:text-accent-deep hover:border-accent-deep">
        {linkedinPost ? "Comment on LinkedIn ↗" : "Share it on LinkedIn ↗"}
      </a>
    </section>
  );
}
