import type { CSSProperties } from "react";
import Image from "next/image";
import { ghiaImagesReady } from "@/lib/work";
import { TrackView } from "./Track";
import { CaseCtaRow } from "./CaseStudyTemplate";
import s from "./GhiaEmailCase.module.css";

/* Dry-ish January. The page is in the site's own look, modeled on the JJ Coffee case (JJCoffeeEmailCase.tsx).
   Ghia's look lives in the work: the three email renders. The coded files are not linked; visitors stay here. */

const IMG = "/images/case/ghia-email";

const SUBNAV = [["#emails", "Emails"], ["#strategy", "Strategy"], ["#build", "Build"]] as const;

/* The three emails. Desktop screenshots are 1200 wide (600 at 2x); dh is each one's height. */
const EMAILS = [
  { n: "01", label: "Start the ritual", line: "Jan 2. The 6 o’clock spritz, Ghia’s own recipe.", subj: "Dry-ish January starts at 6", dh: 3398 },
  { n: "02", label: "The week-two slump", line: "Jan 14. Lands when most people slip.", subj: "Week two. Still here?", dh: 3518 },
  { n: "03", label: "Keep the good part", line: "Jan 31. Turns January into a subscription.", subj: "January’s done. Keep the good part.", dh: 3140 },
];

/* Each email's pass, and where it starts, so the three never move in step. */
const PACE = [
  { dur: "40s", delay: "0s" },
  { dur: "46s", delay: "-17s" },
  { dur: "38s", delay: "-29s" },
];

const CIVIC = "https://civicscience.com/dry-january-on-the-rocks-participation-is-up-but-completion-rates-slip/";
const MASARIN = "https://hannahslist.substack.com/p/q-and-a-melanie-masarin-of-ghia";

export function GhiaEmailCase() {
  return (
    <>
      <TrackView event="case_view_ghia-email" />

      <div className={s.root}>
        {/* sub-nav */}
        <div className={s.subnav}>
          <div className={s.subnavIn}>
            <div className={s.subnavBrand}>Dry-ish January</div>
            <nav className={s.subnavLinks} aria-label="Sections of this case study">
              {SUBNAV.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
            </nav>
          </div>
        </div>

        {/* hero: label, title, by-line, and the spec note; the emails follow right after */}
        <header className={s.hero}>
          <div className={s.wrap}>
            <div className={s.lab}>Spec email campaign &middot; Ghia</div>
            <h1 className={s.h1}>Dry-ish January</h1>
            <p className={s.by}>By <b>Angel Phommachan</b> &middot; October 2026</p>
            <p className={s.disclaim}>
              <b>Spec work.</b> Ghia didn&apos;t hire me for this.{" "}
              {ghiaImagesReady ? "Photos are my own." : "Photos are placeholders until I shoot them."}
            </p>
          </div>
        </header>

        {/* the three emails, shown whole: full-length renders drifting slowly in a row */}
        <section id="emails" className={s.emailsBand}>
          <div className={s.wrap}>
            <div className={s.gallery}>
              <div className={s.galleryHead}>
                <div className={s.lab}>The emails</div>
                <h2 className={s.h2}>The three emails</h2>
              </div>
              <ol className={s.shelf} aria-label="The three emails">
                {EMAILS.map((m, i) => {
                  const pace = PACE[i % PACE.length];
                  return (
                    <li key={m.n} className={s.shelfItem}>
                      <p className={s.rowTitle}><span className={s.rowNum}>{m.n}</span> {m.label}</p>
                      <p className={s.rowLine}>{m.line}</p>
                      <div className={s.win}>
                        <div
                          className={s.view}
                          tabIndex={0}
                          role="region"
                          aria-label={`Email ${m.n}, ${m.subj}. It scrolls slowly; hover or focus to pause.`}
                        >
                          <Image
                            className={s.drift}
                            style={{ "--dur": pace.dur, "--delay": pace.delay } as CSSProperties}
                            src={`${IMG}/dryish-${m.n}-desktop.jpg`}
                            alt={`Email ${Number(m.n)}, ${m.subj}, full length`}
                            width={1200}
                            height={m.dh}
                            sizes="(max-width: 767px) 260px, 300px"
                          />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </section>

        {/* strategy: why the series runs the way it does, and the one number to watch */}
        <section id="strategy">
          <div className={s.wrap}>
            <div className={s.lab}>The strategy</div>
            <h2 className={s.h2}>Never ask anyone to quit</h2>
            <p className={s.para}>
              Dry January is a big promise and a hard month. In 2026, 20% of people who tried it didn&apos;t finish, and
              people under more stress were more likely to go back to drinking (<a className="hit underline underline-offset-2" href={CIVIC} target="_blank" rel="noopener noreferrer">CivicScience, January 2026</a>).
              Ghia&apos;s founder <a className="hit underline underline-offset-2" href={MASARIN} target="_blank" rel="noopener noreferrer">says most of her buyers still drink</a>,
              so this series never asks anyone to quit. It adds a ritual and shows up mid-month, when people slip.
            </p>
            <dl className={s.build}>
              <div><dt>The number to watch</dt><dd>New Subscribe &amp; Save starts from email 3.</dd></div>
            </dl>
          </div>
        </section>

        {/* build */}
        <section id="build">
          <div className={s.wrap}>
            <div className={s.lab}>The build</div>
            <h2 className={s.h2}>Inbox-ready</h2>
            <p className={s.line}>Three emails, coded by hand. Every link is tagged.</p>
          </div>
        </section>
      </div>

      {/* where to next, in the site's own voice */}
      <div className="mx-auto max-w-[1440px] px-5 md:px-20 py-8 md:py-10">
        <CaseCtaRow slug="ghia-email" concept />
      </div>
    </>
  );
}
