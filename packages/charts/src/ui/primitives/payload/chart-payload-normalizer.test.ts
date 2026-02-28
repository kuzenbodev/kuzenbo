import { describe, expect, it } from "bun:test";

import type { ChartConfig } from "../types/chart-types";
import {
  normalizeChartPayload,
  resolveSeriesKey,
} from "./chart-payload-normalizer";

const baseConfig: ChartConfig = {
  revenue: { label: "Revenue", color: "var(--color-chart-1)" },
  total: { label: "Total", color: "var(--color-chart-2)" },
};

const fallbackColorBySeries: Record<string, string> = {
  revenue: "var(--color-chart-3)",
};

const getFallbackSeriesColor = (seriesKey: string) =>
  fallbackColorBySeries[seriesKey];

describe("Chart payload normalizer", () => {
  it("normalizes nested payload items and resolves config labels via nameKey", () => {
    const normalized = normalizeChartPayload({
      config: baseConfig,
      getSeriesColor: () => "var(--color-chart-5)",
      labelKey: "metric",
      nameKey: "metric",
      payload: [
        {
          color: "var(--color-chart-1)",
          payload: {
            amount: 120,
            metric: "revenue",
          },
          value: 120,
        },
      ],
      resolveColorExpression: (value) => value,
    });

    expect(normalized).toHaveLength(1);
    expect(normalized[0]?.key).toBe("revenue");
    expect(normalized[0]?.itemConfig?.label).toBe("Revenue");
    expect(normalized[0]?.label).toBe("Revenue");
    expect(normalized[0]?.payloadData?.amount).toBe(120);
  });

  it("extracts series keys from dotted dataKey/name fallbacks", () => {
    expect(
      resolveSeriesKey({
        config: baseConfig,
        item: {
          dataKey: "metrics.revenue",
          value: 50,
        },
      })
    ).toBe("revenue");

    expect(
      resolveSeriesKey({
        config: baseConfig,
        item: {
          name: "kpi.total",
          value: 91,
        },
      })
    ).toBe("total");
  });

  it("normalizes numeric and dotted nameKey payload values to config keys", () => {
    const numericKeyConfig: ChartConfig = {
      "42": { label: "Answer", color: "var(--color-chart-4)" },
      total: { label: "Total", color: "var(--color-chart-2)" },
    };

    expect(
      resolveSeriesKey({
        config: numericKeyConfig,
        item: {
          payload: {
            metric: 42,
          },
        },
        nameKey: "metric",
      })
    ).toBe("42");

    expect(
      resolveSeriesKey({
        config: numericKeyConfig,
        item: {
          payload: {
            metric: "scope.total",
          },
        },
        nameKey: "metric",
      })
    ).toBe("total");
  });

  it("keeps payload ordering and preserves numeric/string values", () => {
    const normalized = normalizeChartPayload({
      config: baseConfig,
      getSeriesColor: () => "var(--color-chart-5)",
      payload: [
        { dataKey: "revenue", name: "Revenue", payload: {}, value: 10 },
        { dataKey: "total", name: "Total", payload: {}, value: "12" },
      ],
      resolveColorExpression: (value) => value,
    });

    expect(normalized).toHaveLength(2);
    expect(normalized[0]?.key).toBe("revenue");
    expect(normalized[0]?.value).toBe(10);
    expect(normalized[1]?.key).toBe("total");
    expect(normalized[1]?.value).toBe("12");
  });

  it("falls back to getSeriesColor when resolved color is missing", () => {
    const normalized = normalizeChartPayload({
      config: baseConfig,
      getSeriesColor: getFallbackSeriesColor,
      payload: [
        { dataKey: "revenue", name: "Revenue", payload: {}, value: 88 },
      ],
      resolveColorExpression: (value) => value,
    });

    expect(normalized[0]?.color).toBe("var(--color-chart-3)");
  });

  it("handles non-object nested payload values safely", () => {
    const normalized = normalizeChartPayload({
      config: baseConfig,
      getSeriesColor: () => "var(--color-chart-5)",
      payload: [
        {
          color: "rgb(10, 20, 30)",
          dataKey: "revenue",
          payload: "not-an-object",
          value: 5,
        },
      ],
      resolveColorExpression: (value) => value,
    });

    expect(normalized[0]?.key).toBe("revenue");
    expect(normalized[0]?.payloadData).toBeUndefined();
    expect(normalized[0]?.color).toBe("rgb(10, 20, 30)");
  });
});
