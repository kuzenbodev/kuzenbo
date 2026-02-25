---
"@kuzenbo/core": major
---

Unify hover overlays under `PreviewCard` and remove the legacy `HoverCard` surface.

Breaking changes:

- Removed the `@kuzenbo/core/hover-card` subpath export.
- Removed all `HoverCard*` legacy implementation, tests, stories, and docs route artifacts.

Added:

- Added canonical `@kuzenbo/core/preview-card` subpath export.

Migration notes:

- Replace `@kuzenbo/core/hover-card` imports with `@kuzenbo/core/preview-card`.
- You can also import from the root entrypoint: `@kuzenbo/core` (for example, `{ PreviewCard }`).
