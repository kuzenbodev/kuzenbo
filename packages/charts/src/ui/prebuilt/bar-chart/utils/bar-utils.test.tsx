import { describe, expect, it } from "bun:test";

import { buildBarCells } from "./build-bar-cells";
import { createBarValueLabelFormatter } from "./create-bar-value-label-formatter";
import { createPercentAxisTickFormatter } from "./create-percent-axis-tick-formatter";
import { toRenderableLabelValue } from "./to-renderable-label-value";

const resolveBarColorFromValue = (value: number) =>
  value >= 0 ? "#00ff00" : "#0000ff";

describe("bar utils", () => {
  it("returns null when no per-datum color strategy is available", () => {
    const cells = buildBarCells({
      barColor: "var(--color-chart-1)",
      data: [{ month: "Jan", revenue: 10 }],
      dataKey: "month",
      seriesItem: { name: "revenue" },
      seriesName: "revenue",
    });

    expect(cells).toBeNull();
  });

  it("builds cells with explicit datum color and getBarColor fallback", () => {
    const cells = buildBarCells({
      barColor: "var(--color-chart-1)",
      data: [
        { month: "Jan", revenue: 10 },
        { color: "#ff0000", month: "Feb", revenue: -2 },
      ],
      dataKey: "month",
      getBarColor: resolveBarColorFromValue,
      seriesItem: { name: "revenue" },
      seriesName: "revenue",
    });

    expect(cells).toHaveLength(2);
    expect(cells?.[0]?.props.fill).toBe("#00ff00");
    expect(cells?.[1]?.props.fill).toBe("#ff0000");
    expect(cells?.[0]?.key).toContain("revenue-cell-Jan");
    expect(cells?.[1]?.key).toContain("revenue-cell-Feb");
  });

  it("uses formatter precedence and allowRange conversion for bar value labels", () => {
    const withFormatter = createBarValueLabelFormatter<{ id: string }>(
      (value, seriesKey) => `${seriesKey}:${value}`,
      "profit"
    );
    const withoutFormatter = createBarValueLabelFormatter<{ id: string }>(
      undefined,
      "profit"
    );

    expect(withFormatter(12, { id: "a" })).toBe("profit:12");
    expect(withoutFormatter([10, 16], { id: "a" })).toBe(6);
    expect(withoutFormatter("bad", { id: "a" })).toBe("bad");
  });

  it("formats percent axis ticks for numeric and range values", () => {
    const formatter = createPercentAxisTickFormatter();

    expect(formatter(0.25)).toBe("25%");
    expect(formatter([2, 5])).toBe("300%");
    expect(formatter("invalid")).toBe("invalid");
  });

  it("converts unknown values into renderable labels", () => {
    expect(toRenderableLabelValue(2)).toBe(2);
    expect(toRenderableLabelValue("2")).toBe("2");
    expect(toRenderableLabelValue(null)).toBe("null");
  });
});
