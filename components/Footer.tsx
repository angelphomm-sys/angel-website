import Link from "next/link";
import { site } from "@/lib/site";
import { TrackLink } from "./Track";
import { BrandMark } from "./Logo";

// The close of every page: an oxblood band in the brand's approved pairing (cream and blue-grey on oxblood),
// the ask, the ways in, the list, and the stacked wordmark signing it off.
export function Footer() {
  const link = "hover:text-blue transition-colors";
  return (
    <footer className="mt-12 md:mt-16 bg-oxblood text-cream">
      <div className="mx-auto max-w-[1440px] px-5 md:px-20 pt-12 md:pt-16 pb-8">
        <div id="contact" className="grid gap-10 scroll-mt-24">
          <div className="flex flex-col gap-4 min-w-0">
            <h2 className="text-[48px] md:text-[64px] leading-none text-cream">say hi.</h2>
            {/* The goal line, from lib/site.ts, so every page closes on the same ask. */}
            <a href={`mailto:${site.email}`} className="hit font-display text-[22px] md:text-[28px] border-b border-cream self-start max-w-full break-words hover:text-blue hover:border-blue transition-colors">{site.email}</a>
            <div className="flex flex-wrap gap-x-5 -my-3 font-mono text-[13px] font-medium lowercase tracking-[0.04em] [&>a]:inline-flex [&>a]:items-center [&>a]:min-h-11">
              <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className={link}>linkedin</a>
              <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className={link}>instagram</a>
              <Link href="/photography" className={link}>photography</Link>
              <TrackLink event="resume_download" href="/Angel_Phommachan_Resume.pdf" className={link}>résumé (pdf)</TrackLink>
            </div>
          </div>
        </div>
        <div className="mt-12 md:mt-16 pt-6 border-t border-cream/30 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <BrandMark variant="stacked" label={site.name} className="h-14 sm:h-16 md:h-20 self-start" />
          <div className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] flex flex-col gap-1 md:items-end">
            <span>© {new Date().getFullYear()} {site.name} · {site.location}</span>
            <span>first-gen · Lao-American · UVU &apos;27</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
