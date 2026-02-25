import { describe, expect, it } from "bun:test";

import type { ChartConfig } from "../../types/chart-types";

import { asRecord } from "./as-record";
import { getShapeColor } from "./get-shape-color";
import { isNoneToken } from "./is-none-token";
import { resolveSeriesKey } from "./resolve-series-key";
import { resolveSeriesKeyCandidate } from "./resolve-series-key-candidate";
import { toStringValue } from "./to-string-value";

describe("payload utils", () => {
  it("narrows object-like values to records", () => {
    expect(asRecord({ id: 1 })).toEqual({ id: 1 });
    expect(asRecord(null)).toBeUndefined();
    expect(asRecord("value")).toBeUndefined();
  });

  it("normalizes none token checks", () => {
    expect(isNoneToken("none")).toBe(true);
    expect(isNoneToken(" NONE ")).toBe(true);
    expect(isNoneToken("line")).toBe(false);
    expect(isNoneToken(null)).toBe(false);
  });

  it("normalizes values to strings", () => {
    expect(toStringValue("revenue")).toBe("revenue");
    expect(toStringValue(42)).toBe("42");
    expect(toStringValue(false)).toBeUndefined();
  });

  it("resolves shape color with fill > stroke > item.color precedence", () => {
    expect(
      getShapeColor({
        color: "#111",
        payload: { fill: "#222", stroke: "#333" },
      })
    ).toBe("#222");
    expect(getShapeColor({ color: "#111", payload: { stroke: "#333" } })).toBe(
      "#333"
    );
    expect(getShapeColor({ color: "#111", payload: {} })).toBe("#111");
    expect(getShapeColor({ payload: {} })).toBeUndefined();
  });

  it("resolves series key candidates from direct item and nested payload", () => {
    expect(resolveSeriesKeyCandidate({ name: "revenue" }, "name")).toBe(
      "revenue"
    );
    expect(
      resolveSeriesKeyCandidate({ payload: { metric: 42 } }, "metric")
    ).toBe("42");
    expect(resolveSeriesKeyCandidate({ payload: {} }, "")).toBeUndefined();
  });

  it("resolves config-aware series keys with dotted and fallback behavior", () => {
    const config: ChartConfig = {
      revenue: { label: "Revenue" },
      total: { label: "Total" },
    };

    expect(
      resolveSeriesKey({
        config,
        item: { dataKey: "scope.revenue" },
      })
    ).toBe("revenue");

    expect(
      resolveSeriesKey({
        config,
        item: { payload: { metric: "scope.total" } },
        nameKey: "metric",
      })
    ).toBe("total");

    expect(
      resolveSeriesKey({
        config,
        item: { payload: { metric: "missing" } },
        nameKey: "metric",
      })
    ).toBe("missing");

    expect(resolveSeriesKey({ config, item: {} })).toBe("value");
  });
});
