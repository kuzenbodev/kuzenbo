import { ImageResponse } from "next/og";

import { SITE_NAME } from "@/lib/seo/metadata";

export const alt = `${SITE_NAME} Twitter Image`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background:
          "linear-gradient(140deg, #05210f 0%, #0d3f22 45%, #177f45 100%)",
        color: "#f8fffb",
        padding: "72px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 40, opacity: 0.9 }}>Kuzenbo</div>
      <div style={{ fontSize: 84, fontWeight: 700, marginTop: 24 }}>
        Build Your Design System
      </div>
      <div style={{ fontSize: 34, marginTop: 24, opacity: 0.85 }}>
        Components, hooks, showcase, and docs for production teams.
      </div>
    </div>,
    {
      ...size,
    }
  );
}
