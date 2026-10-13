import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ghiaImagesReady } from "@/lib/work";
import { TrackView } from "./Track";
import { CaseCtaRow } from "./CaseStudyTemplate";
import s from "./GhiaEmailCase.module.css";

/* The page is in the site's own look. Ghia's look lives in the work: the email renders, their device
   frames, and the coded email. */

const IMG = "/images/case/ghia-email";
const CODE = "/emails/ghia/three-acts.html";
const POST = "/blog/behind-the-strategy-ghia";

/* The two renders, each a full-length screenshot at 2x. Desktop is 600 wide, phone is 375 wide. */
const SHOTS = [
  { key: "desktop", label: "Desktop", src: `${IMG}/email-desktop.jpg`, w: 1200, h: 6492, dur: "60s", delay: "0s", sizes: "(max-width: 767px) 300px, 420px" },
  { key: "phone", label: "Phone", src: `${IMG}/email-mobile.jpg`, w: 750, h: 6113, dur: "54s", delay: "-18s", sizes: "240px" },
] as const;

const BLOCKS = [
  {
    h: "The moment and the audience",
    p: "Ghia sells the hour before dinner. Most people who buy it also drink, so I did not write for a sober crowd. I wrote for the person who makes a weeknight dinner feel like an occasion.",
  },
  {
    h: "The offer and the one action",
    p: "No discount. The offer is the whole evening: two bottles, three moments. Every button goes to one place, the Apéritif Duo at $75.",
  },
] as const;

export function GhiaEmailCase() {
  return (
    <>
      <TrackView event="case_view_ghia-email" />

      <div className={s.root}>
        {/* hero: title, one line of vision, the disclaimer, then the subject and preview */}
        <header className={s.hero}>
          <div className={s.wrap}>
            <div className={s.lab}>Email &nbsp;&middot;&nbsp; Ghia</div>
            <h1 className={s.h1}>Tonight, in Three Acts</h1>
            <p className={s.by}>By <b>Angel Phommachan</b> &middot; October 2026</p>
            <p className={s.idea}>Ghia sells the hour before dinner. I wrote the email that sells the whole evening, one act at a time.</p>
            <p className={s.disclaim}>
              <b>Spec work.</b> Not affiliated with or commissioned by Ghia.{" "}
              {ghiaImagesReady
                ? "The photos are my own or credited free-license stock, not Ghia's."
                : "The photo slots are placeholders until my photos are in."}
            </p>
            <dl className={s.inbox}>
              <div><dt>Subject</dt><dd>Tonight, in three acts</dd></div>
              <div><dt>Preview</dt><dd>Act I starts at happy hour. Act III is one last sip.</dd></div>
            </dl>
          </div>
        </header>

        {/* the email, shown whole: desktop and phone renders drifting slowly in fixed windows */}
        <section className={s.emailBand} aria-labelledby="ghia-email-h">
          <div className={s.wrap}>
            <h2 id="ghia-email-h" className={s.h2}>The email</h2>
            <ol className={s.shelf}>
              {SHOTS.map((m) => (
                <li key={m.key} className={`${s.shelfItem} ${m.key === "phone" ? s.phone : s.desk}`}>
                  <p className={s.rowTitle}>{m.label}</p>
                  <div className={s.win}>
                    <div className={s.view} tabIndex={0} role="region" aria-label={`The email on ${m.label.toLowerCase()}. It scrolls slowly; hover or focus to pause.`}>
                      <Image
                        className={s.drift}
                        style={{ "--dur": m.dur, "--delay": m.delay } as CSSProperties}
                        src={m.src}
                        alt={`The Ghia spec email on ${m.label.toLowerCase()}, full length`}
                        width={m.w}
                        height={m.h}
                        sizes={m.sizes}
                        unoptimized
                        loading="eager"
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <p className={s.codeLine}>
              <a className={`hit ${s.codeLink}`} href={CODE} target="_blank" rel="noopener noreferrer">see the coded email&nbsp;&rarr;</a>
            </p>
          </div>
        </section>

        {/* what a marketer looks for */}
        <section className={s.notes}>
          <div className={`${s.wrap} ${s.grid}`}>
            {BLOCKS.map((b) => (
              <div key={b.h} className={s.block}>
                <h2 className={s.h3}>{b.h}</h2>
                <p>{b.p}</p>
              </div>
            ))}
            <figure className={s.block}>
              <h2 className={s.h3}>The number to beat</h2>
              <p className={s.big}>0.26%</p>
              <p>Food and beverage campaigns average a 0.26% placed order rate. This email has to beat it.</p>
              <figcaption className={s.src}>
                Source: <a className="hit underline underline-offset-2" href="https://www.klaviyo.com/uk/blog/email-marketing-benchmarks-open-click-and-conversion-rates" target="_blank" rel="noopener noreferrer">Klaviyo, Email Marketing Benchmarks 2026</a>.
              </figcaption>
            </figure>
          </div>
          <div className={s.wrap}>
            <p className={s.postLine}>
              <Link className={`hit ${s.codeLink}`} href={POST}>read the Ghia strategy post&nbsp;&rarr;</Link>
            </p>
          </div>
        </section>
      </div>

      <div className="mx-auto max-w-[1440px] px-5 md:px-20 py-8 md:py-10">
        <CaseCtaRow slug="ghia-email" concept />
      </div>
    </>
  );
}
