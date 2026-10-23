"use client";
import { useEffect, useState } from "react";

// Thin line at the top of a case study that fills as you read.
export function CaseProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const on = () => { const d = document.documentElement; const max = d.scrollHeight - d.clientHeight; setW(max > 0 ? Math.min(100, (d.scrollTop / max) * 100) : 0); };
    on(); window.addEventListener("scroll", on, { passive: true }); return () => window.removeEventListener("scroll", on);
  }, []);
  return <div className="case-progress" style={{ width: `${w}%` }} aria-hidden="true" />;
}

// One numbered part of a case study, as the nav sees it. `short` is the label the nav uses when the
// real heading is too long to sit in a rail or a chip.
export type CaseStep = { id: string; n: string; label: string; short?: string };

const navLabel = (s: CaseStep) => s.short ?? s.label;

function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Jump to a part without overriding the reader's motion setting.
export function goToStep(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
}

// Which part is being read. The first part in document order that sits inside the reading band wins,
// so the nav never jumps backwards while a long part scrolls past.
export function useActiveSection(ids: string[]) {
  const key = ids.join("|");
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    if (!key) return;
    const els = key.split("|").map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const seen = new Map<string, boolean>();
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.isIntersecting);
        const hit = els.find((el) => seen.get(el.id));
        if (hit) setActive(hit.id);
      },
      { rootMargin: "-88px 0px -55% 0px", threshold: 0 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [key]);
  return active;
}

function stepHref(s: CaseStep) { return `#${s.id}`; }

// Desktop: a quiet rail down the left margin that marks where you are.
export function CaseRail({ steps, heading = "the parts" }: { steps: CaseStep[]; heading?: string }) {
  const active = useActiveSection(steps.map((s) => s.id));
  if (steps.length < 2) return null;
  return (
    <nav aria-label="Parts of this case study" className="hidden lg:block sticky top-6 self-start">
      <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-mid pb-3">{heading}</span>
      <ol className="flex flex-col border-l border-line">
        {steps.map((s) => {
          const on = s.id === active;
          return (
            <li key={s.id} className="-ml-px">
              <a
                href={stepHref(s)}
                aria-current={on ? "step" : undefined}
                onClick={(e) => { e.preventDefault(); goToStep(s.id); }}
                className={`flex items-center min-h-11 gap-2.5 border-l-2 pl-3 py-2 text-[13px] leading-snug transition-colors ${on ? "border-accent text-ink font-bold" : "border-transparent text-mid hover:text-ink"}`}
              >
                <span className={`font-mono text-[12px] font-medium tabular-nums ${on ? "text-accent-deep" : "text-mid"}`}>{s.n}</span>
                <span>{navLabel(s)}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// Mobile and tablet: the same nav, collapsed to one scrolling row of chips.
export function CaseChips({ steps, className = "" }: { steps: CaseStep[]; className?: string }) {
  const active = useActiveSection(steps.map((s) => s.id));
  if (steps.length < 2) return null;
  return (
    <nav
      aria-label="Parts of this case study"
      className={`lg:hidden sticky top-0 z-30 -mx-5 px-5 md:-mx-20 md:px-20 bg-paper/95 backdrop-blur-sm ${className}`}
    >
      <ol className="flex gap-2 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {steps.map((s) => {
          const on = s.id === active;
          return (
            <li key={s.id} className="shrink-0">
              <a
                href={stepHref(s)}
                aria-current={on ? "step" : undefined}
                onClick={(e) => { e.preventDefault(); goToStep(s.id); }}
                className="group flex items-center min-h-11 rounded-full"
              >
                {/* The link is the 44px tap target; the visible chip sits centered inside it. */}
                <span className={`flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-[12px] font-bold whitespace-nowrap transition-colors ${on ? "border-accent bg-accent text-cream" : "border-line text-mid"}`}>
                  <span className="tabular-nums">{s.n}</span>
                  <span>{navLabel(s)}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
