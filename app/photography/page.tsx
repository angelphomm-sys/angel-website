import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Photography", description: "Prime Collectives, portrait, senior, and couples photography by Angel Phommachan, Utah." };

const shots = [
  { src: "/images/photography/proposal.jpg", alt: "Beach proposal at sunset", ratio: "4/5" },
  { src: "/images/photography/bike.jpg", alt: "Couple laughing on a pink cruiser bike", ratio: "4/5" },
  { src: "/images/photography/motorcycle.jpg", alt: "Rider on a motorcycle along a lake road", ratio: "16/9" },
  { src: "/images/photography/museum.jpg", alt: "Woman looking at paintings in a gallery", ratio: "4/5" },
  { src: "/images/photography/profile.jpg", alt: "Profile portrait in warm gallery light", ratio: "3/2" },
  { src: "/images/photography/grad-flowers.jpg", alt: "North Dakota State University graduate with flowers", ratio: "4/5" },
  { src: "/images/photography/field-dress.jpg", alt: "Senior portrait in a field", ratio: "4/5" },
  { src: "/images/photography/green-door.jpg", alt: "Senior portrait against a green wall", ratio: "4/5" },
  { src: "/images/photography/hands.jpg", alt: "Engaged couple's hands, pinky-linked", ratio: "4/3" },
  { src: "/images/photography/mountain.jpg", alt: "Senior portrait with mountains behind", ratio: "4/5" },
];

export default function Photography() {
  return (
    <>
      <section className="mx-auto max-w-[1440px] px-5 md:px-20 py-14 grid gap-6 md:grid-cols-[1fr_420px] md:items-end">
        <div className="flex flex-col gap-4">
          <span className="hand text-[26px] text-mid">prime collectives · 2018 to 2026</span>
          <h1 className="text-[56px] md:text-[88px] font-extrabold tracking-[-0.03em] leading-none">photography.</h1>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-[18px] leading-relaxed">Eight years of portraits, seniors, and couples, run as its own small business from the first message to the delivered gallery.</p>
          <p className="text-[16px] leading-relaxed text-mid">I still shoot because it is the fastest feedback loop in marketing. You get about four seconds to make a stranger comfortable, and if you get it wrong you can see it in the photo. Everything I know about directing a moment, I learned standing in a field with someone who did not want their picture taken.</p>
          <a href={site.socials.instagram} target="_blank" rel="noreferrer" className="text-[14px] font-bold border-b-2 border-ink self-start hover:text-accent">@primecollectives on Instagram ↗</a>
        </div>
      </section>
      <section className="border-t-2 border-ink">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20 py-10 columns-2 md:columns-3 gap-4 [&>*]:mb-4">
          {shots.map((s) => (
            <div key={s.src} className="relative rounded-2xl overflow-hidden break-inside-avoid" style={{ aspectRatio: s.ratio }}>
              <Image src={s.src} alt={s.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
