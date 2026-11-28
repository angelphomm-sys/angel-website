import { site } from "./site";

// Tagged links so the stats page can say where a visit came from.
export type UtmSource = "linkedin" | "instagram" | "x" | "email" | "copy" | "resume" | "application" | "qr";
export function utm(path: string, source: UtmSource, medium = source === "email" ? "email" : source === "copy" ? "share" : source === "resume" || source === "application" ? "document" : "social", campaign = "portfolio") {
  const u = new URL(path, site.url);
  u.searchParams.set("utm_source", source); u.searchParams.set("utm_medium", medium); u.searchParams.set("utm_campaign", campaign);
  return u.toString();
}
export const linkedinShare = (url: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
export const xShare = (url: string, text: string) => `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
export const emailShare = (url: string, title: string) => `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
