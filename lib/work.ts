import type { Lane, WorkType } from "./site";

// A visual slot. Give it a src, or a placeholder label to render a labelled empty frame until the real image exists.
export type Visual = { src?: string; alt: string; caption?: string; placeholder?: string };

// One row of the measurement plan. For finished work: what was tracked. For concepts: what would be tracked, and the hypothesis.
export type Measure = { metric: string; hypothesis: string; window: string; tool?: string };

export type CaseStudy = {
  // Concept studies are unsolicited work. The disclaimer is shown at the top, always.
  concept?: { disclaimer: string };
  // One plain sentence on why this kind of work is hard, before the brief starts.
  opener?: string;
  brief: { ask: string; constraint: string; audience: string };
  work: { text: string[]; visuals: Visual[]; beforeAfter?: { before: Visual; after: Visual; note?: string } };
  decision: { call: string; why: string; tradeoff: string };
  result: { numbers: string[]; measure?: Measure[]; screenshots?: Visual[]; links?: { label: string; href: string }[] };
  differently: string[];
  role: string;
  tools: string[];
};

export type WorkItem = {
  slug: string; title: string; blurb: string; metric: string; channel: string; lane: Lane; type: WorkType;
  status?: "live" | "in-production" | "concept"; external?: string; post?: string; page?: string;
  // Filled in for items without a case study. Items with one derive these from the case study instead.
  client?: string; goal?: string; role?: string; tools?: string[]; result?: string;
  preview: { video?: string; poster: string }; caseStudy?: CaseStudy;
};

// [brackets] and ___ both mean pending: the real thing has not been gathered yet.
// A bracket names the missing piece, a blank holds a number. Never put an estimate in either one.
export const work: WorkItem[] = [
  {
    slug: "yoodlize-party",
    type: "case-study",
    title: "“Throw the perfect party”",
    blurb: "[Project card, pending: my role, one result with a number if I have it, and what it proves]",
    metric: "Click-through rate lift: ___ · split test",
    channel: "YouTube · paid",
    lane: "entertainment",
    post: "/blog/yoodlize-youtube-campaign",
    preview: { poster: "/images/work/yoodlize-spot.jpg" },
    caseStudy: {
      opener: "Paid video is where opinions go to die. You can argue about an opening cut for a week, or you can run both and read the number on Friday.",
      brief: {
        ask: "Improve click-through and watch time on Yoodlize's YouTube video creative and grow the brand's YouTube and Instagram presence during the fall 2025 campaign.",
        constraint: "A small paid budget, creative that already existed, and a four-month internship window.",
        audience: "People planning a party or a trip who would rather rent the bounce house, the speaker, or the tables from a neighbor than buy them.",
      },
      work: {
        text: [
          "Set up A/B tests on the spot's opening three seconds: an app-first explainer against a party-first payoff.",
          "Tested thumbnails and titles against each other, kept winners, cut losers weekly.",
          "Managed the Instagram and YouTube calendar so organic posts echoed what the paid creative said.",
          "Analyzed campaign data each week and fed what worked back into the next round.",
        ],
        visuals: [
          { src: "https://i.ytimg.com/vi/ej_czc-ro38/hqdefault.jpg", alt: "Throw the perfect party with Yoodlize", caption: "The spot on YouTube" },
          { src: "/images/stock/dashboard.jpg", alt: "Placeholder for the YouTube Studio view of click-through rate by variant", caption: "[Replace with the YouTube Studio view: click-through rate by variant]" },
        ],
      },
      decision: {
        call: "Open on the party, not the app.",
        why: "Nobody wants to rent a table. They want the night to go well. The variant that showed the outcome first earned the click; the variant that explained the mechanics first lost people before the product appeared.",
        tradeoff: "Less time explaining how Yoodlize works, which meant the landing page had to do that job. We accepted a slightly higher bounce on the page for a much better click rate on the ad.",
      },
      result: {
        numbers: [
          "The party-first variant beat the app-first variant on click-through by ___ and on average view duration by ___. YouTube Ads export pending.",
          "Channel subscriber growth over the internship: ___.",
          "Organic posts that crossed ___ views: ___.",
        ],
        measure: [
          { metric: "Click-through rate by variant", hypothesis: "Outcome-first beats product-first in the opening three seconds.", window: "Weekly, per test", tool: "YouTube Ads" },
          { metric: "Average view duration", hypothesis: "The party-first cut holds people past the point where the product appears.", window: "Weekly, per test", tool: "YouTube Studio" },
          { metric: "Landing page bounce", hypothesis: "Less explanation in the ad means the page has to do more. Watch that it does.", window: "Weekly", tool: "Google Analytics" },
          { metric: "Subscribers and organic views", hypothesis: "Organic posts that echo the paid creative compound its reach.", window: "Monthly", tool: "YouTube Studio, Instagram insights" },
        ],
        links: [{ label: "Watch the spot", href: "https://www.youtube.com/watch?v=ej_czc-ro38" }],
      },
      differently: [
        "Cut a vertical version first. The audience discovering a party-rental app is on Shorts and Reels.",
        "Hold the last shot two seconds longer. It is the emotional peak and it was rushed.",
        "Add a specific: a price and a distance beat \"everything you need.\"",
      ],
      role: "Marketing and operations intern. Testing, analysis, and channel management. Creative produced with the Yoodlize team.",
      tools: ["YouTube Ads", "YouTube Studio", "Instagram", "Google Sheets", "Canva"],
    },
  },
  {
    slug: "jj-coffee-popup",
    type: "case-study",
    title: "JJ Coffee: the pop-up and the email that follows it",
    blurb: "[Project card, pending: my role, one result with a number if I have it, and what it proves]",
    metric: "spec · experiential + email",
    channel: "Pop-up · email · Instagram",
    lane: "brand",
    status: "concept",
    goal: "Give the people who buy the syrups from far away what the Salt Lake line gets, and turn the at-home latte into a habit.",
    result: "Spec work, so no results yet. The measurement plan is in the case study.",
    preview: { poster: "/images/work/jj-coffee-poster.jpg" },
    caseStudy: {
      opener: "A pop-up is the only marketing where you find out immediately. People walk up or they walk past, and nobody has to fill in a survey to tell you which.",
      concept: { disclaimer: "JJ Coffee did not commission this. It is spec work built from public information: their site, their two shops, and their social channels. The brand, the syrups, and the founders are theirs." },
      brief: {
        ask: "JJ Coffee is two Utah shops, Orem and a Salt Lake City location that opened in December 2025 to a line out the door, and a line of barista-grade syrups sold online and shipped nationwide. The brief I set: give the people who buy the syrups from far away the thing the line in Salt Lake gets, and use email to make the at-home latte a habit, not a one-time order.",
        constraint: "A small team that runs two shops. No agency budget. A product that is easy to ship and hard to explain: a syrup is a means to a drink, and the drink is the reason people care.",
        audience: "Two people. The syrup buyer who has never stood in the shop: found the brand on TikTok, bought a bottle, and is not sure what to do with it on a Tuesday. And the local regular who will drive to a pop-up and post about it.",
      },
      work: {
        text: [
          "Audited the brand's public channels: the online store, the two shop listings, Instagram and TikTok, and what the welcome email says today. [screenshots, pending]",
          "Designed a two-day pop-up, the Latte Bar, built for the city that orders the most syrup and has no shop: a counter, three drinks, every drink made with a syrup you can buy at the table, and a card that goes home with the bottle.",
          "Wrote a three-email flow to follow the pop-up and to welcome every new syrup order: the recipe card email, the second-week email, and the restock email. Each one written the way the baristas talk, not the way a store talks.",
          "Planned the social layer: a countdown, a day-of Story sequence, and a rule that every post shows a drink being made, never a bottle on a shelf.",
          "Mocked up the pieces in Canva: the counter menu, the take-home card, the three emails, and the Story set.",
        ],
        visuals: [
          { alt: "Audit: JJ Coffee channels today", placeholder: "[Audit screenshots: online store, welcome email, Instagram grid]" },
          { alt: "The Latte Bar counter menu", placeholder: "[Canva mockup: the counter menu, three drinks, three syrups]" },
          { alt: "The take-home card", placeholder: "[Canva mockup: the card that goes home with the bottle]" },
          { alt: "Email 1: the recipe card", placeholder: "[Canva mockup: email 1, the recipe card]" },
          { alt: "Email 2: the second week", placeholder: "[Canva mockup: email 2, the second week]" },
          { alt: "Email 3: the restock", placeholder: "[Canva mockup: email 3, the restock]" },
        ],
        beforeAfter: {
          before: { alt: "The welcome email today", placeholder: "[Screenshot: the current welcome email after a syrup order]" },
          after: { alt: "The recipe card email", placeholder: "[Canva mockup: email 1, the recipe card]" },
          note: "Before: an order confirmation. After: the barista telling you how to make the drink you came for.",
        },
      },
      decision: {
        call: "Sell the drink, not the syrup.",
        why: "The line outside the Salt Lake shop is not for a bottle. It is for a specific latte made by a specific person. Everything in this concept moves that experience closer to the person who cannot get to the shop: the pop-up puts the drink in her hand, and the first email puts the recipe in her inbox before the bottle arrives. The syrup is the souvenir of the drink, not the product.",
        tradeoff: "Fewer bottles sold at the pop-up counter than a straight retail table would sell. Accepted, because a bottle sold with a recipe gets used, and a bottle that gets used gets reordered.",
      },
      result: {
        numbers: ["This is spec work, so there are no results yet. The plan below is what I would agree on with the founders before the first weekend."],
        measure: [
          { metric: "Pop-up walk-ins and drinks served", hypothesis: "A counter that makes drinks draws a line that a table of bottles does not.", window: "Both days, counted at the counter", tool: "Tally, square reports" },
          { metric: "Syrup orders with the pop-up code", hypothesis: "People buy the syrup after the drink, not before.", window: "The weekend plus 14 days", tool: "Shopify" },
          { metric: "Email 1 open and click", hypothesis: "A recipe from the barista beats a discount from the store.", window: "First 30 days of the flow", tool: "Klaviyo" },
          { metric: "Reorder rate at 45 days", hypothesis: "Buyers who open the recipe email reorder at a higher rate than buyers who do not.", window: "45 days per cohort", tool: "Shopify, Klaviyo" },
          { metric: "Tagged posts and Story mentions", hypothesis: "Drinks being made get posted. Bottles on shelves get scrolled.", window: "The weekend plus 7 days", tool: "Instagram, TikTok search" },
        ],
      },
      differently: [
        "Test the recipe email on the existing list before building the pop-up. If the open rate does not move, the pop-up is the wrong first bet.",
        "Ask the baristas to write the first draft of every email. My job is to edit, not to invent their voice.",
      ],
      role: "Concept, audit, strategy, email copy, measurement plan, and mockups. Solo, for this portfolio.",
      tools: ["Canva", "Klaviyo", "Shopify", "Instagram", "Google Sheets"],
    },
  },
  {
    slug: "other-side-snacks",
    type: "case-study",
    title: "The Other Side Snacks",
    blurb: "[Project card, pending: my role, one result with a number if I have it, and what it proves]",
    metric: "● live · started Sept 2026",
    channel: "Audit · strategy · mockups",
    lane: "nonprofit",
    status: "in-production",
    page: "/projects/other-side-snacks",
    client: "The Other Side Village (their snack brand)",
    goal: "Audit the brand's site, social, and email, then propose what to fix first",
    role: "Audit, strategy, and mockups. A class project done in public.",
    tools: ["Google Analytics", "Canva", "Google Sheets"],
    result: "status: ___ (audit in progress)",
    preview: { poster: "/images/otherside/before-mobile.jpg" },
  },
  {
    slug: "first-gen-stories",
    type: "content",
    title: "First-Generation Stories",
    blurb: "[Project card, pending: my role, one result with a number if I have it, and what it proves]",
    metric: "● shooting now",
    channel: "Series · film",
    lane: "nonprofit",
    status: "in-production",
    client: "Hope Scholars, Utah Valley University",
    goal: "Record first-generation students' stories as an interview series and a short film",
    role: "Producer, interviewer, camera, and edit.",
    tools: ["Camera", "Premiere Pro", "Lightroom"],
    result: "status: ___ (shooting now)",
    preview: { poster: "/images/hope/potluck-3.jpg" },
  },
];

export const workByLane = (lane: Lane) => work.filter((w) => w.lane === lane);
export const getWork = (slug: string) => work.find((w) => w.slug === slug);
export const caseStudies = work.filter((w) => w.caseStudy);
export const linkFor = (w: WorkItem) => (w.caseStudy ? `/case/${w.slug}` : w.page ?? w.post ?? w.external);
