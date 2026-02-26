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

- `.github/workflows/release.yml` runs a single `release` job that merges preflight and publish paths to avoid duplicated setup work.
- The `release` job uses a conditional environment: real publish runs target `npm-publish`, while dry-run executions target `release-dry-run`.
- `.github/workflows/release.yml` restores Bun package cache (`~/.bun/install/cache`) in the merged `release` job.
- The workflow restores local Turborepo cache (`.turbo/cache`) in the merged `release` job to speed repeated release runs.
- Optional remote Turborepo cache can be enabled through repo secret `TURBO_TOKEN` and repo variable `TURBO_TEAM`.
- Real publish runs upgrade npm to `11.5.1` before `npm publish --provenance` so trusted publishing OIDC auth works reliably.

## Required Commands

Run from repo root:

```bash
bun run format
bun run lint
bun run typecheck
bun run test
bun run boundaries
bun audit
```

Release commands:

```bash
bun run release:status
bun run release:validate -- --version <version> --channel <next|stable> --ref main
bun run release:dry-run -- --version <version> --channel <next|stable> --ref main
bun run release:notes -- --version <version> --channel <next|stable>
```

## AI Agent Step-by-Step Release Checklist (No-Skip)

Use this exact checklist for every real release.

1. Confirm release readiness:
   - Current branch is `main`.
   - Working tree is clean.
   - GitHub CLI is authenticated (`gh auth status`).
2. Set target variables:

```bash
VERSION=<x.y.z or x.y.z-prerelease>
CHANNEL=<stable|next>
```

3. Enforce channel/version contract:
   - `CHANNEL=next` must use prerelease `VERSION` (`X.Y.Z-<suffix>`).
   - `CHANNEL=stable` must use stable `VERSION` (`X.Y.Z`).
4. Set changeset prerelease mode:
   - For `next`: `bun run changeset:pre:enter -- <tag>` (if not already active, usually `alpha`).
   - For `stable`: `bun run changeset:pre:exit` (if prerelease mode is active).
5. Create release changeset:

```bash
bun run release:changeset -- --bump <patch|minor|major> --channel "$CHANNEL" --summary "<summary>"
```

6. Apply versions:

```bash
bun run changeset:version
```

7. Sync lockfile:

```bash
bun install
```

8. Run full quality gates:

```bash
bun run format
bun run lint
bun run typecheck
bun run test
bun run boundaries
bun audit
```

9. Run release preflight in strict order:

```bash
bun run release:status
bun run release:validate -- --version "$VERSION" --channel "$CHANNEL" --ref main
bun run release:notes -- --version "$VERSION" --channel "$CHANNEL"
bun run release:dry-run -- --version "$VERSION" --channel "$CHANNEL" --ref main
```

10. Verify release-notes file exists before dispatch:

```bash
test -f "docs/releases/${VERSION}.md"
```

11. Get explicit maintainer approval before any `git commit` or `git push`.
12. Commit and push all release changes (version bumps, lockfile, notes, docs updates).
13. Optional remote preflight: dispatch GitHub Actions dry-run first and wait for success:

```bash
gh workflow run "Release" \
  -f ref=main \
  -f version="$VERSION" \
  -f channel="$CHANNEL" \
  -f dry_run=true \
  -f publish_mode=normal \
  -f confirm_phrase="release-${VERSION}-${CHANNEL}"
```

14. Dispatch real release workflow:

```bash
gh workflow run "Release" \
  -f ref=main \
  -f version="$VERSION" \
  -f channel="$CHANNEL" \
  -f dry_run=false \
  -f publish_mode=normal \
  -f confirm_phrase="release-${VERSION}-${CHANNEL}"
```

15. Immediately share the run URL and request manual approval in GitHub Actions (`npm-publish` environment gate).
16. Monitor workflow until completion:

```bash
gh run watch <run-id> --exit-status
```

17. Post-release verification:

```bash
npm view @kuzenbo/core version
npm view @kuzenbo/hooks version
npm view @kuzenbo/charts version
npm view @kuzenbo/notifications version
npm view @kuzenbo/styles version
npm view @kuzenbo/theme version
gh release view "v${VERSION}"
```

18. If workflow fails after publish/tag but before GitHub Release creation:

- Generate notes file (`bun run release:notes -- --version "$VERSION" --channel "$CHANNEL"`).
- Commit/push notes file.
- Create release manually:

```bash
gh release create "v${VERSION}" --title "v${VERSION}" --notes-file "docs/releases/${VERSION}.md"
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
| `npm error code ENEEDAUTH` during publish        | Trusted publishing auth not activated by runtime npm               | Ensure workflow uses npm `11.5.1+` before publish              |
| Packed artifact validation failure               | `workspace:` / `catalog:` or broken entrypoints in packed manifest | Fix package manifests/build output and rerun `release:dry-run` |

## Maintainer Notes

- A `previous` dist-tag can be used for previous major maintenance lines when needed.
- Kuzenbo currently automates `next` and `stable` only.
- Add a dedicated previous channel only when you intentionally support parallel long-lived majors.
