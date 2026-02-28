import type { MetadataRoute } from "next";

import { SITE_NAME } from "@/constants/website";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#05210f",
    description:
      "Kuzenbo website with docs, showcase pages, and production-ready design system resources.",
    display: "standalone",
    icons: [
      {
        sizes: "any",
        src: "/favicon.ico",
        type: "image/x-icon",
      },
      {
        sizes: "512x512",
        src: "/icon.png",
        type: "image/png",
      },
      {
        sizes: "180x180",
        src: "/apple-icon.png",
        type: "image/png",
      },
      {
        sizes: "192x192",
        src: "/icons/icon-192.png",
        type: "image/png",
      },
      {
        sizes: "512x512",
        src: "/icons/icon-512.png",
        type: "image/png",
      },
    ],
    name: `${SITE_NAME} Website`,
    short_name: SITE_NAME,
    start_url: "/",
    theme_color: "#05210f",
  };
}
