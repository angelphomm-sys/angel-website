import type { Metadata } from "next";
import { abs, pageMeta, person } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import Image from "next/image";
import { YouTube } from "@/components/Media";
import { Stack, Certifications } from "@/components/Stack";
import { ResumePreview } from "@/components/ResumePreview";
import { TrackLink } from "@/components/Track";
import { ContactForm } from "@/components/ContactForm";
import { Shelf } from "@/components/Shelf";
import { Screen } from "@/components/Screen";
import { shelf } from "@/lib/shelf";
import { testimonials } from "@/lib/testimonials";
import { BrandMark } from "@/components/Logo";

export const metadata: Metadata = pageMeta({ title: "About Angel Phommachan · Digital Marketing Specialist in Utah", absolute: true, description: "Angel Phommachan is a first-generation digital marketing specialist in Utah who works across search, email, social, and content.", path: "/about" });

// Mirrors the home page's local Section: the brand asterisk, the title, then the content.
function Section({ title, aside, children, id }: { title: string; aside?: React.ReactNode; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="pt-12 pb-8 flex flex-col gap-5 scroll-mt-20">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2.5 text-h2 font-display font-semibold leading-none"><BrandMark variant="asterisk" className="h-[0.55em] text-red" />{title}</h2>
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
            <h1 className="text-hero font-display font-semibold leading-[1.02] tracking-[-0.015em]">About me</h1>
            <p className="text-[19px] md:text-[21px] leading-relaxed max-w-[560px]">I&rsquo;m Angel Phommachan, a first-generation digital marketing specialist who works across search, email, social, and content. Off the clock, I&rsquo;m a portrait photographer.</p>
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
        <Section title="In their words">
          <div className={`grid gap-6 ${testimonials.length > 1 ? "md:grid-cols-2" : ""}`}>
            {testimonials.map((q) => (
              <figure key={q.name} className="m-0 flex flex-col gap-3">
                <blockquote className="m-0 text-[19px] md:text-[21px] font-semibold leading-snug tracking-[-0.015em]">&ldquo;{q.quote}&rdquo;</blockquote>
                <figcaption className="text-[14px]"><span className="font-bold">{q.name}</span> · {q.role}</figcaption>
              </figure>
            ))}
          </div>
        </Section>
      )}

      <Section title="Certified">
        <Certifications />
      </Section>

      <Section title="The stack">
        <Stack />
      </Section>

      {/* What shapes how I think: the books and films behind how I see people and stories, each opening to a
          favorite quote and the lesson I took for my work. Tap or hover to open. */}
      <Section title="What shapes how I think" id="shelf">
        <p className="text-[17px] leading-relaxed max-w-[60ch] -mt-1">Marketing is about why people believe something and why they show up. These are the books and films that taught me that. Hover or tap to open each one.</p>
        <h3 className="text-[13px] font-semibold uppercase tracking-[0.08em] mt-2">On my shelf</h3>
        <Shelf books={shelf.filter((b) => b.kind === "book")} />
        <h3 id="screen" className="text-[13px] font-semibold uppercase tracking-[0.08em] mt-6 scroll-mt-24">On my screen</h3>
        <Screen picks={shelf.filter((b) => b.kind === "film" || b.kind === "show")} />
      </Section>

      <Section title="Say hi" id="contact">
        <div className="max-w-[640px]"><ContactForm /></div>
      </Section>

      <Section title="On paper">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <TrackLink event="resume_download" href="/Angel_Phommachan_Resume.pdf" download className="self-start bg-accent text-cream rounded-full px-6 py-3.5 text-[15px] font-semibold hover:bg-accent-deep transition-colors whitespace-nowrap">Download my résumé (PDF) ↓</TrackLink>
          <a href="/Angel_Phommachan_Resume.pdf" target="_blank" rel="noopener noreferrer" className="hit text-[15px] font-semibold border-b-2 border-accent hover:text-accent-deep">Open full size ↗</a>
        </div>
        <ResumePreview />
      </Section>
    </div>
  );
}
