import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP for browsers without it. Covers are 2400px WebP sources; the default deviceSizes (up to 3840) cover them.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
  async redirects() {
    // Every page that moved. The /blog/* ones also get a /journal/* alias below that goes to the final page in one hop.
    const moved = [
      // The Yoodlize post was folded into the case study, and the case study was archived 2026-09-24.
      { source: "/blog/yoodlize-youtube-campaign", destination: "/work", permanent: true },
      { source: "/case/yoodlize-party", destination: "/work", permanent: true },
      // Nine posts removed at Angel's request, 2026-09-23. Old links still resolve.
      { source: "/blog/why-i-stayed", destination: "/about", permanent: true },
      { source: "/blog/google-ads-local-restaurant-campaign", destination: "/case/thai-google-ads", permanent: true },
      { source: "/blog/the-plan-you-made-at-eighteen", destination: "/about", permanent: true },
      { source: "/blog/about-me-video", destination: "/about", permanent: true },
      { source: "/blog/summer-recap-carousel", destination: "/case/embracing-our-story", permanent: true },
      { source: "/blog/shyft-linkedin-series", destination: "/blog", permanent: true },
      { source: "/blog/pace-over-pressure", destination: "/about", permanent: true },
      { source: "/blog/production-line-to-marketing", destination: "/about", permanent: true },
      { source: "/blog/prime-collectives", destination: "/photography", permanent: true },
      // Rare Beauty spec email removed at Angel's request, 2026-10-06.
      { source: "/case/rare-beauty-email", destination: "/work", permanent: true },
      { source: "/blog/rare-beauty-marketing-strategy", destination: "/blog", permanent: true },
      { source: "/blog/meet-angel", destination: "/blog", permanent: true },
      { source: "/blog/how-to-write-a-brand-email-that-sounds-like-a-friend", destination: "/blog", permanent: true },
      { source: "/blog/why-experiential-marketing", destination: "/blog", permanent: true },
      // Crumbl spec email replaced by the Ghia spec email, 2026-10-06.
      { source: "/case/crumbl-email", destination: "/work", permanent: true },
      // Three posts removed at Angel's request, 2026-10-05.
      { source: "/blog/moments-people-show-up-for", destination: "/blog", permanent: true },
      { source: "/blog/the-small-town-that-taught-me-marketing", destination: "/blog", permanent: true },
    ];
    // /journal was the old name for /blog. A moved post's old journal URL skips the /blog hop.
    const journal = moved
      .filter((r) => r.source.startsWith("/blog/"))
      .map((r) => ({ ...r, source: r.source.replace(/^\/blog\//, "/journal/") }));
    return [
      // Lanes used to be their own pages; all work now lives on one list.
      { source: "/work/:lane(entertainment|sports|nonprofit|brand)", destination: "/work", permanent: true },
      { source: "/journal", destination: "/blog", permanent: true },
      ...journal,
      { source: "/journal/:slug", destination: "/blog/:slug", permanent: true },
      ...moved,
    ];
  },
};

export default nextConfig;
