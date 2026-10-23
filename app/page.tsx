import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";
import { work } from "@/lib/work";
import { WorkCard, cardFor } from "@/components/ProjectList";
import { byDiscipline } from "@/lib/work";
import { site } from "@/lib/site";
import { og, person } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { BrandMark } from "@/components/Logo";

const homeTitle = `${site.name} · ${site.role.toLowerCase()}`;
export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: site.seoDescription,
  alternates: { canonical: "/" },
  openGraph: { ...og, title: homeTitle, description: site.seoDescription, url: "/" },
};

// Each section opens on the brand asterisk and its title, with the section's one call to action on the right.
function Section({ title, aside, children, id, className = "" }: { title: string; aside?: React.ReactNode; children: React.ReactNode; id?: string; className?: string }) {
  return (
    <section id={id} className={`pt-12 pb-10 flex flex-col gap-6 scroll-mt-20 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2.5 text-h2 leading-none"><BrandMark variant="asterisk" className="h-[0.55em] text-red" />{title}</h2>
        {aside}
      </div>
      {children}
    </section>
  );
}

const arrow = "hit text-[15px] font-semibold border-b-2 border-accent hover:text-accent-deep hover:border-accent-deep";

// Home stays short and work-first: who, the work with its proof, the latest posts.
// Every line here comes from lib/site.ts, so About and the footer say the same thing the same way.
export default function Home() {
  const posts = getAllPosts().filter((p) => !p.draft).slice(0, 3);
  // One card per discipline, in discipline order: paid search, email, events, landing page.
  const cards = byDiscipline(work).filter((w, i, all) => w.caseStudy && all.findIndex((x) => x.discipline === w.discipline) === i).slice(0, 4);
  return (
    <>
    <JsonLd data={{ "@context": "https://schema.org", ...person }} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.url }} />
    {/* hello: a red block with the stacked wordmark in cream, the one-line who, and the channels. Her flower mark turns slowly beside it, in cream, on wide screens. */}
    <section className="bg-red text-cream">
      <div className="mx-auto max-w-[1440px] px-5 md:px-20 py-12 md:py-20 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="flex flex-col gap-6 md:gap-8 hero-in min-w-0">
          <p className="text-[18px] md:text-[22px] font-medium">Hello, my name is</p>
          <h1 className="m-0">
            <span className="sr-only">{site.name}, {site.role.toLowerCase()}</span>
            <BrandMark variant="stacked" className="w-full max-w-[860px] text-cream" />
          </h1>
          <p className="max-w-[40ch] text-[19px] md:text-[23px] leading-snug font-medium tracking-[-0.01em]">I&apos;m a first-generation {site.role.toLowerCase()} who works across search, email, social, and content.</p>
          <ul className="flex flex-wrap gap-2" aria-label="What I do">
            {site.skills.map((s) => <li key={s} className="text-[14px] font-semibold border border-cream/60 rounded-full px-3.5 py-1.5 first-letter:uppercase">{s}</li>)}
          </ul>
        </div>
        <div className="hidden lg:block hero-photo"><BrandMark variant="asterisk" className="spin-slow h-[200px] xl:h-[240px] text-cream" /></div>
      </div>
    </section>

    <div className="mx-auto max-w-[1440px] px-5 md:px-20">
      {/* 2 work: four cards, each with where it came from and its one proof line. The full set lives on /work. */}
      <Section title="Work" id="work" aside={<Link href="/work" className={arrow}>All the work →</Link>}>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {cards.map((w) => <WorkCard key={w.slug} card={cardFor(w)} layout="stack" small />)}
        </div>
      </Section>

      {/* blog: the three latest, title and date. */}
      <Section title="Blog" aside={<Link href="/blog" className={arrow}>All posts →</Link>}>
        <ul className="flex flex-col border-b border-line">
          {posts.map((p) => (
            <li key={p.slug} className="border-t border-line">
              <Link href={`/blog/${p.slug}`} className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 transition-colors hover:text-accent-deep">
                <span className="text-[20px] md:text-[24px] font-semibold tracking-[-0.015em] leading-tight">{p.title}</span>
                <span className="text-[14px] font-medium whitespace-nowrap">{formatDate(p.date)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </div>
    </>
  );
}
