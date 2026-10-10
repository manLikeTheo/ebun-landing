import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import colors from "@/brand/colors.json";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const artwork = await readFile(join(process.cwd(), "public/brand/sendebun-logo-original.png"));
  return new ImageResponse(
    <div style={{ display: "flex", position: "relative", overflow: "hidden", width: 64, height: 64, background: colors.text, borderRadius: 10 }}>
      {/* ImageResponse requires a native img; this is not a browser image. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`data:image/png;base64,${artwork.toString("base64")}`} alt="" width={182.4} height={182.4} style={{ position: "absolute", left: -59.52, top: -39.04 }} />
    </div>,
    size,
  );
}
