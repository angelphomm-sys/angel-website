import type { Lane } from "./site";

// Creative samples: email campaigns, social sets, ads, landing pages, event pieces.
// Each sample lists the frames it expects. Drop exported PNGs into public/images/samples/<slug>/ named 1.png, 2.png ...
// and the work page picks them up in order. Until then the frames show as labelled placeholders.

export const formats = {
  email: { label: "email", canva: "600 × 1600 px (email header, any height)", ratio: "3/4" },
  carousel: { label: "carousel", canva: "1080 × 1350 px, one file per slide", ratio: "4/5" },
  story: { label: "story", canva: "1080 × 1920 px, one file per frame", ratio: "9/16" },
  ad: { label: "ad · thumbnail", canva: "1280 × 720 px", ratio: "16/9" },
  landing: { label: "landing page", canva: "390 × 2400 px (mobile) or 1440 × 3000 px (desktop)", ratio: "9/16" },
  event: { label: "experiential", canva: "door sign 1800 × 2400 px, mirror card 1200 × 1800 px", ratio: "3/4" },
  reactive: { label: "reactive", canva: "1080 × 1350 px, one file per frame", ratio: "4/5" },
  brand: { label: "brand · web", canva: "any", ratio: "4/3" },
} as const;
export type Format = keyof typeof formats;

export type Sample = {
  slug: string;
  title: string;
  brand: string;
  origin: "client" | "internship" | "concept";
  format: Format;
  lane: Lane;
  shows: string;          // one line: the skill this proves
  frames: string[];       // expected frames, in order; doubles as placeholder labels and alt text
  tools: string[];
  related?: { label: string; href: string };
  /** filled in by the work page from the samples folder */
  images?: { src: string; alt: string }[];
  /** real assets that already exist */
  fixed?: { src: string; alt: string }[];
};

export const samples: Sample[] = [
  {
    slug: "jj-coffee-emails", title: "The three emails that follow a syrup order", brand: "JJ Coffee", origin: "concept", format: "email", lane: "brand",
    shows: "A welcome flow written the way a barista talks: the recipe first, the second week, then the restock.",
    frames: ["Email 1: the recipe card", "Email 2: the second week", "Email 3: the restock"],
    tools: ["Canva", "Klaviyo"], related: { label: "the spec case study", href: "/case/jj-coffee-popup" },
  },
  {
    slug: "jj-coffee-popup", title: "The Latte Bar: counter menu and take-home card", brand: "JJ Coffee", origin: "concept", format: "event", lane: "brand",
    shows: "The two physical pieces of the pop-up: what you order at the counter, and what goes home with the bottle.",
    frames: ["Counter menu: three drinks, three syrups", "Take-home card: the recipe, the code"],
    tools: ["Canva"], related: { label: "the spec case study", href: "/case/jj-coffee-popup" },
  },
  {
    slug: "jj-coffee-stories", title: "Pop-up weekend Story set", brand: "JJ Coffee", origin: "concept", format: "story", lane: "brand",
    shows: "Countdown, doors open, the drink being made, the line, the last call. Every frame shows a drink, never a shelf.",
    frames: ["Frame 1: two days out", "Frame 2: doors open", "Frame 3: the drink, being made", "Frame 4: the line", "Frame 5: last call, and the code"],
    tools: ["Canva", "Instagram"], related: { label: "the spec case study", href: "/case/jj-coffee-popup" },
  },
  {
    slug: "hope-donor-email", title: "Summer Recap, as a donor email", brand: "Hope Scholars, UVU", origin: "concept", format: "email", lane: "nonprofit",
    shows: "The same story reshaped for an inbox: one photo, one lesson, one number, one ask.",
    frames: ["Donor email: the summer in one scroll"],
    tools: ["Canva", "Mailchimp"], related: { label: "the work page", href: "/work" },
  },
  {
    slug: "yoodlize-thumbnails", title: "Party-first vs app-first: the thumbnail pair", brand: "Yoodlize", origin: "internship", format: "ad", lane: "entertainment",
    shows: "The two variants from the split test, side by side, so the winning decision is visible in one glance.",
    frames: ["Variant A: app-first", "Variant B: party-first (winner)"],
    tools: ["Canva", "YouTube Studio"], related: { label: "the case study", href: "/case/yoodlize-party" },
  },
  {
    slug: "yoodlize-email", title: "Your weekend, rented", brand: "Yoodlize", origin: "concept", format: "email", lane: "entertainment",
    shows: "A browse-recovery email that sells the night, not the table, with a price and a distance.",
    frames: ["Browse-recovery email"],
    tools: ["Canva", "Klaviyo"], related: { label: "the case study", href: "/case/yoodlize-party" },
  },
  {
    slug: "shyft-newsletter", title: "Friday Market Roundup, in the inbox", brand: "Shyft", origin: "concept", format: "email", lane: "brand",
    shows: "A business-to-business (B2B) video series turned into a weekly email: the number first, the clip second, the call third.",
    frames: ["Weekly newsletter issue"],
    tools: ["Canva", "HubSpot"], related: { label: "the work page", href: "/work" },
  },
  {
    slug: "uvu-gameday-carousel", title: "Game day, from the inside", brand: "UVU Athletics", origin: "concept", format: "carousel", lane: "sports",
    shows: "A pre-game carousel built around what a student decides at 4pm: go, or not.",
    frames: ["Slide 1: tonight, 7pm", "Slide 2: the promo, redeemable at the gate", "Slide 3: who is playing", "Slide 4: the student section", "Slide 5: the ask"],
    tools: ["Canva", "Instagram"],
  },
  {
    slug: "reactive-kit", title: "A reactive post kit", brand: "Template", origin: "concept", format: "reactive", lane: "entertainment",
    shows: "Three frames a team can fill in under an hour when a moment breaks, with the rules for what is never posted.",
    frames: ["Frame 1: the moment, with a reaction line", "Frame 2: the brand's take, one sentence", "Frame 3: the handoff to something the brand actually sells"],
    tools: ["Canva"],
  },
  {
    slug: "aspen-counseling", title: "Aspen Counseling: palette and logo", brand: "Aspen Counseling Services", origin: "client", format: "brand", lane: "brand",
    shows: "A calm color system and logo lockups for a counseling practice, from Green House client work.",
    frames: ["Palette", "Logo lockups"],
    fixed: [{ src: "/images/work/aspen-palette.jpg", alt: "Aspen Counseling palette" }, { src: "/images/work/aspen-logo.jpg", alt: "Aspen Counseling logo" }],
    tools: ["Canva", "Figma"],
  },
];

export const originLabel = { client: "client work", internship: "internship", concept: "concept" } as const;
