import { describe, expect, it } from "bun:test";

import { createPercentTickFormatter } from "./create-percent-tick-formatter";
import { formatNumericValue } from "./format-numeric-value";
import { formatPercentValue } from "./format-percent-value";

const customPercentFormatter = (value: number) => `pct:${value}`;

describe("format utils", () => {
  it("uses provided percent formatter when available", () => {
    expect(createPercentTickFormatter(customPercentFormatter)).toBe(
      customPercentFormatter
    );
  });

  it("falls back to default percent formatting", () => {
    const formatter = createPercentTickFormatter();

    expect(formatter(0.25)).toBe("25%");
    expect(formatter(0.125)).toBe("13%");
  });

  it("formats numeric values with and without units", () => {
    expect(formatNumericValue(1200, "")).toBe("1,200");
    expect(formatNumericValue(1200, "USD")).toBe("1,200 USD");
  });

  it("formats percent values by multiplying by 100", () => {
    expect(formatPercentValue(0)).toBe("0%");
    expect(formatPercentValue(0.5)).toBe("50%");
    expect(formatPercentValue(1.27)).toBe("127%");
  });
});
