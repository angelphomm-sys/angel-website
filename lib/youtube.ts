// Public view counts for public videos. Needs a YouTube Data API v3 key (free) in YOUTUBE_API_KEY.
export const youtubeConfigured = Boolean(process.env.YOUTUBE_API_KEY);

export type VideoStats = { id: string; title: string; views: number; likes: number; published: string };

export async function videoStats(ids: string[]): Promise<VideoStats[]> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key || ids.length === 0) return [];
  const r = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${ids.join(",")}&key=${key}`, { next: { revalidate: 3600 } });
  if (!r.ok) throw new Error(`youtube ${r.status}`);
  const j = await r.json();
  return (j.items ?? []).map((v: { id: string; snippet: { title: string; publishedAt: string }; statistics: { viewCount?: string; likeCount?: string } }) => ({
    id: v.id, title: v.snippet.title, views: Number(v.statistics.viewCount ?? 0), likes: Number(v.statistics.likeCount ?? 0), published: v.snippet.publishedAt.slice(0, 10),
  }));
}

// Videos shown on the stats page. Add IDs as work goes live.
export const trackedVideos: { id: string; label: string; link: string }[] = [
  { id: "ej_czc-ro38", label: "Throw the perfect party (Yoodlize)", link: "/case/yoodlize-party" },
];
