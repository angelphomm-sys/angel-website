import * as si from "simple-icons";

type Tool = { name: string; note?: string; icon?: { path: string; hex: string }; tile?: { text: string; bg: string; fg?: string } };

const I = (k: keyof typeof si) => { const i = si[k] as { path: string; hex: string }; return { path: i.path, hex: `#${i.hex}` }; };

export const stack: { group: string; tools: Tool[] }[] = [
  { group: "analytics & search", tools: [
    { name: "Google Ads", note: "certified: Search, Display, Measurement", icon: I("siGoogleads") },
    { name: "Google Analytics", icon: I("siGoogleanalytics") },
    { name: "Search Console", icon: I("siGooglesearchconsole") },
    { name: "Google Sheets", icon: I("siGooglesheets") },
    { name: "Excel", note: "Associate", tile: { text: "X", bg: "#107C41" } },
  ] },
  { group: "advertising & social", tools: [
    { name: "YouTube", icon: I("siYoutube") },
    { name: "Meta Business Suite", icon: I("siMeta") },
    { name: "LinkedIn", tile: { text: "in", bg: "#0A66C2" } },
    { name: "Instagram", icon: I("siInstagram") },
    { name: "TikTok", icon: I("siTiktok") },
  ] },
  { group: "crm & automation", tools: [
    { name: "HubSpot", note: "Inbound certified", icon: I("siHubspot") },
    { name: "Mailchimp", note: "[confirm]", icon: I("siMailchimp") },
  ] },
  { group: "creative & workflow", tools: [
    { name: "Lightroom", tile: { text: "Lr", bg: "#001E36", fg: "#31A8FF" } },
    { name: "Premiere Pro", tile: { text: "Pr", bg: "#00005B", fg: "#9999FF" } },
    { name: "CapCut", tile: { text: "CC", bg: "#000000" } },
    { name: "Canva", tile: { text: "C", bg: "#00C4CC" } },
    { name: "WordPress", icon: I("siWordpress") },
    { name: "ClickUp", icon: I("siClickup") },
  ] },
];

function ToolIcon({ t }: { t: Tool }) {
  if (t.icon) return <svg viewBox="0 0 24 24" width="28" height="28" role="img" aria-label={t.name}><path d={t.icon.path} fill={t.icon.hex} /></svg>;
  if (t.tile) return <span className="w-7 h-7 rounded-md inline-flex items-center justify-center text-[12px] font-extrabold" style={{ background: t.tile.bg, color: t.tile.fg ?? "#fff" }} aria-label={t.name}>{t.tile.text}</span>;
  return null;
}

export function Stack() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stack.map((g) => (
        <div key={g.group} className="border-2 border-ink rounded-3xl p-6 flex flex-col gap-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-mid">{g.group}</span>
          <ul className="flex flex-col gap-3">
            {g.tools.map((t) => (
              <li key={t.name} className="flex items-center gap-3"><ToolIcon t={t} /><span className="flex flex-col leading-tight"><span className="text-[14px] font-bold">{t.name}</span>{t.note && <span className="text-[11px] text-mid">{t.note}</span>}</span></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
