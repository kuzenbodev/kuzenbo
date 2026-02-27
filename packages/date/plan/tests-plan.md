# Tests Plan (Mantine-Mirroring + Required Extensions)

## Adapter unit tests

Port parity coverage for:

- `toDateString`
- `toDateTimeString`
- `assignTime`
- `clampDate`
- `getDefaultClampedDate`
- `getFormattedDate`
- Month matrix/week helpers
- Time parsing/formatting/clamping helpers
- Timezone and DST transitions

## UI behavior tests

Port/replicate behavior suites for:

- `Calendar`
- `DatePicker`
- `MonthPicker`
- `YearPicker`
- `DateInput`
- `DatePickerInput`
- `MonthPickerInput`
- `YearPickerInput`
- `DateTimePicker`
- `Month`
- `WeekdaysRow`
- `YearsList`
- `MonthsList`
- `MiniCalendar`
- `TimePicker`
- `TimeGrid`
- `TimeValue`
- `HiddenDatesInput`

## Accessibility tests

- Keep axe-style coverage for all public input/time/calendar components.
- Assert aria labels and keyboard focus rules.

## RTL/I18n tests

- RTL left/right inversion
- RTL focus traversal
- Runtime locale switching
- Weekday ordering from provider overrides
- Localized aria/value outputs
