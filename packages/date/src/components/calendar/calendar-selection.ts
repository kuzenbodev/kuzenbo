import type { DateAdapter } from "../../adapter";
import type {
  DatePickerType,
  DatePickerValue,
  DateRangeValue,
  DateValue,
} from "../types";

const isDateWithinRange = (
  adapter: DateAdapter,
  date: Date,
  range: DateRangeValue
): boolean => {
  const [startDate, endDate] = range;

  if (!startDate || !endDate) {
    return false;
  }

  if (adapter.isBefore(endDate, startDate)) {
    return (
      (adapter.isAfter(date, endDate) && adapter.isBefore(date, startDate)) ||
      adapter.isSameDay(date, endDate) ||
      adapter.isSameDay(date, startDate)
    );
  }

  return (
    (adapter.isAfter(date, startDate) && adapter.isBefore(date, endDate)) ||
    adapter.isSameDay(date, startDate) ||
    adapter.isSameDay(date, endDate)
  );
};

export const createEmptyPickerValue = (
  type: DatePickerType
): DatePickerValue => {
  if (type === "multiple") {
    return [];
  }

  if (type === "range") {
    return [null, null];
  }

  return null;
};

export const normalizePickerValue = (
  value: DatePickerValue | undefined,
  type: DatePickerType
): DatePickerValue => {
  if (value === undefined) {
    return createEmptyPickerValue(type);
  }

  if (type === "default") {
    if (Array.isArray(value)) {
      return value[0] ?? null;
    }

    return value;
  }

  if (type === "multiple") {
    if (!Array.isArray(value)) {
      return value ? [value] : [];
    }

    if (
      value.length === 2 &&
      (value[0] instanceof Date || value[1] instanceof Date)
    ) {
      const dates = [value[0], value[1]].filter(
        (item): item is Date => item instanceof Date
      );
      return dates;
    }

    const dateValues = value as (Date | null)[];
    const dates = dateValues.filter(
      (item): item is Date => item instanceof Date
    );
    return dates;
  }

  if (Array.isArray(value)) {
    const [startDate, endDate] = value;
    return [startDate ?? null, endDate ?? null];
  }

  return [value, value];
};

export const isSelectedDate = (
  adapter: DateAdapter,
  date: Date,
  value: DatePickerValue,
  type: DatePickerType
): boolean => {
  if (type === "default") {
    return adapter.isSameDay(date, value as DateValue);
  }

  if (type === "multiple") {
    return (value as Date[]).some((selectedDate) =>
      adapter.isSameDay(date, selectedDate)
    );
  }

  return isDateWithinRange(adapter, date, value as DateRangeValue);
};

export const getNextPickerValue = (
  adapter: DateAdapter,
  date: Date,
  value: DatePickerValue,
  type: DatePickerType
): DatePickerValue => {
  if (type === "default") {
    return date;
  }

  if (type === "multiple") {
    const selectedDates = value as Date[];

    if (
      selectedDates.some((selectedDate) =>
        adapter.isSameDay(selectedDate, date)
      )
    ) {
      return selectedDates.filter(
        (selectedDate) => !adapter.isSameDay(selectedDate, date)
      );
    }

    return [...selectedDates, date];
  }

  const [startDate, endDate] = value as DateRangeValue;

  if (!startDate || endDate) {
    return [date, null];
  }

  if (adapter.isBefore(date, startDate)) {
    return [date, startDate];
  }

  return [startDate, date];
};

export const isDateDisabled = (
  adapter: DateAdapter,
  date: Date,
  minDate?: Date,
  maxDate?: Date,
  excludeDate?: (date: Date) => boolean
): boolean => {
  if (minDate && adapter.isBefore(date, adapter.startOfDay(minDate))) {
    return true;
  }

  if (maxDate && adapter.isAfter(date, adapter.startOfDay(maxDate))) {
    return true;
  }

  return excludeDate?.(date) ?? false;
};

export const getPrimaryDateFromValue = (
  value: DatePickerValue,
  type: DatePickerType
): Date | null => {
  if (type === "default") {
    return (value as DateValue) ?? null;
  }

  if (type === "multiple") {
    return (value as Date[])[0] ?? null;
  }

  return (value as DateRangeValue)[0] ?? null;
};
