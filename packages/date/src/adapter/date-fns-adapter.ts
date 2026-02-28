import { tz } from "@date-fns/tz";
import { utc } from "@date-fns/utc";
import {
  addDays,
  addMonths,
  addYears,
  compareAsc,
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  getDate as getDayOfMonth,
  getDay as getDayOfWeek,
  getHours as getHourOfDay,
  getISOWeek,
  getMinutes as getMinuteOfHour,
  getMonth as getMonthOfYear,
  getSeconds as getSecondOfMinute,
  getYear as getYearOfDate,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isSameYear,
  isValid,
  parse,
  parseISO,
  set,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subYears,
} from "date-fns";

import type { DateStringValue, DateTimeStringValue, DayOfWeek } from "../types";
import type {
  DateAdapter,
  DateAdapterContext,
  DateAdapterLegacyFormatContext,
  DateAdapterFormatOptions,
  DateAdapterWeekdayLabelsOptions,
  DateComparisonUnit,
  DateInput,
  DateMathUnit,
} from "./date-adapter-types";

const DATE_ONLY_PATTERN = "yyyy-MM-dd";
const DATE_TIME_PATTERN = "yyyy-MM-dd HH:mm:ss";

const DATE_ONLY_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const DATE_TIME_REGEX = /^\d{4}-\d{2}-\d{2}(?:[ T])\d{2}:\d{2}(?::\d{2})?$/;
const TIME_REGEX = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/;

interface DateFnsContextOptions {
  in?: (value: Date | number | string) => Date;
  locale?: DateAdapterContext["dateFnsLocale"];
  weekStartsOn?: DayOfWeek;
}

const normalizeLegacyDateTimeInput = (value: string): string =>
  value.includes("T") ? value.replace("T", " ") : value;

const ensureTimeSeconds = (value: string): string =>
  value.length === 16 ? `${value}:00` : value;

const normalizeTimeString = (
  timeString: string
): {
  hours: number;
  minutes: number;
  seconds: number;
} | null => {
  const match = timeString.match(TIME_REGEX);
  if (!match) {
    return null;
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  const seconds = Number(match[3] ?? 0);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    Number.isNaN(seconds) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59 ||
    seconds < 0 ||
    seconds > 59
  ) {
    return null;
  }

  return {
    hours,
    minutes,
    seconds,
  };
};

const getContextFunction = (
  timeZone: string | undefined
): ((value: Date | number | string) => Date) | undefined =>
  timeZone
    ? (tz(timeZone) as (value: Date | number | string) => Date)
    : undefined;

const createDateFnsOptions = (
  context: DateAdapterContext,
  overrides?: DateAdapterFormatOptions & { weekStartsOn?: DayOfWeek }
): DateFnsContextOptions => {
  const options: DateFnsContextOptions = {};

  const resolvedTimeZone = overrides?.timeZone ?? context.timeZone;
  const resolvedLocale = overrides?.dateFnsLocale ?? context.dateFnsLocale;

  if (resolvedTimeZone) {
    options.in = getContextFunction(resolvedTimeZone);
  }

  if (resolvedLocale) {
    options.locale = resolvedLocale;
  }

  if (typeof overrides?.weekStartsOn === "number") {
    options.weekStartsOn = overrides.weekStartsOn;
  }

  return options;
};

const cloneDate = (value: Date): Date => new Date(value);

const parseDateInput = (
  value: DateInput,
  context: DateAdapterContext
): Date | null => {
  if (value === null || value === undefined) {
    return null;
  }

  if (value instanceof Date) {
    return isValid(value) ? cloneDate(value) : null;
  }

  if (typeof value === "number") {
    const parsedFromNumber = new Date(value);
    return isValid(parsedFromNumber) ? parsedFromNumber : null;
  }

  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return null;
  }

  const parseOptions = createDateFnsOptions(context);

  if (DATE_ONLY_REGEX.test(trimmed)) {
    const parsedDateOnly = parse(
      trimmed,
      DATE_ONLY_PATTERN,
      new Date(),
      parseOptions
    );
    return isValid(parsedDateOnly) ? parsedDateOnly : null;
  }

  if (DATE_TIME_REGEX.test(trimmed)) {
    const normalizedInput = ensureTimeSeconds(
      normalizeLegacyDateTimeInput(trimmed)
    );
    const parsedDateTime = parse(
      normalizedInput,
      DATE_TIME_PATTERN,
      new Date(),
      parseOptions
    );
    return isValid(parsedDateTime) ? parsedDateTime : null;
  }

  // Parse ISO values using UTC context first, then let formatting context decide output zone.
  const parsedIsoValue = parseISO(trimmed, { in: utc });
  if (isValid(parsedIsoValue)) {
    return parsedIsoValue;
  }

  const fallbackNativeDate = new Date(trimmed);
  return isValid(fallbackNativeDate) ? fallbackNativeDate : null;
};

const startOfUnit = (
  date: Date,
  unit: DateMathUnit,
  options: DateFnsContextOptions
): Date => {
  switch (unit) {
    case "day": {
      return startOfDay(date, options);
    }
    case "month": {
      return startOfMonth(date, options);
    }
    case "year": {
      return startOfYear(date, options);
    }
    case "decade": {
      const year = getYearOfDate(date, options);
      const startYear = year - (year % 10);
      return startOfYear(new Date(startYear, 0, 1), options);
    }
    default: {
      return startOfDay(date, options);
    }
  }
};

const endOfUnit = (
  date: Date,
  unit: DateMathUnit,
  options: DateFnsContextOptions
): Date => {
  switch (unit) {
    case "day": {
      return endOfDay(date, options);
    }
    case "month": {
      return endOfMonth(date, options);
    }
    case "year": {
      return endOfYear(date, options);
    }
    case "decade": {
      const decadeStart = startOfUnit(date, "decade", options);
      const decadeEndYear = addYears(decadeStart, 9, options);
      return endOfYear(decadeEndYear, options);
    }
    default: {
      return endOfDay(date, options);
    }
  }
};

const addByUnit = (
  date: Date,
  amount: number,
  unit: DateMathUnit,
  options: DateFnsContextOptions
): Date => {
  switch (unit) {
    case "day": {
      return addDays(date, amount, options);
    }
    case "month": {
      return addMonths(date, amount, options);
    }
    case "year": {
      return addYears(date, amount, options);
    }
    case "decade": {
      return addYears(date, amount * 10, options);
    }
    default: {
      return addDays(date, amount, options);
    }
  }
};

const subtractByUnit = (
  date: Date,
  amount: number,
  unit: DateMathUnit,
  options: DateFnsContextOptions
): Date => {
  switch (unit) {
    case "day": {
      return subDays(date, amount, options);
    }
    case "month": {
      return subMonths(date, amount, options);
    }
    case "year": {
      return subYears(date, amount, options);
    }
    case "decade": {
      return subYears(date, amount * 10, options);
    }
    default: {
      return subDays(date, amount, options);
    }
  }
};

const isSameByUnit = (
  left: Date,
  right: Date,
  unit: DateComparisonUnit,
  options: DateFnsContextOptions
): boolean => {
  switch (unit) {
    case "day": {
      return isSameDay(left, right, options);
    }
    case "month": {
      return isSameMonth(left, right, options);
    }
    case "year": {
      return isSameYear(left, right, options);
    }
    case "decade": {
      return (
        Math.floor(getYearOfDate(left, options) / 10) ===
        Math.floor(getYearOfDate(right, options) / 10)
      );
    }
    default: {
      return isSameDay(left, right, options);
    }
  }
};

const compareByUnit = (
  left: Date,
  right: Date,
  unit: DateComparisonUnit | undefined,
  options: DateFnsContextOptions
): number => {
  if (!unit) {
    return compareAsc(left, right);
  }

  if (isSameByUnit(left, right, unit, options)) {
    return 0;
  }

  const leftStart = startOfUnit(left, unit, options);
  const rightStart = startOfUnit(right, unit, options);

  return compareAsc(leftStart, rightStart);
};

const resolveDayOfWeek = (
  value: number | undefined,
  fallback: DayOfWeek
): DayOfWeek => {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return fallback;
  }

  const normalizedValue = value % 7;
  const resolvedValue =
    normalizedValue < 0 ? normalizedValue + 7 : normalizedValue;
  return resolvedValue as DayOfWeek;
};

export const DEFAULT_DATE_ADAPTER_CONTEXT: DateAdapterContext = {
  consistentWeeks: false,
  dateFnsLocale: undefined,
  locale: "en",
  timeZone: undefined,
  weekStartsOn: 1,
  weekendDays: [0, 6],
};

export const createDateAdapter = (
  inputContext: Partial<DateAdapterContext> = {}
): DateAdapter => {
  const context: DateAdapterContext = {
    ...DEFAULT_DATE_ADAPTER_CONTEXT,
    ...inputContext,
    weekendDays:
      inputContext.weekendDays ?? DEFAULT_DATE_ADAPTER_CONTEXT.weekendDays,
  };

  const getOptions = (
    overrides?: DateAdapterFormatOptions & { weekStartsOn?: DayOfWeek }
  ): DateFnsContextOptions => createDateFnsOptions(context, overrides);

  const parseValue = (value: DateInput): Date | null =>
    parseDateInput(value, context);

  const getZonedPart = (
    value: DateInput,
    reader: (source: Date, options: DateFnsContextOptions) => number
  ): number => {
    const parsedValue = parseValue(value) ?? adapter.today();
    return reader(parsedValue, getOptions());
  };

  const setZonedParts = (
    value: DateInput,
    parts: Parameters<typeof set>[1]
  ): Date => {
    const parsedValue = parseValue(value) ?? adapter.today();
    const nextDate = set(parsedValue, parts, getOptions());
    return cloneDate(nextDate);
  };

  const adapter: DateAdapter = {
    context,

    add(value, amount, unit) {
      const parsedValue = parseValue(value);
      if (!parsedValue) {
        return null;
      }

      return addByUnit(parsedValue, amount, unit, getOptions());
    },

    assignTime(dateValue, timeString) {
      const baseDate = parseValue(dateValue) ?? adapter.now();

      if (timeString === "") {
        return adapter.toDateTimeString(baseDate);
      }

      const parsedTime = normalizeTimeString(timeString);
      if (!parsedTime) {
        return null;
      }

      const withAssignedTime = set(
        baseDate,
        {
          hours: parsedTime.hours,
          milliseconds: 0,
          minutes: parsedTime.minutes,
          seconds: parsedTime.seconds,
        },
        getOptions()
      );

      return adapter.toDateTimeString(withAssignedTime);
    },

    clamp(minDate, maxDate, date) {
      const parsedDate = parseValue(date);
      if (!parsedDate) {
        return null;
      }

      const parsedMinDate = parseValue(minDate);
      const parsedMaxDate = parseValue(maxDate);

      if (
        parsedMinDate &&
        compareByUnit(parsedDate, parsedMinDate, undefined, getOptions()) < 0
      ) {
        return adapter.toDateTimeString(parsedMinDate);
      }

      if (
        parsedMaxDate &&
        compareByUnit(parsedDate, parsedMaxDate, undefined, getOptions()) > 0
      ) {
        return adapter.toDateTimeString(parsedMaxDate);
      }

      return adapter.toDateTimeString(parsedDate);
    },

    compare(left, right, unit = "day") {
      const parsedLeft = parseValue(left);
      const parsedRight = parseValue(right);

      if (!parsedLeft && !parsedRight) {
        return 0;
      }

      if (!parsedLeft) {
        return -1;
      }

      if (!parsedRight) {
        return 1;
      }

      return compareByUnit(parsedLeft, parsedRight, unit, getOptions());
    },

    endOf(value, unit) {
      const parsedValue = parseValue(value);
      if (!parsedValue) {
        return null;
      }

      return endOfUnit(parsedValue, unit, getOptions());
    },

    format(
      value,
      formatInput,
      options?: DateAdapterFormatOptions | DateAdapterLegacyFormatContext
    ) {
      const parsedValue = parseValue(value);
      if (!parsedValue) {
        return "";
      }

      if (typeof formatInput === "string") {
        return format(
          parsedValue,
          formatInput,
          getOptions(options as DateAdapterFormatOptions | undefined)
        );
      }

      const resolvedContext = options as
        | DateAdapterLegacyFormatContext
        | undefined;

      return new Intl.DateTimeFormat(
        resolvedContext?.locale ?? context.locale,
        {
          ...formatInput,
          timeZone: resolvedContext?.timeZone ?? context.timeZone,
        }
      ).format(parsedValue);
    },

    getDefaultClampedDate({ minDate, maxDate }) {
      const today = adapter.today();
      const parsedMinDate = parseValue(minDate);
      const parsedMaxDate = parseValue(maxDate);

      if (parsedMinDate && adapter.isBefore(today, parsedMinDate, "day")) {
        return (
          adapter.toDateString(parsedMinDate) ??
          format(parsedMinDate, DATE_ONLY_PATTERN)
        );
      }

      if (parsedMaxDate && adapter.isAfter(today, parsedMaxDate, "day")) {
        return (
          adapter.toDateString(parsedMaxDate) ??
          format(parsedMaxDate, DATE_ONLY_PATTERN)
        );
      }

      return adapter.toDateString(today) ?? format(today, DATE_ONLY_PATTERN);
    },

    getMonthMatrix({ month, weekStartsOn, consistentWeeks }) {
      const parsedMonth = parseValue(month) ?? adapter.today();
      const resolvedWeekStartsOn = resolveDayOfWeek(
        weekStartsOn,
        context.weekStartsOn
      );

      const rangeOptions = getOptions({ weekStartsOn: resolvedWeekStartsOn });
      const monthStartDate = startOfMonth(parsedMonth, rangeOptions);
      const monthEndDate = endOfMonth(parsedMonth, rangeOptions);

      const rangeStartDate = startOfWeek(monthStartDate, {
        ...rangeOptions,
        weekStartsOn: resolvedWeekStartsOn,
      });
      const rangeEndDate = endOfWeek(monthEndDate, {
        ...rangeOptions,
        weekStartsOn: resolvedWeekStartsOn,
      });

      const days = eachDayOfInterval(
        { end: rangeEndDate, start: rangeStartDate },
        rangeOptions
      );

      const shouldKeepConsistentWeeks =
        consistentWeeks ?? context.consistentWeeks;

      if (shouldKeepConsistentWeeks && days.length < 42) {
        let cursor = days.at(-1) ?? rangeEndDate;

        while (days.length < 42) {
          cursor = addDays(cursor, 1, rangeOptions);
          days.push(cursor);
        }
      }

      const rows: Date[][] = [];
      for (let index = 0; index < days.length; index += 7) {
        rows.push(days.slice(index, index + 7));
      }

      return rows;
    },

    getMonthDays(month, firstDayOfWeek) {
      return adapter
        .getMonthMatrix({
          consistentWeeks: true,
          month,
          weekStartsOn: firstDayOfWeek,
        })
        .flat();
    },

    getWeekNumber(value) {
      const parsedValue = parseValue(value);
      if (!parsedValue) {
        return null;
      }

      return getISOWeek(parsedValue, getOptions());
    },

    getWeekdayLabels(
      value?: DateAdapterWeekdayLabelsOptions | number,
      formatInput?: "long" | "narrow" | "short",
      contextOverrides?: DateAdapterLegacyFormatContext
    ) {
      const options =
        typeof value === "number"
          ? {
              format: formatInput,
              locale: contextOverrides?.locale,
              timeZone: contextOverrides?.timeZone,
              weekStartsOn: value,
            }
          : value;

      const resolvedLocale = options?.locale ?? context.locale;
      const resolvedWeekStartsOn = resolveDayOfWeek(
        options?.weekStartsOn,
        context.weekStartsOn
      );
      const resolvedTimeZone = options?.timeZone ?? context.timeZone;
      const dateFnsOptions = getOptions({ timeZone: resolvedTimeZone });

      const weekStartDate = startOfWeek(adapter.today(), {
        ...dateFnsOptions,
        weekStartsOn: resolvedWeekStartsOn,
      });

      const formatter = new Intl.DateTimeFormat(resolvedLocale, {
        timeZone: resolvedTimeZone,
        weekday: options?.format ?? "short",
      });

      return Array.from({ length: 7 }, (_, index) => {
        const date = addDays(weekStartDate, index, dateFnsOptions);
        return formatter.format(date);
      });
    },

    getDate(value) {
      return getZonedPart(value, getDayOfMonth);
    },

    getHours(value) {
      return getZonedPart(value, getHourOfDay);
    },

    getMinutes(value) {
      return getZonedPart(value, getMinuteOfHour);
    },

    getMonth(value) {
      return getZonedPart(value, getMonthOfYear);
    },

    getSeconds(value) {
      return getZonedPart(value, getSecondOfMinute);
    },

    getWeekday(value) {
      return getZonedPart(value, getDayOfWeek);
    },

    getYear(value) {
      return getZonedPart(value, getYearOfDate);
    },

    isAfter(left, right, unit = "day") {
      const parsedLeft = parseValue(left);
      const parsedRight = parseValue(right);

      if (!parsedLeft || !parsedRight) {
        return false;
      }

      if (!unit) {
        return isAfter(parsedLeft, parsedRight);
      }

      const leftEnd = endOfUnit(parsedLeft, unit, getOptions());
      const rightEnd = endOfUnit(parsedRight, unit, getOptions());

      return isAfter(leftEnd, rightEnd);
    },

    isBefore(left, right, unit = "day") {
      const parsedLeft = parseValue(left);
      const parsedRight = parseValue(right);

      if (!parsedLeft || !parsedRight) {
        return false;
      }

      if (!unit) {
        return isBefore(parsedLeft, parsedRight);
      }

      const leftStart = startOfUnit(parsedLeft, unit, getOptions());
      const rightStart = startOfUnit(parsedRight, unit, getOptions());

      return isBefore(leftStart, rightStart);
    },

    isInRange(date, range, unit = "day", inclusive = true) {
      const parsedDate = parseValue(date);
      const parsedRangeStart = parseValue(range[0]);
      const parsedRangeEnd = parseValue(range[1]);

      if (!parsedDate || !parsedRangeStart || !parsedRangeEnd) {
        return false;
      }

      const [from, to] =
        compareByUnit(parsedRangeStart, parsedRangeEnd, unit, getOptions()) <= 0
          ? [parsedRangeStart, parsedRangeEnd]
          : [parsedRangeEnd, parsedRangeStart];

      const lowerBoundComparison = compareByUnit(
        parsedDate,
        from,
        unit,
        getOptions()
      );
      const upperBoundComparison = compareByUnit(
        parsedDate,
        to,
        unit,
        getOptions()
      );

      if (inclusive) {
        return lowerBoundComparison >= 0 && upperBoundComparison <= 0;
      }

      return lowerBoundComparison > 0 && upperBoundComparison < 0;
    },

    isSame(left, right, unit = "day") {
      const parsedLeft = parseValue(left);
      const parsedRight = parseValue(right);

      if (!parsedLeft || !parsedRight) {
        return false;
      }

      return isSameByUnit(parsedLeft, parsedRight, unit, getOptions());
    },

    isSameDay(left, right) {
      return adapter.isSame(left, right, "day");
    },

    isSameMonth(left, right) {
      return adapter.isSame(left, right, "month");
    },

    isSameYear(left, right) {
      return adapter.isSame(left, right, "year");
    },

    isValid(value) {
      return Boolean(parseValue(value));
    },

    now() {
      return context.timeZone
        ? (getContextFunction(context.timeZone)?.(new Date()) ?? new Date())
        : new Date();
    },

    parse(value) {
      return parseValue(value);
    },

    parseISODate(value) {
      const trimmedValue = value.trim();
      if (!DATE_ONLY_REGEX.test(trimmedValue)) {
        return null;
      }

      const parsedValue = parseValue(trimmedValue);
      if (!parsedValue) {
        return null;
      }

      return adapter.toDateString(parsedValue) === trimmedValue
        ? parsedValue
        : null;
    },

    setDate(value, dayOfMonth) {
      return setZonedParts(value, { date: dayOfMonth });
    },

    setMonth(value, month) {
      return setZonedParts(value, { month });
    },

    setTime(value, hours, minutes, seconds) {
      return setZonedParts(value, {
        hours,
        milliseconds: 0,
        minutes,
        seconds,
      });
    },

    setYear(value, year) {
      return setZonedParts(value, { year });
    },

    startOf(value, unit) {
      const parsedValue = parseValue(value);
      if (!parsedValue) {
        return null;
      }

      return startOfUnit(parsedValue, unit, getOptions());
    },

    startOfDay(value) {
      return (
        adapter.startOf(value, "day") ?? parseValue(value) ?? adapter.today()
      );
    },

    startOfMonth(value) {
      return (
        adapter.startOf(value, "month") ?? parseValue(value) ?? adapter.today()
      );
    },

    subtract(value, amount, unit) {
      const parsedValue = parseValue(value);
      if (!parsedValue) {
        return null;
      }

      return subtractByUnit(parsedValue, amount, unit, getOptions());
    },

    addDays(value, amount) {
      return (
        adapter.add(value, amount, "day") ??
        parseValue(value) ??
        adapter.today()
      );
    },

    addMonths(value, amount) {
      return (
        adapter.add(value, amount, "month") ??
        parseValue(value) ??
        adapter.today()
      );
    },

    addYears(value, amount) {
      return (
        adapter.add(value, amount, "year") ??
        parseValue(value) ??
        adapter.today()
      );
    },

    endOfMonth(value) {
      return (
        adapter.endOf(value, "month") ?? parseValue(value) ?? adapter.today()
      );
    },

    formatMonthLabel(value, contextOverrides) {
      return adapter.format(
        value,
        { month: "long", year: "numeric" },
        contextOverrides
      );
    },

    formatYearLabel(value, contextOverrides) {
      return adapter.format(value, { year: "numeric" }, contextOverrides);
    },

    toISODate(value) {
      return adapter.toDateString(value) ?? "";
    },

    toDateString(value) {
      const parsedValue = parseValue(value);
      if (!parsedValue) {
        return null;
      }

      return format(
        parsedValue,
        DATE_ONLY_PATTERN,
        getOptions()
      ) as DateStringValue;
    },

    toDateTimeString(value) {
      const parsedValue = parseValue(value);
      if (!parsedValue) {
        return null;
      }

      return format(
        parsedValue,
        DATE_TIME_PATTERN,
        getOptions()
      ) as DateTimeStringValue;
    },

    today() {
      return startOfDay(adapter.now(), getOptions());
    },

    withContext(nextContext) {
      return createDateAdapter({
        ...context,
        ...nextContext,
      });
    },
  };

  return adapter;
};

export const DEFAULT_DATE_ADAPTER = createDateAdapter();
