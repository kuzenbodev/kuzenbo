import type {
  CalendarLevel as SharedCalendarLevel,
  DatePickerValue as SharedDatePickerValue,
  DateSelectionMode,
} from "../types";

export type DateValue = Date | null;

export type DateRangeValue = [DateValue, DateValue];

export type SelectionMode = DateSelectionMode;

export type DatePickerValue = SharedDatePickerValue<SelectionMode, Date | null>;

export type CalendarLevel = SharedCalendarLevel;
