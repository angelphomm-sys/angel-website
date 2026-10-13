import { hasLiveSocial } from "@/lib/social";
import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";
import { caseStudies } from "@/lib/work";

// Only pages that answer 200 and should be indexed. Old /work/:lane URLs redirect to /work, /stats is noindex, and /projects/other-side-snacks stays out (unfinished, noindex).
// lastmod only where a real date is known: posts carry theirs, /blog takes its newest post's. The rest leave it out
// rather than stamp build time, which would claim every page changed on every deploy.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const published = getAllPosts({ includeDrafts: false });
  const newest = published.map((p) => p.updated ?? p.date).sort().at(-1);
  const statics = ["", "/about", "/work", ...(hasLiveSocial ? ["/work/social"] : []), "/blog", "/photography", "/contact"].map((p) => ({
    url: `${base}${p}`, ...(p === "/blog" && newest ? { lastModified: newest } : {}), changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7,
  }));
  const cases = caseStudies.map((w) => ({ url: `${base}/case/${w.slug}`, changeFrequency: "monthly" as const, priority: 0.8 }));
  // Each post lists its cover, so the sitemap carries an <image:image> for it.
  const posts = published.map((p) => ({
    url: `${base}/blog/${p.slug}`, lastModified: p.updated ?? p.date, changeFrequency: "yearly" as const, priority: 0.6,
    ...(p.cover ? { images: [`${base}${p.cover}`] } : {}),
  }));
  return [...statics, ...cases, ...posts];
}
