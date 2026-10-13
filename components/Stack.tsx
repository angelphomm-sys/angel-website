import * as si from "simple-icons";
import { showNotes } from "@/lib/notes";

type Tool = { name: string; note?: string; icon?: { path: string; hex: string }; tile?: { text: string; bg: string; fg?: string } };

const I = (k: keyof typeof si) => { const i = si[k] as { path: string; hex: string }; return { path: i.path, hex: `#${i.hex}` }; };

export const stack: { group: string; tools: Tool[] }[] = [
  { group: "analytics & search", tools: [
    { name: "Google Ads", icon: I("siGoogleads") },
    { name: "Google Analytics", icon: I("siGoogleanalytics") },
    { name: "Search Console", icon: I("siGooglesearchconsole") },
    { name: "Google Sheets", icon: I("siGooglesheets") },
    { name: "Excel", tile: { text: "X", bg: "#107C41" } },
    { name: "Google Business Profile", icon: I("siGoogle") },
  ] },
  { group: "advertising & social", tools: [
    { name: "YouTube", icon: I("siYoutube") },
    { name: "Meta Business Suite", icon: I("siMeta") },
    { name: "LinkedIn", tile: { text: "in", bg: "#0A66C2" } },
    { name: "Instagram", icon: I("siInstagram") },
    { name: "TikTok", icon: I("siTiktok") },
  ] },
  { group: "crm & automation", tools: [
    { name: "HubSpot", icon: I("siHubspot") },
  ] },
  { group: "creative & workflow", tools: [
    { name: "Lightroom", tile: { text: "Lr", bg: "#001E36", fg: "#31A8FF" } },
    { name: "Premiere Pro", tile: { text: "Pr", bg: "#00005B", fg: "#9999FF" } },
    { name: "CapCut", tile: { text: "CC", bg: "#000000" } },
    { name: "Canva", tile: { text: "C", bg: "#00C4CC" } },
    { name: "Figma", icon: I("siFigma") },
    { name: "Claude", icon: I("siClaude") },
    { name: "WordPress", icon: I("siWordpress") },
    { name: "ClickUp", icon: I("siClickup") },
  ] },
];

export function ToolIcon({ t }: { t: Tool }) {
  if (t.icon) return <svg viewBox="0 0 24 24" width="28" height="28" role="img" aria-label={t.name}><path d={t.icon.path} fill={t.icon.hex} /></svg>;
  if (t.tile) return <span className="w-7 h-7 rounded-md inline-flex items-center justify-center text-[12px] font-extrabold" style={{ background: t.tile.bg, color: t.tile.fg ?? "#fff" }} aria-label={t.name}>{t.tile.text}</span>;
  return null;
}

// A [bracketed] note is a reminder to confirm something. It shows while working locally and never in production, like Todo.
const showNote = (note?: string) => !!note && (!note.trim().startsWith("[") || showNotes);

export function Stack() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stack.map((g) => (
        <div key={g.group} className="border border-line bg-card rounded-3xl p-6 flex flex-col gap-4">
          <span className="text-[11px] font-mono font-medium uppercase tracking-[0.08em] text-mid">{g.group}</span>
          <ul className="flex flex-col gap-3">
            {g.tools.map((t) => (
              <li key={t.name} className="flex items-center gap-3"><ToolIcon t={t} /><span className="flex flex-col leading-tight"><span className="text-[14px] font-bold">{t.name}</span>{showNote(t.note) && <span className="text-[11px] text-mid">{t.note}</span>}</span></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// From the résumé (Certifications and professional development). Add one here only after Angel confirms it.
export const certifications: { name: string; issuer: string; icon: Tool }[] = [
  { name: "Google Ads Search", issuer: "Google", icon: { name: "Google Ads", icon: I("siGoogleads") } },
  { name: "Google Ads Display", issuer: "Google", icon: { name: "Google Ads", icon: I("siGoogleads") } },
  { name: "Google Ads Measurement", issuer: "Google", icon: { name: "Google Ads", icon: I("siGoogleads") } },
  { name: "Inbound Marketing", issuer: "HubSpot Academy", icon: { name: "HubSpot", icon: I("siHubspot") } },
  { name: "AI Fluency", issuer: "Anthropic", icon: { name: "Claude", icon: I("siClaude") } },
  { name: "Excel Associate (MO-200)", issuer: "Microsoft Office Specialist", icon: { name: "Excel", tile: { text: "X", bg: "#107C41" } } },
];

export function Certifications() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {certifications.map((c) => (
        <li key={c.name} className="flex items-center gap-3 border border-line bg-card rounded-2xl px-5 py-4">
          <ToolIcon t={c.icon} />
          <span className="flex flex-col leading-tight"><span className="text-[15px] font-bold">{c.name}</span><span className="text-[12px] text-mid">{c.issuer}</span></span>
        </li>
      ))}
    </ul>
  );
}
