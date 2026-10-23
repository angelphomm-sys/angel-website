import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import { site } from "@/lib/site";
import { TrackLink } from "@/components/Track";

export const metadata: Metadata = pageMeta({ title: "Portrait Photography in Utah", description: "Portrait, senior, and couples photography in Utah. Eight years of Prime Collectives, run as my own small business from first message to delivered gallery.", path: "/photography" });

const shots = [
  { src: "/images/photography/couple-veah-cade-sunset-proposal.jpg", alt: "Proposal on the rocks at sunset as a wave breaks behind the couple", ratio: "3/4" },
  { src: "/images/photography/couple-leah-cam-beach.jpg", alt: "Engaged couple sitting on the sand by the ocean, laughing as he kisses her cheek", ratio: "7/5" },
  { src: "/images/photography/couple-veah-cade-hands-up.jpg", alt: "Couple on a cliff edge with their hands raised together against a blue sky", ratio: "2/3" },
  { src: "/images/photography/senior-sophia-grass.jpg", alt: "Portrait seated in the grass, chin resting on her hand", ratio: "2/3" },
  { src: "/images/photography/engagement-sunset-cliffs.jpg", alt: "Engagement session on the cliffs and beach at sunset: the couple hand in hand on the rocks, the ring, and a kiss on the sand", ratio: "4/5" },
  { src: "/images/photography/senior-gracie-lake.jpg", alt: "Senior at a mountain lake, looking back over her shoulder at golden hour", ratio: "5/7" },
  { src: "/images/photography/bike.jpg", alt: "Couple laughing on a pink cruiser bike", ratio: "4/5" },
  { src: "/images/photography/grad-minard-hall.jpg", alt: "Graduate in a gold stole lifting her cap outside Minard Hall", ratio: "79/100" },
  { src: "/images/photography/motorcycle.jpg", alt: "Rider on a motorcycle along a lake road", ratio: "16/9" },
  { src: "/images/photography/museum.jpg", alt: "Woman looking at paintings in a gallery", ratio: "4/5" },
  { src: "/images/photography/senior-rihanna-grass.jpg", alt: "Senior lying in the grass under spring trees, chin in her hand", ratio: "2/3" },
  { src: "/images/photography/profile.jpg", alt: "Profile portrait in warm gallery light", ratio: "3/2" },
  { src: "/images/photography/headshot-sophia-walkway.jpg", alt: "Portrait on a tree-lined campus walkway", ratio: "3/4" },
  { src: "/images/photography/grad-flowers.jpg", alt: "North Dakota State University graduate with flowers", ratio: "4/5" },
  { src: "/images/photography/hands.jpg", alt: "Engaged couple's hands, pinky-linked", ratio: "4/3" },
];

export default function Photography() {
  return (
    <>
      <section className="mx-auto max-w-[1440px] px-5 md:px-20 py-8 md:py-10 grid gap-6 xl:grid-cols-[1fr_420px] xl:items-end">
        <div className="flex flex-col gap-4">
          <h1 className="text-[40px] sm:text-[56px] md:text-[88px] font-display font-semibold tracking-[-0.015em] leading-none">Photography</h1>
        </div>
        <div className="flex gap-5 items-end">
          <div className="relative shrink-0 w-[112px] sm:w-[140px] aspect-[2/3] rounded-2xl overflow-hidden bg-mist">
            <Image src="/images/me/photographer.jpg" alt="Angel Phommachan sitting on pavement with a Nikon camera, laughing, snowy mountains behind her" fill preload sizes="140px" className="object-cover" />
          </div>
        <div className="flex flex-col gap-3">
          <p className="text-[18px] leading-relaxed">Eight years of portraits, seniors, and couples, run as its own small business from the first message to the delivered gallery.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="hit font-mono text-[13px] font-medium tracking-[0.02em] border-b-2 border-accent self-start hover:text-accent-deep">@primecollectives on Instagram ↗</a>
          </div>
        </div>
        </div>
      </section>
      <section className="">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20 py-10 columns-2 md:columns-3 gap-4 [&>*]:mb-4">
          {/* The first three sit above the fold, so they preload instead of waiting on lazy loading. */}
          {shots.map((s, i) => (
            <div key={s.src} className="relative rounded-2xl overflow-hidden break-inside-avoid" style={{ aspectRatio: s.ratio }}>
              <Image src={s.src} alt={s.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" preload={i < 3} />
            </div>
          ))}
        </div>
        <div className="mx-auto max-w-[1440px] px-5 md:px-20 pb-12">
          <TrackLink event="cta_photo_contact" href="/contact" className="inline-flex bg-accent text-cream rounded-full px-6 py-3.5 text-[15px] font-semibold hover:bg-accent-deep transition-colors">Say hi about a shoot →</TrackLink>
        </div>
      </section>
    </>
  );
}
