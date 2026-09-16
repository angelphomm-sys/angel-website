import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { shelf } from "@/lib/shelf";
import { Shelf } from "@/components/Shelf";
import { YouTube } from "@/components/Media";
import { Icon } from "@/components/Icon";
import { LogoKnockout } from "@/components/Logo";
import { Stack } from "@/components/Stack";
import { TrackLink } from "@/components/Track";

export const metadata: Metadata = { title: "about", description: "The long version: Laos, a factory floor in Minnesota, and a first-gen start at UVU." };

const bring = [
  ["I show up.", "[What I'd bring, pending: one thing I've actually done, not an adjective, with the result that makes them want to contact me]"],
  ["I can make the thing.", "[What I'd bring, pending: one thing I've actually done, not an adjective, with the result that makes them want to contact me]"],
  ["I read the room.", "[What I'd bring, pending: one thing I've actually done, not an adjective, with the result that makes them want to contact me]"],
  ["I check the number.", "[What I'd bring, pending: one thing I've actually done, not an adjective, with the result that makes them want to contact me]"],
];


export default function About() {
  const videoId = process.env.NEXT_PUBLIC_ABOUT_VIDEO_ID;
  return (
    <div className="mx-auto max-w-[1440px] px-5 md:px-20">
      <section className="grid gap-10 lg:grid-cols-[1fr_460px] lg:gap-16 py-14 md:py-20 items-start">
        <div className="flex flex-col gap-6">
          <h1 className="text-[44px] md:text-[72px] font-extrabold leading-[1.02] tracking-[-0.03em]"><span className="text-mid font-medium">the long version,</span><br />on my own timeline.</h1>
          <div className="flex flex-col gap-5 text-[18px] leading-[1.65] max-w-[680px]">
            <p>[About, pending: my story and why I do marketing, in scenes a reader can picture, a few short paragraphs]</p>
            <p>[About, pending: what I want next and who I want to work with, asked plainly, then send them to contact]</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:sticky lg:top-6">
          <div id="video" className="scroll-mt-24">
            {videoId ? <YouTube id={videoId} title="About Angel Phommachan" /> : (
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl"><Image src="/images/video/convocation-poster.png" alt="Angel and her mom on the floor at Marvin" fill sizes="460px" className="object-cover" /></div>
                <span className="hand absolute -bottom-4 right-3 text-[26px] text-accent -rotate-3">mom &amp; me, on the floor</span>
              </div>
            )}
          </div>
          {!videoId && (
            <div className="flex flex-col gap-2 mt-3">
              <span className="inline-flex items-center justify-center gap-2 bg-ink text-white rounded-full px-5 py-4 text-[15px] font-bold"><Icon name="play" size={12} />the convocation video · 2:22</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] bg-[#fff6cc] rounded-full px-3 py-1.5 self-center">goes live once it&apos;s on YouTube</span>
            </div>
          )}
          <div className="border-2 border-ink rounded-3xl p-5 flex gap-4 items-start">
            <LogoKnockout src="/images/me/headshot-1.jpg" size={96} />
            <div className="flex flex-col gap-2">
            <span className="hand text-[24px] text-accent">the short version</span>
            <span className="text-[14px] leading-relaxed">first-gen · Lao-American · Draper, UT · Bachelor of Science, Digital Marketing, Utah Valley University, 2027 · inaugural Hope Scholar · photographer since 2018 · 3 marketing roles this semester · master&apos;s in marketing next</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t-2 border-ink pt-10 pb-12 flex flex-col gap-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3"><h2 className="text-[36px] md:text-[44px] font-extrabold tracking-[-0.03em] leading-none">positioning.</h2></div>
        <p className="text-[19px] md:text-[22px] font-bold leading-snug max-w-[760px]">[Positioning statement, pending: for (who), I am the (kind of marketer) who (the difference), because (the proof)]</p>
        <p className="text-[16px] text-mid max-w-[640px]">[Proof line, pending: the one case study or number that backs the statement]</p>
      </section>

      <section id="bring" className="border-t-2 border-ink pt-10 pb-12 flex flex-col gap-6 scroll-mt-20">
        <div className="flex flex-wrap items-baseline justify-between gap-3"><h2 className="text-[36px] md:text-[44px] font-extrabold tracking-[-0.03em] leading-none">what I&apos;d bring to your team.</h2></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bring.map(([t, d], i) => (
            <div key={t} className="border-2 border-ink rounded-3xl p-6 flex flex-col gap-2.5"><span className="text-[28px]">{String(i + 1).padStart(2, "0")}</span><span className="text-[20px] font-extrabold tracking-[-0.02em]">{t}</span><span className="text-[14px] leading-relaxed text-mid">{d}</span></div>
          ))}
        </div>
      </section>

      <section className="border-t-2 border-ink pt-10 pb-12 flex flex-col gap-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3"><h2 className="text-[36px] md:text-[44px] font-extrabold tracking-[-0.03em] leading-none">the stack.</h2></div>
        <Stack />
      </section>

      <section id="shelf" className="border-t-2 border-ink pt-10 pb-12 flex flex-col gap-6 scroll-mt-20">
        <div className="flex flex-wrap items-baseline justify-between gap-3"><h2 className="text-[36px] md:text-[44px] font-extrabold tracking-[-0.03em] leading-none">the whole shelf.</h2></div>
        <Shelf books={shelf} />
        <div className="grid gap-4 md:grid-cols-3 bg-mist rounded-3xl p-6">
          <div className="flex flex-col gap-1"><span className="hand text-[22px] text-accent">a book taught me</span><span className="text-[15px] leading-relaxed">[Shelf line, pending: one sentence a book taught me that I use at work]</span></div>
          <div className="flex flex-col gap-1"><span className="hand text-[22px] text-accent">a film taught me</span><span className="text-[15px] leading-relaxed">[Shelf line, pending: one sentence a film taught me about holding attention]</span></div>
          <div className="flex flex-col gap-1"><span className="hand text-[22px] text-accent">a factory taught me</span><span className="text-[15px] leading-relaxed">showing up is most of the job; the people around you are the rest.</span></div>
        </div>
      </section>

      <section className="border-t-2 border-ink pt-10 pb-4 flex flex-col gap-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3"><h2 className="text-[36px] md:text-[44px] font-extrabold tracking-[-0.03em] leading-none">on paper.</h2><span className="hand text-[24px] text-mid">the résumé</span></div>
        <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <dl className="flex flex-col border-t border-line text-[14px]">
            {[["education", "Bachelor of Science in Digital Marketing, Utah Valley University (UVU) Woodbury School of Business · May 2027 · 3.70 · Associate of Science in Business Management, honors · Italy study abroad 2026"], ["now", "Green House Sales & Marketing · UVU Athletics · Hope Scholars"], ["before", "Shyft · Yoodlize · Prime Collectives · Marvin"], ["certified", "Google Ads (Search, Display, Measurement) · HubSpot Inbound · Excel Associate"], ["next", "Master of Science in Marketing / Integrated Marketing, fall 2027"]].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[110px_1fr] gap-4 py-3 border-b border-line"><dt className="text-mid font-bold">{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </div>
        <div className="flex flex-col gap-3 md:items-end md:text-right">
          <TrackLink event="resume_download" href="/Angel_Phommachan_Resume.pdf" className="bg-ink text-white rounded-full px-6 py-3.5 text-[15px] font-bold hover:bg-mid transition-colors self-start md:self-end">download the pdf →</TrackLink>
          <Link href="/contact" className="text-[14px] font-bold border-b-2 border-ink hover:text-accent hover:border-accent self-start md:self-end">or just say hi</Link>
        </div>
        </div>
      </section>
    </div>
  );
}
