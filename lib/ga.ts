import { createSign } from "node:crypto";

// GA4 Data API, reached with a service-account JWT. No SDK, so nothing to install.
// Setup: GA Admin → property → Property access management → add the service account email as Viewer.
const PROPERTY = process.env.GA4_PROPERTY_ID ?? "";
const EMAIL = process.env.GA_SERVICE_ACCOUNT_EMAIL ?? "";
const KEY = (process.env.GA_SERVICE_ACCOUNT_KEY ?? "").replace(/\\n/g, "\n");

export const gaConfigured = Boolean(PROPERTY && EMAIL && KEY);

const b64 = (o: object | Buffer) => (Buffer.isBuffer(o) ? o : Buffer.from(JSON.stringify(o))).toString("base64url");

async function accessToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({ iss: EMAIL, scope: "https://www.googleapis.com/auth/analytics.readonly", aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 })}`;
  const sig = createSign("RSA-SHA256").update(unsigned).sign(KEY);
  const jwt = `${unsigned}.${b64(sig)}`;
  const r = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: jwt }), cache: "no-store" });
  if (!r.ok) throw new Error(`token ${r.status}`);
  return (await r.json()).access_token as string;
}

type Row = { dimensionValues?: { value: string }[]; metricValues?: { value: string }[] };
export type Report = { rows: { dims: string[]; metrics: number[] }[] };

export async function runReport(body: Record<string, unknown>): Promise<Report> {
  const token = await accessToken();
  const r = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY}:runReport`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(body), next: { revalidate: 3600 } });
  if (!r.ok) throw new Error(`report ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const j = await r.json();
  return { rows: ((j.rows ?? []) as Row[]).map((row) => ({ dims: (row.dimensionValues ?? []).map((d) => d.value), metrics: (row.metricValues ?? []).map((m) => Number(m.value)) })) };
}

const last28 = [{ startDate: "28daysAgo", endDate: "today" }];

export type SiteStats = {
  visitorsByDay: { date: string; users: number }[];
  totals: { users: number; views: number; avgSeconds: number };
  topPages: { path: string; views: number }[];
  sources: { source: string; sessions: number }[];
  events: Record<string, number>;
  posts: { path: string; views: number; engagedSeconds: number }[];
};

export async function siteStats(): Promise<SiteStats> {
  const [byDay, totals, pages, sources, events, posts] = await Promise.all([
    runReport({ dateRanges: last28, dimensions: [{ name: "date" }], metrics: [{ name: "activeUsers" }], orderBys: [{ dimension: { dimensionName: "date" } }] }),
    runReport({ dateRanges: last28, metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }, { name: "averageSessionDuration" }] }),
    runReport({ dateRanges: last28, dimensions: [{ name: "pagePath" }], metrics: [{ name: "screenPageViews" }], orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }], limit: 8 }),
    runReport({ dateRanges: last28, dimensions: [{ name: "sessionSource" }], metrics: [{ name: "sessions" }], orderBys: [{ metric: { metricName: "sessions" }, desc: true }], limit: 6 }),
    runReport({ dateRanges: last28, dimensions: [{ name: "eventName" }], metrics: [{ name: "eventCount" }], limit: 250 }),
    runReport({ dateRanges: last28, dimensions: [{ name: "pagePath" }], metrics: [{ name: "screenPageViews" }, { name: "userEngagementDuration" }], dimensionFilter: { filter: { fieldName: "pagePath", stringFilter: { matchType: "BEGINS_WITH", value: "/blog/" } } }, orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }], limit: 30 }),
  ]);
  const t = totals.rows[0]?.metrics ?? [0, 0, 0];
  return {
    visitorsByDay: byDay.rows.map((r) => ({ date: r.dims[0], users: r.metrics[0] })),
    totals: { users: t[0], views: t[1], avgSeconds: Math.round(t[2]) },
    topPages: pages.rows.map((r) => ({ path: r.dims[0], views: r.metrics[0] })),
    sources: sources.rows.map((r) => ({ source: r.dims[0], sessions: r.metrics[0] })),
    events: Object.fromEntries(events.rows.map((r) => [r.dims[0], r.metrics[0]])),
    posts: posts.rows.map((r) => ({ path: r.dims[0].split("?")[0], views: r.metrics[0], engagedSeconds: r.metrics[0] ? Math.round(r.metrics[1] / r.metrics[0]) : 0 })),
  };
}
