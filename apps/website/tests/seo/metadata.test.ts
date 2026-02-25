import { expect, test } from "bun:test";

import { resolveSeoConfig } from "@/lib/seo/config";
import {
  createPageMetadata,
  createRootMetadata,
  ROOT_TITLE,
} from "@/lib/seo/metadata";

test("createRootMetadata includes production SEO defaults", () => {
  const metadata = createRootMetadata();

  expect(metadata.metadataBase?.toString()).toBe("https://kuzenbo.com/");
  expect(metadata.title).toEqual({
    default: ROOT_TITLE,
    template: "%s | Kuzenbo",
  });
  expect(metadata.alternates?.canonical).toBe("https://kuzenbo.com/");
  expect(metadata.openGraph?.images).toBeArray();
  expect(metadata.twitter?.images).toBeArray();
});

test("createPageMetadata wires canonical, social, and indexable defaults", () => {
  const metadata = createPageMetadata({
    title: "Showcase",
    canonicalPath: "/showcase",
    description: "Showcase description",
    openGraphImagePath: "/opengraph-image",
    twitterImagePath: "/twitter-image",
  });

  expect(metadata.alternates?.canonical).toBe("https://kuzenbo.com/showcase");
  expect(metadata.openGraph?.title).toBe("Showcase");
  expect(metadata.twitter?.title).toBe("Showcase");
  expect(metadata.robots).toEqual({
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    index: true,
  });
});

test("createPageMetadata applies noindex policy when requested", () => {
  const metadata = createPageMetadata({
    title: "Draft Page",
    canonicalPath: "/draft",
    noIndex: true,
  });

  expect(metadata.robots).toEqual({
    follow: false,
    googleBot: {
      follow: false,
      index: false,
      "max-image-preview": "none",
      "max-snippet": 0,
      "max-video-preview": 0,
    },
    index: false,
  });
});

test("resolveSeoConfig canonicalizes preview URLs and keeps production apex host", () => {
  const previewConfig = resolveSeoConfig({
    NEXT_PUBLIC_SITE_URL: "https://www.kuzenbo.com",
    VERCEL_ENV: "preview",
  });

  const productionConfig = resolveSeoConfig({
    NEXT_PUBLIC_SITE_URL: "https://www.kuzenbo.com",
    VERCEL_ENV: "production",
  });

  expect(previewConfig.siteUrlString).toBe("https://kuzenbo.com");
  expect(productionConfig.canonicalSiteUrlString).toBe("https://kuzenbo.com");
  expect(productionConfig.isProduction).toBe(true);
});
