import Image from "next/image";
import Link from "next/link";
import { linkFor, type WorkItem } from "@/lib/work";
import { lanes } from "@/lib/site";
import { VideoTile } from "./VideoTile";

// Editorial bento: one lead block, two supporting. Image first, words second.
// Deliberately asymmetric so the page has a rhythm instead of a row of matching cards.
function Card({ w, big = false }: { w: WorkItem; big?: boolean }) {
  const to = linkFor(w);
  const inner = (
    <>
      <div className={`relative overflow-hidden rounded-3xl ${big ? "aspect-[4/3] md:aspect-auto md:h-full" : "aspect-[4/3]"}`}>
        {w.preview.video ? (
          <VideoTile video={w.preview.video} poster={w.preview.poster} alt="" ratio={big ? "4/3" : "4/3"} className="absolute inset-0 !rounded-3xl h-full w-full" focusable={false} />
        ) : (
          <Image src={w.preview.poster} alt="" fill sizes={big ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 33vw, 100vw"} className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        )}
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 bg-gradient-to-t from-black/85 via-black/45 to-transparent text-white pointer-events-none">
          <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.1em] opacity-85">{lanes[w.lane].short} · {w.status === "concept" ? "spec" : w.status === "in-production" ? "in progress" : "case study"}</span>
          <h3 className={`font-extrabold tracking-[-0.02em] leading-tight ${big ? "text-[26px] md:text-[34px]" : "text-[18px] md:text-[20px]"} mt-1`}>{w.title}</h3>
          {big && <p className="text-[15px] leading-snug opacity-90 max-w-[440px] mt-2">{w.blurb}</p>}
          <span className={`inline-block font-bold text-white/95 ${big ? "text-[14px] mt-3" : "text-[12px] mt-1.5"}`}>{w.metric}</span>
        </div>
      </div>
    </>
  );
  const cls = `group block ${big ? "md:row-span-2 md:col-span-2 md:h-full" : ""}`;
  if (!to) return <div className={cls}>{inner}</div>;
  return to.startsWith("http")
    ? <a href={to} target="_blank" rel="noreferrer" className={cls} aria-label={`${w.title}, ${w.blurb}`}>{inner}</a>
    : <Link href={to} className={cls} aria-label={`${w.title}, ${w.blurb}`}>{inner}</Link>;
}


export function WorkBento({ items }: { items: WorkItem[] }) {
  const [lead, ...rest] = items;
  if (!lead) return null;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card w={lead} big />
      {rest.map((w) => <Card key={w.slug} w={w} />)}
    </div>
  );
}
