import type { MouseEvent } from "react";

import type {
  DateAdapter as DateAdapterType,
  DateInput as DateAdapterInputType,
} from "./adapter";
import {
  useDatesInput as useDatesInputInternal,
  useDatesState as useDatesStateInternal,
} from "./hooks";
import {
  convertDatesValue as convertDatesValueInternal,
  useUncontrolledDates as useUncontrolledDatesInternal,
} from "./hooks/use-uncontrolled-dates";
import type {
  DateValue as DateValueType,
  PublicDatePickerValue,
} from "./types/date-picker-value";
import type { DateSelectionMode as DateSelectionModeType } from "./types/date-selection-mode";
import {
  defaultDateFormatter,
  type DateFormatter,
  getFormattedDate,
} from "./utils/get-formatted-date";
import {
  normalizeDateSelectionMode as normalizeDateSelectionModeInternal,
  resolveDateSelectionMode as resolveDateSelectionModeInternal,
} from "./utils/normalize-selection-mode";
import {
  type DateConvertibleInput,
  toDateString,
  toDateTimeString,
} from "./utils/to-date-string";

export type { ControlsGroupSettings } from "./types/controls-group-settings";
export type {
  CalendarLevel,
  ControlKeydownPayload,
  DateLabelFormat,
  DateStringValue,
  DateTimeStringValue,
  DayOfWeek,
} from "./types/general-types";
export type { DateSelectionMode } from "./types/date-selection-mode";
export type {
  DateSelectionValue,
  DatesRangeValue,
  DateValue,
} from "./types/date-picker-value";
export type { PickerBaseProps } from "./types/picker-base-props";

export type DatePickerValue<
  Mode extends DateSelectionModeType = "single",
  ValueType = DateValueType,
> = PublicDatePickerValue<Mode, ValueType>;

export { assignTime } from "./utils/assign-time";
export { clampDate } from "./utils/clamp-date";
export { defaultDateFormatter, getFormattedDate };
export { getDefaultClampedDate } from "./utils/get-default-clamped-date";
export { handleControlKeyDown } from "./utils/handle-control-key-down";
export { toDateString, toDateTimeString };
export type { DateFormatter, DateConvertibleInput };

export const normalizeDateSelectionMode = (
  selectionMode?: DateSelectionModeType
): DateSelectionModeType => normalizeDateSelectionModeInternal(selectionMode);

export const resolveDateSelectionMode = (
  selectionMode?: DateSelectionModeType
): DateSelectionModeType => resolveDateSelectionModeInternal(selectionMode);

export interface UseDatesInputOptions<
  Mode extends DateSelectionModeType = "single",
> {
  adapter?: DateAdapterType;
  closeOnChange?: boolean;
  defaultValue?: DatePickerValue<Mode>;
  format?: string;
  labelSeparator?: string;
  locale?: string;
  onChange?: ((value: DatePickerValue<Mode, string>) => void) | undefined;
  selectionMode?: Mode;
  sortDates?: boolean;
  value?: DatePickerValue<Mode>;
  valueFormatter?: DateFormatter;
  withTime?: boolean;
}

export interface UseDatesInputReturn<
  Mode extends DateSelectionModeType = "single",
> {
  _value: DatePickerValue<Mode, string>;
  dropdownHandlers: {
    close: () => void;
    open: () => void;
    toggle: () => void;
  };
  dropdownOpened: boolean;
  formattedValue: string;
  onClear: () => void;
  setValue: (nextValue: DatePickerValue<Mode>) => void;
  shouldClear: boolean;
}

export const useDatesInput = <Mode extends DateSelectionModeType = "single">(
  options: UseDatesInputOptions<Mode>
): UseDatesInputReturn<Mode> =>
  useDatesInputInternal(
    options as Parameters<typeof useDatesInputInternal<Mode>>[0]
  ) as UseDatesInputReturn<Mode>;

export interface UseDatesStateOptions<
  Mode extends DateSelectionModeType = "single",
> {
  adapter?: DateAdapterType;
  allowDeselect?: boolean;
  allowSingleDateInRange?: boolean;
  defaultValue?: DatePickerValue<Mode>;
  level?: "day" | "decade" | "month" | "year";
  onChange?: ((value: DatePickerValue<Mode, string>) => void) | undefined;
  onMouseLeave?: ((event: MouseEvent<HTMLDivElement>) => void) | undefined;
  selectionMode?: Mode;
  value?: DatePickerValue<Mode>;
}

export interface UseDatesStateControlProps {
  "data-autofocus"?: true;
  firstInRange?: boolean;
  inRange?: boolean;
  lastInRange?: boolean;
  selected: boolean;
}

export interface UseDatesStateReturn<
  Mode extends DateSelectionModeType = "single",
> {
  _value: DatePickerValue<Mode, string>;
  getControlProps: (
    dateInput: DateAdapterInputType
  ) => UseDatesStateControlProps;
  onDateChange: (dateInput: DateAdapterInputType) => void;
  onHoveredDateChange?: (dateInput: DateAdapterInputType) => void;
  onRootMouseLeave?: ((event: MouseEvent<HTMLDivElement>) => void) | undefined;
  setValue: (nextValue: DatePickerValue<Mode>) => void;
  value: DatePickerValue<Mode, string>;
}

export const useDatesState = <Mode extends DateSelectionModeType = "single">(
  options: UseDatesStateOptions<Mode>
): UseDatesStateReturn<Mode> =>
  useDatesStateInternal(
    options as Parameters<typeof useDatesStateInternal<Mode>>[0]
  ) as UseDatesStateReturn<Mode>;

export interface UseUncontrolledDatesOptions<
  Mode extends DateSelectionModeType = "single",
> {
  adapter?: DateAdapterType;
  defaultValue?: DatePickerValue<Mode>;
  onChange?: ((value: DatePickerValue<Mode, string>) => void) | undefined;
  selectionMode?: Mode;
  value?: DatePickerValue<Mode>;
  withTime?: boolean;
}

export type UseUncontrolledDatesReturn<
  Mode extends DateSelectionModeType = "single",
> = readonly [
  DatePickerValue<Mode, string>,
  (nextValue: DatePickerValue<Mode>) => void,
  boolean,
];

export const useUncontrolledDates = <
  Mode extends DateSelectionModeType = "single",
>(
  options: UseUncontrolledDatesOptions<Mode>
): UseUncontrolledDatesReturn<Mode> =>
  useUncontrolledDatesInternal(
    options as Parameters<typeof useUncontrolledDatesInternal<Mode>>[0]
  ) as UseUncontrolledDatesReturn<Mode>;

export const convertDatesValue = <Mode extends DateSelectionModeType>(
  value: DatePickerValue<Mode> | undefined,
  selectionMode: DateSelectionModeType,
  withTime: boolean,
  adapter: DateAdapterType
): DatePickerValue<Mode, string> | undefined =>
  convertDatesValueInternal(
    value as Parameters<typeof convertDatesValueInternal<Mode>>[0],
    selectionMode,
    withTime,
    adapter
  ) as DatePickerValue<Mode, string> | undefined;

export { createDateAdapter, DEFAULT_DATE_ADAPTER } from "./adapter";
export type {
  DateAdapter,
  DateAdapterContext,
  DateAdapterFormatOptions,
  DateAdapterMonthMatrixOptions,
  DateAdapterWeekdayLabelsOptions,
  DateComparisonUnit,
  DateInput as DateAdapterInput,
  DateMathUnit,
} from "./adapter";

export { DatesProvider } from "./components/dates-provider";
export { useDatesContext } from "./components/use-dates-context";
export type { DatesProviderProps } from "./components/dates-provider";

export { DATES_PROVIDER_DEFAULT_SETTINGS } from "./context/dates-provider";
export type {
  DatesProviderSettings,
  DatesProviderValue,
} from "./context/dates-provider";

export { Calendar } from "./components/calendar/calendar";
export type { CalendarProps } from "./components/calendar/calendar";
export { CalendarHeader } from "./components/calendar/calendar-header";
export type { CalendarHeaderProps } from "./components/calendar/calendar-header";
export { DecadeLevel } from "./components/calendar/decade-level";
export type { DecadeLevelProps } from "./components/calendar/decade-level";
export { DecadeLevelGroup } from "./components/calendar/decade-level-group";
export type { DecadeLevelGroupProps } from "./components/calendar/decade-level-group";
export { Day } from "./components/calendar/day";
export type { DayProps } from "./components/calendar/day";
export { Month } from "./components/calendar/month";
export type { MonthProps } from "./components/calendar/month";
export { MonthLevel } from "./components/calendar/month-level";
export type { MonthLevelProps } from "./components/calendar/month-level";
export { MonthLevelGroup } from "./components/calendar/month-level-group";
export type { MonthLevelGroupProps } from "./components/calendar/month-level-group";
export { MonthsList } from "./components/calendar/months-list";
export type { MonthsListProps } from "./components/calendar/months-list";
export { pickCalendarProps } from "./components/calendar/utils/pick-calendar-props";
export { WeekdaysRow } from "./components/calendar/weekdays-row";
export type { WeekdaysRowProps } from "./components/calendar/weekdays-row";
export { YearLevel } from "./components/calendar/year-level";
export type { YearLevelProps } from "./components/calendar/year-level";
export { YearLevelGroup } from "./components/calendar/year-level-group";
export type { YearLevelGroupProps } from "./components/calendar/year-level-group";
export { YearsList } from "./components/calendar/years-list";
export type { YearsListProps } from "./components/calendar/years-list";
export { DateTimePicker } from "./components/date-time-picker";
export type { DateTimePickerProps } from "./components/date-time-picker";
export { DateInput } from "./components/inputs/date-input";
export type { DateInputProps } from "./components/inputs/date-input";
export { DatePickerInput } from "./components/inputs/date-picker-input";
export type { DatePickerInputProps } from "./components/inputs/date-picker-input";
export { dateStringParser } from "./components/inputs/utils/date-string-parser";
export { HiddenDatesInput } from "./components/inputs/hidden-dates-input";
export type { HiddenDatesInputProps } from "./components/inputs/hidden-dates-input";
export { isDateValid } from "./components/inputs/utils/is-date-valid";
export { MonthPickerInput } from "./components/inputs/month-picker-input";
export type { MonthPickerInputProps } from "./components/inputs/month-picker-input";
export { PickerInputBase } from "./components/inputs/picker-input-base";
export type { PickerInputBaseProps } from "./components/inputs/picker-input-base";
export { YearPickerInput } from "./components/inputs/year-picker-input";
export type { YearPickerInputProps } from "./components/inputs/year-picker-input";
export { LevelsGroup } from "./components/levels-group";
export type { LevelsGroupProps } from "./components/levels-group";
export { MiniCalendar } from "./components/mini-calendar";
export type { MiniCalendarProps } from "./components/mini-calendar";
export { DatePicker } from "./components/pickers/date-picker";
export type { DatePickerProps } from "./components/pickers/date-picker";
export { MonthPicker } from "./components/pickers/month-picker";
export type { MonthPickerProps } from "./components/pickers/month-picker";
export { YearPicker } from "./components/pickers/year-picker";
export type { YearPickerProps } from "./components/pickers/year-picker";
export { PickerControl } from "./components/picker-control";
export type { PickerControlProps } from "./components/picker-control";
export {
  isTimeAfter,
  isTimeBefore,
} from "./components/time/utils/compare-time";
export { getFormattedTime } from "./components/time/utils/get-formatted-time";
export {
  getMaxTime,
  getMinTime,
} from "./components/time/utils/get-min-max-time";
export { TimeGrid } from "./components/time/time-grid";
export type { TimeGridProps } from "./components/time/time-grid";
export { TimeInput } from "./components/time/time-input";
export type { TimeInputProps } from "./components/time/time-input";
export { TimePicker } from "./components/time/time-picker";
export type { TimePickerProps } from "./components/time/time-picker";
export {
  clampTime,
  cycleTimePart,
  defaultTimeParts,
  formatTimeForView,
  formatTimeValue,
  getParsedTime,
  getTimeRange,
  getTimeString,
  isSameTime,
  padTime,
  parseTimeValue,
  secondsToTime,
  splitTimeString,
  timeToSeconds,
} from "./components/time/utils/time-utils";
export { TimeValue } from "./components/time/time-value";
export type { TimeValueProps } from "./components/time/time-value";
