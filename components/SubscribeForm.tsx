"use client";
import { useState } from "react";

// `onDark` is the footer's oxblood band: a cream field and a cream button, so both read on the dark ground.
export function SubscribeForm({ compact = false, onDark = false }: { compact?: boolean; onDark?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const r = await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error ?? "Something went wrong");
      setState("ok"); setMsg(j.message ?? "You're on the list.");
    } catch (err) {
      setState("error"); setMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (state === "ok") return <p className={`hand text-[18px] ${onDark ? "text-cream" : "text-accent"}`}>{msg}</p>;

  return (
    <form onSubmit={submit} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" aria-label="Email address"
          className={`flex-1 min-w-0 w-full border-2 rounded-full px-4 text-ink placeholder:text-olive ${onDark ? "border-cream bg-card" : "border-ink bg-card"} ${compact ? "py-2.5 text-base" : "py-3 text-base"}`} />
        <button type="submit" disabled={state === "loading"} className={`shrink-0 min-h-11 font-mono font-medium lowercase tracking-[0.02em] rounded-full ${onDark ? "bg-cream text-oxblood hover:bg-blue" : "bg-accent text-cream hover:bg-accent-deep"} ${compact ? "px-4 text-[13px]" : "px-5 text-[14px]"} transition-colors disabled:opacity-60`}>
          {state === "loading" ? "…" : "subscribe"}
        </button>
      </div>
      {state === "error" && <p role="alert" className={`text-base font-bold ${onDark ? "text-cream" : "text-accent"}`}>{msg}</p>}
    </form>
  );
}
