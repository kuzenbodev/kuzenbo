import { describe, expect, it } from "bun:test";

import { createRadialLabelFormatter } from "./create-radial-label-formatter";
import { getRadialSegmentColor } from "./get-radial-segment-color";
import { getRadialSegmentKey } from "./get-radial-segment-key";
import { resolveRadialAngles } from "./resolve-radial-angles";
import { resolveRadialChartProps } from "./resolve-radial-chart-props";
import { resolveTooltipSourceShared } from "./resolve-tooltip-source-shared";
import { toRadialValue } from "./to-radial-value";

describe("radial utils", () => {
  it("parses radial values from numbers and strings", () => {
    expect(toRadialValue(8)).toBe(8);
    expect(toRadialValue("8.5")).toBe(8.5);
    expect(toRadialValue("invalid")).toBeNull();
    expect(toRadialValue(Number.NaN)).toBeNull();
  });

  it("formats radial labels in percent mode including zero-total guard", () => {
    const formatter = createRadialLabelFormatter({
      data: [{ value: 1 }, { value: 9 }],
      dataKey: "value",
      fallbackDatum: { id: "fallback", value: 1 },
      mode: "percent",
      seriesKey: "value",
    });

    expect(formatter(1, { id: "row", value: 1 })).toBe("10%");

    const zeroTotalFormatter = createRadialLabelFormatter({
      data: [{ value: 0 }],
      dataKey: "value",
      fallbackDatum: { id: "fallback", value: 0 },
      mode: "percent",
      seriesKey: "value",
    });

    expect(zeroTotalFormatter(5, { id: "row", value: 5 })).toBe("0%");
  });

  it("formats radial labels in value mode with formatter and fallback datum", () => {
    const formatter = createRadialLabelFormatter({
      data: [{ value: 1000 }],
      dataKey: "value",
      fallbackDatum: { id: "fallback", value: 1000 },
      mode: "value",
      seriesKey: "value",
      valueFormatter: (value, key, datum) => `${datum.id}:${key}:${value}`,
    });

    expect(formatter(1000, { id: "row", value: 1000 })).toBe("row:value:1000");
    expect(formatter(1000, null)).toBe("fallback:value:1000");

    const defaultFormatter = createRadialLabelFormatter({
      data: [{ value: 1200 }],
      dataKey: "value",
      fallbackDatum: { value: 1200 },
      mode: "value",
      seriesKey: "value",
    });

    expect(defaultFormatter(1200, null)).toBe("1,200");
    expect(defaultFormatter("invalid", null)).toBe("");
  });

  it("resolves radial segment color with fallback ordering", () => {
    expect(getRadialSegmentColor({ color: "#111" }, 0)).toBe("#111");
    expect(getRadialSegmentColor({ fill: "#222" }, 0)).toBe("#222");
    expect(getRadialSegmentColor({ stroke: "#333" }, 0)).toBe("#333");
    expect(getRadialSegmentColor({}, 6)).toBe("var(--color-chart-2)");
  });

  it("resolves radial segment keys with primitive fallbacks", () => {
    expect(getRadialSegmentKey({ name: "Revenue" }, "name", 0)).toBe("Revenue");
    expect(getRadialSegmentKey({ name: 5 }, "name", 1)).toBe("5");
    expect(getRadialSegmentKey({ name: false }, "name", 2)).toBe("false");
    expect(getRadialSegmentKey({ name: "" }, "name", 3)).toBe("segment-4");
  });

  it("resolves radial angles for defaults, semicircle mode, and explicit overrides", () => {
    expect(resolveRadialAngles({})).toEqual({ endAngle: -270, startAngle: 90 });
    expect(resolveRadialAngles({ isSemicircle: true })).toEqual({
      endAngle: 0,
      startAngle: 180,
    });
    expect(resolveRadialAngles({ endAngle: 30, isSemicircle: true })).toEqual({
      endAngle: 30,
      startAngle: 180,
    });
    expect(resolveRadialAngles({ startAngle: 45 })).toEqual({
      endAngle: -270,
      startAngle: 45,
    });
  });

  it("merges radial chart props with responsive and style defaults", () => {
    const defaults = resolveRadialChartProps(undefined, false);

    expect(defaults.responsive).toBe(true);
    expect(defaults.style).toEqual({ height: "100%", width: "100%" });

    const merged = resolveRadialChartProps(
      { responsive: false, style: { minHeight: 200 } },
      true
    );
    const mergedStyle = merged.style as Record<string, unknown>;

    expect(merged.responsive).toBe(false);
    expect(mergedStyle.height).toBe("100%");
    expect(mergedStyle.width).toBe("100%");
    expect(mergedStyle.minHeight).toBe(200);
  });

  it("resolves shared tooltip behavior unless shared is explicitly set", () => {
    const explicit = { shared: false };

    expect(resolveTooltipSourceShared("all", explicit)).toBe(explicit);
    expect(resolveTooltipSourceShared("all", {})).toEqual({
      shared: true,
    });
    expect(resolveTooltipSourceShared("segment", { cursor: false })).toEqual({
      cursor: false,
      shared: false,
    });
  });
});
