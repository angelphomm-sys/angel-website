// Objectives from the portfolio marketing plan (MKTG 3685, fall 2026). All due December 15, 2026.
export const deadline = "2026-12-15";
export const objectives = {
  visitors: { target: 500, label: "unique visitors" },
  linkedinShare: { target: 0.4, label: "of visits from LinkedIn" },
  directShare: { target: 0.2, label: "of visits direct" },
  avgSeconds: { target: 90, label: "average session, seconds" },
  inquiries: { target: 5, label: "direct inquiries" },
  linkedinPosts: { target: 8, label: "LinkedIn posts with 15+ reactions", offsite: true },
  connections: { target: 30, label: "new connections in target industries", offsite: true },
} as const;
