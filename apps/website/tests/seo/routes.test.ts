import { expect, test } from "bun:test";

import manifest from "../../app/manifest";
import { createRobotsMetadata } from "../../app/robots";
import {
  createSitemapEntries,
  getChangeFrequency,
  getPriority,
} from "../../app/sitemap";
import nextConfig from "../../next.config";

const toIsoString = (value: Date | string | undefined): string | undefined => {
  if (value instanceof Date) {
    return value.toISOString();
  }

  return value;
};

test("robots metadata disallows crawling in non-production environments", () => {
  const robots = createRobotsMetadata({
    NEXT_PUBLIC_SITE_URL: "https://preview-kuzenbo.vercel.app",
    VERCEL_ENV: "preview",
  });

  expect(robots.rules).toEqual({
    userAgent: "*",
    disallow: "/",
  });
  expect(robots.sitemap).toBe("https://kuzenbo.com/sitemap.xml");
});

test("robots metadata allows indexable areas in production", () => {
  const robots = createRobotsMetadata({
    NEXT_PUBLIC_SITE_URL: "https://kuzenbo.com",
    VERCEL_ENV: "production",
  });

  expect(robots.rules).toEqual({
    userAgent: "*",
    allow: ["/", "/docs", "/showcase"],
    disallow: ["/api/"],
  });
  expect(robots.host).toBe("kuzenbo.com");
});

test("sitemap builder canonicalizes URLs and excludes noindex pages", () => {
  const now = new Date("2026-01-01T00:00:00.000Z");

  const entries = createSitemapEntries({
    now,
    pages: [
      {
        url: "/docs/getting-started",
        data: {
          noIndex: false,
          updatedAt: "2026-01-10T10:00:00.000Z",
        },
      },
      {
        url: "/docs/internal-draft",
        data: {
          noIndex: true,
          updatedAt: "2026-01-12T10:00:00.000Z",
        },
      },
    ],
  });

  expect(
    entries.some(
      (entry) => entry.url === "https://kuzenbo.com/docs/internal-draft"
    )
  ).toBe(false);

  const gettingStartedEntry = entries.find(
    (entry) => entry.url === "https://kuzenbo.com/docs/getting-started"
  );

  expect(gettingStartedEntry?.priority).toBe(0.8);
  expect(gettingStartedEntry?.changeFrequency).toBe("monthly");
  expect(toIsoString(gettingStartedEntry?.lastModified)).toBe(
    "2026-01-10T10:00:00.000Z"
  );
});

test("manifest includes required identity and icon metadata", () => {
  const siteManifest = manifest();

  expect(siteManifest.name).toBe("Kuzenbo Website");
  expect(siteManifest.start_url).toBe("/");
  expect(
    siteManifest.icons?.some((icon) => icon.src === "/icons/icon-192.png")
  ).toBe(true);
  expect(
    siteManifest.icons?.some((icon) => icon.src === "/icons/icon-512.png")
  ).toBe(true);
});

test("next config includes canonical www to apex redirect", async () => {
  const redirects = await nextConfig.redirects?.();

  expect(redirects).toBeArray();

  const canonicalRedirect = redirects?.find(
    (redirect) => redirect.destination === "https://kuzenbo.com/:path*"
  );

  expect(canonicalRedirect).toBeDefined();
  expect(canonicalRedirect?.source).toBe("/:path*");
});

test("priority and frequency helpers keep SEO defaults stable", () => {
  expect(getPriority("/")).toBe(1);
  expect(getPriority("/docs")).toBe(0.95);
  expect(getChangeFrequency("/docs")).toBe("weekly");
  expect(getChangeFrequency("/showcase")).toBe("monthly");
});
