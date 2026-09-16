import { TrackLink } from "@/components/Track";

// A strip, not a numbered section. It answers the hiring question in one line and
// hands the rest to the full section on /about.
export function Bring() {
  return (
    <section aria-label="What I would bring to your team" className="border-t border-line py-6 flex flex-col gap-4 md:flex-row md:items-baseline md:gap-10">
      <span className="text-[13px] font-bold text-mid shrink-0">what I&apos;d bring.</span>
      <p className="text-[15px] md:text-[16px] leading-relaxed text-mid">
        If you run social or events and are buried in deadlines, here is the short version: <span className="font-bold text-ink">[What I&apos;d bring, pending: one thing I&apos;ve actually done, not an adjective, with the result that makes them want to contact me]</span>, <span className="font-bold text-ink">[What I&apos;d bring, pending: one thing I&apos;ve actually done, not an adjective, with the result that makes them want to contact me]</span>, <span className="font-bold text-ink">[What I&apos;d bring, pending: one thing I&apos;ve actually done, not an adjective, with the result that makes them want to contact me]</span>, and <span className="font-bold text-ink">[What I&apos;d bring, pending: one thing I&apos;ve actually done, not an adjective, with the result that makes them want to contact me]</span>.{" "}
        <TrackLink event="cta_home_bring" href="/about#bring" className="font-bold text-ink border-b-2 border-ink hover:text-accent hover:border-accent whitespace-nowrap">the long version &rarr;</TrackLink>
      </p>
    </section>
  );
}
