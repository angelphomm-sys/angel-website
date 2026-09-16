"use client";
import { useState } from "react";
import { track } from "@/lib/analytics";
import { sources } from "@/lib/inbound";

const fits = ["internship", "part-time", "full-time", "photography", "just saying hi"];

export function ContactForm() {
  const [fit, setFit] = useState(fits[0]);
  const [source, setSource] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    const fd = new FormData(e.currentTarget);
    const body = Object.fromEntries(fd.entries());
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...body, fit, source }) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error ?? "Something went wrong");
      setState("ok"); setMsg(j.message); track(`inbound_${source || "unknown"}`);
    } catch (err) {
      setState("error"); setMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (state === "ok") return <div className="hand text-[30px] text-accent">{msg}</div>;

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-mid">this is about</span>
        <div className="flex flex-wrap gap-2">
          {fits.map((f) => (
            <button type="button" key={f} onClick={() => setFit(f)} className={`text-[13px] font-bold border-2 border-ink rounded-full px-4 py-2.5 transition-colors ${fit === f ? "bg-ink text-white" : "hover:bg-mist"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-mid">Your name</span>
        <input name="name" required className="border-2 border-ink rounded-2xl bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-accent" />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-mid">Email</span>
        <input name="email" type="email" required className="border-2 border-ink rounded-2xl bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-accent" />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-mid">Company or brand</span>
        <input name="company" className="border-2 border-ink rounded-2xl bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-accent" />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-mid">How did you find me?</span>
        <select name="source" value={source} onChange={(e) => setSource(e.target.value)} required className="border-2 border-ink rounded-2xl bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-accent">
          <option value="" disabled>pick one</option>
          {sources.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-mid">What are you building?</span>
        <textarea name="message" required rows={5} className="border-2 border-ink rounded-2xl bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-accent font-serif text-lg" />
      </label>
      <button type="submit" disabled={state === "loading"} className="bg-ink text-white rounded-full py-4 text-[15px] font-bold hover:bg-mid transition-colors disabled:opacity-60">
        {state === "loading" ? "sending…" : "send it →"}
      </button>
      {state === "error" && <p className="text-sm text-red-700">{msg}</p>}
    </form>
  );
}
