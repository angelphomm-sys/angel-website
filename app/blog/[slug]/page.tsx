import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, getSeries, getRelated, getAdjacent, formatDate, isoDate, proseWordCount } from "@/lib/posts";
import { lanes, postTypes, site } from "@/lib/site";
import { Mdx } from "@/components/Mdx";
import { PostCard } from "@/components/PostCard";
import { CoverImage } from "@/components/CoverImage";
import { Comments } from "@/components/Comments";
import { commentsEnabled } from "@/lib/comments";
import { ShareBar } from "@/components/ShareBar";
import { TrackLink } from "@/components/Track";
import { JsonLd } from "@/components/JsonLd";
import { abs, breadcrumbs, clip, defaultOgImage, og, person } from "@/lib/seo";
import { publicImageSize } from "@/lib/image-size";

export async function generateStaticParams() { return getAllPosts({ includeDrafts: true }).map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const post = getPost(slug); if (!post) return {};
  const description = clip(post.excerpt);
  // The layout template adds " · Angel Phommachan". Past 60 characters search results cut the title, so long ones stand alone.
  const title = `${post.title} · ${site.name}`.length > 60 ? { absolute: post.title } : post.title;
  // No openGraph/twitter images here: the card comes from ./opengraph-image.tsx and ./twitter-image.tsx.
  return {
    title, description, keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      ...og, title: post.title, description, type: "article", url: `/blog/${post.slug}`,
      publishedTime: isoDate(post.date), modifiedTime: isoDate(post.updated ?? post.date),
      authors: [abs("/about")], section: post.series ?? post.laneKey, tags: post.keywords,
    },
    twitter: { card: "summary_large_image", title: post.title, description },
    robots: post.draft ? { index: false } : undefined,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post || (post.draft && process.env.NODE_ENV === "production")) notFound();
  const related = getRelated(post);
  const { older, newer } = getAdjacent(post);
  const series = post.series ? getSeries(post.series) : [];
  const idx = series.findIndex((p) => p.slug === post.slug);
  const wordCount = proseWordCount(post.content);
  const url = abs(`/blog/${post.slug}`);
  const coverSize = post.cover ? await publicImageSize(post.cover) : undefined;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    headline: post.title,
    description: post.excerpt,
    image: [
      { "@type": "ImageObject", url: abs(`/blog/${post.slug}/opengraph-image`), width: defaultOgImage.width, height: defaultOgImage.height },
      ...(post.cover ? [{
        "@type": "ImageObject", url: abs(post.cover), ...coverSize,
        ...(post.coverCredit ? { creditText: post.coverCredit } : {}),
        ...(post.coverCredit && post.coverCreditUrl ? { acquireLicensePage: post.coverCreditUrl } : {}),
      }] : []),
    ],
    datePublished: isoDate(post.date),
    dateModified: isoDate(post.updated ?? post.date),
    author: person, // the same Person as home: "@id" /#person, url the site root. Open Graph authors above still points at /about.
    publisher: { "@id": person["@id"], "@type": "Person", name: site.name, url: site.url, image: person.image },
    isPartOf: { "@type": "Blog", name: `${site.name} · Blog`, url: abs("/blog") },
    keywords: post.keywords?.join(", "),
    // The series or lane, then the post type ("Sectional", "List", ...).
    articleSection: [post.series ?? (post.lane ? lanes[post.lane].name : "Story"), postTypes[post.type] ?? "Blog"],
    wordCount,
    inLanguage: "en-US",
    // A brand breakdown names its subject, so search engines can tie the post to that brand's entity.
    ...(post.brand ? { about: { "@type": "Brand", name: post.brand.name, url: post.brand.url, sameAs: [post.brand.url] } } : {}),
  };
  return (
    <article className="mx-auto max-w-[1440px] px-5 md:px-20">
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }])} />
      <header className="py-12 md:py-16 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[1fr_minmax(0,760px)_1fr]">
        <div className="font-mono text-[12px] font-medium text-mid flex gap-2"><Link href="/blog" className="hit hover:text-accent-deep">blog</Link></div>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2 text-[11px] font-mono font-medium uppercase tracking-[0.08em] text-mid"><time dateTime={post.date}>{formatDate(post.date)}</time>{post.updated && post.updated !== post.date && <><span>·</span><span>updated <time dateTime={post.updated}>{formatDate(post.updated)}</time></span></>}<span>·</span><span>{post.readingTime} min</span>{post.series && <><span>·</span><span className="text-accent-deep">{post.series}</span></>}{post.draft && <span className="bg-[#fff6cc] text-ink rounded-full px-2.5 py-1">draft</span>}</div>
          <h1 className="text-title font-display font-normal tracking-[-0.01em] leading-[1.12] text-balance">{post.title}</h1>
          {post.excerpt && <p className="text-[19px] md:text-[21px] leading-snug text-mid">{post.excerpt}</p>}
          <div className="flex items-center gap-3"><div className="relative w-10 h-10 rounded-full overflow-hidden"><Image src="/images/me/avatar.jpg" alt="" fill sizes="40px" className="object-cover" /></div><div className="flex flex-col"><Link href="/about" rel="author" className="text-[13px] font-bold hover:text-accent-deep">Angel Phommachan</Link><span className="text-[11px] font-mono font-medium uppercase tracking-[0.08em] text-mid">{site.role.toLowerCase()}</span></div></div>
        </div>
      </header>
      {post.cover && <CoverImage variant="hero" src={post.cover} alt={post.coverAlt ?? post.title} priority credit={post.coverCredit} creditUrl={post.coverCreditUrl} />}
      <div className="py-12 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[1fr_minmax(0,760px)_1fr]"><div className="hidden lg:block" /><Mdx source={post.content} /><div className="hidden lg:block" /></div>
      <div className="pb-14 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[1fr_minmax(0,760px)_1fr]"><div className="hidden lg:block" />
        <div className="flex flex-col gap-4 min-w-0">
          {post.cta && (
            <div className="bg-accent text-cream rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="hand text-[18px] leading-tight">one thing to do next.</span>
              <TrackLink event={`postcta_${post.slug}`} href={post.cta.href} className="inline-flex items-center gap-2 max-w-full text-[15px] font-bold bg-cream text-ink rounded-full px-5 py-3 hover:bg-blue transition-colors" {...(post.cta.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{post.cta.label} →</TrackLink>
            </div>
          )}
          <ShareBar slug={post.slug} path={`/blog/${post.slug}`} title={post.title} />
          {series.length > 1 && (
            <div className="border-2 border-line rounded-3xl p-5 flex flex-col gap-2">
              <span className="text-[11px] font-mono font-medium uppercase tracking-[0.08em] text-mid">{post.series} · {idx + 1} of {series.length}</span>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[14px] font-bold">
                {idx > 0 && <Link href={`/blog/${series[idx - 1].slug}`} className="hit hover:text-accent-deep">← {series[idx - 1].title}</Link>}
                {idx < series.length - 1 && <Link href={`/blog/${series[idx + 1].slug}`} className="hit hover:text-accent-deep">{series[idx + 1].title} →</Link>}
              </div>
            </div>
          )}
          {(older || newer) && (
            <nav aria-label="More posts by date" className="flex flex-col sm:flex-row sm:justify-between gap-x-6 gap-y-2 text-[14px] font-bold">
              {older ? <Link href={`/blog/${older.slug}`} className="hit hover:text-accent-deep">← {older.title}</Link> : <span />}
              {newer && <Link href={`/blog/${newer.slug}`} className="hit hover:text-accent-deep sm:text-right">{newer.title} →</Link>}
            </nav>
          )}
        </div><div className="hidden lg:block" /></div>
      {commentsEnabled && <div className="py-12 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[1fr_minmax(0,760px)_1fr]"><div className="hidden lg:block" /><div className="flex flex-col gap-5 min-w-0"><h2 id="comments" className="text-h3 font-display font-normal tracking-[-0.01em] scroll-mt-24">comments.</h2><Comments /></div><div className="hidden lg:block" /></div>}
      {related.length > 0 && <div className="py-12 flex flex-col gap-6"><h2 className="text-h2 font-display font-normal tracking-[-0.01em]">read next.</h2><div className="grid gap-6 md:grid-cols-3">{related.map((p) => <PostCard key={p.slug} post={p} layout="row" />)}</div></div>}
    </article>
  );
}
