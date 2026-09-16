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
  cover?: string; coverAlt?: string; readingTime: number; draft: boolean; featured?: boolean; content: string;
  cta?: { label: string; href: string }; series?: string; keywords?: string[];
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function read(file: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const words = content.split(/\s+/).filter(Boolean).length;
  const lane: Lane | undefined = data.lane && data.lane !== "story" ? data.lane : undefined;
  return {
    slug: file.replace(/\.mdx?$/, ""), title: data.title, excerpt: data.excerpt ?? "", date: data.date,
    type: data.type ?? "narrative", lane, laneKey: lane ?? "story", cover: data.cover, coverAlt: data.coverAlt,
    readingTime: Math.max(1, Math.round(words / 200)), draft: Boolean(data.draft), featured: Boolean(data.featured), content,
    cta: data.cta, series: data.series, keywords: data.keywords,
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

export function formatDate(d: string) {
  return new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" }).toLowerCase();
}
