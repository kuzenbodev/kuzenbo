import { describe, expect, it } from "bun:test";

import { createPointLabelFormatter } from "./create-point-label-formatter";
import { DEFAULT_LINE_GRADIENT_STOPS } from "./default-gradient-stops";
import { resolveLineDotProps } from "./resolve-line-dot-props";
import { toRenderableLabelValue } from "./to-renderable-label-value";

describe("line utils", () => {
  it("uses valueFormatter for numeric labels", () => {
    const formatter = createPointLabelFormatter<{ id: string }>(
      (value, seriesKey) => `${seriesKey}:${value}`,
      "visits"
    );

    expect(formatter(1500, { id: "a" })).toBe("visits:1500");
  });

  it("falls back to renderable conversion for non-numeric labels", () => {
    const formatter = createPointLabelFormatter<{ id: string }>(
      (value) => `${value}`,
      "visits"
    );

    expect(formatter("1500", { id: "a" })).toBe("1500");
    expect(formatter({ amount: 1 }, { id: "a" })).toBe("[object Object]");
  });

  it("merges line dot props and applies dimmed opacity", () => {
    const dimmed = resolveLineDotProps({
      dotProps: { r: 4, fill: "blue" },
      isDimmed: true,
      withDots: true,
    }) as Record<string, unknown>;

    expect(dimmed.fillOpacity).toBe(0);
    expect(dimmed.strokeOpacity).toBe(0);
    expect(dimmed.r).toBe(4);
    expect(dimmed.fill).toBe("blue");

    const visible = resolveLineDotProps({
      dotProps: { r: 2 },
      isDimmed: false,
      withDots: true,
    }) as Record<string, unknown>;

    expect(visible.fillOpacity).toBe(1);
    expect(visible.strokeOpacity).toBe(1);
    expect(visible.r).toBe(2);
  });

  it("returns withDots when dotProps are absent", () => {
    expect(
      resolveLineDotProps({ dotProps: null, isDimmed: false, withDots: true })
    ).toBe(true);
    expect(
      resolveLineDotProps({
        dotProps: "invalid",
        isDimmed: true,
        withDots: false,
      })
    ).toBe(false);
  });

  it("converts unknown values into renderable labels", () => {
    expect(toRenderableLabelValue(10)).toBe(10);
    expect(toRenderableLabelValue("ten")).toBe("ten");
    expect(toRenderableLabelValue(null)).toBe("null");
  });

  it("keeps the default line gradient stop contract", () => {
    expect(DEFAULT_LINE_GRADIENT_STOPS).toEqual([
      { color: "var(--color-chart-1)", offset: 0 },
      { color: "var(--color-chart-5)", offset: 100 },
    ]);
  });
});
