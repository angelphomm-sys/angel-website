import Image from "next/image";
import { Archivo, Archivo_Black } from "next/font/google";
import { TrackView } from "./Track";
import { CaseProgress } from "./CaseProgress";
import { CaseCtaRow } from "./CaseStudyTemplate";
import s from "./EmbracingOurStoryCase.module.css";

/* The campaign's own typefaces, used only inside the Instagram profile mock-up (a piece of the work,
   built in HTML). The page text around it is the site's own. Scoped through CSS variables on the
   wrapper and never attached to <html>, so nothing else on the site sees them. */
const eosBody = Archivo({ subsets: ["latin"], display: "swap", variable: "--font-eos-body" });
const eosDisplay = Archivo_Black({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-eos-display" });

const IMG = "/images/case/embracing-our-story";

/* ── The crest ──────────────────────────────────────── */

const crestProps = { fill: "none", stroke: "currentColor", strokeWidth: 2.4, strokeLinejoin: "round" } as const;

// The open seal, for avatars and the grid tile.
function CrestOpen({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 78" {...crestProps} aria-hidden="true">
      <path d="M30 3 L30 16" /><circle cx="30" cy="20" r="3" />
      <path d="M30 26 L52 48 L30 70 L8 48 Z" /><path d="M30 36 L44 48 L30 60 L16 48 Z" />
    </svg>
  );
}

/* ── Content ────────────────────────────────────────── */

const SLUG = "embracing-our-story";

const GRID_IMGS = ["announce", "food", "dance"];
const GRID_IMGS_2 = ["textiles", "water"];


// One description per piece, shared by the phase thumbnails, the Instagram grid, and the gallery.
const ALT: Record<string, string> = {
  poster: "Embracing Our Story event poster",
  poster_dark: "Night edition of the Embracing Our Story poster",
  food: "Social post about the Lao kitchen",
  ticket: "Ticket set in three colorways",
  dance: "Social post about dance and music",
  textiles: "Social post about the market and makers",
  invite: "Save-the-date card",
  water: "Social post about the water blessing",
  announce: "Announcement post for Embracing Our Story",
  story: "Last-call countdown story",
};

const GALLERY = [
  { f: "poster", w: 1000, h: 1500, alt: ALT.poster, cap: "Event poster" },
  { f: "poster_dark", w: 1000, h: 1500, alt: ALT.poster_dark, cap: "Poster · night edition" },
  { f: "food", w: 1080, h: 1080, alt: ALT.food, cap: "01 · The Lao kitchen" },
  { f: "ticket", w: 1180, h: 1368, alt: ALT.ticket, cap: "Ticket · three colorways" },
  { f: "dance", w: 1080, h: 1080, alt: ALT.dance, cap: "02 · Dance & music" },
  { f: "textiles", w: 1080, h: 1080, alt: ALT.textiles, cap: "03 · Market & makers" },
  { f: "invite", w: 1000, h: 1400, alt: ALT.invite, cap: "Save the date" },
  { f: "water", w: 1080, h: 1080, alt: ALT.water, cap: "04 · Water blessing" },
  { f: "story", w: 1080, h: 1920, alt: ALT.story, cap: "Last-call story" },
];




/* ── The page ───────────────────────────────────────── */

export function EmbracingOurStoryCase() {
  return (
    <>
      <CaseProgress />
      <TrackView event="case_view_embracing-our-story" />

      {/* ── The case study, in the site's own look; the campaign's look stays in the pieces ── */}
      <div className={`${s.root} ${eosBody.variable} ${eosDisplay.variable}`}>

        {/* ── Hero ────────────────────────────────────── */}
        <header className={s.hero}>
          <div className={`${s.wrap} ${s.heroGrid}`}>
            <div>
              <div className={s.eyebrow}>Self-initiated concept campaign</div>
              <h1 className={s.heroTitle}>Embracing Our Story</h1>
              <p className={s.sub}>A Pi Mai Lao community celebration, branded for a full-city turnout.</p>
              <div className={s.cd}>
                <span className={s.cdDot} /><span className={s.cdLbl}>Sat, April 17 · Orem, Utah</span>
              </div>
            </div>
            <div className={s.art}>
              <Image className={s.artMain} src={`${IMG}/poster.jpg`} alt="Embracing Our Story event poster" width={1000} height={1500} sizes="(max-width: 820px) 340px, 42vw" priority />
            </div>
          </div>
        </header>

        {/* ── The idea: one paragraph and the one action ── */}
        <section id="concept">
          <div className={s.wrap}>
            <div className={s.head}>
              <div className={s.eyebrow}>The idea</div>
              <h2>A New Year the whole city is invited to</h2>
              <p>Pi Mai Lao is three days of water, blessing, and renewal. This campaign takes it public: one free day where Lao families celebrate and everyone is welcome. Every piece ends on one action: reserve a free spot.</p>
            </div>
          </div>
        </section>

        {/* ── Pieces ──────────────────────────────────── */}
        <section id="pieces">
          <div className={s.wrap}>
            <div className={s.head}>
              <div className={s.eyebrow}>The pieces</div>
              <h2>The full set</h2>
            </div>
            <div className={s.gal}>
              {GALLERY.map((g) => (
                <figure key={g.cap}>
                  <Image src={`${IMG}/${g.f}.jpg`} alt={g.alt} width={g.w} height={g.h} sizes="(max-width: 520px) 100vw, (max-width: 820px) 45vw, 350px" />
                  <figcaption>{g.cap}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── In context ──────────────────────────────── */}
        <section id="social">
          <div className={s.wrap}>
            <div className={s.head}>
              <div className={s.eyebrow}>In context</div>
              <h2>How it shows up in the feed</h2>
            </div>
            <div className="flex justify-center">
            <div className={s.profile}>
              <div className={s.pfTop}>
                <div className={s.pfAv}><CrestOpen /></div>
                <div className={s.pfStats}>
                  <div><div className={s.n}>9</div><div className={s.l}>posts</div></div>
                </div>
              </div>
              <div className={s.pfBio}>
                <div className={s.pfNm}>Embracing Our Story</div>
                <div>A Pi Mai Lao Celebration · Lao New Year</div>
                <div>Sat April 17 · 11–8 · Carterlane Pavilion, Orem UT</div>
                <div className={s.pfLk}>→ Reserve your free spot</div>
              </div>
              <div className={s.pfGrid}>
                {GRID_IMGS.map((f) => (
                  <div key={f} className={s.cell}><Image src={`${IMG}/${f}.jpg`} alt={ALT[f]} width={1080} height={1080} sizes="140px" /></div>
                ))}
                <div className={s.cell}><div className={`${s.tt} ${s.ttChar}`}><CrestOpen className={s.ttCr} /><div className={s.ttS}>Sabaidee Pi Mai</div></div></div>
                <div className={s.cell}><div className={`${s.tt} ${s.ttRed}`}><div className={s.ttB}>APRIL<br />17</div><div className={s.ttS}>11 – 8</div></div></div>
                {GRID_IMGS_2.map((f) => (
                  <div key={f} className={s.cell}><Image src={`${IMG}/${f}.jpg`} alt={ALT[f]} width={1080} height={1080} sizes="140px" /></div>
                ))}
                <div className={s.cell}><div className={`${s.tt} ${s.ttCream}`}><div className={`${s.ttS} ${s.ttRedInk}`}>Reserve</div><div className={`${s.ttB} ${s.ttInk}`}>FREE<br />SPOT</div></div></div>
                <div className={s.cell}><div className={`${s.tt} ${s.ttRed}`}><div className={s.ttB}>EMBRACING<br />OUR STORY</div></div></div>
              </div>
            </div>
            </div>
          </div>
        </section>

      </div>

      <div className="mx-auto max-w-[1440px] px-5 md:px-20 py-10 md:py-14 flex flex-col gap-10">
        <CaseCtaRow slug={SLUG} concept />
      </div>
    </>
  );
}
