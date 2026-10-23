import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { brand, brandMarkPng } from "@/lib/brand-art";

// The default share card for any page without its own picture: the stacked wordmark in cream on red, the role and the
// address in small tracked capitals. The wordmark is a picture of the traced logo; ImageResponse cannot load the web font.
export const alt = `${site.name}, ${site.role.toLowerCase()}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [word, badge] = await Promise.all([brandMarkPng("stacked", brand.cream, 760), brandMarkPng("monogram", brand.oxblood, 92)]);
  const label = { fontSize: 24, letterSpacing: "0.18em", textTransform: "uppercase" as const };
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: brand.oxblood, padding: "72px 88px", color: brand.cream }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ ...label, display: "flex", color: brand.blue }}>{site.role}</div>
          <div style={{ width: 132, height: 132, borderRadius: 66, background: brand.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {badge && <img src={badge.src} width={badge.width} height={badge.height} alt="" style={{ marginLeft: 3 }} />}
          </div>
        </div>
        {word ? <img src={word.src} width={word.width} height={word.height} alt="" /> : <div style={{ fontSize: 104, display: "flex" }}>{site.name}</div>}
        <div style={{ ...label, display: "flex", color: brand.cream }}>angelphommachan.com</div>
      </div>
    ),
    size,
  );
}
