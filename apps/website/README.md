# @kuzenbo/website

Public documentation and showcase website for Kuzenbo.

## Visit Online

- Docs: `https://kuzenbo.com/docs`
- Showcase: `https://kuzenbo.com/showcase`

## What You Can Explore

- 🧩 Component guides and API references
- 🪝 Hooks and feature package examples
- 🎨 Theme and styling foundations
- 🧪 Showcase playground pages
- 📚 File-based MDX docs routes under `/docs/**`

## Docs Runtime Status

- ✅ `/docs` now uses file-based App Router pages (`page.tsx` + `content.mdx` per route).
- ✅ Canonical docs URLs are rendered directly from migrated MDX content.
- ✅ Unknown `/docs/*` routes return standard Next.js 404 pages.
- ✅ `/docs/**` reuses the shared site header/footer and adds section tabs + sticky sidebars in a Container-locked docs shell while keeping page-level scrolling.
- ✅ Right-hand docs ToC is intentionally mocked while the full ToC component is being implemented.
- 🗂️ Internal `meta.json` files remain in `content/docs` for internal reference only.

## Runtime Pairing

Docs examples for Kuzenbo UI packages assume `@kuzenbo/theme` is installed.
When you use `@kuzenbo/core`, `@kuzenbo/ai`, `@kuzenbo/charts`, `@kuzenbo/date`, `@kuzenbo/notifications`, `@kuzenbo/datatable`, `@kuzenbo/code`, or `@kuzenbo/tiptap`, pair it with `@kuzenbo/theme`.

## Feedback

For docs or showcase issues, open an issue in this repository.
