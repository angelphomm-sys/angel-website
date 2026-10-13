import { disciplines, type Discipline, type Lane, type Provenance, type WorkType } from "./site";
import { hasLiveSocial } from "./social";

const disciplineOrder = Object.keys(disciplines) as Discipline[];

// A visual slot. Give it a src, or a placeholder label to render a labelled empty frame until the real image exists.
export type Visual = { src?: string; alt: string; caption?: string; placeholder?: string };

// One row of the measurement plan. For finished work: what was tracked. For concepts: what would be tracked, and the hypothesis.
export type Measure = { metric: string; hypothesis: string; window: string; tool?: string };

// A real image with its real pixel size, so it can be laid out without a crop.
export type Shot = { src: string; alt: string; caption?: string; width: number; height: number };

export type CaseStudy = {
  // Concept studies are unsolicited work. The disclaimer is shown at the top, always.
  concept?: { disclaimer: string };
  // Client-confidential work. Shown at the top in the same place as a concept disclaimer.
  disclosure?: string;
  // One plain sentence on why this kind of work is hard, before the brief starts.
  opener?: string;
  // Optional. The finished page shown inline in a browser-style frame, so the work can be read on this
  // page instead of behind a click out to the tool it was built in. With an embedUrl the frame holds the
  // live page; without one it holds the screenshot at src. The link overrides the default open full size one.
  // Videos play on the screenshot at their spots on the page, so it reads like the live site with no click.
  // An overlay is a transparent cut of the screenshot (a headline, a product shot) that has to stay on top of a video.
  // All video and overlay positions are percents of the screenshot's width and height.
  pageFrame?: {
    title?: string; src: string; alt: string; url: string; width: number; height: number; embedUrl?: string; link?: { label: string; href: string };
    videos?: { src: string; poster: string; left: number; top: number; width: number; height: number }[];
    overlays?: { src: string; left: number; top: number; width: number; height: number }[];
  };
  // Three sentences. Given images turn the part into what I was given: the starting material, shown side by side.
  brief: { title?: string; ask: string; constraint: string; audience: string; given?: Shot[] };
  // Optional. Leave it off when the parts after it already show the work.
  work?: { text: string[]; visuals: Visual[]; beforeAfter?: { before: Visual; after: Visual; note?: string } };
  // Optional. Leave it off when the call is already made inside the analysis.
  decision?: { call: string; why: string; tradeoff: string };
  // Optional. A read of the work itself, folded in from what would otherwise be a separate post.
  // Renders as its own numbered part; body strings are paragraphs, and a [bracketed] one is a pending note.
  // A section with an image renders as a two-column row: the text on the left, the image on the right.
  analysis?: { title: string; intro?: string; sections: { heading: string; body: string[]; image?: Shot }[] };
  // Optional. Leave it off when there are no numbers to report.
  result?: { numbers: string[]; measure?: Measure[]; screenshots?: Visual[]; links?: { label: string; href: string }[] };
  differently: string[];
  role: string;
  tools: string[];
};

export type WorkItem = {
  slug: string; title: string; blurb: string; metric: string; channel: string; lane: Lane; type: WorkType;
  // Search-only overrides for the case page's <title>, Open Graph title, and meta description (140 to 155 characters).
  // The visible h1 and the card blurb keep `title` and `blurb`.
  seoTitle?: string; seoDescription?: string;
  // What /work groups by, and where the piece came from. `type` stays for older readers.
  discipline: Discipline; provenance: Provenance;
  // The one number or artifact line a card leads with. Falls back to `metric` when that already says it.
  // Only real numbers already on the case page. Never an estimate.
  proof?: string;
  // Who the work was for, shown on the card beside the provenance. Hidden when the title already names it.
  brand?: string;
  status?: "live" | "in-production" | "concept"; external?: string; post?: string; page?: string;
  // Filled in for items without a case study. Items with one derive these from the case study instead.
  client?: string; goal?: string; role?: string; tools?: string[]; result?: string;
  // `focus` is the CSS object-position for the card's fixed-ratio crop, so tall artwork shows its best part.
  preview: { video?: string; poster: string; focus?: string }; caseStudy?: CaseStudy;
};

// [brackets] and ___ both mean pending: the real thing has not been gathered yet.
// A bracket names the missing piece, a blank holds a number. Never put an estimate in either one.
// The social card only shows once at least one post has its clip or slides; until then it stays off the site.
const allWork: WorkItem[] = [
  {
    slug: "thai-google-ads",
    discipline: "paid-search",
    provenance: "class-client",
    brand: "Local Thai restaurant",
    // From the receipt on the case page: total conversions, click-through rate, average cost per click.
    proof: "73 conversions \u00b7 5.6% click rate \u00b7 $2.21 a click",
    type: "case-study",
    title: "Google Ads for a Local Thai Restaurant",
    seoDescription: "I built a Google Search campaign for a local Thai restaurant in Utah. In one month it drove 73 conversions at a 5.6% click-through rate from 109 clicks.",
    blurb:
      "I built a Google Search campaign for a local Thai restaurant in Utah. 73 conversions at a 5.6% click-through rate.",
    metric: "73 conversions \u00b7 5.6% CTR",
    channel: "Google Search \u00b7 paid",
    lane: "brand",
    client: "A local Thai restaurant in Utah",
    goal: "Build a Google Search campaign to drive takeout orders and online ordering",
    role: "Strategy, campaign build, keyword research, ad copy, and post-campaign analysis",
    tools: [
      "Google Ads",
      "Google Analytics",
      "Google Sheets",
      "Google Keyword Planner",
    ],
    result:
      "73 conversions at a 5.6% click-through rate from 109 clicks. A class project that the restaurant ran live.",
    preview: { poster: "/images/work/thai-ads-poster.jpg", focus: "50% 100%" },
    // Rendered by components/ThaiGoogleAdsCase.tsx, not by CaseStudyTemplate. Kept minimal on purpose:
    // the page copy lives in that component, and this object only routes and gates the case study.
    caseStudy: {
      opener: "I built a Google Search campaign for a local Thai restaurant in Utah.",
      brief: {
        ask: "Pick a local business. Build a Google Search campaign. Run it on a real budget.",
        constraint:
          "A small budget and a narrow geographic radius. Four weeks to build, present, and deliver a live campaign.",
        audience:
          "People in the area searching for Thai food, takeout, or the restaurant by name. Lunchtime intent. Mobile-first.",
      },
      work: {
        text: [
          "Ran a single Search campaign focused on takeout and online ordering. One campaign, tight keyword targeting, everything built around one action: get someone to the ordering page.",
          "Targeted what someone in this area would actually type. Thai near me. Thai food near me. The restaurant\u2019s own name.",
          "Wrote over a dozen headlines and pinned the restaurant\u2019s name to the first position so it appeared in every ad. The rest tested four angles: benefit, location, action, and specificity.",
          "Set up sitelinks: one for online takeout ordering, one for the full menu with a direct link to the ordering platform, and one for the contact page.",
        ],
        visuals: [],
      },
      decision: {
        call: "Specificity over warmth. Lunch over dinner. Action over atmosphere.",
        why: "Takeout is a convenience purchase. The people searching at noon want speed, not ambiance. Every element of the campaign was built to match that intent.",
        tradeoff:
          "Narrowing the message to lunch and takeout meant leaving dinner intent on the table.",
      },
      result: {
        numbers: [
          "73 conversions at a 5.6% click-through rate in one month.",
          "109 clicks from 2,000+ impressions.",
          "61% of traffic from mobile devices.",
        ],
      },
      differently: [
        "Expand negative keywords to block recipe, job, and delivery app queries.",
        "Schedule ads around lunch hours when intent peaks.",
        "Test a separate dinner ad group.",
      ],
      role: "Strategy, campaign build, keyword research, ad copy, and post-campaign analysis. A solo class project that the restaurant ran live.",
      tools: [
        "Google Ads",
        "Google Analytics",
        "Google Sheets",
        "Google Keyword Planner",
      ],
    },
  },
  {
    slug: "embracing-our-story",
    discipline: "events",
    provenance: "concept",
    brand: "Pi Mai Lao",
    proof: "nine pieces, print and social",
    type: "case-study",
    title: "Embracing Our Story",
    seoTitle: "Lao New Year Campaign: Embracing Our Story",
    seoDescription: "A concept campaign I built for Pi Mai Lao, the Lao New Year: a brand identity, print, and social for one free community day, each piece ending in one ask.",
    blurb:
      "A campaign that brands Pi Mai Lao, the Lao New Year, as one free community celebration a whole city plans its weekend around.",
    metric: "concept · print and social",
    channel: "Event · print & social",
    lane: "nonprofit",
    status: "concept",
    preview: { poster: "/images/work/embracing-frame.jpg", focus: "50% 50%" },
    // The case study itself is the bespoke page in components/EmbracingOurStoryCase.tsx.
    // What stays here is only what the cards and the router need.
    caseStudy: {
      concept: {
        disclaimer:
          "A self-initiated concept. The event, the venue, and the organizer are invented. No brand hired me for this. I built it to show event marketing end to end.",
      },
      brief: {
        ask: "Take Pi Mai Lao public. Brand one free community celebration so it reads like a real event, not a flyer taped to a door.",
        constraint: "One audience, one action, and a system that works on a phone first and still prints as a poster. Self-directed, with no client.",
        audience: "The Lao and Southeast Asian community first, then curious locals who love food and something to do.",
      },
      differently: [
        "Test the ask with a real landing page and sign-up.",
        "Shoot original photos, so the faces belong to this event.",
        "Set Lao beside English on the key pieces.",
      ],
      role: "Concept campaign, self-initiated. Strategy, brand identity, social, and event marketing.",
      tools: ["Adobe Express", "Canva", "Photoshop"],
    },
  },
  {
    slug: "jj-coffee-email",
    discipline: "email",
    provenance: "spec",
    brand: "JJ Coffee Co",
    proof: "3 emails, 5 versions, coded by hand",
    type: "email",
    title: "Slow Mornings",
    seoTitle: "JJ Coffee Email Campaign: Slow Mornings",
    seoDescription: "A fall email campaign I wrote and built for JJ Coffee Co as spec work. It sells a slow morning, not a syrup, across three emails and five versions.",
    blurb:
      "A three-email fall campaign for JJ Coffee Co that sells a slow morning, not a syrup.",
    metric: "spec · 3 emails, 5 versions",
    channel: "Email · lifecycle",
    lane: "brand",
    status: "concept",
    preview: { poster: "/images/work/jj-coffee-spread.jpg", focus: "50% 0%" },
    // The case study itself is the bespoke page in components/JJCoffeeEmailCase.tsx.
    // What stays here is only what the cards and the router need.
    caseStudy: {
      concept: {
        disclaimer:
          "Spec work. JJ Coffee Co didn't hire me. Photography: JJ Coffee Co product shots and credited stock from Unsplash and Pexels, used in a spec mockup. Their products and reviews are real. The offer, the code, the poll, and the design are mine; JJ runs no promo codes today, so SAVOR is a proposal, framed as a gift.",
      },
      brief: {
        ask: "Write the fall campaign the JJ Coffee Co signup promises: first access, a reason to open the next email, and a reason to visit a shop.",
        constraint: "JJ's sells syrup, but nobody wants syrup. And not everyone on a Utah list drinks coffee.",
        audience: "20s and 30s in Utah County and Salt Lake with full days. Their treat is a good drink, coffee or not.",
      },
      differently: [
        "Shoot original fall photos instead of using JJ's product shots.",
        "Let JJ's bar sales data choose the four drinks.",
        "Put the poll in the welcome email, so it runs on day one.",
        "Price the Fall Set, the shipping on us, and the pumps on us with JJ's.",
      ],
      role: "Spec campaign, self-initiated. Strategy, copy, art direction, email design, and HTML build.",
      tools: ["HTML and CSS email", "Klaviyo"],
    },
  },
  {
    slug: "ghia-email",
    discipline: "email",
    provenance: "spec",
    brand: "Ghia",
    proof: "1 email \u00b7 three acts",
    type: "email",
    title: "Tonight, in Three Acts",
    seoTitle: "Ghia Spec Email: Tonight, in Three Acts",
    seoDescription: "A spec email I wrote and built for Ghia. It sells one evening in three acts, from happy hour to nightcap, and ends in one ask: the Apéritif Duo.",
    blurb:
      "A spec email for Ghia that sells one evening in three acts, from happy hour to nightcap.",
    metric: "spec · 1 email",
    channel: "Email · campaign",
    lane: "brand",
    status: "concept",
    preview: { poster: "/images/work/ghia-email-poster.jpg", focus: "50% 0%" },
    // The case study itself is the bespoke page in components/GhiaEmailCase.tsx.
    // What stays here is only what the cards and the router need.
    caseStudy: {
      concept: {
        disclaimer:
          "Spec work. Not affiliated with or commissioned by Ghia, and never sent. The products, prices, and colors come from drinkghia.com. Every photo is my own or credited free-license stock, never Ghia's.",
      },
      brief: {
        ask: "Write a Ghia email that sells the whole evening, from happy hour to nightcap, and gets someone to buy the Apéritif Duo.",
        constraint: "One email, one action, no discount, no health claim, and no fact I could not find on Ghia's own site.",
        audience: "People who drink and host, and want a weeknight dinner to feel like an occasion.",
      },
      differently: ["[Differently, pending: one thing you would change on the email now]"],
      role: "Spec email, self-initiated. Strategy, copy, art direction, email design, and HTML build.",
      tools: ["HTML and CSS email"],
    },
  },
  {
    slug: "social-reels",
    discipline: "content",
    provenance: "client",
    proof: "the posts, on the phone",
    type: "content",
    title: "Social posts",
    blurb: "Short videos I shot, cut, and posted for Hope Scholars, UVU Athletics, and Prime Collectives.",
    metric: "posts: ___",
    channel: "Instagram · TikTok",
    lane: "nonprofit",
    client: "Hope Scholars, UVU Athletics, Prime Collectives",
    page: "/work/social",
    preview: { poster: "/images/work/social-poster.jpg", focus: "50% 50%" },
  },
  {
    slug: "kents-camera-castle-landing-page",
    discipline: "landing-page",
    provenance: "class",
    brand: "Kent's Camera Castle",
    proof: "goal: 5 orders a day",
    type: "case-study",
    title: "Kent's Camera Castle",
    seoTitle: "Kent's Camera Castle Landing Page",
    blurb: "I built Kent's Camera Castle a landing page with one job: turn a click on the store's winter ad into a HERO12 Black order. The goal: 5 orders a day.",
    metric: "goal: 5 orders a day",
    channel: "Landing page · Canva",
    lane: "brand",
    client: "Kent's Camera Castle, a class assignment for Digital Marketing 3660",
    preview: { poster: "/images/work/kents-laptop.jpg", focus: "50% 50%" },
    caseStudy: {
      disclosure:
        "A school project for Digital Marketing 3660, so there is no sales data. The store, the product, and the ad were given. The page, the copy, and the reasoning are mine.",
      brief: {
        title: "What I was given",
        ask: "Replace a landing page that was not converting, using the seven principles of conversion-centered design.",
        constraint: "Sell the HERO12 Black at $369.99, built in Canva.",
        audience: "Skiers and snowboarders who came from a winter sports ad.",
        given: [
          {
            src: "/images/work/landing-page/before.jpg",
            alt: "The store's existing GoPro Hero 4 landing page",
            caption: "The old page: still selling the Hero 4, lorem ipsum in the feature columns, one button that said \u201cPAY FOR IT.\u201d",
            width: 874,
            height: 1196,
          },
          {
            src: "/images/work/landing-page/display-ad.jpg",
            alt: "The display ad that sends people to the page",
            caption: "The ad the page had to match.",
            width: 1200,
            height: 1200,
          },
        ],
      },
      pageFrame: {
        title: "What I made",
        src: "/images/work/landing-page/mockup-full.jpg",
        alt: "The HERO12 Black landing page for Kent's Camera Castle, with its videos playing",
        url: "canva.com · the live page",
        width: 1440,
        height: 3462,
        link: { label: "open in Canva", href: "https://canva.link/kccgoproangelphomm" },
        // Measured on the 1440 x 3462 screenshot. Each video is cropped to Canva's framing, so it only needs object-fit: cover.
        // The second one is the turning camera-and-grip shot beside the three feature columns.
        videos: [
          { src: "/video/kents-camera-castle/hero.mp4", poster: "/video/kents-camera-castle/hero-poster.jpg", left: 57.2917, top: 0, width: 42.7083, height: 21.7215 },
          { src: "/video/kents-camera-castle/product.mp4", poster: "/video/kents-camera-castle/product-poster.jpg", left: 72.8604, top: 24.576, width: 27.1396, height: 11.7164 },
        ],
        // The camera shot overlaps the hero video's left edge, so it is laid back over the video.
        overlays: [
          { src: "/video/kents-camera-castle/camera-overlay.png", left: 57.2917, top: 4.1306, width: 5.625, height: 6.4125 },
        ],
      },
      analysis: {
        title: "Three of the seven principles",
        sections: [
          {
            heading: "Attention",
            body: [
              "One goal, one button, no navigation, nothing else to click.",
            ],
            image: { src: "/images/work/landing-page/sec-hero.jpg", alt: "The split hero: a black panel with the headline, price, and Buy Now button beside the snowboarder photo", width: 1440, height: 752 },
          },
          {
            heading: "Clarity",
            body: [
              "Each feature card leads with the outcome in bold, then the spec.",
            ],
            image: { src: "/images/work/landing-page/sec-performance.jpg", alt: "The \u201cBuilt for the mountain\u201d three-card feature grid with the Product Specs line underneath", width: 1440, height: 704 },
          },
          {
            heading: "Credibility",
            body: [
              "200+ verified 5-star Google reviews, three named quotes, and the Authorized GoPro\u00ae Reseller mark.",
            ],
            image: { src: "/images/work/landing-page/sec-reviews.jpg", alt: "The 5-star review section beside the In stock and Authorized GoPro Reseller card with its Buy Now button", width: 1440, height: 524 },
          },
        ],
      },
      differently: ["[Differently, pending: one thing you would change on the page now]"],
      role: "Class project, solo. Strategy, layout, copy, and the write-up.",
      tools: ["Canva", "Google Analytics 4"],
    },
  },
];
// The Ghia spec email waits on Angel's photos (the slots are listed in .harness/reports/ghia-email-images.md).
// Until this is true, the ghia-email card, its case page, and its sitemap entry exist in development only;
// a production build leaves them out and /case/ghia-email answers 404. Flip it once every slot is filled.
export const ghiaImagesReady = false;
const showUnfinished = process.env.NODE_ENV !== "production";

export const work: WorkItem[] = allWork.filter(
  (w) => (w.slug !== "social-reels" || hasLiveSocial) && (w.slug !== "ghia-email" || ghiaImagesReady || showUnfinished),
);

export const workByLane = (lane: Lane) => work.filter((w) => w.lane === lane);
export const getWork = (slug: string) => work.find((w) => w.slug === slug);
export const caseStudies = work.filter((w) => w.caseStudy);
export const proofFor = (w: WorkItem) => w.proof ?? w.metric;
// Work in `disciplines` order, stable within a discipline.
export const byDiscipline = (items: WorkItem[] = work) =>
  [...items].sort((a, b) => disciplineOrder.indexOf(a.discipline) - disciplineOrder.indexOf(b.discipline));
export const linkFor = (w: WorkItem) => (w.caseStudy ? `/case/${w.slug}` : w.page ?? w.post ?? w.external);
