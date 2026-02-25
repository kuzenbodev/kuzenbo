import { docsRouteEntries } from "@/lib/docs/docs-manifest";

const toSiteUrl = (): string => {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://kuzenbo.com");

  const normalized = configuredUrl.startsWith("http")
    ? configuredUrl
    : `https://${configuredUrl}`;

  return normalized.endsWith("/") ? normalized.slice(0, -1) : normalized;
};

const getRouteLines = (): string[] => {
  const registry = new Map<string, (typeof docsRouteEntries)[number]>();
  for (const page of docsRouteEntries) {
    if (!registry.has(page.href)) {
      registry.set(page.href, page);
    }
  }

  const pages = [...registry.values()].toSorted((left, right) =>
    left.href.localeCompare(right.href)
  );

  const lines = pages.map((page) => {
    const label = [page.title, page.description].filter(Boolean).join(" — ");

    if (label.length === 0) {
      return `- ${page.href}`;
    }

    return `- ${page.href} | ${label}`;
  });

  return lines;
};

const GET = async (): Promise<Response> => {
  const siteUrl = toSiteUrl();
  const routeLines = getRouteLines();

  const lines = [
    "# Kuzenbo",
    "",
    `site: ${siteUrl}`,
    "docs: /docs",
    "sitemap: /sitemap.xml",
    "",
    "## docs-routes",
    ...routeLines,
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=3600",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};

export { GET };
