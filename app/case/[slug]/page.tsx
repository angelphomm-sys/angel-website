import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getWork } from "@/lib/work";
import { CaseStudyTemplate } from "@/components/CaseStudyTemplate";

export function generateStaticParams() { return caseStudies.map((w) => ({ slug: w.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const w = getWork(slug); return w ? { title: w.title, description: w.blurb } : {};
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = getWork(slug);
  if (!w || !w.caseStudy) notFound();
  return <CaseStudyTemplate item={{ ...w, caseStudy: w.caseStudy }} />;
}
