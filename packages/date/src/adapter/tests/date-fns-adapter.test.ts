import { describe, expect, it } from "bun:test";

import { createDateAdapter } from "../../adapter";

const expectParsedDate = (value: Date | null): Date => {
  expect(value).not.toBeNull();

  if (!value) {
    throw new Error("Expected parser to return a valid Date.");
  }

  return value;
};

describe("date-fns adapter", () => {
  it("converts values to date and date-time strings", () => {
    const adapter = createDateAdapter();

    expect(adapter.toDateString("2021-09-13T12:30:55.000Z")).toBe("2021-09-13");
    expect(adapter.toDateTimeString("2021-09-13")).toBe("2021-09-13 00:00:00");
  });

  it("assigns time to existing date values", () => {
    const adapter = createDateAdapter();

    expect(adapter.assignTime("2021-01-01", "12:34:56")).toBe(
      "2021-01-01 12:34:56"
    );
    expect(adapter.assignTime("2021-01-01 12:34:56", "01:02:03")).toBe(
      "2021-01-01 01:02:03"
    );
  });

  it("clamps dates between min and max", () => {
    const adapter = createDateAdapter();

    const minDate = "2021-01-01 00:00:00";
    const maxDate = "2021-12-31 00:00:00";

    expect(adapter.clamp(minDate, maxDate, "2020-01-01 00:00:00")).toBe(
      minDate
    );
    expect(adapter.clamp(minDate, maxDate, "2022-01-01 00:00:00")).toBe(
      maxDate
    );
    expect(adapter.clamp(minDate, maxDate, "2021-06-15 00:00:00")).toBe(
      "2021-06-15 00:00:00"
    );
  });

  it("handles range checks and comparisons by day", () => {
    const adapter = createDateAdapter();

    expect(
      adapter.isInRange("2024-03-10", ["2024-03-01", "2024-03-31"], "day", true)
    ).toBe(true);

    expect(adapter.compare("2024-03-05", "2024-03-10", "day")).toBeLessThan(0);
    expect(adapter.compare("2024-03-10", "2024-03-10", "day")).toBe(0);
  });

  it("supports timezone-aware formatting through adapter context", () => {
    const adapter = createDateAdapter({ timeZone: "America/New_York" });

    expect(adapter.toDateString("2024-01-01T02:30:00.000Z")).toBe("2023-12-31");
  });

  it("keeps helper methods timezone-safe on canonical adapter", () => {
    const adapter = createDateAdapter({
      locale: "en-US",
      timeZone: "America/New_York",
    });

    expect(adapter.toISODate("2024-01-01T02:30:00.000Z")).toBe("2023-12-31");
    expect(adapter.parseISODate("2024-02-30")).toBeNull();
    expect(
      adapter.format(
        "2024-01-01T02:30:00.000Z",
        { day: "2-digit", month: "2-digit", year: "numeric" },
        { locale: "en-US", timeZone: "America/New_York" }
      )
    ).toBe("12/31/2023");
    expect(
      adapter.getWeekdayLabels(1, "short", {
        locale: "en-US",
        timeZone: "UTC",
      })
    ).toHaveLength(7);
  });

  it("supports mutation helpers through adapter contract", () => {
    const adapter = createDateAdapter({ timeZone: "UTC" });

    const start = adapter.startOfDay("2024-06-11T15:42:10.000Z");
    const updated = adapter.setTime(start, 9, 10, 11);

    expect(adapter.toDateTimeString(start)).toBe("2024-06-11 00:00:00");
    expect(adapter.toDateTimeString(updated)).toBe("2024-06-11 09:10:11");
    expect(adapter.isSameDay(start, updated)).toBe(true);
  });

  it("reads date parts from adapter timezone context", () => {
    const utcAdapter = createDateAdapter({ timeZone: "UTC" });
    const newYorkAdapter = createDateAdapter({ timeZone: "America/New_York" });
    const value = new Date("2024-01-01T00:30:45.000Z");

    expect(utcAdapter.getYear(value)).toBe(2024);
    expect(utcAdapter.getMonth(value)).toBe(0);
    expect(utcAdapter.getDate(value)).toBe(1);
    expect(utcAdapter.getHours(value)).toBe(0);
    expect(utcAdapter.getMinutes(value)).toBe(30);
    expect(utcAdapter.getSeconds(value)).toBe(45);
    expect(utcAdapter.getWeekday(value)).toBe(1);

    expect(newYorkAdapter.getYear(value)).toBe(2023);
    expect(newYorkAdapter.getMonth(value)).toBe(11);
    expect(newYorkAdapter.getDate(value)).toBe(31);
    expect(newYorkAdapter.getHours(value)).toBe(19);
    expect(newYorkAdapter.getMinutes(value)).toBe(30);
    expect(newYorkAdapter.getSeconds(value)).toBe(45);
    expect(newYorkAdapter.getWeekday(value)).toBe(0);
  });

  it("applies setters in adapter timezone context and returns native Date values", () => {
    const utcAdapter = createDateAdapter({ timeZone: "UTC" });
    const newYorkAdapter = createDateAdapter({ timeZone: "America/New_York" });
    const value = new Date("2024-01-15T00:30:45.000Z");

    const utcWithYear = utcAdapter.setYear(value, 2025);
    const utcWithMonth = utcAdapter.setMonth(value, 5);
    const utcWithDate = utcAdapter.setDate(value, 20);
    const utcWithTime = utcAdapter.setTime(value, 9, 10, 11);

    const newYorkWithYear = newYorkAdapter.setYear(value, 2025);
    const newYorkWithMonth = newYorkAdapter.setMonth(value, 5);
    const newYorkWithDate = newYorkAdapter.setDate(value, 20);
    const newYorkWithTime = newYorkAdapter.setTime(value, 9, 10, 11);

    expect(Object.getPrototypeOf(utcWithYear)).toBe(Date.prototype);
    expect(Object.getPrototypeOf(utcWithMonth)).toBe(Date.prototype);
    expect(Object.getPrototypeOf(utcWithDate)).toBe(Date.prototype);
    expect(Object.getPrototypeOf(utcWithTime)).toBe(Date.prototype);
    expect(Object.getPrototypeOf(newYorkWithYear)).toBe(Date.prototype);
    expect(Object.getPrototypeOf(newYorkWithMonth)).toBe(Date.prototype);
    expect(Object.getPrototypeOf(newYorkWithDate)).toBe(Date.prototype);
    expect(Object.getPrototypeOf(newYorkWithTime)).toBe(Date.prototype);

    expect(utcWithMonth.getTime()).not.toBe(newYorkWithMonth.getTime());
    expect(utcWithDate.getTime()).not.toBe(newYorkWithDate.getTime());
    expect(utcWithTime.getTime()).not.toBe(newYorkWithTime.getTime());

    expect(utcAdapter.toDateTimeString(utcWithYear)).toBe(
      "2025-01-15 00:30:45"
    );
    expect(utcAdapter.toDateTimeString(utcWithMonth)).toBe(
      "2024-06-15 00:30:45"
    );
    expect(utcAdapter.toDateTimeString(utcWithDate)).toBe(
      "2024-01-20 00:30:45"
    );
    expect(utcAdapter.toDateTimeString(utcWithTime)).toBe(
      "2024-01-15 09:10:11"
    );

    expect(newYorkAdapter.toDateTimeString(newYorkWithYear)).toBe(
      "2025-01-14 19:30:45"
    );
    expect(newYorkAdapter.toDateTimeString(newYorkWithMonth)).toBe(
      "2024-06-14 19:30:45"
    );
    expect(newYorkAdapter.toDateTimeString(newYorkWithDate)).toBe(
      "2024-01-20 19:30:45"
    );
    expect(newYorkAdapter.toDateTimeString(newYorkWithTime)).toBe(
      "2024-01-14 09:10:11"
    );
  });

  it("handles DST spring-forward and fall-back edges deterministically", () => {
    const adapter = createDateAdapter({ timeZone: "America/New_York" });
    const springBase = expectParsedDate(adapter.parse("2024-03-10 00:30:00"));
    const springForward = adapter.setTime(springBase, 2, 30, 0);

    expect(adapter.toDateTimeString(springForward)).toBe("2024-03-10 03:30:00");
    expect(adapter.getHours(springForward)).toBe(3);
    expect(adapter.getMinutes(springForward)).toBe(30);

    const fallBase = expectParsedDate(adapter.parse("2024-11-03 00:30:00"));
    const fallOneThirty = adapter.setTime(fallBase, 1, 30, 0);
    const fallTwoThirty = adapter.setTime(fallBase, 2, 30, 0);

    expect(adapter.toDateTimeString(fallOneThirty)).toBe("2024-11-03 01:30:00");
    expect(adapter.toDateTimeString(fallTwoThirty)).toBe("2024-11-03 02:30:00");
    expect(fallOneThirty.getTime()).toBeLessThan(fallTwoThirty.getTime());
  });

  it("generates a stable month matrix with consistent weeks", () => {
    const adapter = createDateAdapter({
      consistentWeeks: true,
      weekStartsOn: 1,
    });

    const matrix = adapter.getMonthMatrix({
      consistentWeeks: true,
      month: "2024-02-01",
      weekStartsOn: 1,
    });

    expect(matrix.length).toBe(6);
    expect(matrix.every((row) => row.length === 7)).toBe(true);
  });
});
