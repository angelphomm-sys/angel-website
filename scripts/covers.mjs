#!/usr/bin/env node
// npm run covers [-- --force] [-- --dry-run]
//
// Turns Canva exports in covers-inbox/<post-slug>.(png|jpg|jpeg|webp) into the post's cover:
// checks 16:9, resizes to 2400x1350 (never upscales), saves WebP to public/images/blog/<slug>/cover.webp,
// moves the old cover file to the Trash, points the post's `cover:` line at the new file, and moves the export to the Trash.
// Nothing is deleted: replaced files go to ~/.Trash/angel-website-covers-<YYYY-MM-DD>/, keeping their project paths.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const INBOX = path.join(ROOT, "covers-inbox");
const POSTS = path.join(ROOT, "content", "posts");
const PUBLIC = path.join(ROOT, "public");

const OUT_W = 2400;
const OUT_H = 1350;
const MIN_W = 1600;
const RATIO = 16 / 9;
const TOLERANCE = 0.01;

const args = new Set(process.argv.slice(2));
const force = args.has("--force");
const dryRun = args.has("--dry-run");

const today = (() => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
})();
const TRASH = path.join(os.homedir(), ".Trash", `angel-website-covers-${today}`);

const warn = (msg) => console.warn(`  ! ${msg}`);
const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

/** Move a file into the Trash folder at `rel` (its path relative to the project, or inbox/<name>). Never overwrites: a clash gets a time suffix. */
function trash(file, rel) {
  let dest = path.join(TRASH, rel);
  if (fs.existsSync(dest)) {
    const { dir, name, ext } = path.parse(dest);
    dest = path.join(dir, `${name}-${Date.now()}${ext}`);
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.renameSync(file, dest);
  return dest;
}

/** The post file for a slug, or undefined. */
function postFile(slug) {
  return [`${slug}.mdx`, `${slug}.md`].map((f) => path.join(POSTS, f)).find((f) => fs.existsSync(f));
}

/** The frontmatter block's bounds in a post's text: [start of first line after the opening ---, index of the closing ---]. */
function frontmatter(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(text);
  if (!m) return undefined;
  const start = m[0].indexOf("\n") + 1;
  return { start, end: start + m[1].length, body: m[1] };
}

/** The `cover:` value in the frontmatter, unquoted, or undefined. */
function readCover(fm) {
  const m = /^cover:[ \t]*(.*)$/m.exec(fm.body);
  if (!m) return undefined;
  return m[1].trim().replace(/^(["'])(.*)\1$/, "$2") || undefined;
}

/** The post text with only the frontmatter `cover:` line changed (or added before the closing --- when missing). */
function writeCover(text, fm, value) {
  const line = `cover: ${value}`;
  const re = /^cover:[ \t]*.*$/m;
  const body = re.test(fm.body) ? fm.body.replace(re, line) : `${fm.body}\n${line}`;
  return text.slice(0, fm.start) + body + text.slice(fm.end);
}

async function main() {
  if (!fs.existsSync(INBOX)) {
    console.log("No covers-inbox/ folder. Nothing to do.");
    return;
  }
  const files = fs.readdirSync(INBOX).filter((f) => /\.(png|jpe?g|webp)$/i.test(f)).sort();
  if (files.length === 0) {
    console.log("covers-inbox/ has no images. Drop Canva exports there as <post-slug>.png, then run again.");
    return;
  }
  console.log(`${dryRun ? "[dry run] " : ""}Processing ${files.length} file(s) from covers-inbox/${force ? " (--force)" : ""}`);

  const done = [];
  for (const name of files) {
    const slug = path.parse(name).name;
    const src = path.join(INBOX, name);
    console.log(`\n${name}`);

    const post = postFile(slug);
    if (!post) {
      warn(`no post named "${slug}" in content/posts. Left in covers-inbox/. Rename it to a post slug.`);
      continue;
    }

    const meta = await sharp(src).metadata();
    // Upright size: EXIF orientations 5 to 8 swap width and height.
    const [w, h] = (meta.orientation ?? 1) >= 5 ? [meta.height, meta.width] : [meta.width, meta.height];
    if (!w || !h) {
      warn("could not read the image size. Skipped.");
      continue;
    }
    const off = Math.abs(w / h / RATIO - 1);
    if (off > TOLERANCE) {
      if (!force) {
        warn(`${w}x${h} is not 16:9 (off by ${(off * 100).toFixed(1)}%). Skipped. Re-export at 2400x1350, or run with --force to center-crop it.`);
        continue;
      }
      warn(`${w}x${h} is not 16:9 (off by ${(off * 100).toFixed(1)}%). --force: center-cropping to 16:9.`);
    }
    // Largest 16:9 box that fits the input, capped at 2400x1350: never upscale.
    const fitW = Math.min(w, Math.round(h * RATIO));
    const outW = Math.min(OUT_W, fitW);
    const outH = Math.round(outW / RATIO);
    if (outW < MIN_W) warn(`only ${outW}px wide after cropping. Covers look soft under ${MIN_W}px; export at ${OUT_W}x${OUT_H} if you can.`);

    const text = fs.readFileSync(post, "utf8");
    const fm = frontmatter(text);
    if (!fm) {
      warn(`${path.relative(ROOT, post)} has no frontmatter block. Skipped.`);
      continue;
    }
    const oldCover = readCover(fm);
    const newCover = `/images/blog/${slug}/cover.webp`;
    const outFile = path.join(PUBLIC, newCover);
    if (!/^coverAlt:[ \t]*\S/m.test(fm.body)) warn(`${path.relative(ROOT, post)} has no coverAlt. Add one that describes the image and repeats its text.`);

    if (dryRun) {
      console.log(`  would write ${path.relative(ROOT, outFile)} at ${outW}x${outH}`);
      if (oldCover && oldCover !== newCover) console.log(`  would move ${oldCover} to the Trash and set cover: ${newCover}`);
      done.push({ slug, inSize: `${w}x${h}`, outSize: `${outW}x${outH}`, out: "-" });
      continue;
    }

    // Encode to a temp file first, so a failure leaves the current cover in place.
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    const tmp = `${outFile}.tmp-${process.pid}`;
    await sharp(src)
      .rotate()
      .resize(outW, outH, { fit: "cover", position: "centre", withoutEnlargement: true })
      .toColourspace("srgb")
      .webp({ quality: 82, effort: 6 })
      .toFile(tmp);

    // The old cover goes to the Trash. A re-run that replaces cover.webp also trashes the previous cover.webp (time-suffixed) rather than overwrite it.
    if (oldCover) {
      const oldFile = path.join(PUBLIC, oldCover.replace(/^\/+/, ""));
      if (oldFile.startsWith(PUBLIC + path.sep) && fs.existsSync(oldFile)) {
        const moved = trash(oldFile, path.relative(ROOT, oldFile));
        console.log(`  old cover moved to ${moved.replace(os.homedir(), "~")}`);
      } else if (oldCover !== newCover) {
        warn(`old cover ${oldCover} was not found in public/. Nothing to move.`);
      }
    } else if (fs.existsSync(outFile)) {
      trash(outFile, path.relative(ROOT, outFile));
    }
    fs.renameSync(tmp, outFile);

    if (oldCover !== newCover) {
      fs.writeFileSync(post, writeCover(text, fm, newCover));
      console.log(`  ${path.relative(ROOT, post)}: cover: ${newCover}`);
    }
    const movedInbox = trash(src, path.join("inbox", name));
    console.log(`  export moved to ${movedInbox.replace(os.homedir(), "~")}`);
    done.push({ slug, inSize: `${w}x${h}`, outSize: `${outW}x${outH}`, out: kb(fs.statSync(outFile).size) });
  }

  console.log(`\n${done.length ? "Summary" : "No covers processed."}`);
  if (done.length) {
    const rows = [["slug", "in", "out", "size"], ...done.map((d) => [d.slug, d.inSize, d.outSize, d.out])];
    const widths = rows[0].map((_, i) => Math.max(...rows.map((r) => r[i].length)));
    for (const r of rows) console.log("  " + r.map((c, i) => c.padEnd(widths[i])).join("  "));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
