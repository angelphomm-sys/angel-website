import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Lane, PostType } from "./site";

/** A post with no work lane belongs to the "story" lane, which only the blog filters on. */
export type StoryLane = "story";

export type Post = {
  slug: string; title: string; excerpt: string; date: string; type: PostType; lane?: Lane;
  /** `lane`, with a missing or "story" lane resolved to "story". Use this for blog filtering and labels. */
  laneKey: Lane | StoryLane;
  cover?: string; coverAlt?: string;
  /** Optional photo credit under the post hero (never on cards), and where it links. Both also feed the cover's JSON-LD. */
  coverCredit?: string; coverCreditUrl?: string;
  readingTime: number; draft: boolean; featured?: boolean; content: string;
  cta?: { label: string; href: string }; series?: string; keywords?: string[]; updated?: string;
  /** The brand a breakdown is about, with its official site. Feeds the BlogPosting's `about` in JSON-LD. */
  brand?: { name: string; url: string };
  /** The LinkedIn post where this blog post is discussed. Comments live there; the post page links to it. */
  linkedinPost?: string;
};

/** Frontmatter `brand: { name, url }`, kept only when both are non-empty strings. */
function brandOf(v: unknown): Post["brand"] {
  if (!v || typeof v !== "object") return undefined;
  const { name, url } = v as Record<string, unknown>;
  return typeof name === "string" && name.trim() && typeof url === "string" && url.trim() ? { name: name.trim(), url: url.trim() } : undefined;
}

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

/** A frontmatter value kept only when it is a non-empty string. */
const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined);

// Every published cover needs alt text. The page falls back to the title, but warn (once per post) so it gets written.
const warnedAlt = new Set<string>();
function warnMissingAlt(slug: string) {
  if (warnedAlt.has(slug)) return;
  warnedAlt.add(slug);
  console.warn(`[posts] "${slug}" is published with a cover but no coverAlt. Add coverAlt to its frontmatter; the title stands in until then.`);
}

/** YAML reads an unquoted 2026-10-05 as a Date. Keep every post date a "YYYY-MM-DD" string. */
function day(v: unknown): string | undefined {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return typeof v === "string" && v.trim() ? v.trim() : undefined;
}

function read(file: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const words = content.split(/\s+/).filter(Boolean).length;
  const lane: Lane | undefined = data.lane && data.lane !== "story" ? data.lane : undefined;
  const slug = file.replace(/\.mdx?$/, "");
  const coverCredit = str(data.coverCredit);
  if (!data.draft && data.cover && !str(data.coverAlt)) warnMissingAlt(slug);
  return {
    slug, title: data.title, excerpt: data.excerpt ?? "", date: day(data.date) ?? "",
    type: data.type ?? "narrative", lane, laneKey: lane ?? "story", cover: data.cover, coverAlt: str(data.coverAlt) ? data.coverAlt : undefined,
    coverCredit, coverCreditUrl: coverCredit ? str(data.coverCreditUrl) : undefined,
    readingTime: Math.max(1, Math.round(words / 200)), draft: Boolean(data.draft), featured: Boolean(data.featured), content,
    cta: data.cta, series: data.series, keywords: data.keywords, updated: day(data.updated), brand: brandOf(data.brand),
    linkedinPost: str(data.linkedinPost) && /^https:\/\/(www\.)?linkedin\.com\//.test(data.linkedinPost) ? data.linkedinPost : undefined,
  };
}

export function getAllPosts({ includeDrafts = process.env.NODE_ENV !== "production" } = {}): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((f) => /\.mdx?$/.test(f)).map(read)
    .filter((p) => includeDrafts || !p.draft).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  const file = [`${slug}.mdx`, `${slug}.md`].find((f) => fs.existsSync(path.join(POSTS_DIR, f)));
  return file ? read(file) : undefined;
}

export function getSeries(name: string) { return getAllPosts({ includeDrafts: true }).filter((p) => p.series === name).sort((a, b) => (a.date < b.date ? -1 : 1)); }

/**
 * Words a reader sees in a post body, for JSON-LD `wordCount`. Leaves out <Todo> notes (hidden in production),
 * MDX component tags and their props, link targets, and markdown symbols.
 */
export function proseWordCount(content: string) {
  return content
    .replace(/<Todo>[\s\S]*?<\/Todo>/g, " ")
    .replace(/<[A-Za-z/][^>]*>/g, " ")
    .replace(/\]\([^)]*\)/g, "]")
    .split(/\s+/)
    .filter((w) => /[A-Za-z0-9]/.test(w)).length;
}

/** "oct 5, 2026". */
export function formatDate(d: string) {
  return new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toLowerCase();
}

/** A post's date with a time and Utah's offset, for JSON-LD and Open Graph. */
export const isoDate = (d: string) => `${d}T09:00:00-06:00`;

const byNewest = (a: Post, b: Post) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0);

/**
 * Up to three published posts to read next, ranked by shared keywords (one point each),
 * same series (+2), and same type (+1). Ties go to the newer post. Never the post itself or a draft.
 */
export function getRelated(post: Post, count = 3): Post[] {
  const norm = (p: Post) => new Set((p.keywords ?? []).map((k) => k.toLowerCase().trim()));
  const mine = norm(post);
  return getAllPosts({ includeDrafts: false })
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      p,
      score: [...norm(p)].filter((k) => mine.has(k)).length + (post.series && p.series === post.series ? 2 : 0) + (p.type === post.type ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score || byNewest(a.p, b.p))
    .slice(0, count)
    .map((x) => x.p);
}

/** The published posts just before (older) and after (newer) this one by date. */
export function getAdjacent(post: Post): { older?: Post; newer?: Post } {
  const all = getAllPosts({ includeDrafts: false });
  const i = all.findIndex((p) => p.slug === post.slug);
  if (i === -1) return {};
  return { newer: all[i - 1], older: all[i + 1] };
}
