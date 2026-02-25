import { describe, expect, it } from "bun:test";

import { createAxisTickFormatter } from "./create-axis-tick-formatter";
import { createPointLabelFormatter } from "./create-point-label-formatter";
import { createTooltipValueFormatter } from "./create-tooltip-value-formatter";
import { formatAxisNumericValue } from "./format-axis-numeric-value";
import { toRenderableLabelValue } from "./to-renderable-label-value";

const sharedTooltipFormatter = (value: number, key: string) =>
  `${key}:${value}`;

describe("scatter utils", () => {
  it("formats axis ticks for numeric values and falls back for invalid values", () => {
    const formatter = createAxisTickFormatter({
      fallbackDatum: { id: "fallback", x: 0, y: 0 },
      unit: "ms",
      valueFormatter: (value) => `axis:${value}`,
    });

    expect(formatter(15)).toBe("axis:15");
    expect(formatter("invalid")).toBe("invalid");
  });

  it("prefers custom formatter in numeric axis value formatting", () => {
    expect(
      formatAxisNumericValue(21, {
        datum: { id: "row" },
        unit: "kg",
        valueFormatter: (value, datum) => `${datum.id}:${value}`,
      })
    ).toBe("row:21");

    expect(
      formatAxisNumericValue(21, { datum: { id: "row" }, unit: "kg" })
    ).toBe("21 kg");
  });

  it("resolves point label formatter precedence", () => {
    const withPointFormatter = createPointLabelFormatter({
      pointLabelFormatter: (value, seriesName) =>
        `${seriesName}-point:${value}`,
      seriesName: "ctr",
      valueFormatter: (value, seriesName) => `${seriesName}-value:${value}`,
    });
    const withValueFormatter = createPointLabelFormatter({
      seriesName: "ctr",
      valueFormatter: (value, seriesName) => `${seriesName}-value:${value}`,
    });
    const noFormatter = createPointLabelFormatter({ seriesName: "ctr" });

    expect(withPointFormatter(5, { id: "a" })).toBe("ctr-point:5");
    expect(withValueFormatter(5, { id: "a" })).toBe("ctr-value:5");
    expect(noFormatter(5, { id: "a" })).toBe(5);
    expect(noFormatter({ value: 5 }, { id: "a" })).toBe("[object Object]");
  });

  it("routes tooltip formatter by x/y keys with fallback unit", () => {
    const formatter = createTooltipValueFormatter({
      fallbackDatum: { id: "fallback", x: 0, y: 0 },
      xKey: "x",
      xUnit: "px",
      xValueFormatter: (value, datum) => `${datum.id}:x:${value}`,
      yKey: "y",
      yUnit: "kg",
      yValueFormatter: (value, datum) => `${datum.id}:y:${value}`,
    });

    const rowDatum = { id: "row", x: 1, y: 2 };

    expect(formatter(1, "x", rowDatum)).toBe("row:x:1");
    expect(formatter(2, "y", rowDatum)).toBe("row:y:2");
    expect(formatter(3, "unknown", undefined as never)).toBe("3 kg");

    const passthrough = createTooltipValueFormatter({
      fallbackDatum: { id: "fallback", x: 0, y: 0 },
      valueFormatter: sharedTooltipFormatter,
      xKey: "x",
      yKey: "y",
    });

    expect(passthrough).toBe(sharedTooltipFormatter);
  });

  it("converts unknown values into renderable labels", () => {
    expect(toRenderableLabelValue(3)).toBe(3);
    expect(toRenderableLabelValue("3")).toBe("3");
    expect(toRenderableLabelValue(null)).toBe("null");
  });
});
