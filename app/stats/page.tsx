import type { Metadata } from "next";
import { gaConfigured, siteStats, type SiteStats } from "@/lib/ga";
import { youtubeConfigured, videoStats, trackedVideos } from "@/lib/youtube";
import { caseStudies } from "@/lib/work";
import { options as osOptions } from "@/lib/otherside";
import { sources } from "@/lib/inbound";
import { getAllPosts } from "@/lib/posts";
import { objectives, deadline } from "@/lib/objectives";
import { StatsDashboard, type Dash, type Row } from "@/components/StatsDashboard";

export const metadata: Metadata = { title: "Stats", description: "Live analytics for this site: who visits, what they read, what they do, and progress against the plan." };
export const revalidate = 3600;

const CTAS: [string, string][] = [["cta_hero_contact", "contact me (hero)"], ["cta_hero_story", "my story"], ["cta_home_bring", "what I'd bring"], ["cta_header_sayhi", "say hi (header)"], ["cta_case_sayhi", "say hi (case study)"]];

export default async function StatsPage() {
  let stats: SiteStats | null = null; let gaError: string | null = null;
  let videoRows: Row[] = trackedVideos.map((t) => ({ label: t.label, value: 0, href: t.link }));
  if (gaConfigured) { try { stats = await siteStats(); } catch (e) { gaError = e instanceof Error ? e.message : "failed"; } }
  if (youtubeConfigured) { try { const v = await videoStats(trackedVideos.map((t) => t.id)); videoRows = v.map((x) => { const t = trackedVideos.find((y) => y.id === x.id); return { label: t?.label ?? x.title, value: x.views, href: t?.link, note: `${x.likes} likes` }; }); } catch { /* keep zeros */ } }
  const live = !!stats;
  const ev = stats?.events ?? {};
  const posts = getAllPosts({ includeDrafts: true });
  const totalSessions = stats ? Math.max(1, stats.sources.reduce((a, s) => a + s.sessions, 0)) : 1;
  const linkedin = stats ? stats.sources.filter((s) => /linkedin|lnkd/i.test(s.source)).reduce((a, s) => a + s.sessions, 0) : 0;
  const direct = stats ? stats.sources.filter((s) => s.source === "(direct)").reduce((a, s) => a + s.sessions, 0) : 0;
  const inquiries = sources.reduce((a, s) => a + (ev[`inbound_${s.id}`] ?? 0), 0);

  const d: Dash = {
    live, deadline,
    totals: stats?.totals ?? { users: 0, views: 0, avgSeconds: 0 },
    byDay: stats?.visitorsByDay ?? [],
    objectives: [
      { label: objectives.visitors.label, value: stats?.totals.users ?? 0, target: objectives.visitors.target, format: "n" },
      { label: objectives.linkedinShare.label, value: linkedin / totalSessions, target: objectives.linkedinShare.target, format: "pct" },
      { label: objectives.directShare.label, value: direct / totalSessions, target: objectives.directShare.target, format: "pct" },
      { label: objectives.avgSeconds.label, value: stats?.totals.avgSeconds ?? 0, target: objectives.avgSeconds.target, format: "s" },
      { label: objectives.inquiries.label, value: inquiries, target: objectives.inquiries.target, format: "n" },
      { label: objectives.linkedinPosts.label, value: 0, target: objectives.linkedinPosts.target, format: "n", offsite: true },
    ],
    sources: live ? stats!.sources.map((s) => ({ label: s.source === "(direct)" ? "direct" : s.source, value: s.sessions })) : [{ label: "linkedin", value: 0 }, { label: "direct", value: 0 }, { label: "instagram", value: 0 }, { label: "search", value: 0 }, { label: "email", value: 0 }],
    pages: live ? stats!.topPages.map((p) => ({ label: p.path, value: p.views, href: p.path })) : ["/", "/work", "/blog", "/about", "/stats"].map((p) => ({ label: p, value: 0, href: p })),
    posts: (live ? posts.filter((p) => !p.draft) : posts).map((p) => { const g = stats?.posts.find((x) => x.path === `/blog/${p.slug}`); return { label: p.title, value: g?.views ?? 0, href: `/blog/${p.slug}`, note: live ? (g ? `${g.engagedSeconds}s` : undefined) : (p.draft ? p.date.slice(5) : "live") }; }).sort((a, b) => b.value - a.value),
    shares: posts.map((p) => ({ label: p.title, value: ev[`share_${p.slug}`] ?? 0, href: `/blog/${p.slug}`, note: live ? `${ev[`postcta_${p.slug}`] ?? 0} clicks` : undefined })).sort((a, b) => b.value - a.value).slice(0, 10),
    ctas: CTAS.map(([k, label]) => ({ label, value: ev[k] ?? 0 })),
    inbound: sources.map((s) => ({ label: s.label, value: ev[`inbound_${s.id}`] ?? 0 })),
    cases: [...caseStudies.map((w) => ({ label: w.title, value: ev[`case_view_${w.slug}`] ?? 0, href: `/case/${w.slug}` })), { label: "The Other Side Snacks (live)", value: ev["case_view_other-side-snacks"] ?? 0, href: "/projects/other-side-snacks" }],
    votes: osOptions.map((o) => ({ label: o.label, value: ev[`vote_${o.id}`] ?? 0 })),
    videos: videoRows,
    counts: { resume: ev.resume_download ?? 0 },
  };

  return (
    <div className="mx-auto max-w-[1440px] px-5 md:px-20 py-12 md:py-14 flex flex-col gap-8">
      <header className="flex flex-col gap-3 max-w-[720px]">
        <span className="hand text-[26px] text-accent">the numbers behind this site</span>
        <h1 className="text-[44px] md:text-[64px] font-extrabold tracking-[-0.03em] leading-[1.02]">stats.</h1>
        <p className="text-[18px] leading-relaxed">My own funnel, in public. Read from Google Analytics and YouTube every hour, never edited by hand.</p>
        {gaError && <p className="text-[13px] text-accent">Analytics error: {gaError}</p>}
        {!live && !gaError && <p className="text-[13px] text-mid">Not connected yet. Everything below is wired and marked pending until the analytics keys are set.</p>}
      </header>
      <StatsDashboard d={d} />
      <details className="group text-[13px] text-mid max-w-[760px]">
        <summary className="cursor-pointer font-bold text-ink list-none flex items-center gap-2"><span className="transition-transform group-open:rotate-90">→</span>how this page works, and what I watch</summary>
        <div className="pt-3 flex flex-col gap-2 leading-relaxed">
          <p><strong>Sources</strong> tell me which channel sends people. Every link I post carries a source tag. <strong>Posts</strong> show views and seconds read, then shares and clicks, so subjects that earn both get more posts. <strong>Inbound</strong> counts the actions a serious reader takes: a résumé download, a click on a call to action, a message with the source attached.</p>
          <p>Built on Google Analytics 4 (GA4) events (no personal data, no ads features), read through the GA4 Data API with a read-only service account, rendered here once an hour. Video counts from the YouTube Data API. Free tools all the way down.</p>
        </div>
      </details>
    </div>
  );
}
