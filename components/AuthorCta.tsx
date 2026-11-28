import Image from "next/image";
import { TrackLink } from "./Track";

// The end of every post: who wrote it and one next step, the way most strong marketing blogs close
// (an author line for credibility, then a single call to action). It replaces the old LinkedIn share line.
export function AuthorCta({ slug }: { slug: string }) {
  return (
    <section aria-label="About the author" className="border-t border-line pt-6 flex flex-col sm:flex-row sm:items-center gap-5">
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <div className="relative w-14 h-14 shrink-0 rounded-full overflow-hidden">
          <Image src="/images/me/avatar.jpg" alt="Angel Phommachan" fill sizes="56px" className="object-cover" />
        </div>
        <p className="m-0 text-[16px] leading-snug">
          <span className="font-semibold">Written by Angel Phommachan</span>, digital marketing specialist
        </p>
      </div>
      <TrackLink event={`postcta_${slug}_work`} href="/work" className="self-start sm:self-center shrink-0 inline-flex items-center bg-accent text-cream rounded-full px-5 py-3 text-[15px] font-semibold hover:bg-accent-deep transition-colors whitespace-nowrap">See my work →</TrackLink>
    </section>
  );
}
