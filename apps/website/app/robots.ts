import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    host: "kuzenbo.com",
    rules: {
      allow: ["/", "/docs", "/showcase"],
      disallow: ["/api/"],
      userAgent: "*",
    },
    sitemap: "https://kuzenbo.com/sitemap.xml",
  };
}
