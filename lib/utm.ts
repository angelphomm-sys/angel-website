import { site } from "./site";

// Tagged links so the stats page can say where a visit came from.
export type UtmSource = "linkedin" | "instagram" | "email" | "resume" | "application" | "qr";
export function utm(path: string, source: UtmSource, medium = source === "email" ? "email" : source === "resume" || source === "application" ? "document" : "social", campaign = "portfolio") {
  const u = new URL(path, site.url);
  u.searchParams.set("utm_source", source); u.searchParams.set("utm_medium", medium); u.searchParams.set("utm_campaign", campaign);
  return u.toString();
}
export const linkedinShare = (url: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
