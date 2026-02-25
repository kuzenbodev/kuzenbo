import { describe, expect, it } from "bun:test";

import { shouldHideLegendPayloadItem } from "./should-hide-legend-payload-item";

describe("shouldHideLegendPayloadItem", () => {
  it("hides rows when payload type is none", () => {
    expect(shouldHideLegendPayloadItem({ type: "none" })).toBe(true);
  });

  it("hides rows when payload color is none", () => {
    expect(shouldHideLegendPayloadItem({ color: "none", type: "line" })).toBe(
      true
    );
  });

  it("keeps rows for visible series payload", () => {
    expect(
      shouldHideLegendPayloadItem({
        color: "var(--color-chart-1)",
        type: "line",
      })
    ).toBe(false);
  });
});
