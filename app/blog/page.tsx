import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export const metadata: Metadata = { title: "blog", description: "Lists, campaign breakdowns, stories, and video from Angel Phommachan." };

export default function Journal() {
  const posts = getAllPosts();
  return (
    <div className="mx-auto max-w-[1440px] px-5 md:px-20 py-14 flex flex-col gap-8">
      <div className="flex flex-col gap-3"><h1 className="text-[56px] md:text-[88px] font-extrabold tracking-[-0.03em] leading-none"><span className="num">3</span>blog.</h1><p className="text-[18px] md:text-[19px] leading-relaxed text-mid max-w-[620px]">Posts, newest first. Some are campaign breakdowns, some are about my family.</p></div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{posts.map((p) => <PostCard key={p.slug} post={p} showExcerpt />)}</div>
      {posts.length === 0 && <p className="hand text-[28px] text-mid">nothing here yet.</p>}
    </div>
  );
}
