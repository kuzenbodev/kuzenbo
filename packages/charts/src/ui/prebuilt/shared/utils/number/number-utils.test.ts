import { describe, expect, it } from "bun:test";

import { toNumber } from "./to-number";
import { toNumericValue } from "./to-numeric-value";

describe("number utils", () => {
  it("parses finite number-like values", () => {
    expect(toNumber(12)).toBe(12);
    expect(toNumber("12.5")).toBe(12.5);
    expect(toNumber(" 8 ")).toBe(8);
  });

  it("returns undefined for non-finite or unsupported values", () => {
    expect(toNumber(Number.NaN)).toBeUndefined();
    expect(toNumber(Number.POSITIVE_INFINITY)).toBeUndefined();
    expect(toNumber("not-a-number")).toBeUndefined();
    expect(toNumber({ value: 1 })).toBeUndefined();
  });

  it("resolves numeric values directly", () => {
    expect(toNumericValue(4)).toBe(4);
    expect(toNumericValue("6")).toBe(6);
    expect(toNumericValue("invalid")).toBeUndefined();
  });

  it("supports range subtraction only when allowRange is enabled", () => {
    expect(toNumericValue([2, 7], { allowRange: true })).toBe(5);
    expect(toNumericValue(["3", "10"], { allowRange: true })).toBe(7);
    expect(toNumericValue([2, 7], { allowRange: false })).toBeUndefined();
    expect(toNumericValue([2, "bad"], { allowRange: true })).toBeUndefined();
    expect(toNumericValue([5], { allowRange: true })).toBeUndefined();
  });
});
