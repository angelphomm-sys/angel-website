import Image from "next/image";
import Link from "next/link";
import { work, linkFor, type WorkItem, type Visual, type Measure } from "@/lib/work";
import { lanes, workTypes } from "@/lib/site";
import { VideoTile } from "./VideoTile";
import { CaseProgress } from "./CaseProgress";
import { TrackView, TrackLink } from "./Track";
import { Placeholder } from "./Placeholder";

function Part({ n, title, aside, children }: { n: string; title: string; aside?: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 md:grid-cols-[220px_1fr] border-t border-line py-9">
      <div className="flex flex-col gap-1 md:sticky md:top-6 self-start"><span className="text-[13px] font-bold text-mid">{n}</span><h2 className="text-[22px] font-extrabold tracking-[-0.02em] leading-tight">{title}</h2>{aside && <span className="hand text-[20px] text-mid">{aside}</span>}</div>
      <div className="flex flex-col gap-4 text-[17px] leading-relaxed">{children}</div>
    </section>
  );
}

// A visual slot. With a src it is an image; without one it is a labelled empty frame waiting for the real asset.
function Frame({ v, ratio = "4/3", tint }: { v: Visual; ratio?: string; tint?: string }) {
  if (v.src) return <div className="relative overflow-hidden rounded-2xl bg-mist" style={{ aspectRatio: ratio }}><Image src={v.src} alt={v.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" /></div>;
  return <Placeholder label={v.placeholder ?? v.alt} ratio={ratio} tint={tint} />;
}

function Figures({ items, tint }: { items: Visual[]; tint?: string }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s) => (
        <figure key={(s.src ?? "") + s.alt} className="flex flex-col gap-2">
          <Frame v={s} tint={tint} />
          {s.caption && <figcaption className="text-[12px] text-mid">{s.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

function BeforeAfter({ before, after, note, tint }: { before: Visual; after: Visual; note?: string; tint?: string }) {
  return (
    <div className="flex flex-col gap-3 pt-2">
      <div className="grid gap-4 sm:grid-cols-2">
        {[["before", before], ["after", after]].map(([label, v]) => (
          <figure key={label as string} className="flex flex-col gap-2">
            <span className={`self-start text-[11px] font-bold uppercase tracking-[0.08em] rounded-full px-3 py-1 ${label === "after" ? "bg-ink text-white" : "bg-mist text-mid"}`}>{label as string}</span>
            <Frame v={v as Visual} tint={tint} />
            {(v as Visual).caption && <figcaption className="text-[12px] text-mid">{(v as Visual).caption}</figcaption>}
          </figure>
        ))}
      </div>
      {note && <p className="hand text-[22px] leading-tight text-mid">{note}</p>}
    </div>
  );
}

export function MeasurePlan({ rows, concept }: { rows: Measure[]; concept: boolean }) {
  return (
    <div className="flex flex-col gap-3 pt-2">
      <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-mid">{concept ? "what I would measure" : "what I measured"}</h3>
      <div className="overflow-x-auto -mx-1">
        <table className="w-full min-w-[640px] text-[14px] leading-snug border-t-2 border-ink">
          <thead><tr className="text-left text-[11px] font-bold uppercase tracking-[0.08em] text-mid"><th className="py-2.5 pr-4 font-bold">metric</th><th className="py-2.5 pr-4 font-bold">{concept ? "hypothesis" : "what I was testing"}</th><th className="py-2.5 pr-4 font-bold">window</th><th className="py-2.5 font-bold">where</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.metric} className="border-t border-line align-top">
                <td className="py-3 pr-4 font-extrabold tracking-[-0.01em]">{r.metric}</td>
                <td className="py-3 pr-4 text-mid">{r.hypothesis}</td>
                <td className="py-3 pr-4 whitespace-nowrap">{r.window}</td>
                <td className="py-3 text-mid">{r.tool ?? ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Five parts, always in this order, so the next case study only needs data.
export function CaseStudyTemplate({ item }: { item: WorkItem & { caseStudy: NonNullable<WorkItem["caseStudy"]> } }) {
  const c = item.caseStudy;
  const lane = lanes[item.lane];
  const concept = !!c.concept;
  const related = work.filter((w) => w.slug !== item.slug && w.lane === item.lane && linkFor(w)).slice(0, 3);
  const more = related.length ? related : work.filter((w) => w.slug !== item.slug && w.caseStudy).slice(0, 3);
  return (
    <article className="mx-auto max-w-[1440px] px-5 md:px-20 py-12 md:py-16 flex flex-col gap-10">
      <CaseProgress />
      <TrackView event={`case_view_${item.slug}`} />
      <div className="text-[12px] font-bold text-mid flex gap-2"><Link href="/work" className="hover:text-accent">work</Link><span>/</span><span>{lane.short}</span><span>/</span><span className="text-ink">{concept ? "concept" : "case study"}</span></div>

      <header className="grid gap-8 lg:grid-cols-[1fr_460px] lg:gap-14 items-start">
        <div className="flex flex-col gap-5">
          <span className="hand text-[26px] text-accent">{concept ? "concept" : "case study"} · {lane.short}</span>
          <h1 className="text-[40px] md:text-[64px] font-extrabold tracking-[-0.03em] leading-[1.02] text-balance">{item.title}</h1>
          <p className="text-[19px] leading-relaxed max-w-[640px]">{item.blurb}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            {concept && <span className="text-[13px] font-bold bg-ink text-white rounded-full px-4 py-2">concept</span>}
            <span className="text-[13px] font-bold border-2 border-ink rounded-full px-4 py-2">{item.metric}</span>
            <span className="text-[13px] font-bold border-2 border-ink rounded-full px-4 py-2">{item.channel}</span>
          </div>
          {c.concept && <p className="text-[14px] leading-relaxed text-mid border-l-2 border-accent pl-4 max-w-[560px]">{c.concept.disclaimer}</p>}
        </div>
        <VideoTile video={item.preview.video} poster={item.preview.poster} alt={item.title} ratio="4/5" />
      </header>

      <div className="flex flex-col">
        {c.opener && <p className="text-[21px] md:text-[24px] leading-snug tracking-[-0.01em] max-w-[760px] pb-2">{c.opener}</p>}
        <Part n="01" title="The brief">
          <p><strong>{concept ? "What I set out to do." : "What was asked."}</strong> {c.brief.ask}</p>
          <p><strong>The constraint.</strong> {c.brief.constraint}</p>
          <p><strong>The audience.</strong> {c.brief.audience}</p>
        </Part>
        <Part n="02" title={concept ? "What I would do" : "What I did"}>
          <ul className="flex flex-col gap-2">{c.work.text.map((t) => <li key={t} className="flex gap-3"><span className="text-accent font-extrabold">→</span><span>{t}</span></li>)}</ul>
          {c.work.beforeAfter && <BeforeAfter {...c.work.beforeAfter} tint={lane.tint} />}
          {c.work.visuals.length > 0 && <Figures items={c.work.visuals} tint={lane.tint} />}
        </Part>
        <Part n="03" title="What I decided, and why" aside="the strategic call">
          <p className="text-[22px] font-extrabold tracking-[-0.02em] leading-tight">{c.decision.call}</p>
          <p>{c.decision.why}</p>
          <p><strong>The tradeoff.</strong> {c.decision.tradeoff}</p>
        </Part>
        <Part n="04" title={concept ? "How I would know it worked" : "The result"}>
          <ul className="flex flex-col gap-2">{c.result.numbers.map((r) => <li key={r} className="flex gap-3"><span className="text-accent font-extrabold">→</span><span>{r}</span></li>)}</ul>
          {c.result.measure && c.result.measure.length > 0 && <MeasurePlan rows={c.result.measure} concept={concept} />}
          {c.result.screenshots && c.result.screenshots.length > 0 && <Figures items={c.result.screenshots} tint={lane.tint} />}
          {c.result.links && c.result.links.length > 0 && (
            <div className="flex flex-wrap gap-2">{c.result.links.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="text-[13px] font-bold border-2 border-ink rounded-full px-4 py-2 hover:bg-mist">{l.label} ↗</a>)}</div>
          )}
        </Part>
        <Part n="05" title={concept ? "What I would test first" : "What I would do differently"}>
          <ul className="flex flex-col gap-2">{c.differently.map((d) => <li key={d} className="hand text-[24px] leading-tight">{d}</li>)}</ul>
        </Part>
        <section className="grid gap-4 md:grid-cols-[220px_1fr] border-t border-line py-9">
          <h2 className="text-[13px] font-bold uppercase tracking-[0.1em] text-mid pt-1">My role and tools</h2>
          <div className="flex flex-col gap-3 text-[16px] leading-relaxed"><p>{c.role}</p><div className="flex flex-wrap gap-2">{c.tools.map((t) => <span key={t} className="text-[12px] font-bold border-2 border-ink rounded-full px-3 py-1.5">{t}</span>)}</div></div>
        </section>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 border-t-2 border-ink pt-8">
        {item.post && <Link href={item.post} className="flex flex-col justify-between gap-6 border-2 border-ink rounded-3xl p-6 hover:bg-mist"><span className="text-[11px] font-bold uppercase tracking-[0.08em] text-mid">the longer write-up</span><span className="text-[22px] font-extrabold tracking-[-0.02em]">read the blog post →</span></Link>}
        <TrackLink event="cta_case_sayhi" href="/contact" className="flex flex-col justify-between gap-6 bg-ink text-white rounded-3xl p-6 hover:bg-mid transition-colors"><span className="text-[11px] font-bold uppercase tracking-[0.08em] opacity-70">{concept ? "want the real version of this?" : "want this for your brand?"}</span><span className="text-[22px] font-extrabold tracking-[-0.02em]">say hi →</span></TrackLink>
      </div>

      {more.length > 0 && (
        <section className="flex flex-col gap-4">
          <div className="flex items-baseline justify-between gap-3"><h2 className="text-[13px] font-bold uppercase tracking-[0.1em] text-mid">{related.length ? `more in ${lane.short}` : "more case studies"}</h2><Link href="/work" className="text-[13px] font-bold border-b-2 border-ink hover:text-accent hover:border-accent">all the work →</Link></div>
          <div className="grid gap-4 sm:grid-cols-3">
            {more.map((w) => { const to = linkFor(w)!; const inner = (<><span className="text-[11px] font-bold uppercase tracking-[0.08em] text-mid">{workTypes[w.type]}</span><span className="text-[18px] font-extrabold tracking-[-0.02em] leading-tight">{w.title}</span><span className="text-[13px] text-mid leading-snug">{w.blurb}</span></>); const cls = "flex flex-col gap-2 border-2 border-line rounded-3xl p-5 hover:border-ink transition-colors";
              return to.startsWith("http") ? <a key={w.slug} href={to} target="_blank" rel="noreferrer" className={cls}>{inner}</a> : <Link key={w.slug} href={to} className={cls}>{inner}</Link>; })}
          </div>
        </section>
      )}
    </article>
  );
}
