// Spec social posts: Instagram feed designs for brands Angel breaks down on the blog.
// None of these ran. Each is a 1080x1350 (4:5) feed image in the brand's own look, shown in a phone on /work.
// Images: public/images/social-spec/<slug>.jpg. Photo credits: public/images/social-spec/CREDITS.md.
// Strategy notes and research: .harness/reports/social-spec-strategy.md.
// Editable source: .harness/source/social-spec/posts.html (render.sh makes the PNGs the JPGs come from).
// Figma file fVpD1JrzJ0zaTXmymFwSU2, page "social spec": one flat 1080x1350 frame per post (figmaNode); v1 sits in a retired section.
// Rules: no brand logos, product, bottle, or tin photos; brand names are live type; every piece says "spec".

export type SpecBrand = "Ghia" | "Graza" | "Fishwife" | "Embracing Our Story" | "Shyft";

export type SocialSpecPost = {
  slug: string;              // ghia-1, graza-1, ...
  brand: SpecBrand;
  handle: string;            // the brand's real Instagram handle, from its site footer
  title: string;             // the post in a few words
  format: string;            // single image, carousel cover, Reel cover
  slides?: number;           // a carousel shows dots under the image
  src: string;               // /images/social-spec/<slug>.jpg, 1080x1350
  alt: string;               // what the design shows
  caption: string[];         // in the brand's voice; the last line may be hashtags (two at most)
  why: string;               // one line in Angel's voice, under the phone
  strategy: {
    pillar: string;          // the content pillar this post belongs to
    audience: string;        // who follows the brand and why
    resonates: string;       // why this post lands with them, in Angel's voice
  };
  credit: string;            // where the image came from, shown in the dialog
  post?: { href: string; label: string }; // Angel's breakdown the post echoes
  ratio?: string;            // image aspect in the feed slot, default "4 / 5" (e.g. "1 / 1")
  note?: string;             // replaces the default spec line in the dialog
  figmaNode?: string;        // frame id on the Figma "social spec" page (a flat render of the post)
};

// Brand colors for the avatar dot in the phone UI only; the site itself stays white and black.
export const specBrandColor: Record<SpecBrand, { bg: string; fg: string }> = {
  Ghia: { bg: "#651c32", fg: "#fef6ee" },
  Graza: { bg: "#d1e030", fg: "#3c422e" },
  Fishwife: { bg: "#73c3f5", fg: "#16205b" },
  "Embracing Our Story": { bg: "#ec2e0e", fg: "#f6efe3" },
  Shyft: { bg: "#1f1f1f", fg: "#d6ef4c" },
};

const ghiaPost = { href: "/blog/behind-the-strategy-ghia", label: "read the Ghia breakdown →" };
const grazaPost = { href: "/blog/behind-the-strategy-graza", label: "read the Graza breakdown →" };
const fishwifePost = { href: "/blog/fishwife-marketing-strategy", label: "read the Fishwife breakdown →" };

export const socialSpecIntro = "Spec posts for the brands I break down on my blog, each planned from who follows the brand and made in its look. Not affiliated with any of them.";

export const socialSpecPosts: SocialSpecPost[] = [
  {
    slug: "ghia-1",
    brand: "Ghia",
    handle: "drinkghia",
    title: "Not drinking. Still going out.",
    format: "single image",
    src: "/images/social-spec/ghia-1.jpg",
    alt: "Ghia spec Instagram post: a flash-lit overhead photo of a pink drink with a strawberry in a sugar-rimmed glass, casting a hard shadow across pink and green paper. The headline \"Not drinking. Still going out.\" sits in the empty pink, with Ghia in cream type at the bottom.",
    caption: [
      "Not drinking. Still going out.",
      "Ghia and soda over ice, a twist of orange, and a seat at the table all night.",
      "Clear eyed and high minded.",
      "#aperitivo",
    ],
    why: "Five words that tell a sober-curious crowd the night out is still theirs.",
    strategy: {
      pillar: "The occasion: going out without drinking",
      audience: "Style-conscious, sober-curious people who still want the ritual and the table.",
      resonates: "It says what they already feel, short enough to send to the group chat. The flash still life and flat color look like Ghia's own feed, not a stock ad.",
    },
    credit: "Photo: Svitlana on Unsplash.",
    post: ghiaPost,
    figmaNode: "6:3",
  },
  {
    slug: "ghia-2",
    brand: "Ghia",
    handle: "drinkghia",
    title: "A Night at the Spritz",
    format: "carousel cover",
    slides: 5,
    src: "/images/social-spec/ghia-2.jpg",
    alt: "Ghia spec carousel cover on red: \"A Night at the Spritz.\" in a cream condensed serif, a tilted photo card of a red drink over ice with a rosemary sprig, and the measures: 2 oz Ghia Original Apéritif, 3 oz sparkling water, 1 rosemary sprig, 1 orange, zested.",
    caption: [
      "A Night at the Spritz.",
      "2 oz Ghia Original Apéritif, 3 oz sparkling water, a rosemary sprig, the zest of one orange.",
      "Stir, pour over ice, sit down.",
      "#aperitivo #spritz",
    ],
    why: "A real recipe from Ghia's own site, so the save turns into a drink tonight.",
    strategy: {
      pillar: "The recipe: a spritz you can make tonight",
      audience: "Hosts and home bartenders who save drink ideas for the weekend.",
      resonates: "Recipes get saved and shared, and this one makes the bottle step one. I kept it to four measures so it reads on a phone.",
    },
    credit: "Photo: Edward Howell on Unsplash. Recipe from drinkghia.com.",
    post: ghiaPost,
    figmaNode: "6:4",
  },
  {
    slug: "fishwife-1",
    brand: "Fishwife",
    handle: "fishwife",
    title: "Tin night",
    format: "carousel cover",
    slides: 5,
    src: "/images/social-spec/fishwife-1.jpg",
    alt: "Fishwife spec carousel cover on sky blue: \"Tin night.\" in a big red soft serif, and a flat illustration of a plate with sardines on toast, a lemon half, cornichons, a bowl of olives, and a red sticker that reads \"Peel. Pile. Eat.\"",
    caption: [
      "TIN NIGHT.",
      "Three tins, good bread, something pickled, something crunchy, one lemon.",
      "That's a dinner party with zero dishes. Save this for Friday.",
      "#tinnedfishdatenight",
    ],
    why: "It puts a tin in someone's hands this week, the test I give every Fishwife drop.",
    strategy: {
      pillar: "The ritual: tinned fish as an easy dinner",
      audience: "Mostly women in their 20s and 30s who found tinned fish on social.",
      resonates: "It turns a tin into a Friday plan with no cooking. I drew it flat and bright like their tins, so it feels like it came from the brand, not a stock shoot.",
    },
    credit: "Illustration drawn for this post. No photos.",
    post: fishwifePost,
    figmaNode: "6:5",
  },
  {
    slug: "graza-1",
    brand: "Graza",
    handle: "getgraza",
    title: "Don't save the good oil",
    format: "Reel cover",
    src: "/images/social-spec/graza-1.jpg",
    alt: "Graza spec Reel cover on lime: the headline \"Don't save the good oil.\" in olive condensed serif over a close photo of two eggs frying in a cast iron pan, with a lime sticker reading \"the crispy part\" and an arrow to the lacy edge.",
    caption: [
      "Don't save the good oil.",
      "Crispy edges need a real pour of Sizzle, not a nervous drip.",
      "Hot pan, more oil than feels polite, crack, baste, breakfast.",
      "#friedegg",
    ],
    why: "It argues with the habit of saving fancy oil, which is the reason Sizzle exists.",
    strategy: {
      pillar: "Use it every day: the product in a real pan",
      audience: "Home cooks who learn from creator videos and want good oil without rules.",
      resonates: "It pushes back on a habit people know they have, and sizzling eggs are a sound and a picture people stop for.",
    },
    credit: "Photo: Scott Eckersley on Unsplash.",
    post: grazaPost,
    figmaNode: "6:6",
  },
];
