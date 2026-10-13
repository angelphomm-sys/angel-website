"use client";
import { useState } from "react";
import { track } from "@/lib/analytics";

// Three fields and a send button. The API also accepts the older fit, company, and source fields, so nothing breaks.
export function ContactForm() {
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    const body = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error ?? "Something went wrong");
      setState("ok"); setMsg(j.message); track("inbound_contact_form");
    } catch (err) {
      setState("error"); setMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (state === "ok") return <p className="text-[19px] font-bold text-accent-deep">{msg}</p>;

  const field = "border-2 border-ink rounded-2xl bg-card px-4 py-3 text-[16px]";
  const label = "text-[11px] font-mono font-medium uppercase tracking-[0.08em]";
  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
      <label className="flex flex-col gap-1.5">
        <span className={label}>Name</span>
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className={label}>Email</span>
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className={label}>Message</span>
        <textarea name="message" required rows={5} className={field} />
      </label>
      <button type="submit" disabled={state === "loading"} className="self-start bg-accent text-cream rounded-full px-6 py-3.5 font-mono text-[14px] font-medium lowercase tracking-[0.02em] hover:bg-accent-deep transition-colors disabled:opacity-60">
        {state === "loading" ? "sending…" : "send →"}
      </button>
      {state === "error" && <p role="alert" className="text-base text-accent-deep">{msg}</p>}
    </form>
  );
}
