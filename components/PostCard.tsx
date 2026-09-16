import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/posts";

export function PostCard({ post, showExcerpt = false }: { post: Post; showExcerpt?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col gap-3">
      <div className="relative overflow-hidden rounded-2xl bg-[#f3f3f3] aspect-[4/3]">
        {post.cover ? (
          <Image src={post.cover} alt={post.coverAlt ?? post.title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center"><span className="hand text-[28px] text-mid">no cover yet</span></div>
        )}
      </div>
      <span className="text-[21px] font-extrabold tracking-[-0.02em] leading-tight group-hover:text-accent">{post.title}</span>
      {showExcerpt && <p className="text-[15px] leading-relaxed text-mid">{post.excerpt}</p>}
    </Link>
  );
}
