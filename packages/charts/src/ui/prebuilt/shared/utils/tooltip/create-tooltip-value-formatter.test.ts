import { describe, expect, it } from "bun:test";

import { createTooltipValueFormatter } from "./create-tooltip-value-formatter";

const delegatingFormatter = (
  value: number,
  seriesKey: string,
  datum: { id: string }
) => `${datum.id}:${seriesKey}:${value}`;

describe("createTooltipValueFormatter", () => {
  it("returns undefined when no formatter is provided", () => {
    expect(createTooltipValueFormatter()).toBeUndefined();
  });

  it("returns a wrapper that delegates to the provided formatter", () => {
    const wrapped = createTooltipValueFormatter(delegatingFormatter);

    expect(wrapped).toBeDefined();
    expect(wrapped?.(12, "revenue", { id: "row" })).toBe("row:revenue:12");
  });
});
