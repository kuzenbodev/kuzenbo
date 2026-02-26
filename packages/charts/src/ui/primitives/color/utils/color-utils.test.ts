import { afterEach, describe, expect, it } from "bun:test";

import {
  getFallbackColor,
  isSafeColorExpression,
  isValidCssCustomPropertyName,
} from "./constants";
import { createSeriesColorRegistry } from "./create-series-color-registry";
import { getChartThemeFromDom } from "./get-chart-theme-from-dom";
import { getStyleDeclarationsForTheme } from "./get-style-declarations-for-theme";
import { normalizeChartColor } from "./normalize-chart-color";
import { resolveSeriesColorExpression } from "./resolve-series-color-expression";
import { ensureUniqueSlug, slugifySeriesKey } from "./series-slug";

afterEach(() => {
  document.documentElement.classList.remove("dark");
  document.body.innerHTML = "";
});

describe("color utils", () => {
  it("cycles fallback colors deterministically", () => {
    expect(getFallbackColor(0)).toBe("var(--color-chart-1)");
    expect(getFallbackColor(5)).toBe("var(--color-chart-1)");
  });

  it("validates safety of color expressions", () => {
    expect(isSafeColorExpression("rgb(1, 2, 3)")).toBe(true);
    expect(isSafeColorExpression("var(--brand-color); background:red")).toBe(
      false
    );
    expect(isSafeColorExpression("rgb(1,2,3)\nvar(--x)")).toBe(false);
  });

  it("validates CSS custom property names", () => {
    expect(isValidCssCustomPropertyName("--chart-color")).toBe(true);
    expect(isValidCssCustomPropertyName("--a1_b")).toBe(true);
    expect(isValidCssCustomPropertyName("chart-color")).toBe(false);
    expect(isValidCssCustomPropertyName("--1bad")).toBe(false);
  });

  it("normalizes slugs and guarantees uniqueness", () => {
    const used = new Set<string>();

    expect(slugifySeriesKey(" Revenue Total ")).toBe("revenue-total");
    expect(slugifySeriesKey("***")).toBe("series");
    expect(ensureUniqueSlug("revenue", used)).toBe("revenue");
    expect(ensureUniqueSlug("revenue", used)).toBe("revenue-2");
    expect(ensureUniqueSlug("revenue", used)).toBe("revenue-3");
  });

  it("normalizes chart color expressions", () => {
    expect(normalizeChartColor("hsl(var(--kb-chart-2))")).toBe(
      "hsl(var(--kb-chart-2))"
    );
    expect(normalizeChartColor("  #123456  ")).toBe("#123456");
    expect(normalizeChartColor("")).toBeUndefined();
  });

  it("creates color registry with unsafe fallbacks", () => {
    const registry = createSeriesColorRegistry({
      "Revenue Total": { color: "var(--brand-color)" },
      revenue_total: { color: "var(--brand-secondary)" },
      risky: { color: "var(--x);background:red" },
      themed: {
        theme: {
          dark: "var(--color-chart-4)",
          light: "var(--color-chart-3)",
        },
      },
    });

    expect(registry.byKey["Revenue Total"]?.varName).toBe(
      "--color-revenue-total"
    );
    expect(registry.byKey.revenue_total?.varName).toBe(
      "--color-revenue-total-2"
    );
    expect(registry.byKey.risky?.colorByTheme.light).toBe(
      "var(--color-chart-3)"
    );
    expect(registry.byKey.themed?.colorByTheme.dark).toBe(
      "var(--color-chart-4)"
    );
  });

  it("builds theme declarations with stable variable names", () => {
    const registry = createSeriesColorRegistry({
      revenue_total: { color: "var(--brand-secondary)" },
    });

    expect(getStyleDeclarationsForTheme(registry, "light")).toEqual([
      "  --color-revenue-total: var(--brand-secondary);",
    ]);
  });

  it("detects chart theme from document context", () => {
    const chartId = "chart-theme";
    const chartNode = document.createElement("div");
    chartNode.dataset.chart = chartId;
    document.body.append(chartNode);

    expect(getChartThemeFromDom(chartId)).toBe("light");

    document.documentElement.classList.add("dark");
    expect(getChartThemeFromDom(chartId)).toBe("dark");

    document.documentElement.classList.remove("dark");

    const darkWrapper = document.createElement("div");
    darkWrapper.className = "dark";
    darkWrapper.append(chartNode);
    document.body.append(darkWrapper);

    expect(getChartThemeFromDom(chartId)).toBe("dark");
  });

  it("resolves series color expressions from mapped vars and fallbacks", () => {
    const chartId = "chart-color-utils";
    const chartNode = document.createElement("div");
    chartNode.dataset.chart = chartId;
    document.body.append(chartNode);

    const registry = createSeriesColorRegistry({
      revenue: {
        theme: { dark: "var(--color-chart-4)", light: "var(--color-chart-2)" },
      },
    });

    expect(
      resolveSeriesColorExpression({
        chartId,
        registry,
        value: "rgb(10, 20, 30)",
      })
    ).toBe("rgb(10, 20, 30)");

    expect(
      resolveSeriesColorExpression({
        chartId,
        fallbackSeriesKey: "revenue",
        registry,
        value: undefined,
      })
    ).toBe("var(--color-chart-2)");

    expect(
      resolveSeriesColorExpression({
        chartId,
        registry,
        value: "var(--color-revenue)",
      })
    ).toBe("var(--color-chart-2)");

    expect(
      resolveSeriesColorExpression({
        chartId,
        registry,
        value: "var(--unknown-color)",
      })
    ).toBe("var(--unknown-color)");
  });
});
