import { describe, expect, it } from "bun:test";

import {
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
} from "./date-helpers";

describe("heatmap date helpers", () => {
  it("normalizes date-like inputs to UTC midnight", () => {
    const normalized = normalizeHeatmapDate("2026-02-11T18:22:10.000Z");

    expect(normalized.toISOString()).toBe("2026-02-11T00:00:00.000Z");
    expect(() => normalizeHeatmapDate("invalid-date")).toThrow(
      "Invalid heatmap date input"
    );
  });

  it("adds UTC days and months deterministically", () => {
    const base = new Date(Date.UTC(2026, 0, 31));

    expect(addDaysUTC(base, 2).toISOString()).toBe("2026-02-02T00:00:00.000Z");
    expect(addMonthsUTC(base, 1).toISOString()).toBe(
      "2026-02-01T00:00:00.000Z"
    );
  });

  it("resolves month bounds in UTC", () => {
    const date = new Date(Date.UTC(2026, 1, 15));

    expect(startOfMonthUTC(date).toISOString()).toBe(
      "2026-02-01T00:00:00.000Z"
    );
    expect(endOfMonthUTC(date).toISOString()).toBe("2026-02-28T00:00:00.000Z");
  });

  it("resolves week bounds and compares/ranges UTC dates", () => {
    const date = new Date(Date.UTC(2026, 0, 8));
    const start = startOfWeekUTC(date, 1);
    const end = endOfWeekUTC(date, 1);

    expect(start.toISOString()).toBe("2026-01-05T00:00:00.000Z");
    expect(end.toISOString()).toBe("2026-01-11T00:00:00.000Z");
    expect(compareUTCDate(start, end)).toBeLessThan(0);
    expect(isDateWithinRangeUTC(date, start, end)).toBe(true);
    expect(
      isDateWithinRangeUTC(new Date(Date.UTC(2026, 0, 12)), start, end)
    ).toBe(false);
  });

  it("formats iso keys and month labels", () => {
    const date = new Date(Date.UTC(2026, 0, 9));

    expect(formatIsoDateUTC(date)).toBe("2026-01-09");
    expect(toMonthKeyUTC(date)).toBe("2026-01");
    expect(formatMonthLabelUTC(date, "en-US")).toBe("Jan 2026");
  });

  it("orders range bounds even when provided in reverse order", () => {
    const [start, end] = getHeatmapRangeBounds("2026-03-15", "2026-01-10");

    expect(formatIsoDateUTC(start)).toBe("2026-01-10");
    expect(formatIsoDateUTC(end)).toBe("2026-03-15");
  });
});
