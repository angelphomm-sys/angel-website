import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import s from "./JJCoffeeEmailCase.module.css";

export type ViewerEmail = {
  n: string;
  label: string;
  line: string;
  subj: string;
  /* desktop screenshot height; the shot is 1200 wide (600 at 2x) */
  dh: number;
};

const IMG = "/images/case/jj-coffee-email";

/* Each email's pass, and where it starts, so the three never move in step. */
const PACE = [
  { dur: "52s", delay: "0s" },
  { dur: "58s", delay: "-21s" },
  { dur: "48s", delay: "-38s" },
];

/* The three emails shown whole, like a gallery wall: each full-length desktop render sits in a fixed-height
   window and drifts slowly down and back up. Hover or focus pauses it; reduced motion keeps each at its top.
   A short caption sits above each one. The coded files are one small link under the row. */
export function JJCoffeeEmailViewer({ emails, head, codeHref }: { emails: ViewerEmail[]; head: ReactNode; codeHref: string }) {
  return (
    <div className={s.gallery}>
      <div className={s.galleryHead}>{head}</div>

      <ol className={s.shelf} aria-label="The three emails">
        {emails.map((m, i) => {
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
                    src={`${IMG}/email-${Number(m.n)}-desktop.jpg`}
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

      <p className={s.codeLine}>
        <a className={`hit ${s.codeLink}`} href={codeHref} target="_blank" rel="noopener noreferrer">see the coded emails&nbsp;&rarr;</a>
      </p>
    </div>
  );
}
