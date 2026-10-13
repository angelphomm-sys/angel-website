import path from "node:path";

export type ImageSize = { width: number; height: number };

const file = (src: string) => path.join(process.cwd(), "public", src.replace(/^\/+/, ""));

/**
 * Pixel size of an image in public/, upright (EXIF rotation applied).
 * Uses sharp, which ships with Next. Undefined when sharp or the file is missing, so callers leave size out instead of guessing.
 */
export async function publicImageSize(src: string): Promise<ImageSize | undefined> {
  try {
    const { default: sharp } = await import("sharp");
    const m = await sharp(file(src)).metadata();
    if (!m.width || !m.height) return undefined;
    return (m.orientation ?? 1) >= 5 ? { width: m.height, height: m.width } : { width: m.width, height: m.height };
  } catch {
    return undefined;
  }
}

/**
 * A crop of an image in public/ as a JPEG data URI, for share cards. Undefined when it cannot be made.
 * Anchored left by default: the brand covers set their name on the left third, and a center crop cuts it.
 */
export async function publicImageCrop(src: string, width: number, height: number, position: "left" | "centre" = "left"): Promise<string | undefined> {
  try {
    const { default: sharp } = await import("sharp");
    const buf = await sharp(file(src)).rotate().resize(width, height, { fit: "cover", position }).jpeg({ quality: 82 }).toBuffer();
    return `data:image/jpeg;base64,${buf.toString("base64")}`;
  } catch {
    return undefined;
  }
}
