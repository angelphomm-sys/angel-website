// Real Instagram posts Angel made and published, shown in the same phone as the spec posts, but live:
// each carousel swipes slide by slide. Images were saved from the published posts (public/images/shyft/).
// Captions are the first line of the published caption. Context: Marketing Intern at Shyft, March to August 2025.

export type ShippedSlide = { src: string; alt: string };
export type ShippedPost = {
  slug: string;
  handle: string;
  title: string;      // the post's own headline or first caption line
  format: string;     // "carousel, 5 slides" / "single image"
  date: string;       // as published, e.g. "Mar 7, 2025"
  why: string;        // what the post was for, in Angel's voice
  href: string;       // the live post
  ratio?: string;     // slide aspect, default "4 / 5"
  slides: ShippedSlide[];
};

const img = (name: string) => `/images/shyft/${name}.jpg`;

export const shippedIntro = "Instagram posts I made and published as Shyft's marketing intern, for a B2B supply chain audience. Swipe through each one.";

export const shippedPosts: ShippedPost[] = [
  {
    slug: "shyft-audit",
    handle: "shyft._",
    title: "Is your supply chain working for you?",
    format: "carousel, 5 slides",
    date: "Mar 7, 2025",
    why: "A service explainer: Shyft's supply chain audit in four steps.",
    href: "https://www.instagram.com/p/DG6SeYPSYG5/",
    slides: [
      { src: img("supply-1"), alt: "Cover slide: How we find the profit, the supply chain audit process" },
      { src: img("supply-2"), alt: "Diagnose: we create a supply chain strategy that aligns with your goals and optimizes your operations" },
      { src: img("supply-3"), alt: "Prescribe: we assess your current practices and create a customized plan to meet your brand's needs" },
      { src: img("supply-4"), alt: "Treat: our real time dashboards keep you informed, ensuring data driven decisions and supply chain improvements" },
      { src: img("supply-5"), alt: "Maintain and optimize: we monitor your supply chain for efficiency and cost savings" },
    ],
  },
  {
    slug: "shyft-severance",
    handle: "shyft._",
    title: "Please, try to enjoy these equally.",
    format: "carousel, 5 slides",
    date: "Mar 14, 2025",
    why: "A pop-culture post: the Severance \"outie\" joke, turned into supply chain wants.",
    href: "https://www.instagram.com/p/DHMKKbZvTfJ/",
    slides: [
      { src: img("severance-1"), alt: "A still from Severance with the text: Your outie wants lower COGS" },
      { src: img("severance-2"), alt: "A still from Severance with the text: Your outie wants reliable sourcing partners" },
      { src: img("severance-3"), alt: "A still from Severance with the text: Your outie wants an optimized supply chain" },
      { src: img("severance-4"), alt: "A still from Severance with the text: Your outie wants good packaging" },
      { src: img("severance-5"), alt: "A still from Severance with the text: Your outie wants you to contact Shyft Global to help your business run smoother" },
    ],
  },
  {
    slug: "shyft-evan",
    handle: "shyft._",
    title: "Meet Evan Loomis, our industrial designer at Shyft.",
    format: "carousel, 3 slides",
    date: "Jun 27, 2025",
    why: "A team spotlight that puts a face on the design work clients get.",
    href: "https://www.instagram.com/p/DLaXANLOImJ/",
    slides: [
      { src: img("evan-1"), alt: "Cover slide: who is Evan Loomis, with his portrait" },
      { src: img("evan-2"), alt: "Industrial designer slide with sketches, product photos, and his answers" },
      { src: img("evan-3"), alt: "Slide with photos of Evan outside work and his answers" },
    ],
  },
  {
    slug: "shyft-women",
    handle: "shyft._",
    title: "Celebrating Women in Supply Chain",
    format: "single image",
    date: "Mar 24, 2025",
    why: "A Women's History Month post recognizing women across the industry.",
    href: "https://www.instagram.com/p/DHl2-5EP0ZY/",
    slides: [{ src: img("women-1"), alt: "Group photo of seven women in an office" }],
  },
  {
    slug: "shyft-team-day",
    handle: "shyft._",
    title: "Fun in the sun with the Shyft team",
    format: "carousel, 7 photos",
    date: "Jun 24, 2025",
    why: "A culture post: the team's day out, told in seven photos.",
    href: "https://www.instagram.com/p/DLTHBNKPOq1/",
    ratio: "16 / 9",
    slides: Array.from({ length: 7 }, (_, i) => ({ src: img(`team-${i + 1}`), alt: `The Shyft team at an outdoor event, photo ${i + 1} of 7` })),
  },
];
