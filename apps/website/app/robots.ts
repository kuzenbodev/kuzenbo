import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    host: "kuzenbo.com",
    rules: {
      userAgent: "*",
      allow: ["/", "/docs", "/showcase"],
      disallow: ["/api/"],
    },
    sitemap: "https://kuzenbo.com/sitemap.xml",
  };
}
