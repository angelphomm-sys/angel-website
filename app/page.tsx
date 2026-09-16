import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { work } from "@/lib/work";
import { PostCard } from "@/components/PostCard";
import { WorkBento } from "@/components/WorkBento";
import { Thinking } from "@/components/Thinking";
import { Statement } from "@/components/Statement";
import { Bring } from "@/components/Bring";
import { TrackLink } from "@/components/Track";
import { linkFor } from "@/lib/work";

// Only numbers that can be checked against a resume or an invoice. Campaign metrics
// join this list the week they can be exported from an account Angel still has open.
const numbers = [
  ["8 yrs", "running a photography business on referrals alone"],
  ["5", "marketing roles while finishing the degree"],
  ["3", "Google Ads certifications, plus HubSpot and Excel"],
];

function Section({ n, title, intro, aside, children, id }: { n?: number; title: string; intro?: string; aside?: React.ReactNode; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="border-t-2 border-ink pt-10 pb-12 flex flex-col gap-6 scroll-mt-20">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-[36px] md:text-[44px] font-extrabold tracking-[-0.03em] leading-none">{n ? <span className="num">{n}</span> : null}{title}</h2>
          {aside}
        </div>
        {intro && <p className="text-[17px] md:text-[18px] leading-relaxed text-mid max-w-[620px]">{intro}</p>}
      </div>
      {children}
    </section>
  );
}

export default function Home() {
  const posts = getAllPosts().filter((p) => !p.draft).slice(0, 3);
  return (
    <>
    <div className="mx-auto max-w-[1440px] px-5 md:px-20">
      {/* hello */}
      <section className="grid gap-8 lg:grid-cols-[1fr_440px] lg:gap-12 items-center py-6 md:py-8">
        <div className="flex flex-col gap-5 hero-in">
          <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-full lg:hidden">
            <Image src="/images/me/outdoor.jpg" alt="Angel Phommachan outdoors at golden hour" fill sizes="96px" className="object-cover" />
          </div>
          <h1 className="text-[44px] md:text-[76px] font-medium leading-[1.0] tracking-[-0.03em]">
            <span className="text-mid">hello,<br />my name is</span><br />
            <span className="font-extrabold text-accent">angel</span><span className="text-mid font-normal"> × </span><span className="font-extrabold text-accent">phommachan.</span>
          </h1>
          <div className="flex flex-col gap-3 max-w-[540px] leading-relaxed">
            <p className="text-[19px] md:text-[22px] font-bold tracking-[-0.015em] text-ink">[Hero headline, pending: claim who I am and the kind of marketer I am, in one line that earns the contact button below]</p>
            <p className="text-[16px] md:text-[17px] text-mid">[Hero subline, pending: what I focus on and who I want to work with, so the contact button feels aimed at them]</p>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <TrackLink event="cta_hero_contact" href="/contact" className="bg-ink text-white rounded-full px-6 py-3.5 text-[15px] font-bold hover:bg-mid transition-colors">[Hero button, pending: the one action, ask them to contact me]</TrackLink>
          </div>
        </div>
        <div className="relative hero-photo hidden lg:block">
          <div className="relative aspect-[4/5] max-h-[560px] overflow-hidden rounded-t-[280px] rounded-b-3xl">
            <Image src="/images/me/outdoor.jpg" alt="Angel Phommachan outdoors at golden hour" fill priority sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <Statement />

      {/* 2 work */}
      <Section n={2} title="work." id="work">
        <WorkBento items={work.slice(0, 3)} />
        <Link href="/work" className="self-center bg-ink text-white rounded-full px-6 py-3.5 text-[15px] font-bold hover:bg-mid transition-colors">see all {work.length} projects →</Link>
      </Section>

      {/* what I'd bring */}
      <Bring />

      {/* numbers */}
      <Section title="numbers." aside={<Link href="/stats" className="hand text-[24px] text-mid hover:text-accent">the live ones →</Link>}>
        <div className="grid gap-8 sm:grid-cols-3 border-t-2 border-ink pt-8">
          {numbers.map(([n, l]) => (
            <div key={l} className="flex flex-col gap-1.5">
              <span className="text-[52px] md:text-[64px] font-extrabold tracking-[-0.04em] text-accent leading-[0.85]">{n}</span>
              <span className="text-[14px] text-mid leading-snug max-w-[220px]">{l}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* how I think */}
      <Section title="how I think.">
        <Thinking />
      </Section>

      {/* for good */}
      <Section title="for good.">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Link href="/work" className="group relative overflow-hidden rounded-3xl aspect-[16/10] lg:aspect-auto lg:min-h-[360px]">
            <Image src="/images/hope/potluck-1.jpg" alt="Hope Scholars back-to-school potluck" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white flex flex-col gap-1"><span className="text-[11px] font-bold uppercase tracking-[0.08em] opacity-80">Hope Scholars · UVU</span><span className="text-[24px] font-extrabold tracking-[-0.02em] leading-tight">I&apos;m the program&apos;s marketing intern, and one of its first scholars.</span></div>
          </Link>
          <div className="flex flex-col gap-4">
            {work.filter((w) => w.lane === "nonprofit").map((w) => {
              const inner = (
                <>
                  <div className="flex flex-col gap-1"><span className="text-[19px] font-extrabold tracking-[-0.02em] leading-tight">{w.title}</span><span className="text-[14px] text-mid leading-snug">{w.blurb}</span></div>
                  <span className={`text-[12px] font-bold whitespace-nowrap ${w.status === "in-production" ? "text-accent" : "text-mid"}`}>{w.status === "in-production" ? "● in progress" : w.caseStudy ? "case study →" : "live"}</span>
                </>
              );
              const to = linkFor(w);
              const cls = "flex items-start justify-between gap-4 border-2 border-ink rounded-2xl p-5";
              return to ? <Link key={w.slug} href={to} className={`${cls} hover:bg-mist`}>{inner}</Link> : <div key={w.slug} className={cls}>{inner}</div>;
            })}
          </div>
        </div>
      </Section>

      {/* 3 blog */}
      <Section n={3} title="blog." aside={<Link href="/blog" className="text-[14px] font-bold border-b-2 border-ink hover:text-accent hover:border-accent">all posts</Link>}>
        <div className="grid gap-6 md:grid-cols-3">{posts.map((p) => <PostCard key={p.slug} post={p} />)}</div>
      </Section>
    </div>
    </>
  );
}
