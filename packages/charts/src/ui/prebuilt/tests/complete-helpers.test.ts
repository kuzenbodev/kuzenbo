import { describe, expect, it } from "bun:test";

import {
  calculateWaterfallData,
  createYAxisTickFormatter,
  normalizeAxisId,
  resolveCompleteSeriesName,
  resolveDefaultBarRadius,
  resolveSeriesKeyForAxisId,
  shouldRenderGridX,
  shouldRenderGridY,
  shouldRenderXAxisTickLine,
  shouldRenderYAxisTickLine,
} from "../shared/complete-helpers";

describe("complete helper contracts", () => {
  it("normalizes axis ids consistently", () => {
    expect(normalizeAxisId()).toBe("0");
    expect(normalizeAxisId(null)).toBe("0");
    expect(normalizeAxisId(1)).toBe("1");
    expect(normalizeAxisId("right-axis")).toBe("right-axis");
  });

  it("resolves canonical series name with key alias fallback", () => {
    expect(resolveCompleteSeriesName({ name: "revenue", key: "rev" })).toBe(
      "revenue"
    );
    expect(resolveCompleteSeriesName({ key: "revenueSeries" })).toBe(
      "revenueSeries"
    );
  });

  it("resolves series keys by axis id with fallback", () => {
    const series = [
      { name: "revenue", yAxisId: "left-axis" },
      { name: "target", yAxisId: "right-axis" },
    ] as const;

    expect(resolveSeriesKeyForAxisId(series, "left-axis")).toBe("revenue");
    expect(resolveSeriesKeyForAxisId(series, "right-axis")).toBe("target");
    expect(resolveSeriesKeyForAxisId(series, "missing-axis")).toBe("revenue");
  });

  it("creates axis-aware y-axis tick formatters", () => {
    const series = [
      { name: "revenue", yAxisId: "left-axis" },
      { name: "target", yAxisId: "right-axis" },
    ] as const;

    const leftFormatter = createYAxisTickFormatter({
      axisId: "left-axis",
      data: [{ revenue: 1200, target: 1500 }],
      series,
      unit: "USD",
      valueFormatter: (value, key) => `${key}:${value}`,
    });
    const rightFormatter = createYAxisTickFormatter({
      axisId: "right-axis",
      data: [{ revenue: 1200, target: 1500 }],
      series,
      unit: "USD",
      valueFormatter: (value, key) => `${key}:${value}`,
    });

    expect(leftFormatter(1200)).toBe("revenue:1200");
    expect(rightFormatter(1500)).toBe("target:1500");
  });

  it("supports key-only alias series during migration", () => {
    const formatter = createYAxisTickFormatter({
      axisId: "left-axis",
      data: [{ revenue: 1200, target: 1500 }],
      series: [{ key: "revenue", yAxisId: "left-axis" }],
      unit: "USD",
      valueFormatter: (value, key) => `${key}:${value}`,
    });

    expect(formatter(1200)).toBe("revenue:1200");
  });

  it("falls back to the first series key when axis id has no match", () => {
    const formatter = createYAxisTickFormatter({
      axisId: "missing-axis",
      data: [{ revenue: 1200, target: 1500 }],
      series: [
        { name: "revenue", yAxisId: "left-axis" },
        { name: "target", yAxisId: "right-axis" },
      ],
      unit: "USD",
      valueFormatter: (value, key) => `${key}:${value}`,
    });

    expect(formatter(1500)).toBe("revenue:1500");
  });

  it("supports the full gridAxis matrix", () => {
    const matrix = {
      none: { x: false, y: false },
      x: { x: true, y: false },
      xy: { x: true, y: true },
      y: { x: false, y: true },
    } as const;

    for (const [axis, expected] of Object.entries(matrix)) {
      expect(shouldRenderGridX(axis as keyof typeof matrix)).toBe(expected.x);
      expect(shouldRenderGridY(axis as keyof typeof matrix)).toBe(expected.y);
    }
  });

  it("supports the full tickLine matrix", () => {
    const matrix = {
      none: { x: false, y: false },
      x: { x: true, y: false },
      xy: { x: true, y: true },
      y: { x: false, y: true },
    } as const;

    for (const [axis, expected] of Object.entries(matrix)) {
      expect(shouldRenderXAxisTickLine(axis as keyof typeof matrix)).toBe(
        expected.x
      );
      expect(shouldRenderYAxisTickLine(axis as keyof typeof matrix)).toBe(
        expected.y
      );
    }
  });

  it("resolves deterministic default bar radius", () => {
    expect(
      resolveDefaultBarRadius([{ stackId: undefined }, { stackId: undefined }])
    ).toBe(6);

    expect(
      resolveDefaultBarRadius([{ stackId: "acq" }, { stackId: "acq" }])
    ).toBe(0);

    expect(
      resolveDefaultBarRadius(
        [{ stackId: undefined }, { stackId: undefined }],
        undefined,
        true
      )
    ).toBe(0);

    expect(
      resolveDefaultBarRadius(
        [{ stackId: "acq" }, { stackId: "acq" }],
        [4, 4, 4, 4]
      )
    ).toEqual([4, 4, 4, 4]);
  });

  it("calculates waterfall ranges with negative and standalone rows", () => {
    const result = calculateWaterfallData({
      data: [
        { month: "Jan", net: 100 },
        { month: "Feb", net: -30 },
        { month: "Mar", net: 50, standalone: true },
      ],
      dataKey: "month",
      series: [{ name: "net" }],
    });

    expect(result[0]?.net as unknown).toEqual([0, 100]);
    expect(result[1]?.net as unknown).toEqual([100, 70]);
    expect(result[2]?.net as unknown).toEqual([0, 50]);
  });
});
