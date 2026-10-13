import { TrackView } from "./Track";
import { CaseCtaRow } from "./CaseStudyTemplate";
import { JJCoffeeEmailViewer } from "./JJCoffeeEmailViewer";
import s from "./JJCoffeeEmailCase.module.css";

/* The page is in the site's own look. JJ Coffee Co's look lives in the work: the email renders and the coded emails.
   The work first: the three emails shown whole, right under the title. Copy stays short. */

const SUBNAV = [["#emails", "Emails"], ["#strategy", "Strategy"], ["#build", "Build"]] as const;

/* The three emails. Desktop screenshots are 1200 wide (600 at 2x); dh is each one's height. */
const EMAILS = [
  { n: "01", label: "Sell the slow morning", line: "Pumpkin Pie leads. The code SAVOR means shipping on us.", subj: "Slow mornings are back", dh: 7524 },
  { n: "02", label: "Ask how they take it", line: "Four drinks, one tap. The answer picks Thursday’s email.", subj: "How do you take it?", dh: 6572 },
  { n: "03", label: "Bring your person in", line: "Say SAVOR at either bar. A pump is on us, for you both.", subj: "Bring your person. It’s on us.", dh: 7598 },
];

const BUILD = [
  ["Five versions", "One per answer."],
  ["Tracked", "Every link is tagged."],
];

/* The strategy: three jobs, in the order the emails send. */
const FLOW = [
  ["Sell", "Email 1 leads with one fall drink. SAVOR makes shipping free."],
  ["Learn", "Email 2 asks one question. The tap picks Thursday’s email."],
  ["Bring", "Email 3 moves it in person. Say SAVOR at the bar, a pump on us for two."],
];

export function JJCoffeeEmailCase() {
  return (
    <>
      <TrackView event="case_view_jj-coffee-email" />

      <div className={s.root}>
        {/* sub-nav */}
        <div className={s.subnav}>
          <div className={s.subnavIn}>
            <div className={s.subnavBrand}>Slow Mornings</div>
            <nav className={s.subnavLinks} aria-label="Sections of this case study">
              {SUBNAV.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
            </nav>
          </div>
        </div>

        {/* hero: title, by-line, one line on the idea, and the disclaimer; the emails follow right after */}
        <header className={s.hero}>
          <div className={s.wrap}>
            <div className={s.lab}>Spec email campaign &middot; JJ Coffee Co</div>
            <h1 className={s.h1}>Slow <span>Mornings</span></h1>
            <p className={s.by}>By <b>Angel Phommachan</b> &middot; September 2026</p>
            <p className={s.disclaim}><b>Spec work.</b> JJ Coffee Co didn&apos;t hire me for this. Photos are JJ&apos;s product shots plus credited stock (<a className="hit underline underline-offset-2" href="/emails/jj-coffee/CREDITS.md">photo credits</a>).</p>
          </div>
        </header>

        {/* the three emails, shown whole: full-length renders drifting slowly in a row */}
        <section id="emails" className={s.emailsBand}>
          <div className={s.wrap}>
            <JJCoffeeEmailViewer
              emails={EMAILS}
              codeHref="/emails/jj-coffee/01-slow-mornings.html"
              head={<>
                <div className={s.lab}>The emails</div>
                <h2 className={s.h2}>The three emails</h2>
              </>}
            />
          </div>
        </section>

        {/* strategy: how the three emails work together */}
        <section id="strategy">
          <div className={s.wrap}>
            <div className={s.lab}>The strategy</div>
            <h2 className={s.h2}>One word, three jobs</h2>
            <p className={s.line}>Written for people already on JJ&apos;s list. Each email moves them a step closer to the bar.</p>
            <dl className={s.build}>
              {FLOW.map(([h, p]) => <div key={h}><dt>{h}</dt><dd>{p}</dd></div>)}
            </dl>
          </div>
        </section>

        {/* build */}
        <section id="build">
          <div className={s.wrap}>
            <div className={s.lab}>The build</div>
            <h2 className={s.h2}>Inbox-ready</h2>
            <p className={s.line}>I coded all five versions by hand in HTML and CSS.</p>
            <dl className={s.build}>
              {BUILD.map(([h, p]) => <div key={h}><dt>{h}</dt><dd>{p}</dd></div>)}
            </dl>
          </div>
        </section>

      </div>

      {/* where to next, in the site's own voice */}
      <div className="mx-auto max-w-[1440px] px-5 md:px-20 py-8 md:py-10">
        <CaseCtaRow slug="jj-coffee-email" concept />
      </div>
    </>
  );
}
