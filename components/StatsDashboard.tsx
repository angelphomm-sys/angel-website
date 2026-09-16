"use client";
import { useState } from "react";
import Link from "next/link";

// A tabbed dashboard. Server page fetches; this renders. Every panel has a pending state that keeps its shape.
export type Row = { label: string; value: number; href?: string; note?: string };
export type Objective = { label: string; value: number; target: number; format: "n" | "pct" | "s"; offsite?: boolean };
export type Dash = {
  live: boolean; deadline: string;
  totals: { users: number; views: number; avgSeconds: number };
  byDay: { date: string; users: number }[];
  objectives: Objective[];
  sources: Row[]; pages: Row[]; posts: Row[]; shares: Row[]; ctas: Row[]; inbound: Row[]; cases: Row[]; votes: Row[]; videos: Row[];
  counts: { resume: number };
};

const fmt = (n: number) => new Intl.NumberFormat("en-US").format(n);
const fmtBy = (v: number, f: Objective["format"]) => (f === "pct" ? `${Math.round(v * 100)}%` : f === "s" ? `${Math.round(v)}s` : fmt(Math.round(v)));
const PALETTE = ["#d3261a", "#f28c28", "#1b1614", "#b3aba4", "#e8c4bd", "#6d655f"];

function Pending({ children, live }: { children: React.ReactNode; live: boolean }) {
  return <div className={`relative ${live ? "" : "opacity-60"}`}>{children}{!live && <span className="absolute top-0 right-0 text-[10px] font-bold uppercase tracking-[0.08em] text-mid bg-paper px-1">pending</span>}</div>;
}

function Ring({ o, live }: { o: Objective; live: boolean }) {
  const r = 34, c = 2 * Math.PI * r;
  const pct = live && !o.offsite ? Math.min(1, o.value / o.target) : 0;
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 80 80" className="w-[76px] h-[76px] shrink-0" role="img" aria-label={`${o.label}: ${live ? fmtBy(o.value, o.format) : "pending"} of ${fmtBy(o.target, o.format)}`}>
        <circle cx="40" cy="40" r={r} fill="none" stroke="var(--color-mist)" strokeWidth="8" />
        {pct > 0 && <circle cx="40" cy="40" r={r} fill="none" stroke={pct >= 1 ? "var(--color-ember)" : "var(--color-accent)"} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${c * pct} ${c}`} transform="rotate(-90 40 40)" style={{ transition: "stroke-dasharray 800ms ease" }} />}
        <text x="40" y="45" textAnchor="middle" className="fill-current" style={{ fontSize: 15, fontWeight: 800 }}>{live && !o.offsite ? fmtBy(o.value, o.format) : "·"}</text>
      </svg>
      <div className="flex flex-col"><span className="text-[13px] font-bold leading-tight">{o.label}</span><span className="text-[12px] text-mid">of {fmtBy(o.target, o.format)}{o.offsite ? " · by hand" : ""}</span></div>
    </div>
  );
}

function Donut({ rows, live }: { rows: Row[]; live: boolean }) {
  const total = Math.max(1, rows.reduce((a, r) => a + r.value, 0));
  let acc = 0; const r = 40, c = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 100 100" className="w-[120px] h-[120px] shrink-0" role="img" aria-label="Visits by source">
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--color-mist)" strokeWidth="14" />
        {live && rows.map((row, i) => { const len = (row.value / total) * c; const el = <circle key={row.label} cx="50" cy="50" r={r} fill="none" stroke={PALETTE[i % PALETTE.length]} strokeWidth="14" strokeDasharray={`${len} ${c}`} strokeDashoffset={-acc} transform="rotate(-90 50 50)" />; acc += len; return el; })}
      </svg>
      <ul className="flex flex-col gap-1.5 text-[13px]">
        {rows.slice(0, 6).map((row, i) => <li key={row.label} className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: live ? PALETTE[i % PALETTE.length] : "var(--color-line)" }} /><span className="font-bold">{row.label}</span>{live && <span className="text-mid">{Math.round((row.value / total) * 100)}%</span>}</li>)}
      </ul>
    </div>
  );
}

function Spark({ points, live }: { points: { date: string; users: number }[]; live: boolean }) {
  const w = 600, h = 110, pad = 4;
  const max = Math.max(1, ...points.map((p) => p.users));
  const xs = points.map((_, i) => pad + (i / Math.max(1, points.length - 1)) * (w - pad * 2));
  const ys = points.map((p) => h - pad - (p.users / max) * (h - pad * 2));
  const d = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[110px]" role="img" aria-label="Visitors per day">
      {live && points.length > 1 ? <><path d={`${d} L${xs[xs.length - 1]},${h} L${xs[0]},${h} Z`} fill="var(--color-accent)" opacity="0.12" /><path d={d} fill="none" stroke="var(--color-accent)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" /></> : <path d={`M${pad},${h - pad} L${w - pad},${h - pad}`} stroke="var(--color-grey)" strokeWidth="2" strokeDasharray="4 6" />}
    </svg>
  );
}

function Bars({ rows, live, unit = "" }: { rows: Row[]; live: boolean; unit?: string }) {
  const top = Math.max(1, ...rows.map((r) => r.value));
  return (
    <ul className="flex flex-col gap-2">
      {rows.map((r) => (
        <li key={r.label} className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-0.5 items-baseline">
          <span className="text-[13px] font-bold truncate">{r.href ? <Link href={r.href} className="hover:text-accent">{r.label}</Link> : r.label}{r.note && <span className="text-mid font-medium"> · {r.note}</span>}</span>
          <span className="text-[12px] font-bold tabular-nums text-mid">{live ? `${fmt(r.value)}${unit}` : ""}</span>
          <div className="col-span-2 h-1.5 rounded-full bg-mist overflow-hidden">{live && <div className="h-full bg-accent rounded-full" style={{ width: `${Math.max(2, (r.value / top) * 100)}%` }} />}</div>
        </li>
      ))}
      {rows.length === 0 && <li className="hand text-[20px] text-mid">nothing yet.</li>}
    </ul>
  );
}

function Big({ n, l, live }: { n: number | string; l: string; live: boolean }) {
  return <div className="flex flex-col"><span className={`text-[40px] md:text-[48px] font-extrabold tracking-[-0.03em] leading-none ${live ? "text-accent" : "text-mid"}`}>{live ? (typeof n === "number" ? fmt(n) : n) : "·"}</span><span className="text-[12px] text-mid">{l}</span></div>;
}

function Panel({ title, aside, children, className = "" }: { title: string; aside?: string; children: React.ReactNode; className?: string }) {
  return <div className={`border-2 border-ink rounded-3xl p-5 md:p-6 flex flex-col gap-4 ${className}`}><div className="flex items-baseline justify-between gap-3"><h2 className="text-[13px] font-bold uppercase tracking-[0.1em] text-mid">{title}</h2>{aside && <span className="hand text-[18px] text-mid">{aside}</span>}</div>{children}</div>;
}

const TABS = [
  { id: "plan", label: "against the plan", line: "Three objectives from the fall plan, due December 15." },
  { id: "posts", label: "posts", line: "Ten posts on a Tuesday and Friday calendar. Which ones earn a read, a share, a click." },
  { id: "journey", label: "the journey", line: "Where visitors go, what they open, and what they press." },
  { id: "inbound", label: "inbound", line: "Messages by source, the vote on the live project, and video counts from YouTube." },
] as const;
type Tab = (typeof TABS)[number]["id"];

export function StatsDashboard({ d }: { d: Dash }) {
  const [tab, setTab] = useState<Tab>("plan");
  const live = d.live;
  const avg = `${Math.floor(d.totals.avgSeconds / 60)}:${String(d.totals.avgSeconds % 60).padStart(2, "0")}`;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-1 overflow-x-auto border-y border-line py-3 [scrollbar-width:none]">
        {TABS.map((t) => <button key={t.id} type="button" onClick={() => setTab(t.id)} className={`text-[13px] font-bold rounded-full px-4 py-2 whitespace-nowrap transition-colors ${tab === t.id ? "bg-ink text-white" : "text-mid hover:text-ink hover:bg-mist"}`}>{t.label}</button>)}
      </div>
      <p className="hand text-[24px] text-mid -mt-1">{TABS.find((t) => t.id === tab)?.line}</p>

      {tab === "plan" && (
        <div className="grid gap-4 lg:grid-cols-3 fade-in">
          <Panel title="objectives" aside={`due ${d.deadline}`} className="lg:col-span-3">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{d.objectives.map((o) => <Ring key={o.label} o={o} live={live} />)}</div>
          </Panel>
          <Panel title="visitors" aside="last 28 days" className="lg:col-span-2">
            <div className="grid grid-cols-3 gap-3"><Big n={d.totals.users} l="visitors" live={live} /><Big n={d.totals.views} l="page views" live={live} /><Big n={avg} l="avg. session" live={live} /></div>
            <Spark points={d.byDay} live={live} />
          </Panel>
          <Panel title="where they come from" aside="by session"><Pending live={live}><Donut rows={d.sources} live={live} /></Pending></Panel>
        </div>
      )}

      {tab === "posts" && (
        <div className="grid gap-4 lg:grid-cols-2 fade-in">
          <Panel title="reads" aside="views · seconds read"><Pending live={live}><Bars rows={d.posts} live={live} /></Pending></Panel>
          <Panel title="what they did after" aside="shares · cta clicks"><Pending live={live}><Bars rows={d.shares} live={live} /></Pending></Panel>
        </div>
      )}

      {tab === "journey" && (
        <div className="grid gap-4 lg:grid-cols-3 fade-in">
          <Panel title="what they read" aside="page views"><Pending live={live}><Bars rows={d.pages} live={live} /></Pending></Panel>
          <Panel title="what they press" aside="buttons">
            <Big n={d.counts.resume} l="résumé downloads" live={live} />
            <Pending live={live}><Bars rows={d.ctas} live={live} /></Pending>
          </Panel>
          <Panel title="case studies opened" aside="last 28 days"><Pending live={live}><Bars rows={d.cases} live={live} /></Pending></Panel>
        </div>
      )}

      {tab === "inbound" && (
        <div className="grid gap-4 lg:grid-cols-3 fade-in">
          <Panel title="messages, by source" aside="the contact form"><Pending live={live}><Bars rows={d.inbound} live={live} /></Pending></Panel>
          <Panel title="what visitors would fix first" aside="The Other Side Snacks"><Pending live={live}><Bars rows={d.votes} live={live} /></Pending></Panel>
          <Panel title="the work, live" aside="from YouTube"><Pending live={d.videos.some((v) => v.value > 0)}><Bars rows={d.videos} live={d.videos.some((v) => v.value > 0)} unit=" views" /></Pending></Panel>
        </div>
      )}
    </div>
  );
}
