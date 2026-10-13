import type { Metadata } from "next";
import { abs, pageMeta } from "@/lib/seo";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { JsonLd } from "@/components/JsonLd";

const title = "Marketing Blog: Brand Strategy Breakdowns";
const description = "I break down the marketing behind Graza, Ghia, Fishwife, and Duolingo, rank the brand activations that drew crowds, and share the email tips I use.";
// With the layout's " · Angel Phommachan" this runs 60 characters, so the title stands alone. Open Graph keeps the name.
export const metadata: Metadata = { ...pageMeta({ title, description, path: "/blog" }), title: { absolute: title } };

export default function Journal() {
  const posts = getAllPosts();
  const published = getAllPosts({ includeDrafts: false });
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: abs("/blog"),
    inLanguage: "en-US",
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: published.length,
      itemListElement: published.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: abs(`/blog/${p.slug}`), name: p.title })),
    },
  };
  return (
    <div className="mx-auto max-w-[1440px] px-5 md:px-20 py-14 flex flex-col gap-8">
      <JsonLd data={collection} />
      <div className="flex flex-col gap-3"><h1 className="text-h1 font-display font-normal tracking-[-0.01em] leading-none"><span className="num" aria-hidden="true">4</span>blog.</h1></div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{posts.map((p, i) => <PostCard key={p.slug} post={p} showMeta priority={i === 0} />)}</div>
      {posts.length === 0 && <p className="hand text-[20px] text-mid">nothing here yet.</p>}
    </div>
  );
}
