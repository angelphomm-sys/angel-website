import Image from "next/image";
import Link from "next/link";
import { work, linkFor, proofFor, type WorkItem, type Visual, type Measure, type Shot, byDiscipline } from "@/lib/work";
import { lanes, disciplines } from "@/lib/site";
import { VideoTile } from "./VideoTile";
import { CaseProgress, CaseRail, CaseChips, type CaseStep } from "./CaseProgress";
import { TrackView } from "./Track";
import { Placeholder } from "./Placeholder";
import { PageFrame } from "./PageFrame";
import { showNotes } from "@/lib/notes";

// The next piece of work in /work order (by discipline), wrapping around at the end.
// The order lives in the data, so nothing here is hardcoded to a slug.
// Shared with ThaiGoogleAdsCase.tsx; it belongs in lib/work.ts once that file is free to edit.
export function nextWork(slug: string): WorkItem | undefined {
  const order = byDiscipline(work);
  const i = order.findIndex((w) => w.slug === slug);
  if (i < 0) return undefined;
  for (let k = 1; k <= order.length; k++) {
    const w = order[(i + k) % order.length];
    if (w.slug !== slug && linkFor(w)) return w;
  }
  return undefined;
}

// A numbered part. The heading sits tight above its own content: no reserved column, no floor height.
function Part({ step, aside, children }: { step: CaseStep; aside?: string; children: React.ReactNode }) {
  return (
    <section id={step.id} className="flex flex-col gap-4 py-8 md:py-10 scroll-mt-16 lg:scroll-mt-6">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-mono text-[12px] font-medium tabular-nums text-accent-deep">{step.n}</span>
        <h2 className="text-[24px] md:text-[28px] font-display font-normal tracking-[-0.01em] leading-tight">{step.label}</h2>
        {aside && <span className="hand text-[13px] text-mid">{aside}</span>}
      </div>
      <div className="flex flex-col gap-4 text-[17px] leading-relaxed [&>p]:max-w-[65ch]">{children}</div>
    </section>
  );
}

// A visual slot. With a src it is an image; without one it is a labelled empty frame waiting for the real asset.
function Frame({ v, ratio = "4/3", tint }: { v: Visual; ratio?: string; tint?: string }) {
  if (v.src) return <div className="relative overflow-hidden rounded-2xl bg-mist" style={{ aspectRatio: ratio }}><Image src={v.src} alt={v.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" /></div>;
  return <Placeholder label={v.placeholder ?? v.alt} ratio={ratio} tint={tint} />;
}

function Figures({ items, tint, cols = 3 }: { items: Visual[]; tint?: string; cols?: 2 | 3 }) {
  return (
    <div className={`grid gap-4 ${cols === 2 ? "grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
      {items.map((s) => (
        <figure key={(s.src ?? "") + s.alt} className="flex flex-col gap-2 m-0">
          <Frame v={s} tint={tint} />
          {s.caption && <figcaption className="text-[12px] text-mid">{s.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

// The starting material, shown at its real proportions and side by side, so the two can be read against each other.
function Shots({ items }: { items: Shot[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 pt-1">
      {items.map((s) => (
        <figure key={s.src} className="flex flex-col gap-2 m-0">
          <div className="overflow-hidden rounded-2xl border border-line bg-mist">
            <Image src={s.src} alt={s.alt} width={s.width} height={s.height} sizes="(min-width: 640px) 40vw, 100vw" className="w-full h-auto" />
          </div>
          {s.caption && <figcaption className="text-[12px] text-mid">{s.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

function BeforeAfter({ before, after, note, tint }: { before: Visual; after: Visual; note?: string; tint?: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid gap-4 grid-cols-2">
        {[["before", before], ["after", after]].map(([label, v]) => (
          <figure key={label as string} className="flex flex-col gap-2 m-0">
            <span className={`self-start text-[11px] font-mono font-medium uppercase tracking-[0.08em] rounded-full px-3 py-1 ${label === "after" ? "bg-accent text-cream" : "bg-mist text-mid"}`}>{label as string}</span>
            <Frame v={v as Visual} tint={tint} />
            {(v as Visual).caption && <figcaption className="text-[12px] text-mid">{(v as Visual).caption}</figcaption>}
          </figure>
        ))}
      </div>
      {note && <p className="hand text-[15px] leading-tight text-mid">{note}</p>}
    </div>
  );
}

export function MeasurePlan({ rows, concept }: { rows: Measure[]; concept: boolean }) {
  return (
    <div className="flex flex-col gap-3 pt-2">
      <h3 className="text-[13px] font-mono font-medium uppercase tracking-[0.1em] text-mid">{concept ? "what I would measure" : "what I measured"}</h3>
      <div className="overflow-x-auto -mx-1">
        <table className="w-full min-w-[640px] text-[16px] leading-normal ">
          <thead><tr className="text-left text-[11px] font-mono font-medium uppercase tracking-[0.08em] text-mid"><th className="py-2.5 pr-4 font-bold">metric</th><th className="py-2.5 pr-4 font-bold">{concept ? "hypothesis" : "what I was testing"}</th><th className="py-2.5 pr-4 font-bold">window</th><th className="py-2.5 font-bold">where</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.metric} className="align-top">
                <td className="py-3 pr-4 font-display font-normal tracking-[-0.01em]">{r.metric}</td>
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

// The two things to do at the end of a case study, said plainly: read the next one, or get in touch.
export function CaseCtaRow({ slug, post }: { slug: string; concept?: boolean; post?: string }) {
  const next = nextWork(slug);
  const nextHref = next ? linkFor(next) : undefined;
  const cardCls = "flex flex-col justify-between gap-6 rounded-3xl p-6 transition-colors";
  const nextInner = next && (
    <>
      <span className="text-[12px] font-mono font-medium uppercase tracking-[0.08em]">up next · {next.title}</span>
      <span className="text-[22px] font-display font-normal tracking-[-0.01em]">see the next case study →</span>
    </>
  );
  return (
    <section className="flex flex-col gap-3 pt-8">
      <div className="grid gap-3 sm:grid-cols-2">
        {next && nextHref && (nextHref.startsWith("http")
          ? <a href={nextHref} target="_blank" rel="noopener noreferrer" className={`${cardCls} bg-accent text-cream hover:bg-accent-deep`}>{nextInner}</a>
          : <Link href={nextHref} className={`${cardCls} bg-accent text-cream hover:bg-accent-deep`}>{nextInner}</Link>)}
      </div>
      {post && <Link href={post} className="hit self-start text-[14px] font-bold text-mid hover:text-accent-deep">read the longer write-up →</Link>}
      <Link href="/work" className="hit self-start mt-2 font-mono text-[13px] font-medium tracking-[0.02em] border-b-2 border-accent hover:text-accent-deep">all the work →</Link>
    </section>
  );
}

export function RelatedWork({ items, heading }: { items: WorkItem[]; heading: string }) {
  if (!items.length) return null;
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between gap-3"><h2 className="text-[13px] font-mono font-medium uppercase tracking-[0.1em] text-mid">{heading}</h2><Link href="/work" className="hit font-mono text-[13px] font-medium tracking-[0.02em] border-b-2 border-accent hover:text-accent-deep hover:border-accent-deep">all the work →</Link></div>
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map((w) => { const to = linkFor(w)!; const inner = (<><span className="text-[11px] font-mono font-medium uppercase tracking-[0.08em] text-mid">{disciplines[w.discipline].replace(/\.$/, "")}</span><span className="text-[18px] font-display font-normal tracking-[-0.01em] leading-tight">{w.title}</span><span className="text-[12px] font-bold text-accent-deep">{proofFor(w)}</span></>); const cls = "flex flex-col gap-2 border-2 border-line rounded-3xl p-5 hover:border-ink transition-colors";
          return to.startsWith("http") ? <a key={w.slug} href={to} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a> : <Link key={w.slug} href={to} className={cls}>{inner}</Link>; })}
      </div>
    </section>
  );
}

// The parts always run in this order, so the next case study only needs data.
// The analysis part is optional, and the parts after it renumber themselves when it is there.
export function CaseStudyTemplate({ item }: { item: WorkItem & { caseStudy: NonNullable<WorkItem["caseStudy"]> } }) {
  const c = item.caseStudy;
  const lane = lanes[item.lane];
  const concept = !!c.concept;
  // A [bracketed] line is a pending note. It shows, in the note style, unless NEXT_PUBLIC_SHOW_NOTES=false.
  const differently = c.differently.filter((d) => showNotes || !d.trim().startsWith("["));

  // Most parts are optional. The numbers come from the parts this case study actually has, in the order they render.
  const titles: Record<string, { label: string; short?: string }> = {
    brief: { label: c.brief.title ?? "The brief", short: "The brief" },
    pageFrame: { label: c.pageFrame?.title ?? "The page", short: "The page" },
    work: { label: concept ? "What I would do" : "What I did", short: concept ? "What I would do" : "What I did" },
    decision: { label: "What I decided, and why", short: "The decision" },
    analysis: { label: c.analysis?.title ?? "The analysis", short: c.analysis?.title ?? "The analysis" },
    result: { label: concept ? "How I would know it worked" : "The result", short: concept ? "The measure" : "The result" },
    differently: { label: concept ? "What I would test first" : "What I would do differently", short: concept ? "What to test" : "What I would change" },
  };
  const order = ["brief", c.pageFrame && "pageFrame", c.work && "work", c.decision && "decision", c.analysis && "analysis", c.result && "result", differently.length > 0 && "differently"].filter(Boolean) as string[];
  const steps: CaseStep[] = order.map((k, i) => ({ id: k, n: String(i + 1).padStart(2, "0"), ...titles[k] }));
  const step = (k: string) => steps.find((s) => s.id === k)!;

  const workVisuals = !!c.work && (c.work.visuals.length > 0 || !!c.work.beforeAfter);

  return (
    <article className="mx-auto max-w-[1440px] px-5 md:px-20 py-8 md:py-10 flex flex-col gap-8">
      <CaseProgress />
      <TrackView event={`case_view_${item.slug}`} />
      {/* No breadcrumb: the other case pages have none, and the header nav already marks work. */}

      <header className="grid gap-6 lg:grid-cols-[1fr_380px] lg:gap-12 items-start">
        <div className="flex flex-col gap-4">
          <h1 className="text-[38px] md:text-[56px] font-display font-normal tracking-[-0.01em] leading-[1.02] text-balance">{item.title}</h1>
          <p className="text-[18px] leading-relaxed max-w-[620px]">{item.blurb}</p>
          {c.concept && <p className="text-[16px] leading-relaxed text-mid border-l-2 border-accent pl-4 max-w-[560px]">{c.concept.disclaimer}</p>}
          {c.disclosure && <p className="text-[16px] leading-relaxed text-mid border-l-2 border-accent pl-4 max-w-[560px]">{c.disclosure}</p>}
        </div>
        <VideoTile video={item.preview.video} poster={item.preview.poster} alt={item.title} ratio="16/10" />
      </header>

      {/* Each fact shows once: the goal sits in the blurb, the ask in the brief, the role in the disclosure. */}
      <CaseChips steps={steps} className="-mt-4" />

      <div className="grid gap-8 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-14 items-start">
        <CaseRail steps={steps} />
        <div className="flex flex-col min-w-0">
          {c.opener && <p className="text-[20px] md:text-[23px] leading-snug tracking-[-0.01em] max-w-[760px] pb-1">{c.opener}</p>}

          <Part step={step("brief")}>
            <p><strong>{concept ? "What I set out to do." : "What was asked."}</strong> {c.brief.ask}</p>
            <p><strong>The constraint.</strong> {c.brief.constraint}</p>
            <p><strong>The audience.</strong> {c.brief.audience}</p>
            {c.brief.given && c.brief.given.length > 0 && <Shots items={c.brief.given} />}
          </Part>

          {c.pageFrame && (
            <Part step={step("pageFrame")}>
              <PageFrame {...c.pageFrame} />
            </Part>
          )}

          {/* Variance, first turn: what I did reads on the left, the proof sits on the right. */}
          {c.work && (
            <Part step={step("work")}>
              <div className={workVisuals ? "grid gap-6 lg:grid-cols-2 lg:gap-8 items-start" : ""}>
                <ul className="flex flex-col gap-2.5">{c.work.text.map((t) => <li key={t} className="flex gap-3"><span className="text-accent-deep font-extrabold">→</span><span>{t}</span></li>)}</ul>
                {workVisuals && (
                  <div className="flex flex-col gap-4">
                    {c.work.beforeAfter && <BeforeAfter {...c.work.beforeAfter} tint={lane.tint} />}
                    {c.work.visuals.length > 0 && <Figures items={c.work.visuals} tint={lane.tint} cols={2} />}
                  </div>
                )}
              </div>
            </Part>
          )}

          {c.decision && (
            <Part step={step("decision")} aside="the strategic call">
              <p className="text-[21px] font-display font-normal tracking-[-0.01em] leading-tight border-l-2 border-accent pl-4">{c.decision.call}</p>
              <p>{c.decision.why}</p>
              <p><strong>The tradeoff.</strong> {c.decision.tradeoff}</p>
            </Part>
          )}

          {/* Variance, second turn: the image leads and the text follows, so the page does not repeat itself. */}
          {c.analysis && (
            <Part step={step("analysis")}>
              {c.analysis.intro && <p>{c.analysis.intro}</p>}
              {c.analysis.sections.map((sec) => {
                const text = (
                  <div className="flex flex-col gap-3">
                    <h3 className="text-[18px] font-display font-normal tracking-[-0.01em] leading-tight">{sec.heading}</h3>
                    {sec.body.map((b) => <p key={b}>{b}</p>)}
                  </div>
                );
                if (!sec.image) return <div key={sec.heading}>{text}</div>;
                return (
                  <div key={sec.heading} className="grid gap-4 md:grid-cols-2 md:gap-8 items-start">
                    <figure className="flex flex-col gap-2 m-0">
                      <div className="overflow-hidden rounded-2xl border border-line bg-mist">
                        <Image src={sec.image.src} alt={sec.image.alt} width={sec.image.width} height={sec.image.height} sizes="(min-width: 768px) 40vw, 100vw" className="w-full h-auto" />
                      </div>
                      {sec.image.caption && <figcaption className="text-[12px] text-mid">{sec.image.caption}</figcaption>}
                    </figure>
                    {text}
                  </div>
                );
              })}
            </Part>
          )}

          {/* The numbers get their own row, at the size a number deserves. */}
          {c.result && (
            <Part step={step("result")}>
              {c.result.numbers.length > 0 && (
                <div className="grid gap-x-6 gap-y-5 sm:grid-cols-3">
                  {c.result.numbers.map((r) => (
                    <p key={r} className="bg-paper m-0 px-1 py-4 sm:px-4 sm:first:pl-0 text-[17px] font-display font-normal tracking-[-0.01em] leading-normal">{r}</p>
                  ))}
                </div>
              )}
              {c.result.measure && c.result.measure.length > 0 && <MeasurePlan rows={c.result.measure} concept={concept} />}
              {c.result.screenshots && c.result.screenshots.length > 0 && <Figures items={c.result.screenshots} tint={lane.tint} />}
              {c.result.links && c.result.links.length > 0 && (
                <div className="flex flex-wrap gap-2">{c.result.links.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-11 text-[13px] font-bold border-2 border-ink rounded-full px-4 py-2 hover:bg-mist">{l.label} ↗</a>)}</div>
              )}
            </Part>
          )}

          {differently.length > 0 && (
          <Part step={step("differently")}>
            <ol className="flex flex-col gap-2.5">
              {differently.map((d, i) => (
                <li key={d} className="flex gap-3 items-baseline">
                  <span className="font-mono text-[11px] font-medium tabular-nums text-accent-deep shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className={d.trim().startsWith("[") ? "text-[14px] font-medium leading-relaxed" : "text-[16px] leading-relaxed"}>{d}</span>
                </li>
              ))}
            </ol>
          </Part>
          )}

          <section className="flex flex-col gap-3 py-8">
            <h2 className="text-[13px] font-mono font-medium uppercase tracking-[0.1em] text-mid">Tools</h2>
            <div className="flex flex-wrap gap-2">{c.tools.map((t) => <span key={t} className="text-[12px] font-bold border-2 border-ink rounded-full px-3 py-1.5">{t}</span>)}</div>
          </section>
        </div>
      </div>

      <CaseCtaRow slug={item.slug} concept={concept} post={item.post} />
    </article>
  );
}
