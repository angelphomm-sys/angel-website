"use client";

import { CaseProgress, useActiveSection, goToStep } from "./CaseProgress";
import { TrackView } from "./Track";
import { CaseCtaRow } from "./CaseStudyTemplate";
import { work } from "@/lib/work";
import s from "./ThaiGoogleAdsCase.module.css";
import { showNotes } from "@/lib/notes";

// This case study reads as a takeout order, start to finish: order details (the brief), the menu
// (keywords), the kitchen ticket (the build), driver updates (what worked), and the receipt (the result).
// The mock-ups carry the story. Each step gets one sentence above its mock-up and nothing else.
// [brackets] and ___ follow the site rule: pending, never an estimate.
// data-copy marks row labels, row values, and receipt lines, so a word count of body copy can skip them.

const SLUG = "thai-google-ads";
const shadow = "shadow-[0_1px_2px_rgba(27,22,20,0.06),0_8px_24px_rgba(27,22,20,0.07)]";
const card = `bg-white rounded-2xl ${shadow} ${s.app}`;
// The page itself stays white and black, in the site's own look. The takeout-app pieces (the cards,
// the ticket, the receipt) carry the concept.
const eyebrow = "text-[11px] font-bold uppercase tracking-[0.1em]";

/* ── Order status: the five parts of the page ─────────── */

const steps = [
  { id: "brief", status: "Placed", label: "the brief", title: "Order details", chip: "Placed · Jan 27" },
  { id: "menu", status: "Confirmed", label: "the keywords", title: "The menu", chip: "Confirmed · 3 categories" },
  { id: "built", status: "Preparing", label: "the ads I wrote", title: "In the kitchen", chip: "Preparing · 1 month" },
  { id: "worked", status: "On its way", label: "what worked", title: "On its way", chip: "Jan 27 to Mar 3" },
  { id: "result", status: "Delivered", label: "the result", title: "Delivered", chip: "Delivered · Mar 3" },
] as const;

type StepId = (typeof steps)[number]["id"];
const stepIds: string[] = steps.map((x) => x.id);

// The one sentence each step gets. The first one is the goal.
const lines: Record<StepId, string> = {
  brief: "The goal: drive online takeout orders.",
  menu: "",
  built: "",
  worked: "",
  result: "The restaurant ran it live for one month, and here is the receipt.",
};

function OrderStatus() {
  const active = useActiveSection(stepIds);
  const at = Math.max(0, stepIds.indexOf(active));
  const delivered = at === steps.length - 1;
  const now = steps[at];
  return (
    <nav aria-label="Order status: parts of this case study" className="sticky top-0 z-40 bg-paper/95 backdrop-blur-sm border-b border-line">
      <div className="mx-auto max-w-[720px] px-4 pt-2.5 pb-2">
        <p className="flex items-center gap-2 text-[13px] leading-tight min-w-0" aria-live="polite">
          <span className={`w-2 h-2 rounded-full shrink-0 bg-ink ${delivered ? "" : s.live}`} aria-hidden="true" />
          <span className="font-display text-[15px] shrink-0 text-ink">{now.status}</span>
          <span className="font-mono text-[12px] text-mid truncate">· {now.label}</span>
          <span className="ml-auto shrink-0 font-mono text-[11px] font-medium tabular-nums text-mid">Step {at + 1} of {steps.length}</span>
        </p>
        <ol className="pt-2 pb-2 -mb-2 grid grid-flow-col auto-cols-[minmax(max-content,1fr)] gap-1.5 max-[359px]:gap-1 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {steps.map((step, i) => {
            const on = i === at;
            const bar = i <= at ? "bg-oxblood" : "bg-line";
            const text = on || i < at ? "text-ink" : "text-mid";
            return (
              <li key={step.id} className="min-w-0">
                <a
                  href={`#${step.id}`}
                  aria-current={on ? "step" : undefined}
                  aria-label={`${step.status}: ${step.label}`}
                  onClick={(e) => { e.preventDefault(); goToStep(step.id); }}
                  className="hit block pt-1 pb-0.5"
                >
                  <span className={`block h-1.5 rounded-full transition-colors duration-300 ${bar}`} />
                  <span className={`block mt-1.5 font-mono text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.04em] max-[359px]:tracking-normal whitespace-nowrap ${text}`}>{step.status}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

// A status pill, like the one an app shows next to an order.
function Chip({ children, tone = "accent" }: { children: React.ReactNode; tone?: "accent" | "green" | "ink" }) {
  const tones = {
    accent: "bg-accent/10 text-accent-deep",
    green: "bg-green-600/10 text-green-700",
    ink: "bg-ink text-white",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.06em] ${tones[tone]}`} data-copy="row">
      <span className={`w-1.5 h-1.5 rounded-full ${tone === "green" ? "bg-green-600" : tone === "ink" ? "bg-white" : "bg-accent"}`} aria-hidden="true" />
      {children}
    </span>
  );
}

// The chip shows on the head only when the card below does not already carry its own status.
function SectionHead({ id, chip = true }: { id: StepId; chip?: boolean }) {
  const i = stepIds.indexOf(id);
  const step = steps[i];
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
      <div className="flex flex-col gap-1 min-w-0">
        <h2 className="text-[30px] md:text-[38px] leading-tight">{step.title}</h2>
      </div>
      {chip && <Chip>{step.chip}</Chip>}
      {lines[id] && <p className="basis-full text-[16px] leading-snug text-mid">{lines[id]}</p>}
    </div>
  );
}

// A label and value on one line, the way an order screen lists details.
function Row({ k, v, blank, strong }: { k: string; v: React.ReactNode; blank?: boolean; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5 border-t border-line first:border-t-0" data-copy="row">
      <dt className="text-[13px] leading-snug text-mid min-w-0">{k}</dt>
      <dd className={`m-0 shrink-0 max-w-[62%] text-[14px] sm:text-[15px] text-right leading-snug ${strong ? "font-extrabold" : "font-bold"} ${blank ? "text-mid tabular-nums" : ""}`}>{v}</dd>
    </div>
  );
}

/* ── 1 · Placed: order details ────────────────────────── */

// Bracket notes say what still goes here. They follow NEXT_PUBLIC_SHOW_NOTES (lib/notes.ts), like Todo.
const showBlanks = showNotes;

const orderRows: { k: string; v: string; blank?: boolean }[] = [
  { k: "Client", v: "Family-owned Thai restaurant, Utah" },
  { k: "One action", v: "Place an online takeout order" },
  { k: "Deliver to", v: "Nearby searchers at lunch, mostly on a phone" },
  { k: "Budget", v: "$200" },
  { k: "Order type", v: "Solo class project, run live" },
];

function OrderDetails() {
  return (
    <div className={`${card} px-4 sm:px-5 pt-4 pb-3`}>
      <div className="flex items-center justify-between gap-3 pb-3 border-b-2 border-ink" data-copy="row">
        <span className="text-[16px] font-extrabold tracking-[-0.01em]">Order #012726</span>
        <Chip>Placed · Jan 27</Chip>
      </div>
      <dl className="m-0">
        {orderRows.map((r) => <Row key={r.k} k={r.k} v={r.v} blank={r.blank} />)}
      </dl>
    </div>
  );
}

/* ── 2 · Confirmed: the menu ──────────────────────────── */

// `collapsed` shows the category and its count without its rows, so the step fits one screen.
type MenuGroup = { name: string; items: string[]; collapsed?: boolean };

// The three keyword categories. No per-keyword cost is on record, so every price slot is a blank.
const keywordGroups: MenuGroup[] = [
  { name: "Local intent", items: ["Thai near me", "Thai food near me"] },
  { name: "Brand", items: ["The restaurant’s own name"] },
  { name: "Competitor terms", items: ["Competitors’ names"], collapsed: true },
];

function Plus() {
  // Decorative, like an app's add button. There is no cart state to change.
  return (
    <span aria-hidden="true" className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 bg-white text-accent border-2 border-line text-[18px] font-bold leading-none">+</span>
  );
}

// The winning ad, shown the way a search result shows it: headline and description only.
// The restaurant stays anonymous, so its name (the ad headline) is left out; the description is the real ad copy.
// No display URL is on record, so none is shown.
function ChefsPick() {
  return (
    <div className={`${card} px-4 sm:px-5 py-3`}>
      <div className="flex items-center justify-between gap-3" data-copy="row">
        <span className={`${eyebrow} text-accent-deep`}>Chef’s pick</span>
        <Chip tone="ink">most ordered</Chip>
      </div>
      <div className="mt-2 rounded-xl border border-line bg-paper px-3 py-2.5 flex flex-col gap-1">
        <span className="text-[11px] font-bold text-ink" data-copy="row">Sponsored</span>
        <p className="text-[15px] leading-snug text-ink">Rushing back to the office? Skip the line and order Thai food online.</p>
      </div>
    </div>
  );
}

function Menu() {
  return (
    <div className={`${card} px-4 sm:px-5 py-2`}>
      {keywordGroups.map((g) => (
        <div key={g.name} className="py-3 border-t border-line first:border-t-0">
          <div className={`flex items-center justify-between gap-3 ${g.collapsed ? "" : "pb-2 border-b border-line/70"}`} data-copy="row">
            <h3 className="text-[17px] font-extrabold tracking-[-0.02em]">{g.name}</h3>
            <span className="text-[11px] font-bold tabular-nums text-mid rounded-full bg-mist px-2 py-0.5">
              {g.items.length} {g.items.length === 1 ? "item" : "items"}
            </span>
          </div>
          {!g.collapsed && <ul>
            {g.items.map((it) => (
              <li key={it} className="flex items-center gap-3 py-2.5 border-t border-line/60 first:border-t-0" data-copy="row">
                <span className="flex-1 min-w-0 text-[15px] font-extrabold leading-snug">{it}</span>
                {showBlanks && <span className="text-[12px] font-medium text-ink shrink-0">[cost per click, pending]</span>}
                <Plus />
              </li>
            ))}
          </ul>}
        </div>
      ))}
    </div>
  );
}

/* ── 3 · Preparing: the kitchen ticket ────────────────── */

const ticket = [
  { qty: "12+", item: "Headlines", detail: "name pinned 1st · benefit, location, action, specificity" },
  { qty: "4", item: "Descriptions", detail: "lunch, family, local proof, quality" },
  { qty: "3", item: "Sitelinks", detail: "ordering, full menu, contact" },
];

function KitchenTicket() {
  return (
    <div className={`${card} ${s.mono} px-4 sm:px-6 pt-5 pb-5`}>
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-dashed border-ink" data-copy="row">
        <span className="text-[13px] font-bold uppercase tracking-[0.08em]">Ticket #012726</span>
        <span className={s.app}><Chip>Preparing · 1 month</Chip></span>
      </div>
      <ul className="py-1">
        {ticket.map((t) => (
          <li key={t.item} className="grid grid-cols-[2.75rem_1fr] gap-x-2 py-2.5 border-t border-dashed border-line first:border-t-0" data-copy="row">
            <span className="text-[15px] font-bold tabular-nums text-accent-deep">{t.qty}</span>
            <span className="flex flex-col min-w-0">
              <span className="text-[15px] font-bold uppercase tracking-[0.02em]">{t.item}</span>
              <span className="text-[12px] leading-snug text-mid">{t.detail}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-2 rounded-lg border border-dashed border-grey/70 bg-paper px-3 py-3">
        <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-mid" data-copy="row">Note to kitchen</span>
        <p className="mt-1 text-[14px] font-bold leading-snug">Specificity over warmth. Lunch over dinner. Action over atmosphere.</p>
      </div>
    </div>
  );
}

/* ── 4 · On its way: one driver update ────────────────── */

const updateRows = [
  { k: "Lunch urgency description", v: "most clicks and conversions" },
  { k: "“View Our Full Menu” sitelink", v: "24% click rate, the best of any ad piece" },
  { k: "“There’s Something for Everyone”", v: "11 impressions · 0 clicks" },
];

function DriverUpdate() {
  return (
    <div className={`${card} px-4 sm:px-5 py-4`}>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1" data-copy="row">
        <span className={`${eyebrow} text-accent-deep`}>Driver update</span>
        <span className="text-[12px] font-bold tabular-nums text-mid">Mar 3 · at close</span>
      </div>
      <p className="mt-1.5 text-[18px] font-extrabold tracking-[-0.02em] leading-snug">Specific copy got the clicks. Generic warmth got ignored.</p>
      <dl className="mt-2 m-0">
        {updateRows.map((r) => <Row key={r.k} k={r.k} v={r.v} />)}
      </dl>
    </div>
  );
}

/* ── 5 · Delivered: the receipt ───────────────────────── */

const receiptLines = [
  { label: "Impressions", value: "2,000+" },
  { label: "Clicks", value: "109" },
  { label: "Click-through rate", value: "5.6%" },
  { label: "Avg. cost per click", value: "$2.21" },
  { label: "Mobile traffic", value: "61%" },
];


function Receipt({ tools }: { tools: string[] }) {
  return (
    <div className="drop-shadow-[0_8px_18px_rgba(27,22,20,0.1)]">
      <div className={`${s.receipt} ${s.app} bg-white rounded-t-2xl px-5 sm:px-7 pt-5`}>
        <div className="text-center flex flex-col items-center gap-1" data-copy="receipt">
          <span className="text-[20px] font-extrabold tracking-[-0.02em]">Thai takeout campaign</span>
          <span className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[12px] text-mid">
            Jan 27 to Mar 3, 2026 <Chip tone="green">delivered</Chip>
          </span>
        </div>

        <dl className="mt-4 m-0 border-t border-dashed border-grey/70 pt-1.5 font-mono">
          {receiptLines.map((l) => (
            <div key={l.label} className="flex items-baseline justify-between gap-4 py-1.5" data-copy="receipt">
              <dt className="text-[13px] text-mid">{l.label}</dt>
              <dd className="m-0 text-[15px] font-bold tabular-nums">{l.value}</dd>
            </div>
          ))}
          <div className="flex items-baseline justify-between gap-4 mt-1.5 pt-2.5 border-t-2 border-ink" data-copy="receipt">
            <dt className={`${s.app} text-[15px] font-extrabold uppercase tracking-[0.04em]`}>Total conversions</dt>
            <dd className={`${s.app} m-0 text-[30px] font-extrabold tracking-[-0.03em] tabular-nums text-accent`}>73</dd>
          </div>
        </dl>

        <div className="mt-4 border-t border-dashed border-grey/70 pt-3 flex flex-wrap items-center gap-x-3 gap-y-2" data-copy="receipt">
          <h3 className={`${eyebrow} text-mid`}>prepared with</h3>
          <div className="flex flex-wrap gap-1.5">
            {tools.map((t) => <span key={t} className="text-[12px] font-bold border border-line rounded-full px-2.5 py-1">{t}</span>)}
          </div>
        </div>

        <div className="h-4" />
      </div>
    </div>
  );
}

/* ── The page ─────────────────────────────────────────── */

export function ThaiGoogleAdsCase() {
  const item = work.find((w) => w.slug === SLUG);
  const tools = item?.caseStudy?.tools ?? item?.tools ?? [];
  const wrap = "mx-auto max-w-[720px] px-4";
  const section = "pt-6 pb-8 md:pt-8 md:pb-10 scroll-mt-20";

  return (
    <>
      <CaseProgress />
      <TrackView event="case_view_thai-google-ads" />
      <OrderStatus />

      {/* ═══ The restaurant card ═══ */}
      <div className={`${wrap} pt-4 md:pt-6`} data-case-copy>
        <div className={`${card} overflow-hidden`}>
          <div className={`${s.cover} relative h-[112px] md:h-[136px]`} data-copy="row">
            <span className="absolute left-4 top-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.08em] bg-green-600/20 text-green-400 rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" aria-hidden="true" />delivered
            </span>
            <span className="absolute right-4 top-4 text-[12px] font-bold text-white/40">order #012726</span>
          </div>

          <div className="relative px-4 sm:px-6 pb-6">
            {/* Store avatar, overlapping the cover like an app's logo tile. */}
            <span className="-mt-8 mb-3 flex items-center justify-center w-16 h-16 rounded-2xl bg-accent text-white border-4 border-white shadow-sm" aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 15h24a12 12 0 0 1-24 0Z" /><path d="M11 27h10" /><path d="M14 11 24 3" /><path d="M18 11l9-6" />
              </svg>
            </span>

            <h1 className="flex flex-col gap-0.5">
              <span className="text-[32px] md:text-[44px] font-normal tracking-[-0.01em] leading-[1.05]">A local Thai restaurant</span>
              <span className={`${s.app} text-[15px] md:text-[16px] font-bold text-mid`}>Utah · Google Search ads · a family-owned restaurant</span>
            </h1>

            {/* A text link, not a button: it jumps to the receipt at the end. */}
            <a
              href="#result"
              onClick={(e) => { e.preventDefault(); goToStep("result"); }}
              className="hit mt-4 self-start inline-flex items-center gap-1.5 font-mono text-[13px] font-medium lowercase tracking-[0.02em] border-b-2 border-accent hover:text-accent-deep"
            >
              skip to the receipt <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>

      <article className={wrap}>
        <div data-case-copy>
          {/* ═══ 1 · Placed: order details ═══ */}
          <section id="brief" className={section}>
            <SectionHead id="brief" chip={false} />
            <OrderDetails />
          </section>

          {/* ═══ 2 · Confirmed: the menu ═══ */}
          <section id="menu" className={section}>
            <SectionHead id="menu" chip={false} />
            <div className="flex flex-col gap-3">
              <ChefsPick />
              <Menu />
            </div>
          </section>

          {/* ═══ 3 · Preparing: the kitchen ticket ═══ */}
          <section id="built" className={section}>
            <SectionHead id="built" chip={false} />
            <KitchenTicket />
          </section>

          {/* ═══ 4 · On its way: one driver update ═══ */}
          <section id="worked" className={section}>
            <SectionHead id="worked" chip={false} />
            <DriverUpdate />
          </section>

          {/* ═══ 5 · Delivered: the receipt ═══ */}
          <section id="result" className={section}>
            <SectionHead id="result" chip={false} />
            <Receipt tools={tools} />
          </section>
        </div>

        <div className="pt-4 pb-10 md:pb-12">
          <CaseCtaRow slug={SLUG} />
        </div>
      </article>
    </>
  );
}
