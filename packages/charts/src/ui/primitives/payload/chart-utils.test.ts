import { describe, expect, it } from "bun:test";

import type { ChartConfig } from "../types/chart-types";

import { getPayloadConfigFromPayload } from "./chart-utils";

describe("chart-utils", () => {
  const config: ChartConfig = {
    "42": { label: "Answer" },
    revenue: { label: "Revenue" },
    total: { label: "Total" },
  };

  it("returns undefined when payload is not an object", () => {
    expect(getPayloadConfigFromPayload(config, null, "metric")).toBeUndefined();
    expect(
      getPayloadConfigFromPayload(config, "invalid", "metric")
    ).toBeUndefined();
  });

  it("resolves config entry from direct payload key values", () => {
    expect(
      getPayloadConfigFromPayload(config, { metric: 42 }, "metric")
    ).toEqual(config["42"]);
  });

  it("resolves config entry from nested payload values", () => {
    expect(
      getPayloadConfigFromPayload(
        config,
        {
          payload: {
            metric: "scope.total",
          },
        },
        "metric"
      )
    ).toEqual(config.total);
  });

  it("falls back to dotted key resolution and direct key lookup", () => {
    expect(getPayloadConfigFromPayload(config, {}, "scope.revenue")).toEqual(
      config.revenue
    );
    expect(getPayloadConfigFromPayload(config, {}, "total")).toEqual(
      config.total
    );
  });
});
