# Maintainer Release Flow

This runbook defines the active Kuzenbo release process.

## Model

- Two-channel model: `next` and `stable`.
- Both channels publish from `main`.
- Publishing is GitHub Actions trusted publishing only.
- Local scripts validate state and artifacts before workflow dispatch.

## Channel Matrix

| Channel  | Source branch | Workflow `ref` | npm dist-tag | Version shape        |
| -------- | ------------- | -------------- | ------------ | -------------------- |
| `next`   | `main`        | `main`         | `next`       | `X.Y.Z-<prerelease>` |
| `stable` | `main`        | `main`         | `latest`     | `X.Y.Z`              |

Notes:

- `next` accepts prerelease suffixes (for example `alpha.N`, `beta.N`, `rc.N`).
- `stable` requires no prerelease suffix.

## Branch and Channel Governance

- Release candidates are prepared from `main` only.
- Workflow dispatch must use `ref=main` for both `next` and `stable`.
- Do not dispatch publish workflow from feature branches or non-`main` refs.
- Channel/version contract is strict:
  - `next` requires prerelease version (`X.Y.Z-<suffix>`)
  - `stable` requires non-prerelease version (`X.Y.Z`)

## Non-Negotiables

- Keep all `packages/*` versions lockstep.
- Keep publish allowlist/blocklist governance in `scripts/release/release.config.json`.
- Run quality gates before any publish attempt.
- Run `release:dry-run` before any real publish.

## Workflow Runtime Notes

- `.github/workflows/release.yml` restores Bun package cache (`~/.bun/install/cache`) in both preflight and publish jobs.
- The workflow restores local Turborepo cache (`.turbo/cache`) in both jobs to speed repeated release runs.
- Optional remote Turborepo cache can be enabled through repo secret `TURBO_TOKEN` and repo variable `TURBO_TEAM`.

## Required Commands

Run from repo root:

```bash
bun run format
bun run lint
bun run typecheck
bun run test
bun run boundaries
```

Release commands:

```bash
bun run release:status
bun run release:validate -- --version <version> --channel <next|stable> --ref main
bun run release:dry-run -- --version <version> --channel <next|stable> --ref main
bun run release:notes -- --version <version> --channel <next|stable>
```

## Release Status, Validate, and Notes Sequence

Use this exact sequence before workflow dispatch:

```bash
VERSION=<x.y.z-or-prerelease>
CHANNEL=<next|stable>

bun run release:status
bun run release:validate -- --version "$VERSION" --channel "$CHANNEL" --ref main
bun run release:notes -- --version "$VERSION" --channel "$CHANNEL"
bun run release:dry-run -- --version "$VERSION" --channel "$CHANNEL" --ref main
```

Release-note generation details:

- Generate notes after `release:validate` passes for the target channel.
- Keep `CHANNEL` aligned with intended dist-tag (`next` or `latest`/`stable`).
- Regenerate notes whenever version, channel, or included changesets change.

## Next Release Flow

1. Sync and branch from `main`.
2. Ensure version is prerelease (for example `0.0.1-alpha.5`).
3. Create changeset entry:

```bash
bun run release:changeset -- --bump <patch|minor|major> --channel next --summary "<summary>"
```

4. If Changesets prerelease mode is not active, enter a prerelease tag you want to use (commonly `alpha`):

```bash
bun run changeset:pre:enter -- alpha
```

5. Apply versions:

```bash
bun run changeset:version
```

6. Run quality gates.
7. Validate release state and packed artifacts:

```bash
VERSION=<x.y.z-prerelease>
bun run release:validate -- --version "$VERSION" --channel next --ref main
bun run release:dry-run -- --version "$VERSION" --channel next --ref main
```

8. Generate release notes:

```bash
bun run release:notes -- --version "$VERSION" --channel next
```

9. Merge to `main` and dispatch `.github/workflows/release.yml` with:

- `ref=main`
- `channel=next`
- `version=<x.y.z-prerelease>`
- `dry_run=true` first, then `dry_run=false`

## Stable Release Flow

1. Sync and branch from `main`.
2. Ensure prerelease mode is off:

```bash
bun run changeset:pre:exit
```

3. Create stable changeset entry:

```bash
bun run release:changeset -- --bump <patch|minor|major> --channel stable --summary "<summary>"
```

4. Apply versions:

```bash
bun run changeset:version
```

5. Confirm target version is stable (`X.Y.Z`, no suffix).
6. Run quality gates.
7. Validate release state and packed artifacts:

```bash
VERSION=<x.y.z>
bun run release:validate -- --version "$VERSION" --channel stable --ref main
bun run release:dry-run -- --version "$VERSION" --channel stable --ref main
```

8. Generate release notes:

```bash
bun run release:notes -- --version "$VERSION" --channel stable
```

9. Merge to `main` and dispatch `.github/workflows/release.yml` with:

- `ref=main`
- `channel=stable`
- `version=<x.y.z>`
- `dry_run=true` first, then `dry_run=false`

## Recovery Publish Mode

Use workflow input `publish_mode=recovery` only when:

- preflight already succeeded for this version,
- publish failed due to transient infra/registry issue,
- rerun must skip unnecessary recomputation.

## Common Failure Cases

| Symptom                                          | Cause                                                              | Fix                                                            |
| ------------------------------------------------ | ------------------------------------------------------------------ | -------------------------------------------------------------- |
| `Stable channel requires non-prerelease version` | Stable run used prerelease version                                 | Use a plain `X.Y.Z` version and exit prerelease mode           |
| `Channel next requires a prerelease suffix`      | Next run used stable version                                       | Use `X.Y.Z-<prerelease>`                                       |
| `Unsupported release ref`                        | Ref not `main`                                                     | Set `--ref main` and workflow `ref=main`                       |
| Packed artifact validation failure               | `workspace:` / `catalog:` or broken entrypoints in packed manifest | Fix package manifests/build output and rerun `release:dry-run` |

## Maintainer Notes

- A `legacy` dist-tag can be used for previous major maintenance lines when needed.
- Kuzenbo currently automates `next` and `stable` only.
- Add a dedicated legacy channel only when you intentionally support parallel long-lived majors.
