"use client";
import { useState } from "react";

export function SubscribeForm({ compact = false }: { compact?: boolean }) {
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

  if (state === "ok") return <p className="hand text-[26px] text-accent">{msg}</p>;

  return (
    <form onSubmit={submit} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" aria-label="Email address"
          className={`flex-1 border-2 border-ink rounded-full bg-white px-4 ${compact ? "py-2.5 text-sm" : "py-3 text-[15px]"} outline-none focus:ring-2 focus:ring-accent`} />
        <button type="submit" disabled={state === "loading"} className={`bg-ink text-white font-bold rounded-full ${compact ? "px-4 text-[13px]" : "px-5 text-[14px]"} hover:bg-mid transition-colors disabled:opacity-60`}>
          {state === "loading" ? "…" : "subscribe"}
        </button>
      </div>
      {state === "error" && <p className="text-sm text-red-700">{msg}</p>}
    </form>
  );
}
