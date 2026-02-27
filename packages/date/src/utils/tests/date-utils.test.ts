import { describe, expect, it } from "bun:test";

import { createDateAdapter } from "../../adapter";
import {
  assignTime,
  clampDate,
  getDefaultClampedDate,
  getFormattedDate,
  toDateString,
  toDateTimeString,
} from "../../utils";

describe("date utils", () => {
  it("serializes date values through adapter helpers", () => {
    const adapter = createDateAdapter();

    expect(toDateString("2021-09-13T12:00:00.000Z", { adapter })).toBe(
      "2021-09-13"
    );
    expect(toDateTimeString("2021-09-13", { adapter })).toBe(
      "2021-09-13 00:00:00"
    );
  });

  it("assigns and clamps date-time values", () => {
    const adapter = createDateAdapter();

    expect(assignTime("2021-09-13", "10:20:30", { adapter })).toBe(
      "2021-09-13 10:20:30"
    );

    expect(
      clampDate(
        "2021-09-10 00:00:00",
        "2021-09-20 00:00:00",
        "2021-09-01 00:00:00",
        { adapter }
      )
    ).toBe("2021-09-10 00:00:00");
  });

  it("resolves default clamped date against boundaries", () => {
    const adapter = createDateAdapter();

    expect(
      getDefaultClampedDate(
        {
          minDate: "2100-01-01",
        },
        { adapter }
      )
    ).toBe("2100-01-01");
  });

  it("formats single, multiple and range values", () => {
    const adapter = createDateAdapter();

    expect(
      getFormattedDate({
        adapter,
        date: "2021-09-13",
        format: "MM/dd/yyyy",
        labelSeparator: "–",
        locale: "en",
        selectionMode: "single",
      })
    ).toBe("09/13/2021");

    expect(
      getFormattedDate({
        adapter,
        date: ["2021-09-13", "2021-10-08"],
        format: "MM/dd/yyyy",
        labelSeparator: "–",
        locale: "en",
        selectionMode: "multiple",
      })
    ).toBe("09/13/2021, 10/08/2021");

    expect(
      getFormattedDate({
        adapter,
        date: ["2021-09-13", null],
        format: "MM/dd/yyyy",
        labelSeparator: "–",
        locale: "en",
        selectionMode: "range",
      })
    ).toBe("09/13/2021 – ");
  });
});
