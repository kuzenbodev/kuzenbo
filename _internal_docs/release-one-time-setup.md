# Release One-Time Setup

This guide configures trusted publishing for the active Kuzenbo release model.

## Target Model

- Channels: `next` and `stable`
- Source branch: `main` for both channels
- Dist-tags: `next` for prerelease, `latest` for stable
- Publish path: `.github/workflows/release.yml` only

## GitHub Setup

1. Ensure repository admins can run workflow dispatch.
2. Keep `.github/workflows/release.yml` as the only publish workflow.
3. Create `npm-publish` environment in GitHub and require maintainer approval if desired.
4. Keep `id-token: write` permission enabled for trusted publishing.
5. Protect `main` with required CI checks.

## npm Setup

1. Enable trusted publishing for the package scope/repo.
2. Confirm package visibility and ownership are correct for all allowlisted packages.
3. Do not rely on legacy auth token fallback paths for publish.

## Repository Setup

1. Keep release mappings in `scripts/release/release.config.json`:

- `releaseBranches.next = main`
- `releaseBranches.stable = main`
- `channelToDistTag.next = next`
- `channelToDistTag.stable = latest`

2. Keep publish allowlist/blocklist current.
3. Keep release tests green:

- `scripts/release/tests/release-workflow.test.ts`
- `scripts/release/tests/release-governance.test.ts`
- `scripts/release/tests/ci-workflow.test.ts`

## Migration From Old Alpha/Beta/RC Model

1. Stop dispatching release workflow with `alpha`, `beta`, and `rc` channels.
2. Use `channel=next` for all prerelease publishes.
3. Keep prerelease version suffixes semantic (for example `-alpha.N`) if desired.
4. Use `channel=stable` only for plain `X.Y.Z` versions.
5. Keep workflow `ref=main` for both channels.

## Validation Checklist

Run from repo root before first real publish in the new model:

```bash
bun run release:status
bun run format
bun run lint
bun run typecheck
bun run test
bun run boundaries
```

Validate prerelease lane:

```bash
bun run release:validate -- --version <x.y.z-prerelease> --channel next --ref main
bun run release:dry-run -- --version <x.y.z-prerelease> --channel next --ref main
```

Validate stable lane:

```bash
bun run release:validate -- --version <x.y.z> --channel stable --ref main
bun run release:dry-run -- --version <x.y.z> --channel stable --ref main
```

## Workflow Dispatch Inputs

Use `.github/workflows/release.yml` inputs:

- `ref`: `main`
- `version`: target lockstep version
- `channel`: `next` or `stable`
- `dry_run`: `true` first, then `false`
- `publish_mode`: `normal` (or `recovery` only for reruns)
- `confirm_phrase`: `release-<version>-<channel>`

## Troubleshooting

- Stable rejected as prerelease: exit Changesets prerelease mode and regenerate `X.Y.Z`.
- Next rejected for missing prerelease: publish a prerelease version like `X.Y.Z-alpha.N`.
- Ref mismatch: enforce `ref=main`.
- Packed manifest failures: fix protocol rewrites or entrypoint file paths, then rerun dry-run.
