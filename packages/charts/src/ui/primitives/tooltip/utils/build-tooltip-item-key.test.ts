import { describe, expect, it } from "bun:test";

import { buildTooltipItemKey } from "./build-tooltip-item-key";

describe("buildTooltipItemKey", () => {
  it("creates stable keys from series key, name, and value", () => {
    const key = buildTooltipItemKey({
      itemName: "Revenue",
      itemValue: 1200,
      seriesKey: "revenue",
    });

    expect(key).toBe("revenue-Revenue-1200");
  });

  it("uses name and value fallbacks when missing", () => {
    const key = buildTooltipItemKey({
      itemName: undefined,
      itemValue: undefined,
      seriesKey: "visits",
    });

    expect(key).toBe("visits-name-value");
  });
});
