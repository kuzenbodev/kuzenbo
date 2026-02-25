import { afterEach, describe, expect, it } from "bun:test";

import {
  createSeriesColorRegistry,
  getSeriesColor,
  getSeriesColorVarReference,
  resolveSeriesColorExpression,
} from "./chart-color-resolver";

afterEach(() => {
  document.documentElement.classList.remove("dark");
  document.body.innerHTML = "";
});

describe("chart-color-resolver utils", () => {
  it("returns series var references for known and unknown keys", () => {
    const registry = createSeriesColorRegistry({
      revenue: { color: "var(--color-chart-1)" },
    });

    expect(getSeriesColorVarReference("revenue", registry)).toBe(
      "var(--color-revenue)"
    );
    expect(getSeriesColorVarReference("Revenue Total", registry)).toBe(
      "var(--color-revenue-total)"
    );
  });

  it("resolves series colors by active chart theme", () => {
    const chartId = "chart-resolver-theme";
    const chartNode = document.createElement("div");
    chartNode.dataset.chart = chartId;
    document.body.append(chartNode);

    const registry = createSeriesColorRegistry({
      revenue: {
        theme: {
          dark: "var(--color-chart-5)",
          light: "var(--color-chart-1)",
        },
      },
    });

    expect(getSeriesColor("revenue", registry, chartId)).toBe(
      "var(--color-chart-1)"
    );

    document.documentElement.classList.add("dark");

    expect(getSeriesColor("revenue", registry, chartId)).toBe(
      "var(--color-chart-5)"
    );
    expect(getSeriesColor("missing", registry, chartId)).toBeUndefined();
  });

  it("resolves series color expressions via resolver wrapper", () => {
    const chartId = "chart-resolver-expression";
    const chartNode = document.createElement("div");
    chartNode.dataset.chart = chartId;
    document.body.append(chartNode);

    const registry = createSeriesColorRegistry({
      revenue: {
        theme: {
          dark: "var(--color-chart-4)",
          light: "var(--color-chart-2)",
        },
      },
    });

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
      resolveSeriesColorExpression({ chartId, registry, value: "#123456" })
    ).toBe("#123456");
  });
});
