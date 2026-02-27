import type { Locale } from "date-fns";

import type { DateStringValue, DateTimeStringValue, DayOfWeek } from "../types";

export type DateInput = Date | number | string | null | undefined;

export type DateComparisonUnit = "day" | "month" | "year" | "decade";

export type DateMathUnit = DateComparisonUnit;

export interface DateAdapterContext {
  consistentWeeks: boolean;
  dateFnsLocale?: Locale;
  locale: string;
  timeZone?: string;
  weekStartsOn: DayOfWeek;
  weekendDays: DayOfWeek[];
}

export interface DateAdapterFormatOptions {
  dateFnsLocale?: Locale;
  locale?: string;
  timeZone?: string;
}

export interface DateAdapterLegacyFormatContext {
  locale?: string;
  timeZone?: string;
}

export interface DateAdapterMonthMatrixOptions {
  consistentWeeks?: boolean;
  month: DateInput;
  weekStartsOn?: number;
}

export interface DateAdapterWeekdayLabelsOptions {
  format?: "long" | "narrow" | "short";
  locale?: string;
  timeZone?: string;
  weekStartsOn?: number;
}

export interface DateAdapter {
  readonly context: DateAdapterContext;

  add(value: DateInput, amount: number, unit: DateMathUnit): Date | null;
  assignTime(
    dateValue: DateInput,
    timeString: string
  ): DateTimeStringValue | null;
  clamp(
    minDate: DateInput,
    maxDate: DateInput,
    date: DateInput
  ): DateTimeStringValue | null;
  compare(left: DateInput, right: DateInput, unit?: DateComparisonUnit): number;
  endOf(value: DateInput, unit: DateMathUnit): Date | null;
  format(
    value: DateInput,
    formatString: string,
    options?: DateAdapterFormatOptions
  ): string;
  format(
    value: DateInput,
    formatOptions: Intl.DateTimeFormatOptions,
    context?: DateAdapterLegacyFormatContext
  ): string;
  getDefaultClampedDate(options: {
    maxDate?: DateInput;
    minDate?: DateInput;
  }): DateStringValue;
  getMonthMatrix(options: DateAdapterMonthMatrixOptions): Date[][];
  getMonthDays(month: DateInput, firstDayOfWeek: number): Date[];
  getWeekNumber(value: DateInput): number | null;
  getWeekdayLabels(options?: DateAdapterWeekdayLabelsOptions): string[];
  getWeekdayLabels(
    firstDayOfWeek: number,
    format: "long" | "narrow" | "short",
    context?: DateAdapterLegacyFormatContext
  ): string[];
  getDate(value: DateInput): number;
  getHours(value: DateInput): number;
  getMinutes(value: DateInput): number;
  getMonth(value: DateInput): number;
  getSeconds(value: DateInput): number;
  getWeekday(value: DateInput): number;
  getYear(value: DateInput): number;
  isAfter(
    left: DateInput,
    right: DateInput,
    unit?: DateComparisonUnit
  ): boolean;
  isBefore(
    left: DateInput,
    right: DateInput,
    unit?: DateComparisonUnit
  ): boolean;
  isInRange(
    date: DateInput,
    range: [DateInput, DateInput],
    unit?: DateComparisonUnit,
    inclusive?: boolean
  ): boolean;
  isSame(left: DateInput, right: DateInput, unit?: DateComparisonUnit): boolean;
  isSameDay(left: DateInput, right: DateInput): boolean;
  isSameMonth(left: DateInput, right: DateInput): boolean;
  isSameYear(left: DateInput, right: DateInput): boolean;
  isValid(value: DateInput): boolean;
  now(): Date;
  parse(value: DateInput): Date | null;
  parseISODate(value: string): Date | null;
  setDate(value: DateInput, dayOfMonth: number): Date;
  setMonth(value: DateInput, month: number): Date;
  setTime(
    value: DateInput,
    hours: number,
    minutes: number,
    seconds: number
  ): Date;
  setYear(value: DateInput, year: number): Date;
  startOf(value: DateInput, unit: DateMathUnit): Date | null;
  startOfDay(value: DateInput): Date;
  startOfMonth(value: DateInput): Date;
  subtract(value: DateInput, amount: number, unit: DateMathUnit): Date | null;
  addDays(value: DateInput, amount: number): Date;
  addMonths(value: DateInput, amount: number): Date;
  addYears(value: DateInput, amount: number): Date;
  endOfMonth(value: DateInput): Date;
  formatMonthLabel(
    value: DateInput,
    context?: DateAdapterLegacyFormatContext
  ): string;
  formatYearLabel(
    value: DateInput,
    context?: DateAdapterLegacyFormatContext
  ): string;
  toISODate(value: DateInput): DateStringValue;
  toDateString(value: DateInput): DateStringValue | null;
  toDateTimeString(value: DateInput): DateTimeStringValue | null;
  today(): Date;
  withContext(context: Partial<DateAdapterContext>): DateAdapter;
}
