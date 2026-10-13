"use client";

import Image from "next/image";
import Link from "next/link";
import { CaseProgress, useActiveSection, goToStep } from "./CaseProgress";
import { TrackView } from "./Track";
import { nextWork } from "./CaseStudyTemplate";
import { work, linkFor } from "@/lib/work";
import s from "./ThaiGoogleAdsCase.module.css";

// This case study reads as one takeout order, start to finish, in the patterns a delivery app uses:
// the store page, the cart (the brief), the menu (keywords and ads), the kitchen ticket (the build),
// the driver on the way (what I watched), and the receipt with a tip screen (the results).
// Patterns only: no app's name, logo, or colors. The page keeps the site's palette and faces.
// Privacy: the restaurant stays anonymous. Never its name, never its town.
// data-copy marks row labels, row values, and receipt lines, so a word count of body copy can skip them.

const SLUG = "thai-google-ads";
const shadow = "shadow-[0_1px_2px_rgba(27,22,20,0.06),0_8px_24px_rgba(27,22,20,0.07)]";
const card = `bg-card rounded-2xl ${shadow}`;
const eyebrow = "font-mono text-[11px] font-medium uppercase tracking-[0.1em]";

/* ── The tracker: five steps, each label is its section's heading ── */

const steps = [
  { id: "brief", label: "Order placed", tag: "the brief" },
  { id: "menu", label: "Menu", tag: "keywords + ads" },
  { id: "kitchen", label: "Kitchen", tag: "the build" },
  { id: "on-its-way", label: "On its way", tag: "what I watched" },
  { id: "result", label: "Delivered", tag: "the results" },
] as const;

type StepId = (typeof steps)[number]["id"];
const stepIds: string[] = steps.map((x) => x.id);

function OrderStatus() {
  const active = useActiveSection(stepIds);
  const at = Math.max(0, stepIds.indexOf(active));
  const delivered = at === steps.length - 1;
  const now = steps[at];
  return (
    <nav aria-label="Order status: parts of this case study" className="sticky top-0 z-40 bg-paper/95 backdrop-blur-sm border-b border-line">
      <div className="mx-auto max-w-[720px] px-4 pt-2.5 pb-2">
        <p className="flex items-center gap-2 text-[13px] leading-tight min-w-0" aria-live="polite">
          <span className={`w-2 h-2 rounded-full shrink-0 bg-oxblood ${delivered ? "" : s.live}`} aria-hidden="true" />
          <span className="font-display text-[15px] shrink-0 text-ink">{now.label}</span>
          <span className="font-mono text-[12px] text-mid truncate">· {now.tag}</span>
          <span className="ml-auto shrink-0 font-mono text-[11px] font-medium tabular-nums text-mid">{at + 1} of {steps.length}</span>
        </p>
        <ol className="pt-2 grid grid-cols-5 gap-1.5 max-[359px]:gap-1">
          {steps.map((step, i) => {
            const on = i === at;
            const bar = i <= at ? "bg-oxblood" : "bg-line";
            return (
              <li key={step.id} className="min-w-0">
                <a
                  href={`#${step.id}`}
                  aria-current={on ? "step" : undefined}
                  aria-label={`${step.label}: ${step.tag}`}
                  onClick={(e) => { e.preventDefault(); goToStep(step.id); }}
                  className="hit block pt-1 pb-0.5"
                >
                  <span className={`block h-1.5 rounded-full transition-colors duration-300 ${bar}`} />
                  <span className={`block mt-1.5 font-mono text-[9px] sm:text-[11px] font-medium uppercase leading-tight tracking-[0.02em] sm:tracking-[0.04em] ${on || i < at ? "text-ink" : "text-mid/60"}`}>{step.label}</span>
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
function Chip({ children, tone = "accent" }: { children: React.ReactNode; tone?: "accent" | "khaki" | "ink" }) {
  const tones = {
    accent: "bg-oxblood/10 text-accent-deep",
    khaki: "bg-khaki/30 text-olive",
    ink: "bg-ink text-cream",
  };
  const dot = { accent: "bg-oxblood", khaki: "bg-olive", ink: "bg-cream" };
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.06em] ${tones[tone]}`} data-copy="row">
      <span className={`w-1.5 h-1.5 rounded-full ${dot[tone]}`} aria-hidden="true" />
      {children}
    </span>
  );
}

// The heading is the tracker label. The tiny mono tag beside it says which part of the marketing work this is.
// No sentence under any heading: the cards carry the story.
function SectionHead({ id }: { id: StepId }) {
  const step = steps[stepIds.indexOf(id)];
  return (
    <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <h2 className="text-[30px] md:text-[38px] leading-tight">{step.label}</h2>
      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-accent-deep" data-copy="row">{step.tag}</span>
    </div>
  );
}

// A label and value on one line, the way an order screen lists details.
function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5 border-t border-line first:border-t-0" data-copy="row">
      <dt className="font-mono text-[11px] uppercase tracking-[0.04em] leading-snug text-mid min-w-0">{k}</dt>
      <dd className="m-0 max-w-[64%] text-[15px] font-bold text-right leading-snug">{v}</dd>
    </div>
  );
}

/* ── The store page ───────────────────────────────────── */

function BowlIcon({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 15h24a12 12 0 0 1-24 0Z" /><path d="M11 27h10" /><path d="M14 11 24 3" /><path d="M18 11l9-6" />
    </svg>
  );
}

// The banner is Angel's Canva image at public/images/case/thai-google-ads/banner.jpg (2400x888): food on the right,
// empty wood on the left, so it anchors right and the wash darkens the left and top.
// The route passes its path only when the file exists; until then the dark dotted cover shows on its own.
function StoreHeader({ banner }: { banner?: string }) {
  return (
    <div className={`${card} overflow-hidden`}>
      <div className={`${s.cover} relative h-[150px] md:h-[210px]`} data-copy="row">
        {banner && (
          <>
            <Image
              src={banner}
              alt="Thai takeout on a wooden table: pad thai in a kraft box, green curry, spring rolls, chilies, and fresh basil"
              fill
              priority
              sizes="(min-width: 752px) 720px, 100vw"
              className="object-cover object-[right_center]"
            />
            {/* A soft dark wash so the chip and order number stay legible on the photo. */}
            <span className={`absolute inset-0 ${s.wash}`} aria-hidden="true" />
          </>
        )}
        <span className="absolute left-4 top-4 flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.08em] bg-cream text-ink rounded-full px-3 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-oxblood" aria-hidden="true" />delivered
        </span>
        <span className="absolute right-4 top-4 font-mono text-[11px] text-cream bg-ink/55 rounded-full px-2.5 py-1">order #012726</span>
      </div>

      <div className="relative px-4 sm:px-6 pb-5">
        {/* Store avatar, overlapping the banner like an app's logo tile. */}
        <span className="-mt-8 mb-3 flex items-center justify-center w-16 h-16 rounded-2xl bg-oxblood text-cream border-4 border-card shadow-sm relative">
          <BowlIcon />
        </span>

        <h1 className="text-[32px] md:text-[44px] font-normal tracking-[-0.01em] leading-[1.05]">A local Thai restaurant</h1>
        <p className="mt-1.5 font-mono text-[12px] uppercase tracking-[0.06em] text-mid" data-copy="row">Thai · Takeout · Utah County</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          <Chip tone="khaki">Google Search ads</Chip>
          <Chip tone="khaki">Budget $250</Chip>
        </div>

        {/* A text link, not a button: it jumps to the receipt at the end. */}
        <a
          href="#result"
          onClick={(e) => { e.preventDefault(); goToStep("result"); }}
          className="hit mt-4 inline-flex items-center gap-1.5 font-mono text-[13px] font-medium lowercase tracking-[0.02em] border-b-2 border-accent hover:text-accent-deep"
        >
          skip to the receipt <span aria-hidden="true">↓</span>
        </a>
      </div>
    </div>
  );
}

/* ── 1 · Order placed: the cart ───────────────────────── */

const cartRows = [
  { k: "Goal", v: "Drive online takeout orders" },
  { k: "Who", v: "Hungry people nearby, mostly on a phone" },
  { k: "Counted as an order", v: "A call or an online order" },
  { k: "Budget", v: "$250, then raised with the owner’s OK" },
  { k: "Order type", v: "Solo class project, run live" },
];

function Cart() {
  return (
    <div className={`${card} px-4 sm:px-5 pt-4 pb-3`}>
      <div className="flex items-center justify-between gap-3 pb-3 border-b-2 border-ink" data-copy="row">
        <span className="flex items-center gap-2 text-[17px] font-bold">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-oxblood text-cream" aria-hidden="true"><BowlIcon size={16} /></span>
          Your order
        </span>
        <Chip>Placed · Jan 27</Chip>
      </div>
      <dl className="m-0">
        {cartRows.map((r) => <Row key={r.k} k={r.k} v={r.v} />)}
      </dl>
    </div>
  );
}

/* ── 2 · Menu: keywords as menu items, plus the ad ────── */

type Dish = { kw: string; clicks: number; orders: number; cost: string; badge?: string; note?: string };

// Clicks, orders (calls and online orders), and cost per keyword, from the campaign report.
const dishes: Dish[] = [
  { kw: "gluten free takeout near me", clicks: 29, orders: 7, cost: "$72.90", badge: "#1 most ordered" },
  { kw: "thai food near me", clicks: 78, orders: 3, cost: "$60.25", badge: "most clicked", note: "8.43% click rate" },
  { kw: "pad thai near me", clicks: 13, orders: 3, cost: "$20.15" },
  { kw: "pad thai noodles near me", clicks: 3, orders: 3, cost: "$8.96" },
];

// The keywords that spent without a single order: $33.14 + $11.49 + $9.08.
const soldOut = [
  { kw: "takeout near me", clicks: 23, cost: "$33.14" },
  { kw: "thai cuisine", clicks: 13, cost: "$11.49" },
  { kw: "thai places near me", clicks: 10, cost: "$9.08" },
];

function Plus() {
  // Decorative, like an app's add button. There is no cart state to change.
  return (
    <span aria-hidden="true" className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 bg-card text-oxblood border-2 border-line text-[18px] font-bold leading-none">+</span>
  );
}

// The winning ad, shown the way a search result shows it: description only.
// The restaurant stays anonymous, so its name (the ad headline) is left out. The description is the real ad copy.
function ChefsPick() {
  return (
    <div className={`${card} ${s.app} px-4 sm:px-5 py-3`}>
      <div className="flex items-center justify-between gap-3" data-copy="row">
        <span className={`${eyebrow} text-accent-deep`}>Chef’s pick</span>
        <Chip tone="ink">top ad copy</Chip>
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
      <div className="flex items-center justify-between gap-3 py-3 border-b border-line" data-copy="row">
        <h3 className="text-[19px] font-display font-normal">Keywords</h3>
        <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-mid">clicks · orders · spent</span>
      </div>
      <ul>
        {dishes.map((d) => (
          <li key={d.kw} className="flex items-center gap-3 py-3 border-t border-line/70 first:border-t-0" data-copy="row">
            <span className="flex-1 min-w-0 flex flex-col gap-1">
              {d.badge && <span className="self-start rounded-md bg-oxblood text-cream px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em]">{d.badge}</span>}
              <span className="text-[16px] font-bold leading-snug">“{d.kw}”</span>
              <span className="font-mono text-[11px] text-mid tabular-nums">
                {d.clicks} clicks · {d.orders} orders{d.note ? ` · ${d.note}` : ""}
              </span>
            </span>
            <span className="shrink-0 text-[15px] font-bold tabular-nums">{d.cost}</span>
            <Plus />
          </li>
        ))}
      </ul>

      {/* Greyed out, the way an app shows what it cannot sell. */}
      <div className="mt-1 py-3 border-t-2 border-dashed border-line" data-copy="row">
        <span className="inline-block rounded-md bg-line px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] text-ink">Sold out</span>
        <ul className="mt-2 opacity-55">
          {soldOut.map((d) => (
            <li key={d.kw} className="flex items-baseline justify-between gap-3 py-1.5">
              <span className="text-[15px] leading-snug line-through decoration-1">“{d.kw}”</span>
              <span className="shrink-0 font-mono text-[11px] tabular-nums">{d.clicks} clicks · {d.cost}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── 3 · Kitchen: the ticket ──────────────────────────── */

const ticket = [
  { item: "Search", detail: "someone nearby types “thai food near me”" },
  { item: "Ad", detail: "12+ headlines, 4 descriptions, 3 sitelinks" },
  { item: "Ordering page", detail: "every ad goes straight to online ordering" },
  { item: "Call or order", detail: "the only thing I counted" },
];

function KitchenTicket() {
  return (
    <div className={`${card} ${s.mono} px-4 sm:px-6 pt-5 pb-5`}>
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-dashed border-ink" data-copy="row">
        <span className="text-[13px] font-bold uppercase tracking-[0.08em]">Ticket #012726</span>
        <Chip>Preparing</Chip>
      </div>
      <ol className="py-1">
        {ticket.map((t, i) => (
          <li key={t.item} className="grid grid-cols-[2rem_1fr] gap-x-2 py-2.5 border-t border-dashed border-line first:border-t-0" data-copy="row">
            <span className="text-[15px] font-bold tabular-nums text-accent-deep">{i + 1}</span>
            <span className="flex flex-col min-w-0">
              <span className="text-[15px] font-bold uppercase tracking-[0.02em]">{t.item}{i < ticket.length - 1 && <span className="text-accent-deep" aria-hidden="true"> →</span>}</span>
              <span className="text-[12px] leading-snug text-mid">{t.detail}</span>
            </span>
          </li>
        ))}
      </ol>
      <div className="mt-2 rounded-lg border border-dashed border-grey/70 bg-paper px-3 py-3">
        <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-mid" data-copy="row">Note to kitchen</span>
        <p className="mt-1 text-[14px] font-bold leading-snug">Specificity over warmth. Lunch over dinner. Action over atmosphere.</p>
      </div>
    </div>
  );
}

/* ── 4 · On its way: the driver card and its updates ──── */

// An abstract map: blocks, streets, a route, a car, and a pin. No real place is drawn.
function RouteMap() {
  return (
    <svg viewBox="0 0 320 170" className="block w-full h-auto" role="img" aria-label="A drawn map: the route ends at a pin in the restaurant’s home town, with nearby towns at the edges.">
      <rect width="320" height="170" className="fill-mist" />
      {/* blocks */}
      <g className="fill-paper">
        <rect x="8" y="8" width="24" height="68" rx="3" /><rect x="50" y="8" width="102" height="68" rx="3" />
        <rect x="188" y="8" width="124" height="28" rx="3" /><rect x="50" y="96" width="102" height="66" rx="3" />
        <rect x="188" y="56" width="124" height="106" rx="3" /><rect x="8" y="96" width="24" height="66" rx="3" />
      </g>
      {/* nearby towns at the edges */}
      <g className="stroke-olive" fill="none" strokeDasharray="3 4" strokeWidth="1.2" opacity="0.6">
        <circle cx="300" cy="150" r="30" /><circle cx="14" cy="14" r="26" />
      </g>
      <g className="fill-olive font-mono" fontSize="8" letterSpacing="0.5" opacity="0.8">
        <text x="252" y="164">NEARBY</text><text x="4" y="48">NEARBY</text>
      </g>
      {/* home town */}
      <circle cx="262" cy="46" r="38" className="fill-khaki/30 stroke-khaki" strokeWidth="1.5" />
      <text x="230" y="98" className="fill-olive font-mono" fontSize="8" letterSpacing="0.5">HOME TOWN</text>
      {/* route */}
      <path d="M41 130V86H170V46H250" fill="none" className="stroke-oxblood" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {/* restaurant */}
      <rect x="31" y="124" width="20" height="20" rx="5" className="fill-oxblood" />
      <path d="M35 132h12a6 6 0 0 1-12 0Z" fill="none" className="stroke-cream" strokeWidth="1.6" />
      {/* pin */}
      <g transform="translate(262 46)">
        <path d="M0 2C-9-8-11-12-11-17a11 11 0 0 1 22 0c0 5-2 9-11 19Z" className="fill-ink" />
        <path d="M-5-16l5-5 5 5v6h-10Z" className="fill-cream" />
      </g>
      {/* the car, moving along the route */}
      <g className={s.car}>
        <circle r="9" className="fill-ink" />
        <path d="M-5.5 2v-2.5l1.5-3.5h8l1.5 3.5V2Z" className="fill-cream" />
        <circle cx="-3" cy="2.5" r="1.4" className="fill-ink stroke-cream" strokeWidth="0.8" />
        <circle cx="3" cy="2.5" r="1.4" className="fill-ink stroke-cream" strokeWidth="0.8" />
      </g>
    </svg>
  );
}

const towns = [
  { k: "Home town", v: "27 of 29 orders · $234.52" },
  { k: "Nearby towns", v: "2 orders" },
  { k: "Three other towns", v: "$52.98" },
];

function DriverCard() {
  return (
    <div className={`${card} overflow-hidden sm:grid sm:grid-cols-[1.1fr_1fr]`}>
      <div className="border-b border-line sm:border-b-0 sm:border-r sm:bg-mist sm:flex sm:items-center">
        <RouteMap />
      </div>
      <div className="px-4 sm:px-5 pt-3.5 pb-2 sm:py-4">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1" data-copy="row">
          <span className={`${eyebrow} text-accent-deep`}>Where the orders came from</span>
          <span className="font-mono text-[11px] tabular-nums text-mid">Jan 27 to Mar 3</span>
        </div>
        <p className="mt-1.5 text-[19px] font-bold leading-snug">Most orders came from the restaurant’s home town</p>
        <dl className="mt-2 m-0">
          {towns.map((r) => <Row key={r.k} k={r.k} v={r.v} />)}
        </dl>
      </div>
    </div>
  );
}

const assetRows = [
  { k: "“View Our Full Menu” sitelink", v: "24% click rate" },
  { k: "“From Our Kitchen to Yours”", v: "51 impressions · 2 clicks" },
  { k: "“There’s Something for Everyone”", v: "11 impressions · 0 clicks" },
];

// Styled like a phone notification: an icon tile, a source line, a time, then the message.
function Notification({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className={`${card} px-4 py-3.5 flex gap-3`}>
      <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-oxblood text-cream shrink-0" aria-hidden="true"><BowlIcon size={18} /></span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3" data-copy="row">
          <span className={`${eyebrow} text-mid`}>Driver update</span>
          <span className="font-mono text-[11px] text-mid">Mar 3</span>
        </div>
        <p className="mt-0.5 text-[16px] font-bold leading-snug">{title}</p>
        {children}
      </div>
    </div>
  );
}

/* ── 5 · Delivered: the receipt and the tip screen ────── */

const receiptLines = [
  { label: "Impressions", value: "7,600" },
  { label: "Clicks", value: "230" },
  { label: "Click rate", value: "3.03%" },
  { label: "Avg cost per click", value: "$1.35", note: "$310.10 ÷ 230 clicks" },
  { label: "Calls and orders", value: "29" },
];

function Receipt({ tools }: { tools: string[] }) {
  return (
    <div className="drop-shadow-[0_8px_18px_rgba(27,22,20,0.1)]">
      <div className={`${s.receipt} ${s.app} bg-card rounded-t-2xl px-5 sm:px-7 pt-5`}>
        <div className="text-center flex flex-col items-center gap-1" data-copy="receipt">
          <span className="text-[20px] font-extrabold tracking-[-0.02em]">Thai takeout campaign</span>
          <span className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[12px] text-mid">
            Jan 27 to Mar 3, 2026 <Chip tone="khaki">delivered</Chip>
          </span>
        </div>

        <dl className="mt-4 m-0 border-t border-dashed border-grey/70 pt-1.5 font-mono">
          {receiptLines.map((l) => (
            <div key={l.label} className="flex items-baseline justify-between gap-4 py-1.5" data-copy="receipt">
              <dt className="text-[13px] text-mid">
                {l.label}
                {l.note && <span className="block text-[11px] opacity-70">{l.note}</span>}
              </dt>
              <dd className="m-0 text-[15px] font-bold tabular-nums">{l.value}</dd>
            </div>
          ))}
          <div className="mt-1.5 pt-2.5 border-t-2 border-ink" data-copy="receipt">
            <div className="flex items-baseline justify-between gap-4">
              <dt className={`${s.app} text-[15px] font-extrabold uppercase tracking-[0.04em]`}>Total spent</dt>
              <dd className={`${s.app} m-0 text-[30px] font-extrabold tracking-[-0.03em] tabular-nums text-oxblood`}>$310.10</dd>
            </div>
            <p className="text-[11px] text-mid">Budget $250, raised with the owner’s OK</p>
          </div>
        </dl>

        <div className="mt-4 border-t border-dashed border-grey/70 pt-3 flex flex-wrap items-center gap-x-3 gap-y-2" data-copy="receipt">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.1em] text-mid">prepared with</h3>
          <div className="flex flex-wrap gap-1.5">
            {tools.map((t) => <span key={t} className="text-[12px] font-bold border border-line rounded-full px-2.5 py-1">{t}</span>)}
          </div>
        </div>

        <div className="h-4" />
      </div>
    </div>
  );
}

const tips = [
  { head: "Give gluten-free its own ad.", body: "It brought 7 of 29 orders, but only 1.36% of people who saw the ad clicked it." },
  { head: "Tighten match types and add negatives.", body: "Broad match pulled in searches for other cuisines and other restaurants. Use phrase and exact for the core terms." },
  { head: "Shrink the radius to takeout distance.", body: "27 of 29 orders came from the home town." },
  { head: "Track completed orders, then scale.", body: "Orders cost $10.69 each. If an average order is worth more, raise the budget and run longer." },
];

// Laid out like the tip screen after a delivery: rows that look like choices.
function TipScreen() {
  return (
    <div className={`${card} px-4 sm:px-5 pt-4 pb-4`}>
      <h3 className="text-[22px] font-display font-normal leading-tight">Tip for next time</h3>
      <ul className="mt-3 flex flex-col gap-2">
        {tips.map((t, i) => (
          <li key={t.head} className="flex items-start gap-3 rounded-xl border-2 border-line bg-paper px-3.5 py-3">
            <span className="mt-0.5 flex items-center justify-center w-6 h-6 rounded-full border-2 border-oxblood font-mono text-[11px] text-oxblood shrink-0" aria-hidden="true">{i + 1}</span>
            <p className="text-[15px] leading-snug"><span className="font-bold">{t.head}</span> {t.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// The next case study, styled as a reorder button.
function Reorder() {
  const next = nextWork(SLUG);
  const href = next ? linkFor(next) : undefined;
  const cls = "flex items-center justify-between gap-4 rounded-2xl bg-oxblood text-cream px-5 py-4 hover:bg-accent-deep transition-colors";
  const inner = next && (
    <>
      <span className="flex flex-col gap-1 min-w-0">
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-cream/80">Reorder · up next</span>
        <span className="text-[20px] font-display leading-tight">{next.title}</span>
      </span>
      <span className="font-mono text-[18px] shrink-0" aria-hidden="true">→</span>
    </>
  );
  return (
    <section className="flex flex-col gap-3 pt-6">
      {next && href && (href.startsWith("http")
        ? <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
        : <Link href={href} className={cls}>{inner}</Link>)}
      <Link href="/work" className="hit self-start mt-2 font-mono text-[13px] font-medium tracking-[0.02em] border-b-2 border-accent hover:text-accent-deep">all the work →</Link>
    </section>
  );
}

/* ── The page ─────────────────────────────────────────── */

export function ThaiGoogleAdsCase({ banner }: { banner?: string }) {
  const item = work.find((w) => w.slug === SLUG);
  const tools = item?.caseStudy?.tools ?? item?.tools ?? [];
  const wrap = "mx-auto max-w-[720px] px-4";
  const section = "pt-6 pb-8 md:pt-8 md:pb-10 scroll-mt-24";

  return (
    <>
      <CaseProgress />
      <TrackView event="case_view_thai-google-ads" />
      <OrderStatus />

      <div className={`${wrap} pt-4 md:pt-6`} data-case-copy>
        <StoreHeader banner={banner} />
      </div>

      <article className={wrap}>
        <div data-case-copy>
          <section id="brief" className={section}>
            <SectionHead id="brief" />
            <Cart />
          </section>

          <section id="menu" className={section}>
            <SectionHead id="menu" />
            <div className="flex flex-col gap-3">
              <ChefsPick />
              <Menu />
            </div>
          </section>

          <section id="kitchen" className={section}>
            <SectionHead id="kitchen" />
            <KitchenTicket />
          </section>

          <section id="on-its-way" className={section}>
            <SectionHead id="on-its-way" />
            <div className="flex flex-col gap-3">
              <DriverCard />
              <Notification title="Specific copy got the clicks. Generic warmth got ignored.">
                <dl className="mt-1.5 m-0">
                  {assetRows.map((r) => (
                    <div key={r.k} className="flex flex-wrap items-baseline justify-between gap-x-3 py-2 border-t border-line first:border-t-0" data-copy="row">
                      <dt className="text-[14px] leading-snug text-mid">{r.k}</dt>
                      <dd className="m-0 text-[14px] font-bold leading-snug tabular-nums">{r.v}</dd>
                    </div>
                  ))}
                </dl>
              </Notification>
              <Notification title="Searches for the restaurant’s name clicked at 35.71%">
                <p className="mt-1 text-[14px] leading-snug text-mid">The highest click rate of any search. Competitors’ names showed up too.</p>
              </Notification>
            </div>
          </section>

          <section id="result" className={section}>
            <SectionHead id="result" />
            <div className="flex flex-col gap-4">
              <Receipt tools={tools} />
              <TipScreen />
            </div>
          </section>
        </div>

        <div className="pb-10 md:pb-12">
          <Reorder />
        </div>
      </article>
    </>
  );
}
