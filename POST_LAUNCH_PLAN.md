# Post-launch plan: angelphommachan.com

Launch: Tuesday 2026-10-13 on Vercel. Final update planned about one month after launch.

## Launch day
1. Deploy to Vercel. Make `angelphommachan.com` the primary domain; `www` redirects to it.
2. Google Search Console (free):
   - Add the property `angelphommachan.com` (Domain property, verify with the DNS TXT record Vercel or your domain registrar shows).
   - Submit the sitemap: `https://angelphommachan.com/sitemap.xml`.
   - Use URL Inspection on the home page and each blog post and click "Request indexing."
3. Vercel environment variables:
   - `RESEND_API_KEY` (free Resend account) so the About contact form emails you.
   - `NEXT_PUBLIC_SHOW_NOTES=false` when you want the remaining [bracket notes] hidden.
4. Spot-check the live site on your phone: home, work, one case, blog, one post, about, the contact form.

## Next step after launch: editing dashboard
- Add a free, git-based editor (Keystatic, or TinaCMS) so you can write and edit posts in a browser without touching code. Posts stay in `content/posts/`. About one hour of setup.

## Blog workflow (ready now)
- Post template: `templates/post-template.mdx` (steps in `templates/README.md`).
- Rules: `BLOG_REWRITE_GUIDE.md`; log approved rewrites in `BLOG_LOG.md`.
- Covers: Canva 2400x1350 PNG named `<post-slug>.png` into `covers-inbox/`, then `npm run covers`.
- Rhythm: one post every two weeks, plus its LinkedIn carousel the same week.

## Content ideas (later, in this order)
1. LinkedIn carousel for each blog post (reusable template; first one from the Ghia post).
2. Free "steal this" downloads (brand breakdown worksheet first; free download, then email signup once the newsletter exists).
3. Monthly spec series (working name "Spec Notes"): Ghia holiday, Graza New Year, Fishwife Valentine's, one sports or entertainment brand.
4. Separate newsletter (Substack or Beehiiv) with comments; each issue links back to the full post on the site.
5. Blog rewrites under BLOG_REWRITE_GUIDE.md: start with Duolingo, the 10 brand activations post, Bloom.
6. New posts to reach the class count: one narrative post and two multimedia posts (60-second About Me video, a how-to video).

## Open items from Angel
- Restaurant name: ask the owner before naming it.
- Warroad population: 900 (your essay) vs about 1,700 (CBS 2017 / census). Pick one, or say "near Warroad."
- Ghia: send the permission email to press@drinkghia.com (draft in chat), and shoot your own photos either way.
- Ghia spec emails (Dry-ish January): six photos, listed in `.harness/reports/ghia-dryish-images.md`, then flip `ghiaImagesReady`.
- Hope Scholars numbers (followers, reach, attendance, money raised) to bring it back as a real project.
- Family OK to show the first-gen photos; names on the Hope Scholars event selfie.
- Figma: social spec frames are flat images (free-plan call limit); six own-post covers still show the old red there.
- Kent's video is 4.9MB; `brew install ffmpeg` and I can shrink it.
