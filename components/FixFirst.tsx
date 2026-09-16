"use client";
import { useState, useSyncExternalStore } from "react";
import { track } from "@/lib/analytics";
import type { Option } from "@/lib/otherside";

const KEY = "ap.vote.otherside";
const subscribe = (cb: () => void) => { window.addEventListener("storage", cb); return () => window.removeEventListener("storage", cb); };

// "You're the marketing lead." One click, remembered, counted in GA4, shown on /stats.
export function FixFirst({ options, verdict }: { options: Option[]; verdict?: string }) {
  const stored = useSyncExternalStore(subscribe, () => { try { return localStorage.getItem(KEY); } catch { return null; } }, () => null);
  const [local, setLocal] = useState<string | null>(null);
  const pick = local ?? stored;
  const choose = (id: string) => { setLocal(id); try { localStorage.setItem(KEY, id); } catch {} track(`vote_${id}`); };
  const chosen = options.find((o) => o.id === pick);
  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {options.map((o) => (
          <button key={o.id} type="button" onClick={() => choose(o.id)} className={`text-left rounded-3xl border-2 p-5 flex flex-col gap-2 transition-colors ${pick === o.id ? "bg-ink text-white border-ink" : "border-line hover:border-ink"}`}>
            <span className="text-[18px] font-extrabold tracking-[-0.02em]">{o.label}</span>
            <span className={`text-[13px] leading-snug ${pick === o.id ? "text-white/80" : "text-mid"}`}>{o.question}</span>
          </button>
        ))}
      </div>
      {chosen ? (
        <div className="bg-mist rounded-3xl p-6 flex flex-col gap-2 fade-in">
          <span className="hand text-[24px] text-accent">you picked {chosen.label}.</span>
          <p className="text-[15px] leading-relaxed">{verdict ?? "My pick lands here after the audit, with the reason. Your answer is counted, and the tally shows on the stats page. Come back in a few weeks and see if we agree."}</p>
        </div>
      ) : (
        <p className="hand text-[22px] text-mid">pick one. it is remembered, and it is counted.</p>
      )}
    </div>
  );
}
