import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-directive", "remark-frontmatter"],
  },
});

const nextConfig: NextConfig = {
  transpilePackages: [
    "@kuzenbo/ai",
    "@kuzenbo/charts",
    "@kuzenbo/code",
    "@kuzenbo/core",
    "@kuzenbo/datatable",
    "@kuzenbo/date",
    "@kuzenbo/hooks",
    "@kuzenbo/notifications",
    "@kuzenbo/theme",
    "@kuzenbo/styles",
    "@kuzenbo/tiptap",
  ],
  // Enables "use cache" directive; excludes App Router data fetching from
  // pre-renders by default; enables Cache Components (PPR)
  cacheComponents: true,
  typedRoutes: true,
  trailingSlash: false,

  experimental: {
    viewTransition: true,
    // Only load modules actually used from packages with many exports (barrel files)
    optimizePackageImports: [
      "@kuzenbo/ai",
      "@kuzenbo/charts",
      "@kuzenbo/core",
      "@kuzenbo/code",
      "@kuzenbo/datatable",
      "@kuzenbo/date",
      "@kuzenbo/hooks",
      "@kuzenbo/notifications",
      "@kuzenbo/tiptap",
    ],
    // Enables global-not-found.js for app-level 404 (multi-root layouts, unmatched routes)
    globalNotFound: true,
    // Cache fetch responses across HMR refreshes in dev (default: true)
    serverComponentsHmrCache: true,
    // Forward browser logs to terminal (dev only)
    browserDebugInfoInTerminal: true,
    // Client router cache: static prefetched (s), dynamic (s)
    staleTimes: { dynamic: 30, static: 180 },
    // Pinpoint CLS/LCP contributors for debugging
    webVitalsAttribution: ["CLS", "LCP"],

    // Enable turbopack file system cache for build
    turbopackFileSystemCacheForBuild: true,
    // Enable turbopack file system cache for dev
    turbopackFileSystemCacheForDev: true,
  },
  logging: {
    incomingRequests: { ignore: [/\/api\/.*\/health/] },
  },
  redirects() {
    return [
      {
        destination: "/docs/getting-started",
        permanent: false,
        source: "/docs",
      },
      {
        destination: "https://kuzenbo.com/:path*",
        has: [{ type: "host", value: "www.kuzenbo.com" }],
        permanent: true,
        source: "/:path*",
      },
    ];
  },
  // Emit source maps in production (increases build time/memory; default off)
  productionBrowserSourceMaps: true,
  compiler: {
    // Remove console.* calls in production (reduces bundle, avoids debug leakage)
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Disable X-Powered-By header on HTTP responses
  poweredByHeader: false,
};

export default withMDX(nextConfig);
