import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts";
import { site } from "@/lib/site";
import { publicImageCrop, publicImageSize } from "@/lib/image-size";
import { brand, brandMarkPng } from "@/lib/brand-art";

// The share card for one post: the horizontal wordmark in oxblood, the title in near-black on cream, an oxblood rule,
// and the cover on the right when it is landscape. The title is in ImageResponse's default sans: the Typekit faces
// (IvyOra, Benton Modern) cannot be bundled into a server-rendered image, so the wordmark carries the brand.
export const alt = `Blog post by Angel Phommachan, ${site.role.toLowerCase()}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function PostOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  // Same gate as the post page: a draft has no public page in production, so it has no share card either.
  if (!post || (post.draft && process.env.NODE_ENV === "production")) notFound();
  const title = post.title;
  const cover = post.cover ? await publicImageSize(post.cover) : undefined;
  const photo = post.cover && cover && cover.width > cover.height ? await publicImageCrop(post.cover, size.width / 2, size.height) : undefined;
  const fontSize = photo ? (title.length > 44 ? 48 : 56) : title.length > 44 ? 68 : 80;
  const word = await brandMarkPng("horizontal", brand.oxblood, photo ? 340 : 420);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: brand.cream, color: brand.night, borderLeft: `20px solid ${brand.oxblood}` }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: photo ? "64px 40px 60px 56px" : "64px 80px 60px 64px" }}>
          {word ? <img src={word.src} width={word.width} height={word.height} alt="" /> : <div style={{ display: "flex", fontSize: 28, color: brand.oxblood }}>{site.name}</div>}
          <div style={{ display: "flex", fontSize, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.08 }}>{title}</div>
          <div style={{ display: "flex", fontSize: photo ? 17 : 21, letterSpacing: "0.16em", textTransform: "uppercase", color: brand.oxblood }}>{`blog · ${site.role.toLowerCase()}`}</div>
        </div>
        {photo && <img src={photo} alt="" width={size.width / 2} height={size.height} style={{ objectFit: "cover" }} />}
      </div>
    ),
    size,
  );
}
