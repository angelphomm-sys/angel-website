import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { site, lanes } from "@/lib/site";
import { caseStudies } from "@/lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const posts = getAllPosts({ includeDrafts: false }).map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.date) }));
  const pages = ["", "/about", "/blog", "/work", "/contact", "/photography", "/stats", "/projects/other-side-snacks", ...caseStudies.map((w) => `/case/${w.slug}`), ...Object.keys(lanes).map((a) => `/work/${a}`)].map((p) => ({ url: `${base}${p}` }));
  return [...pages, ...posts];
}
