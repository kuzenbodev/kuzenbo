# Base UI Release Snapshot

## Snapshot state

- Captured: 2026-02-13
- Baseline major/minor: v1.2.0 (2026-02-12)
- Canonical feed: https://base-ui.com/react/overview/releases.md
- Release doc anchor: https://base-ui.com/react/overview/releases/v1-2-0

## Drift checks to run before refactor

1. Confirm `llms.txt` and `overview/releases` still report `v1.2.0` as the latest stable entry.
2. Re-check utility/event-type assumptions if component callbacks changed (especially `ChangeEventDetails` and reason strings).
3. Validate composition-sensitive APIs (`render`, `className`, state callbacks) still render expected host nodes.
4. Compare `CHANGELOG` pull-requests before altering wrappers around `initialFocus`, `finalFocus`, or event cancellation helpers.

## Maintenance

- Snapshot cadence: quarterly or on dependency bump.
- Upstream changelog anchor: https://github.com/mui/base-ui/blob/master/CHANGELOG.md
