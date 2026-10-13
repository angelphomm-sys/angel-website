import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { ProjectList } from "@/components/ProjectList";
import { disciplines, type Discipline } from "@/lib/site";
import { work } from "@/lib/work";
import { SocialSpecRow } from "@/components/SocialSpecRow";

export const metadata: Metadata = pageMeta({ title: "Marketing Portfolio: Campaigns, Email, and Content", absolute: true, description: "Work I planned and built, sorted by channel: Google Ads for a Thai restaurant, spec emails for a coffee shop, a Lao New Year concept, and a landing page.", path: "/work" });

// Groups in `disciplines` order, only for disciplines that have work. Photography lives on its own page (in the nav), not here.
// ?type= and ?lane= are no longer read, so old links land on the full page.
const groups = (Object.keys(disciplines) as Discipline[])
  .filter((d) => d !== "photography")
  .map((d) => ({ d, items: work.filter((w) => w.discipline === d) }))
  .filter((g) => g.items.length > 0);

// Compact on purpose: each group is a short header over one row whose height is set by its fixed-ratio image,
// so two full rows fit a 1280x800 screen and each card fits one phone screen.
export default function Work() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 md:px-20 py-6 md:py-8 flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <h1 className="text-h1 font-display font-normal tracking-[-0.01em] leading-none"><span className="num" aria-hidden="true">2</span>work.</h1>
      </div>
      {groups.map(({ d, items }) => (
        <section key={d} id={d} className="pt-8 pb-6 flex flex-col gap-4 scroll-mt-20">
          <h2 className="text-h3 font-display font-normal tracking-[-0.01em] leading-none">{disciplines[d]}</h2>
          <ProjectList items={items} />
        </section>
      ))}
      {/* Spec social posts for brands I write about: designs, not results. */}
      <section id="social" className="pt-8 pb-6 flex flex-col gap-4 scroll-mt-20">
        <h2 className="text-h3 font-display font-normal tracking-[-0.01em] leading-none">social.</h2>
        <SocialSpecRow />
      </section>
    </div>
  );
}
