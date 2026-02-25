import type { MetadataRoute } from "next";

import { resolveSeoConfig } from "@/lib/seo/config";

export const createRobotsMetadata = (
  env: Record<string, string | undefined> = process.env
): MetadataRoute.Robots => {
  const config = resolveSeoConfig(env);

  if (!config.isProduction) {
    return {
      host: config.canonicalHost,
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap: `${config.canonicalSiteUrlString}/sitemap.xml`,
    };
  }

  return {
    host: config.canonicalHost,
    rules: {
      userAgent: "*",
      allow: ["/", "/docs", "/showcase"],
      disallow: ["/api/"],
    },
    sitemap: `${config.canonicalSiteUrlString}/sitemap.xml`,
  };
};

export default function robots(): MetadataRoute.Robots {
  return createRobotsMetadata();
}
