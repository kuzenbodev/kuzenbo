# Website SEO Guide

This document describes the production SEO setup for `apps/website`.

## Canonical policy

- Primary canonical host is `https://kuzenbo.com`.
- `www.kuzenbo.com` permanently redirects to the apex host.
- Canonical URLs in metadata and sitemap are always generated against the apex host.

## Metadata architecture

- Root metadata is defined in `apps/website/app/layout.tsx`.
- Shared metadata helpers live in `apps/website/lib/seo/metadata.ts`.
- URL normalization and environment resolution live in `apps/website/lib/seo/config.ts`.
- File-based metadata routes are implemented for:
  - `app/opengraph-image.tsx`
  - `app/twitter-image.tsx`
  - `app/manifest.ts`
  - `app/robots.ts`
  - `app/sitemap.ts`

## Structured data

- Typed JSON-LD builders are implemented in `apps/website/lib/seo/json-ld.ts`.
- `schema-dts` is used for Schema.org type safety.
- Global structured data is injected in `app/layout.tsx`.
- Docs pages use per-route metadata from file-based docs pages and shared docs metadata helpers.

## Social images

- Global social images are generated at:
  - `/opengraph-image`
  - `/twitter-image`

## Crawl and indexing behavior

- Production environment allows indexable routes and publishes sitemap location.
- Non-production environments return a disallow-all robots policy.
- `noIndex` docs pages are excluded from the sitemap.

## Icons and web app metadata

- App icons are served from:
  - `apps/website/app/icon.png`
  - `apps/website/app/apple-icon.png`
- Manifest icons are also available from:
  - `apps/website/public/icons/icon-192.png`
  - `apps/website/public/icons/icon-512.png`

## Validation workflow

Run from repo root:

```bash
bun run format
bun run lint
bun run typecheck
bun run test
bun run --cwd apps/website build
bun run --cwd apps/website typecheck
bun run --cwd apps/website test
```
