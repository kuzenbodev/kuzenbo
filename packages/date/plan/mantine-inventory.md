# Mantine Inventory

Source of truth: `/opensrc/repos/github.com/mantinedev/mantine/packages/@mantine/dates`

## Exported types

- `ControlsGroupSettings`
- `PickerBaseProps`
- `DatePickerValue`
- `GeneralTypes`

## Exported hooks

- `useDatesState`
- `useDatesInput`
- `useUncontrolledDates`

## Exported utils

- `getFormattedDate`
- `handleControlKeyDown`
- `assignTime`
- `getDefaultClampedDate`
- `clampDate`
- `toDateString`
- `toDateTimeString`
- `DateFormatter` type

## Exported components/helpers

- `DatesProvider`
- `useDatesContext`
- `DATES_PROVIDER_DEFAULT_SETTINGS`
- `HiddenDatesInput`
- `TimeInput`
- `TimePicker`
- `getTimeRange`
- `TimeValue`
- `Day`
- `WeekdaysRow`
- `Month`
- `PickerControl`
- `YearsList`
- `MonthsList`
- `CalendarHeader`
- `DecadeLevel`
- `YearLevel`
- `MonthLevel`
- `LevelsGroup`
- `DecadeLevelGroup`
- `YearLevelGroup`
- `MonthLevelGroup`
- `PickerInputBase`
- `Calendar`
- `pickCalendarProps`
- `YearPicker`
- `MonthPicker`
- `DatePicker`
- `DateInput`
- `DateTimePicker`
- `YearPickerInput`
- `MonthPickerInput`
- `DatePickerInput`
- `TimeGrid`
- `isTimeBefore`
- `isTimeAfter`
- `MiniCalendar`

## Internal primitives to replicate

- `getDateInTabOrder`
- `getMonthInTabOrder`
- `getYearInTabOrder`
- `getMonthDays`
- `getStartOfWeek`
- `getEndOfWeek`
- `getWeekNumber`
- `isAfterMinDate`
- `isBeforeMaxDate`
- `isSameMonth`
- `getMonthsData`
- `isMonthDisabled`
- `getYearsData`
- `isYearDisabled`
- `getDecadeRange`
- `isInRange`
- `clampLevel`
- `SpinInput`
- `useTimePicker`
- `getParsedTime`
- `getTimeString`
- `clampTime`
- `isSameTime`
- `splitTimeString`
- `padTime`
- `timeToSeconds`
- `secondsToTime`
- `TimeControlsList`
- `AmPmControlsList`
- `AmPmInput`
- `TimePresets`
- `TimePresetGroup`
- `TimePresetControl`
- `TimeGridControl`
- `getFormattedTime`
- `dateStringParser`
- `isDateValid`
- `getMinTime`
- `getMaxTime`

## Behavioral contracts extracted from Mantine tests

- Selection modes (`single`, `multiple`, `range`)
- Partial range state
- Hover range preview
- Sorted range normalization
- Allow-single-day-range toggle
- Allow-deselect toggle
- Controlled/uncontrolled parity
- Close-on-change behavior by mode
- Min/max and custom disable constraints
- Multi-column arrow navigation
- Single tabbable target per grid/list
- Level navigation and enhanced shortcuts (`Ctrl/Cmd+Arrow`, `Ctrl/Cmd+Shift+Arrow`, `Y`)
- Locale-aware formatting and aria labels
- Provider overrides (locale, week start, weekends, label separator, consistent weeks)
- Hidden input serialization
- TimePicker spin keyboard model and clamping/paste/partial value handling
- DateTimePicker date + time composition behavior
- MiniCalendar range rendering and controls
