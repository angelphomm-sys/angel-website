import { ImageResponse } from "next/og";
import { brand, brandMarkPng } from "@/lib/brand-art";

// Home-screen icon: the AP monogram in cream on oxblood, as on the brand sheet's badge. iOS rounds the corners itself.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const mark = await brandMarkPng("monogram", brand.cream, 112);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: brand.oxblood }}>
        {mark && <img src={mark.src} width={mark.width} height={mark.height} alt="" style={{ marginLeft: 4 }} />}
      </div>
    ),
    size,
  );
}
