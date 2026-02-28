import { ImageResponse } from "next/og";

import { SITE_NAME } from "@/constants/website";

export const alt = `${SITE_NAME} Open Graph Image`;
export const size = {
  height: 630,
  width: 1200,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background:
          "linear-gradient(140deg, #05210f 0%, #0d3f22 45%, #177f45 100%)",
        color: "#f8fffb",
        display: "flex",
        flexDirection: "column",
        fontFamily: "sans-serif",
        height: "100%",
        justifyContent: "center",
        padding: "72px",
        width: "100%",
      }}
    >
      <div style={{ fontSize: 40, opacity: 0.9 }}>Kuzenbo</div>
      <div style={{ fontSize: 84, fontWeight: 700, marginTop: 24 }}>
        Build Your Design System
      </div>
      <div style={{ fontSize: 34, marginTop: 24, opacity: 0.85 }}>
        Production-ready UI primitives, hooks, docs, and patterns.
      </div>
    </div>,
    {
      ...size,
    }
  );
}
