"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CaseProgress, useActiveSection, goToStep } from "./CaseProgress";
import { TrackView } from "./Track";
import { nextWork } from "./CaseStudyTemplate";
import { work, linkFor } from "@/lib/work";
import s from "./ThaiGoogleAdsCase.module.css";

// This case study reads as one takeout order, start to finish, in the patterns a delivery app uses:
// the store page, the cart (the brief), the menu (keywords and ads), the kitchen ticket (the build),
// the driver on the way (what I watched), and the receipt with its tip lines (the results and what to do next).
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

// The receipt prints out of a small thermal printer. At rest (no JS, before hydration, reduced motion, a screenshot
// tool that never scrolls) the receipt is fully out and readable. A client effect tucks it into the slot only once
// the printer is about to scroll into view. Tapping the printer feeds it out with the printer sound (sound needs a
// tap, so this is the only way to hear it). If nobody taps within a few seconds of seeing it, it prints on its own,
// silently, so the results are never left hidden.
type Feed = "rest" | "armed" | "printing" | "done";

// The feed animation's length and its line count, from .printing and @keyframes feed in the module CSS.
const FEED_SECONDS = 3.2;
const FEED_LINES = 14;

// A thermal receipt printer, synthesized with Web Audio: no audio file, nothing to license.
// The sound of a POS printer is its stepper motor: a buzzy, pitched whine in short line bursts ("bzzt-bzzt-bzzzzt"),
// then the auto-cutter's "chk". Each burst is a square wave chopped by a faster square (the motor's steps), through a
// bandpass, with a little paper-friction noise under it. Bursts line up with the paper's line steps in @keyframes feed;
// the line that brings TOTAL SPENT out runs a little longer. Browsers block sound without a user action, so this only
// runs from the button (the automatic print on scroll stays silent).
// sound:start and sound:end mark this block so it can be rendered offline (OfflineAudioContext) for a waveform check.
function scheduleReceiptSound(ctx: BaseAudioContext, dest: AudioNode, t0: number, seconds: number, lines: number) {
  const bus = ctx.createDynamicsCompressor();
  bus.threshold.value = -16;
  bus.knee.value = 6;
  bus.ratio.value = 8;
  bus.attack.value = 0.002;
  bus.release.value = 0.06;
  const master = ctx.createGain();
  master.gain.value = 0.12;
  bus.connect(master).connect(dest);

  const noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const data = noise.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

  // A gain that clicks on and off in 5ms, holding in between.
  const envelope = (at: number, len: number, level: number) => {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, at);
    g.gain.linearRampToValueAtTime(level, at + 0.005);
    g.gain.setValueAtTime(level, at + len - 0.005);
    g.gain.linearRampToValueAtTime(0, at + len);
    return g;
  };

  // One printed line: the motor whine, chopped by its steps, plus paper friction.
  const pitch = 820 + Math.random() * 160;
  const stepRate = 200 + Math.random() * 40;
  const line = (at: number, len: number) => {
    const tone = ctx.createOscillator();
    tone.type = "square";
    tone.frequency.value = pitch * (0.95 + Math.random() * 0.1);
    const chop = ctx.createGain();
    chop.gain.value = 0.5;
    const steps = ctx.createOscillator();
    steps.type = "square";
    steps.frequency.value = stepRate * (0.93 + Math.random() * 0.14);
    const depth = ctx.createGain();
    depth.gain.value = 0.5;
    steps.connect(depth).connect(chop.gain);
    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = 2200;
    band.Q.value = 1.6;
    tone.connect(chop).connect(band).connect(envelope(at, len, 0.9)).connect(bus);

    const paper = ctx.createBufferSource();
    paper.buffer = noise;
    const hiss = ctx.createBiquadFilter();
    hiss.type = "bandpass";
    hiss.frequency.value = 4000;
    hiss.Q.value = 0.8;
    paper.connect(hiss).connect(envelope(at, len, 0.12)).connect(bus);

    for (const src of [tone, steps]) { src.start(at); src.stop(at + len + 0.01); }
    paper.start(at, Math.random() * 0.8, len + 0.01);
  };

  const per = (seconds * 0.94) / lines;
  const totalLine = Math.round(lines * 0.45);
  for (let i = 0; i < lines; i++) {
    const at = t0 + i * per;
    const gap = i === totalLine ? 0.012 : 0.03 + Math.random() * 0.04;
    line(at, per - gap);
  }

  // The auto-cutter: a bright "ch" of noise, then a low "k" thunk.
  const end = t0 + lines * per + 0.08;
  const cut = ctx.createBufferSource();
  cut.buffer = noise;
  const high = ctx.createBiquadFilter();
  high.type = "highpass";
  high.frequency.value = 2000;
  const cutGain = ctx.createGain();
  cutGain.gain.setValueAtTime(0, end);
  cutGain.gain.linearRampToValueAtTime(1, end + 0.002);
  cutGain.gain.exponentialRampToValueAtTime(0.001, end + 0.03);
  cut.connect(high).connect(cutGain).connect(bus);
  cut.start(end, Math.random() * 0.8, 0.035);

  const thunk = ctx.createOscillator();
  thunk.type = "sine";
  thunk.frequency.setValueAtTime(150, end + 0.028);
  thunk.frequency.exponentialRampToValueAtTime(90, end + 0.05);
  const thunkGain = ctx.createGain();
  thunkGain.gain.setValueAtTime(0, end + 0.028);
  thunkGain.gain.linearRampToValueAtTime(1, end + 0.03);
  thunkGain.gain.exponentialRampToValueAtTime(0.001, end + 0.05);
  thunk.connect(thunkGain).connect(bus);
  thunk.start(end + 0.028);
  thunk.stop(end + 0.06);
  return end + 0.06;
}
// sound:end

// A recorded receipt printer, when public/sounds/receipt-printer.mp3 exists. Until then (or if it fails to load),
// the synthesized printer above plays instead.
const PRINTER_MP3 = "/sounds/receipt-printer.mp3";
let audioCtx: AudioContext | null = null;
function playPrinterSound() {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const a = new Audio(PRINTER_MP3);
    a.volume = 0.6;
    a.play().catch(() => playSynthPrinter());
  } catch {
    playSynthPrinter();
  }
}
function playSynthPrinter() {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    audioCtx ??= new AC();
    const ctx = audioCtx;
    if (ctx.state === "suspended") void ctx.resume().catch(() => {});
    scheduleReceiptSound(ctx, ctx.destination, ctx.currentTime + 0.03, FEED_SECONDS, FEED_LINES);
  } catch {
    // No sound is fine; the paper still prints.
  }
}

function Receipt({ tools }: { tools: string[] }) {
  const printerRef = useRef<HTMLButtonElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const [feed, setFeed] = useState<Feed>("rest");
  const [run, setRun] = useState(0);

  useEffect(() => {
    const el = printerRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let armed = false;
    let printed = false;
    // Arm while the printer is still just below the fold, so the reader never sees the paper vanish.
    const arm = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || armed) return;
      armed = true;
      arm.disconnect();
      setFeed((f) => (f === "rest" ? "armed" : f));
    }, { rootMargin: "0px 0px 35% 0px" });
    // Once most of the printer is on screen, wait for a tap; print on its own if none comes.
    let timer: number | undefined;
    const go = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || printed) return;
      printed = armed = true;
      arm.disconnect();
      go.disconnect();
      setFeed((f) => (f === "rest" ? "armed" : f));
      timer = window.setTimeout(() => setFeed((f) => { if (f !== "armed") return f; setRun((n) => n + 1); return "printing"; }), 6000);
    }, { threshold: 0.6 });
    arm.observe(el);
    go.observe(el);
    return () => { arm.disconnect(); go.disconnect(); window.clearTimeout(timer); };
  }, []);

  const print = () => { if (feed === "printing") return; playPrinterSound(); setRun((n) => n + 1); setFeed("printing"); };

  // A paper copy: clone the receipt onto the body, print only that clone, then remove it.
  const printCopy = () => {
    const paper = paperRef.current;
    if (!paper) return;
    const copy = paper.cloneNode(true) as HTMLElement;
    copy.classList.add(s.printCopy);
    copy.removeAttribute("id");
    document.body.appendChild(copy);
    const html = document.documentElement;
    html.classList.add("receipt-only");
    const done = () => { html.classList.remove("receipt-only"); copy.remove(); };
    window.addEventListener("afterprint", done, { once: true });
    window.print();
  };

  const busy = feed === "printing";
  const label = busy ? "printing…" : feed === "armed" ? "tap to print" : "tap to reprint";

  return (
    <div className="mx-auto w-full max-w-[412px]">
      {/* The whole printer is the button: tap it and the receipt prints, with the printer sound. */}
      <button
        ref={printerRef}
        type="button"
        onClick={print}
        aria-controls="thai-receipt"
        aria-label={`${label}: prints the results receipt with a printer sound`}
        className={`${s.printer} ${busy ? s.busy : ""} block w-full text-left cursor-pointer`}
      >
        <span className="flex items-center justify-between gap-3 px-4 pt-3.5 pb-3">
          <span className="flex items-center gap-2 min-w-0 font-mono text-[11px] tracking-[0.06em] text-cream/85" data-copy="receipt">
            <span className={`${s.lamp} ${busy || feed === "armed" ? s.blink : ""}`} aria-hidden="true" />
            order #012726
          </span>
          <span className={`${s.printBtn} shrink-0 rounded-full border border-cream/35 px-3 py-1 font-mono text-[11px] lowercase tracking-[0.04em] text-cream`} aria-hidden="true">{label}</span>
        </span>
        <span className={`${s.slot} block`} aria-hidden="true" />
      </button>

      <div className={s.feed}>
        {/* While the paper waits in the printer, the empty space says what to do. */}
        {feed === "armed" && (
          <button type="button" onClick={print} className="absolute inset-x-0 top-8 z-[1] mx-auto w-fit font-mono text-[12px] lowercase tracking-[0.04em] text-mid hover:text-ink" aria-hidden="true" tabIndex={-1}>
            ↑ tap the printer for your receipt
          </button>
        )}
        <div
          key={run}
          className={`${s.mover} ${feed === "armed" ? s.armed : ""} ${busy ? s.printing : ""}`}
          onAnimationEnd={(e) => { if (e.target === e.currentTarget) setFeed("done"); }}
        >
          <div ref={paperRef} id="thai-receipt" className={`${s.paper} font-mono text-ink px-5 sm:px-6 pt-6`}>
            <div className="text-center flex flex-col items-center gap-0.5 text-[12px] leading-snug" data-copy="receipt">
              <span className="text-[15px] font-bold tracking-[0.06em]">A LOCAL THAI RESTAURANT</span>
              <span>Google Search campaign</span>
              <span>Jan 27 to Mar 3, 2026</span>
              <span>order #012726</span>
            </div>

            <hr className={s.rule} />

            <dl className="m-0 text-[13px] leading-snug">
              {receiptLines.map((l) => (
                <div key={l.label} className="py-[3px]" data-copy="receipt">
                  <div className="flex items-baseline">
                    <dt className="shrink-0">{l.label}</dt>
                    <span className={s.leader} aria-hidden="true" />
                    <dd className="m-0 shrink-0 font-bold tabular-nums">{l.value}</dd>
                  </div>
                  {l.note && <span className="block text-[11px] opacity-70">{l.note}</span>}
                </div>
              ))}
            </dl>

            <hr className={s.rule} />

            <div data-copy="receipt">
              <div className="flex items-baseline">
                <span className="shrink-0 text-[14px] font-bold tracking-[0.06em]">TOTAL SPENT</span>
                <span className={s.leader} aria-hidden="true" />
                <span className="shrink-0 text-[28px] font-bold tracking-[-0.03em] tabular-nums text-oxblood">$310.10</span>
              </div>
              <p className="mt-0.5 text-[11px] leading-snug">Budget $250, raised with the owner’s OK</p>
            </div>

            <hr className={s.rule} />

            {/* The tip lines: where a receipt asks for a tip, this one leaves tips for the next campaign, handwritten. */}
            <div className="flex flex-col gap-3" data-copy="receipt">
              <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.1em]">Tips for next time</h3>
              {tips.map((t, i) => (
                <div key={t.head}>
                  <div className="flex items-end gap-2">
                    <span className="shrink-0 text-[12px] font-bold tracking-[0.06em]">TIP {i + 1}</span>
                    <span className="flex-1 min-w-0 border-b border-ink/60 pb-0.5 hand text-[17px] leading-tight text-oxblood">{t.head}</span>
                  </div>
                  <p className="mt-1 text-[11px] leading-snug opacity-75">{t.body}</p>
                </div>
              ))}
            </div>

            <hr className={s.rule} />

            <div className="text-[12px] leading-snug" data-copy="receipt">
              <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.1em]">Prepared with</h3>
              <ul className="mt-1">
                {tools.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>

            <hr className={s.rule} />

            <div className="flex flex-col items-center gap-2 pb-2 text-center" data-copy="receipt">
              <span className="text-[12px] font-bold tracking-[0.12em]">THANK YOU FOR YOUR ORDER</span>
              <span className={s.barcode} aria-hidden="true" />
              <span className="text-[10px] tracking-[0.3em]">012726</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 text-center">
        <button
          type="button"
          onClick={printCopy}
          className="hit font-mono text-[13px] font-medium lowercase tracking-[0.02em] border-b-2 border-accent hover:text-accent-deep"
        >
          print a copy
        </button>
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
            <Receipt tools={tools} />
          </section>
        </div>

        <div className="pb-10 md:pb-12">
          <Reorder />
        </div>
      </article>
    </>
  );
}
