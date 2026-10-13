import Link from "next/link";
import { formatDate, type Post } from "@/lib/posts";
import { CoverImage } from "@/components/CoverImage";

/** `layout` names the grid the card sits in, for the image's `sizes`. `priority` preloads the cover: only the first card on /blog. */
export function PostCard({ post, showExcerpt = false, showMeta = false, layout = "grid", priority = false }: { post: Post; showExcerpt?: boolean; showMeta?: boolean; layout?: "grid" | "row"; priority?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col gap-3">
      <CoverImage variant="card" src={post.cover} alt={post.coverAlt ?? post.title} layout={layout} priority={priority} />
      <span className="text-[21px] font-display font-normal tracking-[-0.01em] leading-tight group-hover:text-accent-deep">{post.title}</span>
      {showMeta && <span className="-mt-1 font-mono text-[12px] font-medium">{formatDate(post.date)} · {post.readingTime} min read</span>}
      {showExcerpt && <p className="text-[16px] leading-relaxed text-mid max-w-[65ch]">{post.excerpt}</p>}
    </Link>
  );
}
