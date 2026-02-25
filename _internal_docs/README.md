# Kuzenbo Documentation

Primary handbook index for the Kuzenbo monorepo.

## Public Package Guidance

For consumer docs and examples, treat `@kuzenbo/theme` as the essential runtime package.
UI packages (`core`, `ai`, `charts`, `date`, `notifications`, `datatable`, `code`, `tiptap`) should be documented as paired with `@kuzenbo/theme`.

## Contributor Path

- Contributor policy: [`../CONTRIBUTING.md`](../CONTRIBUTING.md)
- Contributor workflow: [`contributors.md`](./contributors.md)
- Pre-PR quality gates: [`contributors.md#pre-pr-quality-gates`](./contributors.md#pre-pr-quality-gates)
- Migration validation order: [`contributors.md#migration-validation-sequence`](./contributors.md#migration-validation-sequence)
- Agent workflow: [`../AGENTS.md`](../AGENTS.md)

## Core Guides

- Architecture and boundaries: [`architecture.md`](./architecture.md)
- Monorepo package dev workflow: [`monorepo-dev-workflow.md`](./monorepo-dev-workflow.md)
- Package-scoped validation commands: [`monorepo-dev-workflow.md#package-scoped-validation`](./monorepo-dev-workflow.md#package-scoped-validation)
- Storybook run/build workflow: [`monorepo-dev-workflow.md#storybook-run-and-build-workflow`](./monorepo-dev-workflow.md#storybook-run-and-build-workflow)
- Component development: [`components.md`](./components.md)
- Unified UISize system: [`components.md#unified-uisize-system`](./components.md#unified-uisize-system)
- UISize metric families: [`components.md#uisize-metric-families`](./components.md#uisize-metric-families)
- Compact control exception: [`components.md#compact-control-exception`](./components.md#compact-control-exception)
- UISize migration guide: [`components.md#uisize-migration-guide`](./components.md#uisize-migration-guide)
- Select-like size cascade policy: [`components.md#select-like-surface-size-cascade`](./components.md#select-like-surface-size-cascade)
- Menu surface size cascade policy: [`components.md#menu-surface-size-cascade`](./components.md#menu-surface-size-cascade)
- Hook development: [`hooks.md`](./hooks.md)
- Website SEO operations: [`website-seo.md`](./website-seo.md)

## Release Guides

- Maintainer release flow: [`maintainer-release-flow.md`](./maintainer-release-flow.md)
- Branch/channel governance: [`maintainer-release-flow.md#branch-and-channel-governance`](./maintainer-release-flow.md#branch-and-channel-governance)
- Status/validate/notes sequence: [`maintainer-release-flow.md#release-status-validate-and-notes-sequence`](./maintainer-release-flow.md#release-status-validate-and-notes-sequence)
- One-time release setup: [`release-one-time-setup.md`](./release-one-time-setup.md)
- Release notes conventions: [`releases/README.md`](./releases/README.md)
