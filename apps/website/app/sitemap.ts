import type { MetadataRoute } from "next";

import { docsRoutes } from "@/lib/docs/docs-manifest";
import { normalizePathname, toCanonicalUrl } from "@/lib/seo/config";

interface DocsSitemapData {
  noIndex?: boolean;
  publishedAt?: string;
  updatedAt?: string;
}

interface DocsSitemapPage {
  data: DocsSitemapData;
  url: string;
}

type SitemapEntry = MetadataRoute.Sitemap[number];

export const getPriority = (href: string): number => {
  if (href === "/") {
    return 1;
  }

  if (href === "/docs") {
    return 0.95;
  }

  if (href.startsWith("/docs")) {
    return 0.8;
  }

  if (href.startsWith("/showcase")) {
    return 0.7;
  }

  return 0.6;
};

export const getChangeFrequency = (
  href: string
): SitemapEntry["changeFrequency"] => {
  if (href === "/" || href === "/docs") {
    return "weekly";
  }

  if (href.startsWith("/docs")) {
    return "monthly";
  }

  return "monthly";
};

export const getStaticRoutes = (): string[] => [
  "/",
  "/docs",
  "/showcase",
  "/showcase/components",
  "/showcase/features",
  "/showcase/hooks",
  "/showcase/playground",
];

const parseDate = (candidate?: string): Date | undefined => {
  if (!candidate) {
    return undefined;
  }

  const parsed = new Date(candidate);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
};

export const getLastModified = (
  page: DocsSitemapPage,
  fallback: Date
): Date => {
  const updatedAt = parseDate(page.data.updatedAt);
  if (updatedAt) {
    return updatedAt;
  }

  const publishedAt = parseDate(page.data.publishedAt);
  if (publishedAt) {
    return publishedAt;
  }

  return fallback;
};

export const createSitemapEntries = ({
  pages,
  now,
}: {
  now: Date;
  pages: DocsSitemapPage[];
}): MetadataRoute.Sitemap => {
  const routes = new Set<string>(getStaticRoutes());

  for (const page of pages) {
    if (page.data.noIndex) {
      continue;
    }

    routes.add(normalizePathname(page.url));
  }

  const sortedRoutes = [...routes].toSorted((left, right) =>
    left.localeCompare(right)
  );

  return sortedRoutes.map<SitemapEntry>((href) => {
    const matchingPage = pages.find(
      (page) => normalizePathname(page.url) === href
    );

    return {
      changeFrequency: getChangeFrequency(href),
      lastModified: matchingPage ? getLastModified(matchingPage, now) : now,
      priority: getPriority(href),
      url: toCanonicalUrl(href),
    };
  });
};

const toDocsPages = (): DocsSitemapPage[] =>
  docsRoutes.map((url) => ({
    url,
    data: {},
  }));

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = toDocsPages();

  return createSitemapEntries({ now, pages });
}
