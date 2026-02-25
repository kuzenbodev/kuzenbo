import { describe, expect, it } from "bun:test";

import { createDefaultSparklineGradientStops } from "./default-sparkline-gradient-stops";
import { resolveSparklineTrendDirection } from "./resolve-sparkline-trend-direction";

describe("sparkline utils", () => {
  it("creates default gradient stops from a single color", () => {
    expect(createDefaultSparklineGradientStops("#123456")).toEqual([
      { color: "#123456", offset: 0, opacity: 0.4 },
      { color: "#123456", offset: 100, opacity: 0.05 },
    ]);
  });

  it("resolves trend direction while skipping invalid values", () => {
    expect(
      resolveSparklineTrendDirection({
        data: [{ value: "bad" }, { value: 2 }, { value: 5 }],
        valueKey: "value",
      })
    ).toBe("up");

    expect(
      resolveSparklineTrendDirection({
        data: [{ value: 9 }, { value: 3 }],
        valueKey: "value",
      })
    ).toBe("down");

    expect(
      resolveSparklineTrendDirection({
        data: [{ value: 4 }, { value: 4 }],
        valueKey: "value",
      })
    ).toBe("flat");

    expect(
      resolveSparklineTrendDirection({
        data: [{ value: "bad" }, { value: null }],
        valueKey: "value",
      })
    ).toBe("flat");
  });
});
