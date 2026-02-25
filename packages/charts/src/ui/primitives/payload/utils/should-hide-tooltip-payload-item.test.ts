import { describe, expect, it } from "bun:test";

import { shouldHideTooltipPayloadItem } from "./should-hide-tooltip-payload-item";

describe("shouldHideTooltipPayloadItem", () => {
  it("hides rows when payload type is none", () => {
    expect(shouldHideTooltipPayloadItem({ type: "none" })).toBe(true);
  });

  it("hides rows when payload fill is none and an explicit color exists", () => {
    expect(
      shouldHideTooltipPayloadItem({
        color: "var(--color-chart-1)",
        payload: { fill: "none" },
        type: "line",
      })
    ).toBe(true);
  });

  it("keeps rows when payload fill is none but color is not explicit", () => {
    expect(
      shouldHideTooltipPayloadItem({
        payload: { fill: "none" },
        type: "line",
      })
    ).toBe(false);
  });
});
