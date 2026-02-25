import type { MetadataRoute } from "next";

import { SITE_NAME } from "@/lib/seo/metadata";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} Website`,
    short_name: SITE_NAME,
    description:
      "Kuzenbo website with docs, showcase pages, and production-ready design system resources.",
    start_url: "/",
    display: "standalone",
    background_color: "#05210f",
    theme_color: "#05210f",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
