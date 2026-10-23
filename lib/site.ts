export const site = {
  name: "Angel Phommachan",
  // The role, said the same way everywhere: header, home title, share cards, Person JSON-LD.
  role: "Digital marketing specialist",
  tagline: "Digital marketing specialist",
  description:
    "Angel Phommachan is a first-generation digital marketing specialist in Utah who works across search, email, social, and content. Utah Valley University, Woodbury School of Business.",
  // Search-result length (140 to 155 characters). `description` above stays the long form for About and JSON-LD.
  seoDescription:
    "Angel Phommachan is a first-generation digital marketing specialist in Utah who works across search, email, social, and content.",
  // The one-line positioning, shown under the role on home. Source: .harness/brand-platform.md. Provisional: Angel may swap it.
  positioning: "I write it, shoot it, build it, and check the number. One person, the whole campaign.",
  // The channels, under the hero. Every one has work behind it on the site.
  skills: ["paid search", "email", "social", "events", "photography"],
  // Why the work exists, and the four values that back it. Each value points at the piece that proves it.
  mission: "Give people a clear reason to show up, and say it plainly enough that they do.",
  values: [
    { title: "Say it plainly.", line: "Short sentences, real nouns, no jargon. The blog is written the same way.", proof: { label: "read the blog →", href: "/blog" } },
    { title: "One idea, every channel.", line: "Nine pieces, print and social, all pointing at one ask.", proof: { label: "See the campaign →", href: "/case/embracing-our-story" } },
    { title: "Check the number.", line: "The menu sitelink on my Thai restaurant campaign drew a 24% click rate, the best of any ad piece.", proof: { label: "see the receipt →", href: "/case/thai-google-ads" } },
    { title: "Build for the people in the room.", line: "I pitched the Hope Scholars marketing role, then built the Instagram, content pillars, and donor materials on my own.", proof: { label: "see Hope Scholars →", href: "/work#for-good" } },
  ],
  // How a campaign runs, start to finish. Four steps, one line each.
  steps: [
    { title: "Find the moment.", line: "When people already care." },
    { title: "Build one idea.", line: "One line everything carries." },
    { title: "Carry it through every channel.", line: "Search, email, social, print." },
    { title: "Check the number.", line: "Set the target, then read it." },
  ],
  // What I am looking for, and when. Shown in the footer on every page.
  goal: "Looking for social, content, and events work at CPG, entertainment, sports, and community brands. B.S. Digital Marketing, Utah Valley University, May 2027.",
  // No trailing slash, so `${site.url}/path` never doubles it.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://angelphommachan.com").replace(/\/+$/, ""),
  email: "angelphommachan@gmail.com",
  location: "Draper, Utah",
  socials: {
    linkedin: "https://www.linkedin.com/in/angelphomm",
    instagram: "https://www.instagram.com/primecollectives/",
  },
} as const;

export type Lane = "entertainment" | "sports" | "nonprofit" | "brand";

export const lanes: Record<Lane, {
  name: string; short: string; number: string; tint: string; texture: string;
  promise: string; blurb: string; moment: string; community: string; number_: string; formats: string[];
}> = {
  entertainment: {
    name: "Entertainment", short: "entertainment", number: "01", tint: "#ECE6F3", texture: "velvet",
    promise: "Release hype, from trailer to premiere.",
    blurb: "How a season, an album, or a film gets marketed as an event, and what the fans do with it after.",
    moment: "a premiere, a release week, a tour date", community: "the fandom that shows up and keeps talking", number_: "views, watch time, ticket and stream lift",
    formats: ["campaign analysis", "media analysis with a 500-word read", "release-week timelines"],
  },
  sports: {
    name: "Sports", short: "sports", number: "02", tint: "#E5EFE4", texture: "jersey mesh",
    promise: "Game day, from the inside.",
    blurb: "What a marketing shift at UVU Athletics actually runs, before doors and after the final whistle, and what raises attendance.",
    moment: "game day, home openers, rivalry weeks", community: "students, season-ticket holders, families", number_: "attendance, ticket sales, in-game promo redemptions",
    formats: ["game-day field notes", "fan experience audits", "pre, in, and post-game promotion breakdowns"],
  },
  nonprofit: {
    name: "For good", short: "nonprofit", number: "03", tint: "#F7EDD9", texture: "kraft paper",
    promise: "Stories that move a donor.",
    blurb: "Scholarship programs, community stories, and a nonprofit audit that says what to fix first.",
    moment: "a fundraiser, a cohort, a recap", community: "donors, students, and the staff who run the program", number_: "reach, saves, dollars raised",
    formats: ["donor-facing content", "interview series", "website and social audits with a proposal"],
  },
  brand: {
    name: "Brand", short: "brand", number: "04", tint: "#F1ECE6", texture: "linen",
    promise: "Strategy, voice, and content for brands that do not fit a lane.",
    blurb: "Consumer brand launches and pop-ups, plus the writing, identity, and web work brands hire out.",
    moment: "a series, a launch, a rebrand", community: "customers who need a reason to trust you", number_: "reach, click-through, leads",
    formats: ["case studies", "writing samples", "brand and web work"],
  },
};

export const navLanes: Lane[] = ["entertainment", "sports", "nonprofit"];

export const postTypes = {
  list: "List",
  sectional: "Sectional",
  narrative: "Narrative",
  multimedia: "Multimedia",
  "case-study": "Case study",
  work: "Work",
  choice: "Free choice",
} as const;
export type PostType = keyof typeof postTypes;

export const nav = [
  { n: 1, label: "Home", href: "/" },
  { n: 2, label: "Work", href: "/work" },
  { n: 3, label: "Photography", href: "/photography" },
  { n: 4, label: "Blog", href: "/blog" },
  { n: 5, label: "About", href: "/about" },
] as const;

export const workTypes = {
  "case-study": "case studies",
  email: "email campaigns",
  content: "content",
  writing: "strategy & writing",
  "brand-web": "brand & web",
  photography: "photography",
} as const;
export type WorkType = keyof typeof workTypes;

// /work is sorted by marketing discipline, in this order. Only disciplines with work show a group.
export const disciplines = {
  "paid-search": "Paid search",
  "landing-page": "Landing page",
  email: "Email",
  "brand-campaign": "Brand campaign",
  photography: "Photography",
  content: "Content",
  events: "Events",
} as const;
export type Discipline = keyof typeof disciplines;

// A card's link, one verb per discipline, so a page of cards never repeats one line four times.
export const workLinks: Record<Discipline, string> = {
  "paid-search": "See the campaign →",
  email: "See the emails →",
  "brand-campaign": "See the campaign →",
  "landing-page": "See the page →",
  events: "See the event →",
  photography: "See the photos →",
  content: "See the posts →",
};

// Where a piece came from, shown on every card: paid client work, spec work, a self-initiated concept, or a class assignment.
export const provenance = {
  client: "client work",
  spec: "spec work",
  concept: "concept, self-initiated",
  class: "school project",
  "class-client": "class project, real client",
} as const;
export type Provenance = keyof typeof provenance;
