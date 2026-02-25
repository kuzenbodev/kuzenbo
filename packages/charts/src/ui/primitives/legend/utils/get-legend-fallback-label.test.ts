import { describe, expect, it } from "bun:test";

import { getLegendFallbackLabel } from "./get-legend-fallback-label";

describe("getLegendFallbackLabel", () => {
  it("uses payload value when it is a string or number", () => {
    expect(
      getLegendFallbackLabel({
        dataKey: "visits",
        value: "Visits",
      })
    ).toBe("Visits");

    expect(
      getLegendFallbackLabel({
        dataKey: "revenue",
        value: 42,
      })
    ).toBe(42);
  });

  it("falls back to dataKey when payload value is missing", () => {
    expect(
      getLegendFallbackLabel({
        dataKey: "pipeline",
        value: undefined,
      })
    ).toBe("pipeline");
  });

  it("falls back to Value when both payload value and dataKey are unavailable", () => {
    expect(
      getLegendFallbackLabel({
        dataKey: undefined,
        value: undefined,
      })
    ).toBe("Value");
  });
});
