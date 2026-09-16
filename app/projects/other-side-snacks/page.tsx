import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { project, phases, dayOne, options, measure, notes } from "@/lib/otherside";
import { Compare } from "@/components/Compare";
import { FixFirst } from "@/components/FixFirst";
import { MeasurePlan } from "@/components/CaseStudyTemplate";
import { TrackView, TrackLink } from "@/components/Track";

export const metadata: Metadata = { title: project.title, description: project.blurb };

function Part({ n, title, aside, children }: { n: string; title: string; aside?: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 md:grid-cols-[220px_1fr] border-t border-line py-9">
      <div className="flex flex-col gap-1 md:sticky md:top-6 self-start"><span className="text-[13px] font-bold text-mid">{n}</span><h2 className="text-[22px] font-extrabold tracking-[-0.02em] leading-tight">{title}</h2>{aside && <span className="hand text-[20px] text-mid">{aside}</span>}</div>
      <div className="flex flex-col gap-4 text-[17px] leading-relaxed">{children}</div>
    </section>
  );
}

export default function OtherSidePage() {
  const now = phases.find((p) => p.status === "now");
  return (
    <article className="mx-auto max-w-[1440px] px-5 md:px-20 py-12 md:py-16 flex flex-col gap-10">
      <TrackView event={`case_view_${project.slug}`} />
      <div className="text-[12px] font-bold text-mid flex gap-2"><Link href="/work" className="hover:text-accent">work</Link><span>/</span><span>nonprofit</span><span>/</span><span className="text-ink">live project</span></div>

      <header className="grid gap-8 lg:grid-cols-[1fr_460px] lg:gap-14 items-start">
        <div className="flex flex-col gap-5">
          <span className="hand text-[26px] text-accent">live project · nonprofit</span>
          <h1 className="text-[40px] md:text-[64px] font-extrabold tracking-[-0.03em] leading-[1.02] text-balance">{project.title}</h1>
          <p className="text-[19px] leading-relaxed max-w-[640px]">{project.blurb}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="inline-flex items-center gap-2 text-[13px] font-bold bg-ink text-white rounded-full px-4 py-2"><span className="w-2 h-2 rounded-full bg-ember animate-pulse" />in progress · started {project.started}</span>
            <a href={project.site} target="_blank" rel="noreferrer" className="text-[13px] font-bold border-2 border-ink rounded-full px-4 py-2 hover:bg-mist">their site ↗</a>
          </div>
          <p className="text-[14px] leading-relaxed text-mid border-l-2 border-accent pl-4 max-w-[560px]">A class project, done in public. Nothing here is commissioned by the brand. This page fills in as the work happens, so what you see is where I am, not a finished story.</p>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-line bg-mist" style={{ aspectRatio: "4/5" }}>
          <Image src="/images/otherside/before-mobile.jpg" alt="The Other Side Snacks site on a phone" fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover object-top" />
          <span className="absolute bottom-3 left-3 bg-white text-ink rounded-full px-3 py-1.5 text-[11px] font-bold">their site, {project.observed}</span>
        </div>
      </header>

      {/* progress */}
      <section className="border-t-2 border-ink pt-8 flex flex-col gap-5">
        <div className="flex flex-wrap items-baseline justify-between gap-3"><h2 className="text-[13px] font-bold uppercase tracking-[0.1em] text-mid">where this is</h2><span className="hand text-[22px] text-mid">now: {now?.title.toLowerCase()}</span></div>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {phases.map((p) => (
            <li key={p.n} className={`rounded-3xl p-5 flex flex-col gap-2 border-2 ${p.status === "now" ? "border-ink bg-ink text-white" : p.status === "done" ? "border-ink" : "border-line"}`}>
              <div className="flex items-center justify-between"><span className={`text-[12px] font-bold ${p.status === "now" ? "text-white/70" : "text-mid"}`}>{p.n}</span>{p.status === "now" && <span className="w-2 h-2 rounded-full bg-ember animate-pulse" />}{p.status === "done" && <span className="text-[12px] font-bold text-accent">done</span>}</div>
              <span className="text-[20px] font-extrabold tracking-[-0.02em]">{p.title}</span>
              <span className={`text-[13px] leading-snug ${p.status === "now" ? "text-white/80" : "text-mid"}`}>{p.done ?? p.plan}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="flex flex-col">
        <Part n="01" title="Before, and the after to come" aside="drag the handle">
          <Compare before="/images/otherside/before-desktop.jpg" afterLabel="[the homepage mockup goes here, after the audit]" alt="The Other Side Snacks homepage" />
          <p className="text-[13px] text-mid">Their homepage as saved on {project.observed}. The right side fills in when the mockup exists, so you can drag between what was and what I proposed.</p>
        </Part>

        <Part n="02" title="Day one" aside="what I saw, before deciding anything">
          <ul className="flex flex-col gap-2">{dayOne.map((t) => <li key={t} className="flex gap-3"><span className="text-accent font-extrabold">→</span><span>{t}</span></li>)}</ul>
        </Part>

        <Part n="03" title="You are the marketing lead" aside="one click, counted">
          <p>The audit covers four places the brand meets a person. Which would you fix first?</p>
          <FixFirst options={options} />
        </Part>

        <Part n="04" title="How I will know it worked">
          <MeasurePlan rows={measure} concept />
        </Part>

        <Part n="05" title="Field notes" aside="newest first">
          <ol className="flex flex-col divide-y divide-line">
            {[...notes].reverse().map((n) => (
              <li key={n.date + n.title} className="py-4 grid gap-1 md:grid-cols-[140px_1fr]"><span className="text-[13px] font-bold text-mid">{n.date}</span><div className="flex flex-col gap-1"><span className="text-[18px] font-extrabold tracking-[-0.02em]">{n.title}</span><p className="text-[15px] text-mid leading-relaxed">{n.body}</p></div></li>
            ))}
          </ol>
        </Part>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 border-t-2 border-ink pt-8">
        <a href="#subscribe" className="flex flex-col justify-between gap-6 border-2 border-ink rounded-3xl p-6 hover:bg-mist"><span className="text-[11px] font-bold uppercase tracking-[0.08em] text-mid">follow this project</span><span className="text-[22px] font-extrabold tracking-[-0.02em]">new field notes, by email →</span></a>
        <TrackLink event="cta_case_sayhi" href="/contact" className="flex flex-col justify-between gap-6 bg-ink text-white rounded-3xl p-6 hover:bg-mid transition-colors"><span className="text-[11px] font-bold uppercase tracking-[0.08em] opacity-70">know the brand, or the village?</span><span className="text-[22px] font-extrabold tracking-[-0.02em]">say hi →</span></TrackLink>
      </div>
    </article>
  );
}
