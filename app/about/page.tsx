import type { Metadata } from "next";
import { abs, pageMeta, person } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import Image from "next/image";
import { YouTube } from "@/components/Media";
import { Stack, Certifications } from "@/components/Stack";
import { TrackLink } from "@/components/Track";
import { ContactForm } from "@/components/ContactForm";
import { Shelf } from "@/components/Shelf";
import { shelf } from "@/lib/shelf";
import { testimonials } from "@/lib/testimonials";

export const metadata: Metadata = pageMeta({ title: "About Angel Phommachan · Integrated Marketer in Utah", absolute: true, description: "From Warroad, Minnesota, to Utah. I run the marketing for Hope Scholars, UVU's scholarship program for first-generation students, as its marketing intern.", path: "/about" });

// Mirrors the home page's local Section: tight top, heading sits right on its content.
function Section({ title, aside, children, id }: { title: string; aside?: React.ReactNode; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="pt-10 pb-8 flex flex-col gap-5 scroll-mt-20">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-h2 font-display font-normal tracking-[-0.01em] leading-none">{title}</h2>
        {aside}
      </div>
      {children}
    </section>
  );
}

// The hello page already says what I do and shows the work. This page holds the rest: where I am from,
// what I believe (the mission and four values from lib/site.ts, each with its proof), the proof on paper, and the résumé.

export default function About() {
  const videoId = process.env.NEXT_PUBLIC_ABOUT_VIDEO_ID;
  return (
    <div className="mx-auto max-w-[1440px] px-5 md:px-20">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ProfilePage", url: abs("/about"), mainEntity: person }} />
      {/* 5 about me: the line and the video left, the portrait right */}
      <section className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12 items-center py-6 md:py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="text-hero font-display font-normal leading-[1.02] tracking-[-0.01em]"><span className="num" aria-hidden="true">5</span>about me.</h1>
          </div>
          {/* The 60-second video, once it exists. Nothing shows until NEXT_PUBLIC_ABOUT_VIDEO_ID is set. */}
          {videoId && (
            <div id="video" className="scroll-mt-24 w-full max-w-[400px]">
              <YouTube id={videoId} title="About Angel Phommachan" />
            </div>
          )}
        </div>
        <div className="relative w-full max-w-[400px] mx-auto lg:mx-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[280px] rounded-b-3xl bg-mist">
            <Image src="/images/me/about.jpg" alt="Angel Phommachan smiling in a light blue cardigan against a plain wall" fill priority sizes="(min-width: 1024px) 400px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <Section title="in their words.">
          <div className={`grid gap-6 ${testimonials.length > 1 ? "md:grid-cols-2" : ""}`}>
            {testimonials.map((q) => (
              <figure key={q.name} className="m-0 flex flex-col gap-3">
                <blockquote className="m-0 text-[19px] md:text-[21px] font-semibold leading-snug tracking-[-0.01em]">&ldquo;{q.quote}&rdquo;</blockquote>
                <figcaption className="text-[14px]"><span className="font-bold">{q.name}</span> · {q.role}</figcaption>
              </figure>
            ))}
          </div>
        </Section>
      )}

      <Section title="certified.">
        <Certifications />
      </Section>

      <Section title="the stack.">
        <Stack />
      </Section>

      <Section title="on my shelf." id="shelf">
        <Shelf books={shelf.filter((b) => b.kind === "book")} />
      </Section>

      <Section title="say hi." id="contact">
        <div className="max-w-[640px]"><ContactForm /></div>
      </Section>

      <Section title="on paper.">
        <TrackLink event="resume_download" href="/Angel_Phommachan_Resume.pdf" className="self-start bg-accent text-cream rounded-full px-6 py-3.5 font-mono text-[14px] font-medium lowercase tracking-[0.02em] hover:bg-accent-deep transition-colors whitespace-nowrap">download my résumé (pdf) →</TrackLink>
      </Section>
    </div>
  );
}
