// GA4 event helper. Safe to call anywhere on the client; no-op when GA is not configured.
export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

// Event names are flat (no custom dimensions needed) so the stats page can read them
// straight from the GA4 Data API without registering anything in the GA admin.
//   resume_download     résumé PDF opened
//   cta_<label>         a tracked call to action clicked
//   case_view_<slug>    a case study opened
//   sample_<slug>       a creative sample opened in the lightbox
//   vote_<option>       "you are the marketing lead" pick on the Other Side project
//   share_<slug>        a post shared to LinkedIn (or its link copied)
//   postcta_<slug>      a post's own call to action clicked
//   inbound_<source>    contact form sent, by how they found the site
export type EventName = "resume_download" | `cta_${string}` | `case_view_${string}` | `sample_${string}` | `vote_${string}` | `share_${string}` | `postcta_${string}` | `inbound_${string}`;

declare global { interface Window { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] } }

export function track(name: EventName, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}
