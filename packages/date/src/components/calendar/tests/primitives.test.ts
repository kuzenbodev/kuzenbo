import { describe, expect, it } from "bun:test";

import { createDateAdapter } from "../../../adapter";
import { clampLevel } from "../utils/clamp-level";
import { getDateInTabOrder } from "../utils/get-date-in-tab-order";
import { getDecadeRange } from "../utils/get-decade-range";
import { getEndOfWeek } from "../utils/get-end-of-week";
import { getMonthInTabOrder } from "../utils/get-month-in-tab-order";
import { getMonthsData } from "../utils/get-months-data";
import { getStartOfWeek } from "../utils/get-start-of-week";
import { getYearInTabOrder } from "../utils/get-year-in-tab-order";
import { getYearsData } from "../utils/get-years-data";
import { isAfterMinDate } from "../utils/is-after-min-date";
import { isBeforeMaxDate } from "../utils/is-before-max-date";
import { isMonthDisabled } from "../utils/is-month-disabled";
import { isYearDisabled } from "../utils/is-year-disabled";

describe("calendar primitives", () => {
  const adapter = createDateAdapter();

  it("resolves start and end of week with custom first day", () => {
    const date = new Date(2026, 1, 19);

    const start = getStartOfWeek(date, 1, adapter);
    const end = getEndOfWeek(date, 1, adapter);

    expect(adapter.getWeekday(start)).toBe(1);
    expect(adapter.getWeekday(end)).toBe(0);
  });

  it("builds month and year matrix data", () => {
    const months = getMonthsData(new Date(2026, 0, 1), adapter);
    const years = getYearsData(new Date(2026, 0, 1), adapter);
    const [startOfDecade, endOfDecade] = getDecadeRange(
      new Date(2026, 0, 1),
      adapter
    );
    const firstMonth = months[0]?.[0];
    const lastMonth = months[3]?.[2];

    expect(months).toHaveLength(4);
    expect(months[0]).toHaveLength(3);
    expect(firstMonth).toBeDefined();
    expect(lastMonth).toBeDefined();

    if (!firstMonth || !lastMonth) {
      throw new Error("Expected full month matrix data");
    }

    expect(adapter.getMonth(firstMonth)).toBe(0);
    expect(adapter.getMonth(lastMonth)).toBe(11);

    expect(years).toHaveLength(4);
    expect(years[0]).toHaveLength(3);
    expect(years[3]).toHaveLength(1);
    expect(adapter.getYear(startOfDecade)).toBe(2020);
    expect(adapter.getYear(endOfDecade)).toBe(2029);
  });

  it("clamps level boundaries", () => {
    expect(clampLevel("month", "year", "decade")).toBe("year");
    expect(clampLevel("decade", "month", "year")).toBe("year");
    expect(clampLevel()).toBe("month");
  });

  it("handles date boundary checks", () => {
    const minDate = new Date(2026, 1, 10);
    const maxDate = new Date(2026, 1, 20);

    expect(isAfterMinDate(new Date(2026, 1, 10), minDate, adapter)).toBe(true);
    expect(isAfterMinDate(new Date(2026, 1, 9), minDate, adapter)).toBe(false);
    expect(isBeforeMaxDate(new Date(2026, 1, 20), maxDate, adapter)).toBe(true);
    expect(isBeforeMaxDate(new Date(2026, 1, 21), maxDate, adapter)).toBe(
      false
    );
  });

  it("disables month and year controls against min/max boundaries", () => {
    const minDate = new Date(2026, 3, 10);
    const maxDate = new Date(2028, 7, 1);

    expect(
      isMonthDisabled({
        adapter,
        maxDate,
        minDate,
        month: new Date(2026, 2, 1),
      })
    ).toBe(true);
    expect(
      isMonthDisabled({
        adapter,
        maxDate,
        minDate,
        month: new Date(2026, 3, 1),
      })
    ).toBe(false);
    expect(
      isYearDisabled({
        adapter,
        maxDate,
        minDate,
        year: new Date(2025, 0, 1),
      })
    ).toBe(true);
    expect(
      isYearDisabled({
        adapter,
        maxDate,
        minDate,
        year: new Date(2027, 0, 1),
      })
    ).toBe(false);
  });

  it("finds tab-order targets for day/month/year controls", () => {
    const monthMatrix = getMonthsData(new Date(2026, 0, 1), adapter);
    const yearMatrix = getYearsData(new Date(2026, 0, 1), adapter);
    const dayMatrix = [
      [new Date(2026, 1, 1), new Date(2026, 1, 2), new Date(2026, 1, 3)],
    ];

    const monthInTabOrder = getMonthInTabOrder({
      adapter,
      getMonthControlProps: (date) => ({
        selected: adapter.getMonth(date) === 2,
      }),
      maxDate: undefined,
      minDate: undefined,
      months: monthMatrix,
    });

    const yearInTabOrder = getYearInTabOrder({
      adapter,
      getYearControlProps: (date) => ({
        selected: adapter.getYear(date) === 2024,
      }),
      maxDate: undefined,
      minDate: undefined,
      years: yearMatrix,
    });

    const dayInTabOrder = getDateInTabOrder({
      adapter,
      dates: dayMatrix,
      getDayProps: (date) => ({
        selected: adapter.getDate(date) === 2,
      }),
      month: new Date(2026, 1, 1),
    });

    expect(monthInTabOrder && adapter.getMonth(monthInTabOrder)).toBe(2);
    expect(yearInTabOrder && adapter.getYear(yearInTabOrder)).toBe(2024);
    expect(dayInTabOrder && adapter.getDate(dayInTabOrder)).toBe(2);
  });
});
