export const site = {
  name: "Angel Phommachan",
  tagline: "Marketer · photographer · first-gen",
  description:
    "Angel Phommachan is a brand strategist and content creator who designs moments people show up for: brand launches and pop-ups, release weeks, game days, and the community programs that make a city run. Experiential marketing, content strategy, and measurement. Utah Valley University, Woodbury School of Business.",
  positioning: "A brand strategist who designs moments people show up for.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://angelphommachan.com",
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
  { n: 1, label: "hello.", href: "/" },
  { n: 2, label: "work.", href: "/work" },
  { n: 3, label: "blog.", href: "/blog" },
  { n: 4, label: "about.", href: "/about" },
  { n: 5, label: "say hi.", href: "/contact" },
] as const;

export const workTypes = {
  "case-study": "case studies",
  content: "content",
  writing: "strategy & writing",
  "brand-web": "brand & web",
  photography: "photography",
} as const;
export type WorkType = keyof typeof workTypes;
