import { describe, expect, it } from "bun:test";

import { createAxisTickFormatter } from "./create-axis-tick-formatter";
import { createPointLabelFormatter } from "./create-point-label-formatter";
import { createTooltipValueFormatter } from "./create-tooltip-value-formatter";
import { formatAxisNumericValue } from "./format-axis-numeric-value";
import {
  DEFAULT_BUBBLE_RANGE,
  resolveBubbleRange,
} from "./resolve-bubble-range";
import { toRenderableLabelValue } from "./to-renderable-label-value";

const sharedTooltipFormatter = (value: number, key: string) =>
  `${key}:${value}`;

describe("bubble utils", () => {
  it("formats axis ticks for numeric values and falls back for invalid values", () => {
    const formatter = createAxisTickFormatter({
      fallbackDatum: { id: "fallback", x: 0, y: 0, z: 0 },
      unit: "ms",
      valueFormatter: (value) => `x:${value}`,
    });

    expect(formatter(12)).toBe("x:12");
    expect(formatter("invalid")).toBe("invalid");
  });

  it("prefers custom formatter in numeric axis value formatting", () => {
    expect(
      formatAxisNumericValue(20, {
        datum: { id: "a" },
        unit: "px",
        valueFormatter: (value, datum) => `${datum.id}:${value}`,
      })
    ).toBe("a:20");

    expect(formatAxisNumericValue(20, { datum: { id: "a" }, unit: "px" })).toBe(
      "20 px"
    );
  });

  it("resolves point label formatter precedence", () => {
    const withPointFormatter = createPointLabelFormatter({
      pointLabelFormatter: (value, seriesName) =>
        `${seriesName}-point:${value}`,
      seriesName: "cost",
      valueFormatter: (value, seriesName) => `${seriesName}-value:${value}`,
    });
    const withValueFormatter = createPointLabelFormatter({
      seriesName: "cost",
      valueFormatter: (value, seriesName) => `${seriesName}-value:${value}`,
    });
    const noFormatter = createPointLabelFormatter({ seriesName: "cost" });

    expect(withPointFormatter(9, { id: "a" })).toBe("cost-point:9");
    expect(withValueFormatter(9, { id: "a" })).toBe("cost-value:9");
    expect(noFormatter(9, { id: "a" })).toBe(9);
    expect(noFormatter({ value: 9 }, { id: "a" })).toBe("[object Object]");
  });

  it("routes tooltip formatter by axis key and fallback datum", () => {
    const formatter = createTooltipValueFormatter({
      fallbackDatum: { id: "fallback", x: 0, y: 0, z: 0 },
      xKey: "x",
      xUnit: "ms",
      xValueFormatter: (value, datum) => `${datum.id}:x:${value}`,
      yKey: "y",
      yUnit: "kg",
      yValueFormatter: (value, datum) => `${datum.id}:y:${value}`,
      zKey: "z",
      zUnit: "m",
      zValueFormatter: (value, datum) => `${datum.id}:z:${value}`,
    });

    const rowDatum = { id: "row", x: 1, y: 2, z: 3 };

    expect(formatter(10, "x", rowDatum)).toBe("row:x:10");
    expect(formatter(11, "y", rowDatum)).toBe("row:y:11");
    expect(formatter(12, "z", rowDatum)).toBe("row:z:12");
    expect(formatter(13, "unknown", undefined as never)).toBe("13 kg");

    const passthrough = createTooltipValueFormatter({
      fallbackDatum: { id: "fallback", x: 0, y: 0, z: 0 },
      valueFormatter: sharedTooltipFormatter,
      xKey: "x",
      yKey: "y",
      zKey: "z",
    });

    expect(passthrough).toBe(sharedTooltipFormatter);
  });

  it("resolves bubble range defaults and sanitizes invalid inputs", () => {
    expect(resolveBubbleRange()).toBe(DEFAULT_BUBBLE_RANGE);
    expect(resolveBubbleRange([10, 3])).toEqual([3, 10]);
    expect(resolveBubbleRange([-4, 9])).toEqual([1, 9]);
    expect(resolveBubbleRange([Number.NaN, 9])).toBe(DEFAULT_BUBBLE_RANGE);
  });

  it("converts unknown values into renderable labels", () => {
    expect(toRenderableLabelValue(7)).toBe(7);
    expect(toRenderableLabelValue("7")).toBe("7");
    expect(toRenderableLabelValue(false)).toBe("false");
  });
});
