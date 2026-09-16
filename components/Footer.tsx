import Link from "next/link";
import { site } from "@/lib/site";
import { SubscribeForm } from "./SubscribeForm";
import { TrackLink } from "./Track";

export function Footer() {
  return (
    <footer className="mx-auto max-w-[1440px] px-5 md:px-20 pt-14 pb-10 mt-8">
      <div id="subscribe" className="border-t-2 border-ink pt-12 grid gap-10 md:grid-cols-[1fr_420px] md:items-end scroll-mt-24">
        <div className="flex flex-col gap-4">
          <h2 className="text-[48px] md:text-[64px] font-extrabold tracking-[-0.03em] leading-none"><span className="num">5</span>say hi.</h2>
          <a href={`mailto:${site.email}`} className="text-[18px] md:text-[22px] font-bold border-b-2 border-ink self-start hover:text-accent hover:border-accent">{site.email}</a>
          <div className="flex flex-wrap gap-5 text-[13px] font-bold text-mid">
            <a href={site.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent">linkedin</a>
            <a href={site.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-accent">instagram</a>
            <Link href="/photography" className="hover:text-accent">photography</Link>
            <TrackLink event="resume_download" href="/Angel_Phommachan_Resume.pdf" className="hover:text-accent">résumé (pdf)</TrackLink>
            <Link href="/stats" className="hover:text-accent">stats</Link>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="hand text-[24px] text-mid">new posts and case studies, by email.</span>
          <SubscribeForm />
        </div>
      </div>
      <div className="mt-12 text-[12px] text-mid flex flex-wrap justify-between gap-2">
        <span>© {new Date().getFullYear()} {site.name} · {site.location}</span>
        <span>first-gen · Lao-American · UVU &apos;27</span>
      </div>
    </footer>
  );
}
