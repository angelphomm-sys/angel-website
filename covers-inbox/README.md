# covers-inbox

Drop Canva exports here: 2400x1350 PNG named `<post-slug>.png`.

Then run:

```bash
npm run covers
```

For each file whose name matches a post, the script:

1. Checks the image is 16:9 (within 1%). If it is not, it warns and skips the file. Add `--force` to center-crop it to 16:9 instead.
2. Resizes it to 2400x1350. It never makes a smaller image bigger, and it warns when the image is under 1600 wide.
3. Saves it as WebP to `public/images/blog/<post-slug>/cover.webp`.
4. Moves the post's old cover file to `~/.Trash/angel-website-covers-<date>/`, keeping its folder path.
5. Changes only the `cover:` line in the post's frontmatter to `/images/blog/<post-slug>/cover.webp`.
6. Moves the file out of this folder to `~/.Trash/angel-website-covers-<date>/inbox/`.

A file whose name does not match a post gets a warning and stays here. `npm run covers -- --dry-run` shows what would happen without changing anything.

This folder is not under `public/`, so nothing in it is served on the site. Image files here are ignored by git; this README is not.

## Canva export settings

- Size: 2400 x 1350 px (16:9). Keep the title text a little in from the edges, since the site rounds the corners.
- File type: PNG.
- Name: the post slug below, plus `.png`.

## Post slugs

- `10-brand-moments-people-showed-up-for-2026`
- `behind-the-strategy-ghia`
- `behind-the-strategy-graza`
- `bloom-nutrition-marketing-strategy`
- `duolingo-social-media-strategy`
- `first-gen-and-figuring-it-out`
- `fishwife-marketing-strategy`

## Photo credits

If a cover uses someone else's photo, add these to the post's frontmatter. The credit shows under the cover on the post page, not on cards.

```yaml
coverCredit: "Photo by Jane Doe on Unsplash"
coverCreditUrl: "https://unsplash.com/photos/..."
```
