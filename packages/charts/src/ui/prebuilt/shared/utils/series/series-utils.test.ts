import { describe, expect, it } from "bun:test";

import { createSeriesHighlightScopeKey } from "./create-series-highlight-scope-key";
import { getFallbackSeriesColor } from "./get-fallback-series-color";
import { resolveCompleteSeriesName } from "./resolve-complete-series-name";
import { resolveDefaultBarRadius } from "./resolve-default-bar-radius";

describe("series utils", () => {
  it("creates a normalized highlight scope key", () => {
    expect(
      createSeriesHighlightScopeKey([
        { name: " Revenue " },
        { key: "TARGET" },
        { key: "", name: "" },
      ])
    ).toBe('["revenue","target","series-3"]');
  });

  it("cycles fallback series colors deterministically", () => {
    expect(getFallbackSeriesColor(0)).toBe("var(--color-chart-1)");
    expect(getFallbackSeriesColor(4)).toBe("var(--color-chart-5)");
    expect(getFallbackSeriesColor(5)).toBe("var(--color-chart-1)");
  });

  it("resolves complete series names from name, key, and fallback", () => {
    expect(resolveCompleteSeriesName({ key: "rev", name: " revenue " })).toBe(
      "revenue"
    );
    expect(resolveCompleteSeriesName({ key: " rev " })).toBe("rev");
    expect(resolveCompleteSeriesName({ key: "", name: "" }, "fallback")).toBe(
      "fallback"
    );
  });

  it("resolves default bar radius by stack state and explicit overrides", () => {
    expect(resolveDefaultBarRadius([{ stackId: undefined }])).toBe(6);
    expect(resolveDefaultBarRadius([{ stackId: "group-1" }])).toBe(0);
    expect(
      resolveDefaultBarRadius([{ stackId: undefined }], undefined, true)
    ).toBe(0);
    expect(
      resolveDefaultBarRadius([{ stackId: "group-1" }], [4, 4, 4, 4])
    ).toEqual([4, 4, 4, 4]);
  });
});
