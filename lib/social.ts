// Social posts Angel made, shown on /work/social inside a phone. Each one is a vertical clip
// (9:16, MP4, H.264, muted autoplay) with a still for the first frame.
// A reel without a `video` is pending: the phone shows a placeholder naming what belongs there,
// never a stand-in clip. Drop files in public/video/social/ and fill the entry to make it live.
export type Reel = {
  slug: string;
  platform: "instagram" | "tiktok" | "linkedin" | "facebook";
  account: string;          // the handle it ran on
  title: string;            // what the post is, in a few words
  line: string;             // one sentence: what it did, in Angel's words
  date?: string;            // "2026-03" is enough; shown as the month
  href?: string;            // the live post
  video?: string;           // /video/social/<file>.mp4
  poster?: string;          // /video/social/<file>.jpg, the first frame
  slides?: string[];        // a carousel post instead of a clip: /images/social/<slug>/1.jpg ... in order
  caption?: string;         // the post caption, shown under the phone
  pending?: string;         // what Angel still has to supply, shown in the phone while video is missing
};

export const reels: Reel[] = [
  {
    slug: "reel-01",
    platform: "instagram",
    account: "@hopescholarsuvu",
    title: "Hope Scholars",
    line: "[one sentence on what this post did, pending]",
    pending: "reel 01, pending: the Hope Scholars clip, 9:16 MP4 under 15 MB, plus a first-frame JPG",
  },
  {
    slug: "reel-02",
    platform: "instagram",
    account: "@uvuathletics",
    title: "UVU Athletics game day",
    line: "[one sentence on what this post did, pending]",
    pending: "reel 02, pending: a game-day clip, 9:16 MP4 under 15 MB, plus a first-frame JPG",
  },
  {
    slug: "reel-03",
    platform: "tiktok",
    account: "@primecollectives",
    title: "Prime Collectives",
    line: "[one sentence on what this post did, pending]",
    pending: "reel 03, pending: a behind-the-shoot clip, 9:16 MP4 under 15 MB, plus a first-frame JPG",
  },
];

export const carousels: Reel[] = [
  {
    slug: "evan-loomis-employee-highlight",
    platform: "linkedin",
    account: "[company account, pending]",
    title: "Employee highlight: Evan Loomis",
    line: "A three-slide carousel for LinkedIn and Facebook that introduces one person on the team through their own answers.",
    date: "2026-10",
    caption: "Who is Evan Loomis? Industrial designer. Purpose-driven, strategic, genuine. How his role lets him contribute to something bigger, the science behind the creativity, and rock climbing in the mountains.",
    pending: "carousel, pending: export the 3 pages of the Canva design \"evan - employee highlight\" (Instagram Post 4:5) as PNG into public/images/social/evan-loomis-employee-highlight/1.png, 2.png, 3.png",
  },
];

export const liveReels = () => reels.filter((r) => r.video);

// True once any post has real media. Gates the /work/social page, its work card, and its sitemap entry.
export const hasLiveSocial = reels.some((r) => r.video) || carousels.some((c) => (c.slides?.length ?? 0) > 0);
