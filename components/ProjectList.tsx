import Link from "next/link";
import { lanes } from "@/lib/site";
import { work, linkFor, type WorkItem } from "@/lib/work";
import { VideoTile } from "./VideoTile";

// One project per row. The work is the visual; the text answers goal, client, role, tools, and proof.
// Items with a case study derive their facts from it. Items without one carry the fields themselves.

function kicker(w: WorkItem) {
  if (w.caseStudy && w.status !== "concept") return "case study";
  if (w.status === "concept") return "spec project";
  if (w.status === "in-production" && w.slug === "other-side-snacks") return "live project";
  return "in production";
}

// The client is not in the case study, so name it here for the two items that have one.
const clients: Record<string, string> = {
  "yoodlize-party": "Yoodlize, a peer-to-peer rental marketplace",
  "jj-coffee-popup": "JJ Coffee (spec, not commissioned)",
};

function facts(w: WorkItem) {
  // An explicit field on the item always wins. The case study only fills in what the item leaves out.
  const cs = w.caseStudy;
  return {
    client: w.client ?? clients[w.slug],
    goal: w.goal ?? cs?.brief.ask,
    role: w.role ?? cs?.role,
    tools: w.tools ?? cs?.tools,
    result: w.result ?? cs?.result.numbers[0],
  };
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4">
      <dt className="text-[11px] font-bold uppercase tracking-[0.08em] text-mid w-[88px] shrink-0 pt-[5px]">{label}</dt>
      <dd className="text-[15px] leading-relaxed">{value}</dd>
    </div>
  );
}

export function ProjectList() {
  return (
    <div className="flex flex-col">
      {work.map((w) => {
        const f = facts(w);
        const href = w.caseStudy ? `/case/${w.slug}` : w.slug === "other-side-snacks" ? linkFor(w) : undefined;
        const linkLabel = w.caseStudy ? "read the case study →" : "follow the project →";
        return (
          <article key={w.slug} className="border-t border-line grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-6 md:gap-10 py-10">
            <VideoTile video={w.preview.video} poster={w.preview.poster} alt={w.title} ratio="4/3" />
            <div className="flex flex-col gap-4">
              <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-mid">{lanes[w.lane].short} · {kicker(w)}</span>
              <h2 className="text-[28px] md:text-[36px] font-extrabold tracking-[-0.03em] leading-tight">{w.title}</h2>
              <dl className="flex flex-col gap-2.5">
                {f.client && <Row label="client" value={f.client} />}
                {f.goal && <Row label="goal" value={f.goal} />}
                {f.role && <Row label="my role" value={f.role} />}
                {f.tools && f.tools.length > 0 && <Row label="tools" value={f.tools.join(", ")} />}
              </dl>
              {f.result && (
                <p className="text-[15px] font-bold">
                  <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-mid mr-2">proof</span>
                  {f.result}
                </p>
              )}
              <p className="text-[14px] text-mid leading-relaxed">{w.blurb}</p>
              {href && (
                <Link href={href} className="text-[14px] font-bold border-b-2 border-ink hover:text-accent hover:border-accent self-start">{linkLabel}</Link>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
