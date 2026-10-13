import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";
import { work } from "@/lib/work";
import { WorkCard, cardFor } from "@/components/ProjectList";
import { byDiscipline } from "@/lib/work";
import { site } from "@/lib/site";
import { og, person } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { MarkBadge } from "@/components/Logo";

const homeTitle = `${site.name} · ${site.role.toLowerCase()}`;
export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: site.seoDescription,
  alternates: { canonical: "/" },
  openGraph: { ...og, title: homeTitle, description: site.seoDescription, url: "/" },
};

// Section labels sit on the left rule and the section's one call to action closes it,
// so the eye runs title, work, action, then drops to the next label.
function Section({ n, title, aside, children, id }: { n?: number; title: string; aside?: React.ReactNode; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="pt-10 pb-8 flex flex-col gap-5 scroll-mt-20">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-h2 font-display font-normal tracking-[-0.01em] leading-none">{n ? <span className="num" aria-hidden="true">{n}</span> : null}{title}</h2>
        {aside}
      </div>
      {children}
    </section>
  );
}

const arrow = "hit font-mono text-[13px] font-medium tracking-[0.02em] border-b-2 border-accent hover:text-accent-deep hover:border-accent-deep";

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
    <div className="mx-auto max-w-[1440px] px-5 md:px-20">
      {/* hello: the name, the role, the promise, the channels. The badge from the brand sheet sits beside it on wide screens. */}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center py-5 md:py-8">
        <div className="flex flex-col gap-4 hero-in">
          <h1 className="text-hero leading-[1.02] tracking-[-0.01em]">
            hello,<br />my name is<br />
            <span className="italic text-accent">angel</span>{" "}<span className="italic text-accent">phommachan.</span>
          </h1>
          <p className="font-mono text-[12px] md:text-[13px] font-medium uppercase tracking-[0.1em]">{site.skills.join(" · ")}</p>
        </div>
        <MarkBadge className="hidden lg:inline-flex w-[200px] h-[200px] xl:w-[232px] xl:h-[232px] bg-blue text-oxblood mr-4 hero-photo" />
      </section>

      {/* 2 work: four cards, each with where it came from and its one proof line. The full set lives on /work. */}
      <Section n={2} title="work." id="work" aside={<Link href="/work" className={arrow}>all the work →</Link>}>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {cards.map((w) => <WorkCard key={w.slug} card={cardFor(w)} layout="stack" small />)}
        </div>
      </Section>


      {/* 4 blog: the three latest, title and date. */}
      <Section n={4} title="blog." aside={<Link href="/blog" className={arrow}>all posts →</Link>}>
        <ul className="flex flex-col border-b border-line">
          {posts.map((p) => (
            <li key={p.slug} className="border-t border-line">
              <Link href={`/blog/${p.slug}`} className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3.5 transition-colors hover:text-accent-deep">
                <span className="text-[20px] md:text-[24px] font-display font-normal tracking-[-0.01em] leading-tight">{p.title}</span>
                <span className="font-mono text-[12px] font-medium text-mid whitespace-nowrap group-hover:text-accent-deep">{formatDate(p.date)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </div>
    </>
  );
}
