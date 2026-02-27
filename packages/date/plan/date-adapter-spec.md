# Date Adapter Spec (`date-fns` + `@date-fns/utc` + `@date-fns/tz`)

## Single adapter boundary

All date logic must go through `src/adapter/*`; UI components cannot call `date-fns` directly.

## Adapter responsibilities

- Parse/format date and datetime values
- Normalize to `YYYY-MM-DD` and `YYYY-MM-DD HH:mm:ss`
- Compare equality by day/month/year/decade
- Add/subtract day/month/year/decade
- Range inclusion checks
- Min/max clamping
- Month matrix generation
- ISO week-number support
- Locale-aware labels
- Week-start logic
- Timezone conversion
- DST-safe arithmetic
- `now`/`today` resolution
- Time parsing/serialization helpers

## Adapter context inputs

- `locale`
- `timeZone`
- `weekStartsOn`
- `weekendDays`
- `consistentWeeks`

## DST/timezone correctness defaults

- Use provider timezone when set; otherwise fallback to system timezone.
- Date-only values stay date-only strings.
- Datetime values serialize in provider timezone with stable formatting.
