import type { Measure } from "./work";

// The Other Side Snacks: a live project. This page fills in as the work happens.
// Facts below are observations from the public site on the date given, not findings. Findings come after the audit.

export const project = {
  slug: "other-side-snacks",
  title: "The Other Side Snacks",
  org: "The Other Side Village",
  site: "https://theothersidesnacks.com",
  started: "September 2026",
  blurb: "Freeze-dried fruit snacks whose profits fund The Other Side Village, a Salt Lake City nonprofit helping people leave homelessness for housing and work. A brand with the mission built in, and a class project I am starting now.",
  observed: "September 8, 2026",
};

export type Phase = { n: string; title: string; status: "done" | "now" | "next"; plan: string; done?: string };
export const phases: Phase[] = [
  { n: "01", title: "Audit", status: "now", plan: "Website, Instagram, email, and where the product is sold. Screenshots, a scorecard, and the one thing a first-time visitor misses." },
  { n: "02", title: "Insight", status: "next", plan: "Who buys freeze-dried fruit, who buys from a cause, and where those two people overlap." },
  { n: "03", title: "Strategy", status: "next", plan: "One clear promise, the channels that carry it, and what to stop doing." },
  { n: "04", title: "Make", status: "next", plan: "Homepage and product page mockups, an email flow, and a social set, all in Canva." },
  { n: "05", title: "Measure", status: "next", plan: "The plan below, with hypotheses I can be wrong about." },
];

// Day-one observations from the public site. Plain descriptions, no verdicts.
export const dayOne: string[] = [
  "The domain says Snacks, the logo says Foods. Two names for one brand.",
  "The hero promise is taste: real fruit, unreal flavor. The mission shows up in a scrolling ticker and again well below the fold, under a headline about rebuilding lives.",
  "Four products: Tropical Trio, Mango, Pineapple, Strawberry. Each card has a shop button. There is also a wholesale powders link in the nav.",
  "A comparison table puts the brand against other fruit crisps and healthy snacks on sourcing, ingredients, and donated profits.",
  "The email sign-up promises tasty emails. The shipping threshold is one hundred dollars.",
];

export type Option = { id: string; label: string; question: string };
export const options: Option[] = [
  { id: "website", label: "the website", question: "Does a first-time visitor learn where the money goes before they leave?" },
  { id: "social", label: "social", question: "Is there a reason to follow that is not a discount?" },
  { id: "email", label: "email", question: "What does the first email after sign-up actually say, and does it earn the second?" },
  { id: "retail", label: "where it is sold", question: "Can a person in Salt Lake buy a bag without shipping it?" },
];

export const measure: Measure[] = [
  { metric: "Time to the mission", hypothesis: "Visitors who see where the profits go in the first screen stay longer and buy more.", window: "Before and after the homepage change", tool: "GA4, scroll depth" },
  { metric: "Product page conversion", hypothesis: "Naming the person the purchase helps outperforms naming the nutrition.", window: "Two weeks per variant", tool: "Shopify analytics" },
  { metric: "Email open and click", hypothesis: "A welcome email with one story beats one with a discount.", window: "First 30 days of the flow", tool: "The store's email tool" },
  { metric: "Saves and shares", hypothesis: "Content about the makers gets shared. Content about the fruit gets scrolled.", window: "Per post, 7 days", tool: "Instagram insights" },
  { metric: "Local pickup or retail interest", hypothesis: "Salt Lake customers want a place to buy in person.", window: "Ask at checkout, 30 days", tool: "Post-purchase survey" },
];

export type Note = { date: string; title: string; body: string };
export const notes: Note[] = [
  { date: "Sept 8, 2026", title: "Day one", body: "Saved the site as it is today so there is a real before. Listed what I saw without deciding anything. The audit starts next." },
];
