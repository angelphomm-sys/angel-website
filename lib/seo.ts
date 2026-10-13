import type { Metadata } from "next";
import { site } from "./site";

// Shared Open Graph fields. A page that sets its own openGraph replaces the parent's whole object, so it spreads these back in.
export const og = { siteName: site.name, locale: "en_US", type: "website" } as const;

export const defaultOgImage = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name}, ${site.role.toLowerCase()}` };

export const abs = (path: string) => `${site.url}${path}`;

/** Fit a description to search-result length: end on a full sentence when one fits, otherwise cut at a word. */
export function clip(text: string, max = 155) {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const head = t.slice(0, max + 1);
  const sentence = head.lastIndexOf(". ");
  if (sentence >= 100) return head.slice(0, sentence + 1);
  return `${head.slice(0, head.lastIndexOf(" ")).replace(/[\s,;:·-]+$/, "")}…`;
}

/** Metadata for a static page: its own description, a canonical URL, and Open Graph that carries both.
 *  `absolute` skips the " · Angel Phommachan" template, for a title that already names her or would run past 60 characters. */
export function pageMeta({ title, description, path, absolute }: { title: string; description: string; path: string; absolute?: boolean }): Metadata {
  const d = clip(description);
  const full = absolute ? title : `${title} · ${site.name}`;
  // Setting openGraph here drops the image inherited from app/opengraph-image.tsx, so it is named again.
  return { title: absolute ? { absolute: title } : title, description: d, alternates: { canonical: path }, openGraph: { ...og, title: full, description: d, url: path, images: [defaultOgImage] } };
}

/** The one Person every page talks about. Facts only from lib/site.ts. */
export const person = {
  "@type": "Person",
  "@id": abs("/#person"),
  name: site.name,
  url: site.url,
  jobTitle: site.role,
  image: abs("/images/me/outdoor.jpg"),
  sameAs: [site.socials.linkedin, site.socials.instagram],
  alumniOf: { "@type": "CollegeOrUniversity", name: "Utah Valley University" },
} as const;

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
  };
}
