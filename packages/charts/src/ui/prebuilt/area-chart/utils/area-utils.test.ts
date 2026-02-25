import { describe, expect, it } from "bun:test";

import { createPointLabelFormatter } from "./create-point-label-formatter";
import { DEFAULT_AREA_GRADIENT_STOPS } from "./default-gradient-stops";
import { resolveAreaDotProps } from "./resolve-area-dot-props";
import { resolveAreaStackConfig } from "./resolve-area-stack-config";
import { toRenderableLabelValue } from "./to-renderable-label-value";
import { toSafeGradientIdSegment } from "./to-safe-gradient-id-segment";

describe("area utils", () => {
  it("uses valueFormatter for numeric point labels", () => {
    const formatter = createPointLabelFormatter<{ total: number }>(
      (value, seriesKey) => `${seriesKey}:${value}`,
      "revenue"
    );

    expect(formatter(42, { total: 42 })).toBe("revenue:42");
  });

  it("falls back to renderable label conversion for non-numeric values", () => {
    const formatter = createPointLabelFormatter<{ total: number }>(
      (value) => `${value}`,
      "revenue"
    );

    expect(formatter("42", { total: 42 })).toBe("42");
    expect(formatter({ amount: 42 }, { total: 42 })).toBe("[object Object]");
  });

  it("merges dot props and applies dimmed opacity", () => {
    const dimmed = resolveAreaDotProps({
      dotProps: { r: 3, stroke: "red" },
      isDimmed: true,
      withDots: true,
    }) as Record<string, unknown>;

    expect(dimmed.fillOpacity).toBe(0);
    expect(dimmed.strokeOpacity).toBe(0);
    expect(dimmed.r).toBe(3);
    expect(dimmed.stroke).toBe("red");

    const visible = resolveAreaDotProps({
      dotProps: { r: 3 },
      isDimmed: false,
      withDots: true,
    }) as Record<string, unknown>;

    expect(visible.fillOpacity).toBe(1);
    expect(visible.strokeOpacity).toBe(1);
    expect(visible.r).toBe(3);
  });

  it("returns withDots flag when dotProps is not an object", () => {
    expect(
      resolveAreaDotProps({
        dotProps: undefined,
        isDimmed: true,
        withDots: true,
      })
    ).toBe(true);

    expect(
      resolveAreaDotProps({
        dotProps: "invalid",
        isDimmed: false,
        withDots: false,
      })
    ).toBe(false);
  });

  it("resolves stack config by chart type", () => {
    expect(resolveAreaStackConfig("stacked")).toEqual({ shouldUseStack: true });
    expect(resolveAreaStackConfig("percent")).toEqual({
      shouldUseStack: true,
      stackOffset: "expand",
    });
    expect(resolveAreaStackConfig("split")).toEqual({
      shouldUseStack: true,
      stackOffset: "sign",
    });
    expect(resolveAreaStackConfig("unknown" as never)).toEqual({
      shouldUseStack: false,
    });
  });

  it("converts unknown values into renderable labels", () => {
    expect(toRenderableLabelValue(12)).toBe(12);
    expect(toRenderableLabelValue("value")).toBe("value");
    expect(toRenderableLabelValue(null)).toBe("null");
    expect(toRenderableLabelValue({ value: 1 })).toBe("[object Object]");
  });

  it("normalizes unsafe gradient id segments and falls back to series", () => {
    expect(toSafeGradientIdSegment(" Revenue (Q1) ")).toBe("revenue-q1");
    expect(toSafeGradientIdSegment("---***---")).toBe("series");
    expect(toSafeGradientIdSegment("A__B__C")).toBe("a-b-c");
  });

  it("keeps the default area gradient stop contract", () => {
    expect(DEFAULT_AREA_GRADIENT_STOPS).toEqual([
      { offset: 5, opacity: 0.42 },
      { offset: 95, opacity: 0.04 },
    ]);
  });
});
