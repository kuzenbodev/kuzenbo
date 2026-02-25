import { describe, expect, it } from "bun:test";

import { createPointLabelFormatter } from "./create-point-label-formatter";
import { toRenderableLabelValue } from "./to-renderable-label-value";

describe("composite utils", () => {
  it("uses valueFormatter for numeric point labels", () => {
    const formatter = createPointLabelFormatter<{ campaign: string }>(
      (value, seriesKey) => `${seriesKey}:${value}`,
      "cost"
    );

    expect(formatter(33, { campaign: "spring" })).toBe("cost:33");
  });

  it("falls back to renderable label conversion for non-numeric values", () => {
    const formatter = createPointLabelFormatter<{ campaign: string }>(
      (value) => `${value}`,
      "cost"
    );

    expect(formatter("33", { campaign: "spring" })).toBe("33");
    expect(formatter(false, { campaign: "spring" })).toBe("false");
  });

  it("converts unknown values into renderable labels", () => {
    expect(toRenderableLabelValue(5)).toBe(5);
    expect(toRenderableLabelValue("five")).toBe("five");
    expect(toRenderableLabelValue({ value: 5 })).toBe("[object Object]");
  });
});
