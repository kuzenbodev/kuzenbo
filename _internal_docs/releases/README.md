# Release Notes Index

One release note file per lockstep version is stored in this folder.

## Consumer Messaging

When release notes mention UI packages (`core`, `ai`, `charts`, `date`, `notifications`, `datatable`, `code`, `tiptap`), state that `@kuzenbo/theme` is the essential runtime pair.

## Naming

- Format: `<version>.md`
- Example: `0.0.2-alpha.0.md`

## Authoring

- Generate notes: `bun run release:notes -- --version <version> --channel <channel>`
- Fill placeholders before publish workflow dispatch.

## Versioning

- Use native Changesets commands for version bumps.
- Follow setup + flow docs in [`../release-one-time-setup.md`](../release-one-time-setup.md) and [`../maintainer-release-flow.md`](../maintainer-release-flow.md).
