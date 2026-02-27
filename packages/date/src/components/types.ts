import type {
  CalendarLevel as SharedCalendarLevel,
  DatePickerType as SharedDatePickerType,
  DatePickerValue as SharedDatePickerValue,
  DateSelectionMode,
  DateSelectionModeInput,
} from "../types";

export type DateValue = Date | null;

export type DateRangeValue = [DateValue, DateValue];

export type DatePickerType = SharedDatePickerType;

export type DatePickerValue = SharedDatePickerValue<
  DateSelectionModeInput,
  Date | null
>;
export type { DateSelectionModeInput };

export type CalendarLevel = SharedCalendarLevel;

export type SelectionMode = DateSelectionMode;
