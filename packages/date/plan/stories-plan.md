# Stories Plan

## Story coverage baseline

One scenario export per story file with `-default` baselines for major consumer surfaces:

- `Calendar`
- `DatePicker`
- `DateInput`
- `DatePickerInput`
- `DateTimePicker`
- `TimePicker`

Focused parity stories cover:

- Selection modes (`single`, `multiple`, `range`)
- Controlled and uncontrolled picker flows
- Min/max/disabled date constraints
- RTL direction rendering
- Locale switching
- Timezone and DST-sensitive calendar examples
- Datetime and time preset workflows

## Story locations (actual package structure)

- `packages/date/src/components/calendar/stories/*.stories.tsx`
- `packages/date/src/components/pickers/stories/*.stories.tsx`
- `packages/date/src/components/inputs/stories/*.stories.tsx`
- `packages/date/src/components/stories/*.stories.tsx`
- `packages/date/src/components/time/stories/*.stories.tsx`
