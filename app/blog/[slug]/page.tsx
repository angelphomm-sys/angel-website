import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, getSeries, formatDate } from "@/lib/posts";
import { site } from "@/lib/site";
import { Mdx } from "@/components/Mdx";
import { PostCard } from "@/components/PostCard";
import { Comments } from "@/components/Comments";
import { SubscribeForm } from "@/components/SubscribeForm";
import { ShareBar } from "@/components/ShareBar";
import { TrackLink } from "@/components/Track";

export async function generateStaticParams() { return getAllPosts({ includeDrafts: true }).map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const post = getPost(slug); if (!post) return {};
  return {
    title: post.title, description: post.excerpt, keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, type: "article", publishedTime: post.date, authors: [site.name], images: post.cover ? [post.cover] : undefined },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
    robots: post.draft ? { index: false } : undefined,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post || (post.draft && process.env.NODE_ENV === "production")) notFound();
  const related = getAllPosts().filter((p) => p.slug !== post.slug && (!post.lane || p.lane === post.lane)).slice(0, 3);
  const series = post.series ? getSeries(post.series) : [];
  const idx = series.findIndex((p) => p.slug === post.slug);
  const jsonLd = { "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.excerpt, datePublished: post.date, author: { "@type": "Person", name: site.name, url: site.url }, image: post.cover ? `${site.url}${post.cover}` : undefined, keywords: post.keywords?.join(", "), mainEntityOfPage: `${site.url}/blog/${post.slug}` };
  return (
    <article className="mx-auto max-w-[1440px] px-5 md:px-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="py-12 md:py-16 grid gap-6 lg:grid-cols-[1fr_760px_1fr]">
        <div className="text-[12px] font-bold text-mid flex gap-2"><Link href="/blog" className="hover:text-accent">blog</Link></div>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.08em] text-mid"><span>{formatDate(post.date)}</span><span>·</span><span>{post.readingTime} min</span>{post.series && <><span>·</span><span className="text-accent">{post.series}</span></>}{post.draft && <span className="bg-[#fff6cc] text-ink rounded-full px-2.5 py-1">draft</span>}</div>
          <h1 className="text-[36px] md:text-[56px] font-extrabold tracking-[-0.03em] leading-[1.02] text-balance">{post.title}</h1>
          {post.excerpt && <p className="text-[19px] md:text-[21px] leading-snug text-mid">{post.excerpt}</p>}
          <div className="flex items-center gap-3"><div className="relative w-10 h-10 rounded-full overflow-hidden"><Image src="/images/me/headshot-1.jpg" alt="Angel Phommachan" fill sizes="40px" className="object-cover" /></div><div className="flex flex-col"><span className="text-[13px] font-bold">Angel Phommachan</span><span className="text-[11px] font-bold uppercase tracking-[0.08em] text-mid">marketer · photographer · first-gen</span></div></div>
        </div>
      </header>
      {post.cover && <div className="relative aspect-[21/9] overflow-hidden rounded-3xl"><Image src={post.cover} alt={post.coverAlt ?? post.title} fill priority sizes="100vw" className="object-cover" /></div>}
      <div className="py-12 grid gap-10 lg:grid-cols-[1fr_760px_1fr]"><div className="hidden lg:block" /><Mdx source={post.content} /><div className="hidden lg:block" /></div>
      <div className="pb-14 grid gap-10 lg:grid-cols-[1fr_760px_1fr]"><div className="hidden lg:block" />
        <div className="flex flex-col gap-4">
          {post.cta && (
            <div className="bg-ink text-white rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="hand text-[26px] leading-tight">one thing to do next.</span>
              <TrackLink event={`postcta_${post.slug}`} href={post.cta.href} className="inline-flex items-center gap-2 text-[15px] font-bold bg-white text-ink rounded-full px-5 py-3 hover:bg-mist transition-colors" {...(post.cta.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>{post.cta.label} →</TrackLink>
            </div>
          )}
          <ShareBar slug={post.slug} path={`/blog/${post.slug}`} title={post.title} />
          {series.length > 1 && (
            <div className="border-2 border-line rounded-3xl p-5 flex flex-col gap-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-mid">{post.series} · {idx + 1} of {series.length}</span>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[14px] font-bold">
                {idx > 0 && <Link href={`/blog/${series[idx - 1].slug}`} className="hover:text-accent">← {series[idx - 1].title}</Link>}
                {idx < series.length - 1 && <Link href={`/blog/${series[idx + 1].slug}`} className="hover:text-accent">{series[idx + 1].title} →</Link>}
              </div>
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/blog" className="flex flex-col justify-between gap-6 border-2 border-ink rounded-3xl p-6 hover:-translate-y-0.5 transition-transform" style={{ background: "#f6f1ec" }}><span className="text-[11px] font-bold uppercase tracking-[0.08em] text-mid">more posts</span><span className="text-[22px] font-extrabold tracking-[-0.02em]">back to the blog →</span></Link>
            <Link href="/contact" className="flex flex-col justify-between gap-6 bg-ink text-white rounded-3xl p-6 hover:bg-mid transition-colors"><span className="text-[11px] font-bold uppercase tracking-[0.08em] opacity-70">hiring for this?</span><span className="text-[22px] font-extrabold tracking-[-0.02em]">say hi →</span></Link>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between border-2 border-ink rounded-3xl p-5"><span className="hand text-[24px] text-mid">get the next post by email.</span><div className="sm:w-[320px]"><SubscribeForm compact /></div></div>
        </div><div className="hidden lg:block" /></div>
      <div className="border-t-2 border-ink py-12 grid gap-10 lg:grid-cols-[1fr_760px_1fr]"><div className="hidden lg:block" /><div className="flex flex-col gap-5"><h2 id="comments" className="text-[28px] font-extrabold tracking-[-0.03em] scroll-mt-24">comments · open</h2><Comments /></div><div className="hidden lg:block" /></div>
      {related.length > 0 && <div className="border-t-2 border-ink py-12 flex flex-col gap-6"><h2 className="text-[36px] font-extrabold tracking-[-0.03em]">read next.</h2><div className="grid gap-6 md:grid-cols-3">{related.map((p) => <PostCard key={p.slug} post={p} />)}</div></div>}
    </article>
  );
}
