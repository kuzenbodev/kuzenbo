import { describe, expect, it } from "bun:test";

import { normalizeSingleSliderValue } from "./normalize-single-slider-value";

describe("normalizeSingleSliderValue", () => {
  it("clamps projected domain values to min and max", () => {
    const value = normalizeSingleSliderValue({
      current: 40,
      domainMax: 200,
      domainMin: 0,
      max: 80,
      min: 20,
      precision: 0,
      raw: 120,
    });

    expect(value).toBe(80);
  });

  it("rounds to provided precision", () => {
    const value = normalizeSingleSliderValue({
      current: 30,
      domainMax: 100,
      domainMin: 0,
      max: 100,
      min: 0,
      precision: 2,
      raw: 33.336,
    });

    expect(value).toBe(33.34);
  });

  it("moves to next and previous marks on keyboard reasons when restricted", () => {
    const marks = [
      { value: 0 },
      { value: 20 },
      { value: 50 },
      { value: 100 },
    ] as const;

    const next = normalizeSingleSliderValue({
      current: 20,
      domainMax: 100,
      domainMin: 0,
      marks,
      max: 100,
      min: 0,
      precision: 0,
      raw: 21,
      reason: "keyboard",
      restrictToMarks: true,
    });

    const previous = normalizeSingleSliderValue({
      current: 50,
      domainMax: 100,
      domainMin: 0,
      marks,
      max: 100,
      min: 0,
      precision: 0,
      raw: 49,
      reason: "keyboard",
      restrictToMarks: true,
    });

    expect(next).toBe(50);
    expect(previous).toBe(20);
  });

  it("snaps to nearest mark for pointer-like reasons when restricted", () => {
    const value = normalizeSingleSliderValue({
      current: 20,
      domainMax: 100,
      domainMin: 0,
      marks: [{ value: 0 }, { value: 20 }, { value: 50 }],
      max: 100,
      min: 0,
      precision: 0,
      raw: 36,
      reason: "pointer",
      restrictToMarks: true,
    });

    expect(value).toBe(50);
  });
});
