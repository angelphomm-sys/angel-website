import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { notFound } from "next/navigation";
import { reels, carousels, hasLiveSocial } from "@/lib/social";
import { PhoneVideo } from "@/components/PhoneVideo";

export const metadata: Metadata = pageMeta({ title: "Social posts", description: "Short videos and posts Angel Phommachan made for Hope Scholars, UVU Athletics, and Prime Collectives, shown as they ran on the phone.", path: "/work/social" });

const month = (d?: string) => d ? new Date(`${d}-15`).toLocaleDateString("en-US", { month: "short", year: "numeric" }).toLowerCase() : undefined;

// The posts, one phone each, in a row that scrolls sideways on a phone and sits three across on a desktop.
export default function SocialPage() {
  if (!hasLiveSocial) notFound();
  return (
    <div className="mx-auto max-w-[1440px] px-5 md:px-20 py-8 md:py-10 flex flex-col gap-10">
      <header className="flex flex-col gap-4">
        <div className="font-mono text-[12px] font-medium text-mid flex gap-2"><Link href="/work" className="hit hover:text-accent-deep">work</Link><span>/</span><span className="text-ink">social</span></div>
        <h1 className="text-h1 font-display font-normal tracking-[-0.01em] leading-none">social.</h1>
        <p className="text-[18px] leading-relaxed max-w-[620px]">Posts I shot, cut, and published. Each one plays the way it ran, on the phone.</p>
      </header>

      <ul className="flex gap-6 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-10 md:overflow-visible [scrollbar-width:none]">
        {reels.filter((r) => r.video).map((r) => (
          <li key={r.slug} className="shrink-0 w-[72vw] max-w-[300px] md:w-auto md:max-w-none snap-center flex flex-col items-center gap-4">
            <PhoneVideo video={r.video} poster={r.poster} alt={`${r.title}, ${r.platform} post`} pending={r.pending} className="max-w-[300px]" />
            <div className="flex flex-col gap-1 text-center max-w-[300px]">
              <span className="text-[11px] font-mono font-medium uppercase tracking-[0.08em] text-mid">{r.platform} · {r.account}{r.date ? ` · ${month(r.date)}` : ""}</span>
              <span className="text-[18px] font-display font-normal tracking-[-0.01em] leading-tight">{r.title}</span>
              {!r.line.startsWith("[") && <span className="text-[15px] leading-relaxed text-mid">{r.line}</span>}
              {r.href && <a href={r.href} target="_blank" rel="noopener noreferrer" className="hit self-center font-mono text-[13px] font-medium tracking-[0.02em] border-b-2 border-accent hover:text-accent-deep hover:border-accent-deep">open the post ↗</a>}
            </div>
          </li>
        ))}
      </ul>

      <section className="flex flex-col gap-6">
        <h2 className="text-h3 font-display font-normal tracking-[-0.01em] leading-none">carousels.</h2>
        <ul className="flex gap-6 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-10 md:overflow-visible [scrollbar-width:none]">
          {carousels.filter((r) => r.slides?.length).map((r) => (
            <li key={r.slug} className="shrink-0 w-[72vw] max-w-[300px] md:w-auto md:max-w-none snap-center flex flex-col items-center gap-4">
              <PhoneVideo slides={r.slides} alt={`${r.title}, ${r.platform} carousel`} pending={r.pending} className="max-w-[300px]" />
              <div className="flex flex-col gap-1 text-center max-w-[300px]">
                <span className="text-[11px] font-mono font-medium uppercase tracking-[0.08em] text-mid">{r.platform}{r.platform === "linkedin" ? " · facebook" : ""}{r.date ? ` · ${month(r.date)}` : ""}</span>
                <span className="text-[18px] font-display font-normal tracking-[-0.01em] leading-tight">{r.title}</span>
                {!r.line.startsWith("[") && <span className="text-[15px] leading-relaxed text-mid">{r.line}</span>}
                {r.href && <a href={r.href} target="_blank" rel="noopener noreferrer" className="hit self-center font-mono text-[13px] font-medium tracking-[0.02em] border-b-2 border-accent hover:text-accent-deep hover:border-accent-deep">open the post ↗</a>}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <p className="text-[15px] font-bold"><Link href="/work" className="hit border-b-2 border-ink hover:text-accent-deep hover:border-accent-deep">all the work</Link></p>
    </div>
  );
}
