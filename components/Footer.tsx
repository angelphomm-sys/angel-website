import Link from "next/link";
import { site } from "@/lib/site";
import { TrackLink } from "./Track";
import { BrandMark } from "./Logo";

// The close of every page: a near-black band in the sheet's approved pairing (cream and ice on near-black),
// the ask, the ways in, and the stacked wordmark signing it off.
export function Footer() {
  const link = "text-ice underline decoration-ice/40 underline-offset-4 hover:decoration-ice transition-colors";
  return (
    <footer className="mt-12 md:mt-16 bg-night text-cream">
      <div className="mx-auto max-w-[1440px] px-5 md:px-20 pt-12 md:pt-16 pb-8">
        <div id="contact" className="grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end scroll-mt-24">
          <div className="flex flex-col gap-5 min-w-0">
            <h2 className="flex items-center gap-3 text-[44px] md:text-[64px] leading-none text-cream">
              <BrandMark variant="asterisk" className="h-[0.6em] text-ice" />Say hi
            </h2>
            <a href={`mailto:${site.email}`} className="hit text-[20px] md:text-[26px] font-medium tracking-[-0.01em] border-b-2 border-cream self-start max-w-full break-words hover:text-ice hover:border-ice transition-colors">{site.email}</a>
          </div>
          <div className="flex flex-wrap gap-x-6 -my-3 text-[15px] font-medium [&>a]:inline-flex [&>a]:items-center [&>a]:min-h-11">
            <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className={link}>LinkedIn</a>
            <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className={link}>Instagram</a>
            <Link href="/photography" className={link}>Photography</Link>
            <TrackLink event="resume_download" href="/Angel_Phommachan_Resume.pdf" className={link}>Résumé (PDF)</TrackLink>
          </div>
        </div>
        <div className="mt-12 md:mt-16 pt-8 border-t border-cream/25 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <BrandMark variant="stacked" label={site.name} className="h-12 sm:h-14 md:h-16 self-start text-cream" />
          <div className="text-[13px] font-medium flex flex-col gap-1 md:items-end text-cream">
            <span>© {new Date().getFullYear()} {site.name} · {site.location}</span>
            <span>First-gen · Lao-American · UVU &apos;27</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
