import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getWork, type WorkItem } from "@/lib/work";
import { site } from "@/lib/site";
import { abs, breadcrumbs, clip, og, person } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { CaseStudyTemplate } from "@/components/CaseStudyTemplate";
import { ThaiGoogleAdsCase } from "@/components/ThaiGoogleAdsCase";
import { EmbracingOurStoryCase } from "@/components/EmbracingOurStoryCase";
import { JJCoffeeEmailCase } from "@/components/JJCoffeeEmailCase";
import { GhiaEmailCase } from "@/components/GhiaEmailCase";

export function generateStaticParams() { return caseStudies.map((w) => ({ slug: w.slug })); }
// A written seoDescription wins. A bracketed blurb is a pending placeholder; search results get the case study's opener instead.
function describe(w: WorkItem) {
  if (w.seoDescription) return clip(w.seoDescription);
  return clip(w.blurb.startsWith("[") && w.caseStudy?.opener ? `${w.title}. ${w.caseStudy.opener}` : w.blurb);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const w = getWork(slug); if (!w) return {};
  const description = describe(w); const path = `/case/${w.slug}`;
  // The search title, not the visible h1. The name suffix is dropped when it would push the title past 60 characters.
  const t = w.seoTitle ?? w.title; const withName = `${t} · ${site.name}`; const fits = withName.length <= 60;
  return {
    title: fits ? t : { absolute: t }, description, alternates: { canonical: path },
    openGraph: { ...og, type: "article", title: fits ? withName : t, description, url: path, images: [w.preview.poster] },
    twitter: { card: "summary_large_image", images: [w.preview.poster] },
  };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = getWork(slug);
  if (!w || !w.caseStudy) notFound();
  const path = `/case/${w.slug}`;
  const ld = (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CreativeWork", name: w.title, description: describe(w), image: abs(w.preview.poster), url: abs(path), author: person }} />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }, { name: w.title, path }])} />
    </>
  );
  if (slug === "thai-google-ads") return <>{ld}<ThaiGoogleAdsCase /></>;
  if (slug === "embracing-our-story") return <>{ld}<EmbracingOurStoryCase /></>;
  if (slug === "jj-coffee-email") return <>{ld}<JJCoffeeEmailCase /></>;
  if (slug === "ghia-email") return <>{ld}<GhiaEmailCase /></>;
  return <>{ld}<CaseStudyTemplate item={{ ...w, caseStudy: w.caseStudy }} /></>;
}
