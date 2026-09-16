# Angel Phommachan — portfolio site

Next.js 16 · Tailwind 4 · MDX posts · Giscus comments · API routes for subscribe (Buttondown) and contact (Resend). Deploys to Vercel.

## Run it

```bash
npm install
cp .env.example .env.local   # fill in what you have; everything works without keys in dev
npm run dev
```

## Where things live

| What | Where |
|---|---|
| Site name, email, socials, skill areas, colors | `lib/site.ts` |
| Blog posts | `content/posts/*.mdx` — one file per post |
| Images | `public/images/{me,photography,hope,recap,video}` |
| Pages | `app/` — home, `about`, `blog`, `blog/[slug]`, `work/[area]`, `contact`, `photography` |
| Forms | `app/api/subscribe`, `app/api/contact` |

## Writing a post

Create `content/posts/my-post.mdx`:

```mdx
---
title: "Post title"
excerpt: "One or two sentences shown on cards and at the top of the post."
date: "2026-09-14"
type: list            # list · sectional · narrative · multimedia · case-study · work
area: events          # social · campaigns · events — omit for personal stories
cover: /images/…jpg   # optional
draft: true           # drafts show in dev, hidden in production
featured: true        # one post gets the "Featured breakdown" slot on the home page
---

Body in Markdown. Components you can use:

<YouTube id="VIDEO_ID" title="…" />
<Figure src="/images/…" alt="…" caption="…" ratio="4/5" />
<Gallery cols={3} images={[{ src: "/images/…", alt: "…" }]} />
<LinkCard href="https://…" label="LinkedIn" title="…" />
<Todo>Notes to yourself — delete before publishing.</Todo>
```

## Going live

1. **Comments:** enable GitHub Discussions on this repo, set up [giscus.app](https://giscus.app), paste the four `NEXT_PUBLIC_GISCUS_*` values.
2. **Subscribe:** create a free [Buttondown](https://buttondown.com) newsletter, paste `BUTTONDOWN_API_KEY`.
3. **Contact:** create a [Resend](https://resend.com) key, set `RESEND_API_KEY`. Verify a domain to send from your own address.
4. **Video:** upload the convocation video (compressed copy at `~/projects/portfolio/assets/angel-convocation-720p.m4v`) to YouTube, set `NEXT_PUBLIC_ABOUT_VIDEO_ID`.
5. **Deploy:** push to GitHub, import at [vercel.com/new](https://vercel.com/new), add the env vars, done. Point a custom domain at it when you have one and update `NEXT_PUBLIC_SITE_URL`.
