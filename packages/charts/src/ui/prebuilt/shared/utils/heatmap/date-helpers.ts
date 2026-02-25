import type { HeatmapDateLike, HeatmapWeekStartsOn } from "./types";

const MILLISECONDS_IN_DAY = 86_400_000;

const normalizeHeatmapDate = (input: HeatmapDateLike): Date => {
  const parsedDate = input instanceof Date ? new Date(input) : new Date(input);

  if (Number.isNaN(parsedDate.getTime())) {
    throw new TypeError(`Invalid heatmap date input: ${String(input)}`);
  }

  return new Date(
    Date.UTC(
      parsedDate.getUTCFullYear(),
      parsedDate.getUTCMonth(),
      parsedDate.getUTCDate()
    )
  );
};

const addDaysUTC = (date: Date, amount: number): Date =>
  new Date(date.getTime() + amount * MILLISECONDS_IN_DAY);

const addMonthsUTC = (date: Date, amount: number): Date =>
  new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + amount, 1));

const startOfMonthUTC = (date: Date): Date =>
  new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));

const endOfMonthUTC = (date: Date): Date =>
  new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0));

const getWeekdayOffset = (
  date: Date,
  weekStartsOn: HeatmapWeekStartsOn
): number => (date.getUTCDay() - weekStartsOn + 7) % 7;

const startOfWeekUTC = (date: Date, weekStartsOn: HeatmapWeekStartsOn): Date =>
  addDaysUTC(date, -getWeekdayOffset(date, weekStartsOn));

const endOfWeekUTC = (date: Date, weekStartsOn: HeatmapWeekStartsOn): Date =>
  addDaysUTC(startOfWeekUTC(date, weekStartsOn), 6);

const compareUTCDate = (left: Date, right: Date): number =>
  left.getTime() - right.getTime();

const isDateWithinRangeUTC = (
  date: Date,
  startDate: Date,
  endDate: Date
): boolean =>
  compareUTCDate(date, startDate) >= 0 && compareUTCDate(date, endDate) <= 0;

const formatIsoDateUTC = (date: Date): string => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const toMonthKeyUTC = (date: Date): string => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
};

const formatMonthLabelUTC = (date: Date, locale = "en-US"): string => {
  const formatter = new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

  return formatter.format(date);
};

const getHeatmapRangeBounds = (
  startInput: HeatmapDateLike,
  endInput: HeatmapDateLike
): readonly [Date, Date] => {
  const startDate = normalizeHeatmapDate(startInput);
  const endDate = normalizeHeatmapDate(endInput);

  if (compareUTCDate(startDate, endDate) <= 0) {
    return [startDate, endDate] as const;
  }

  return [endDate, startDate] as const;
};

export {
  addDaysUTC,
  addMonthsUTC,
  compareUTCDate,
  endOfMonthUTC,
  endOfWeekUTC,
  formatIsoDateUTC,
  formatMonthLabelUTC,
  getHeatmapRangeBounds,
  isDateWithinRangeUTC,
  normalizeHeatmapDate,
  startOfMonthUTC,
  startOfWeekUTC,
  toMonthKeyUTC,
};
