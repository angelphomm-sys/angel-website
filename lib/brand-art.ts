import path from "node:path";
import { readFile } from "node:fs/promises";

// Angel's marks for ImageResponse cards (share images, the home-screen icon). ImageResponse cannot load the Typekit
// faces, so the wordmark goes in as a picture: the traced SVG in public/brand, tinted, rasterized by sharp (ships with Next).

// The four from the 2026-10-22 sheet. The older names (oxblood, blue, khaki, olive) alias the new ones so every card keeps resolving.
export const brand = { red: "#BB2426", cream: "#F1E7D4", night: "#210F10", ice: "#C7DEE9", oxblood: "#BB2426", blue: "#C7DEE9", khaki: "#C7DEE9", olive: "#210F10" } as const;

const files = { monogram: "ap-monogram.svg", asterisk: "ap-asterisk.svg", horizontal: "ap-wordmark-horizontal.svg", stacked: "ap-wordmark-stacked.svg" } as const;

/** A mark as a PNG data URI at the given pixel width, filled with `color`. Undefined if it cannot be made, so a card still renders. */
export async function brandMarkPng(variant: keyof typeof files, color: string, width: number): Promise<{ src: string; width: number; height: number } | undefined> {
  try {
    const svg = (await readFile(path.join(process.cwd(), "public", "brand", files[variant]), "utf8")).replaceAll('fill="currentColor"', `fill="${color}"`);
    const { default: sharp } = await import("sharp");
    const buf = await sharp(Buffer.from(svg), { density: 216 }).resize({ width }).png().toBuffer();
    const meta = await sharp(buf).metadata();
    return { src: `data:image/png;base64,${buf.toString("base64")}`, width, height: meta.height ?? Math.round(width / 4) };
  } catch {
    return undefined;
  }
}
