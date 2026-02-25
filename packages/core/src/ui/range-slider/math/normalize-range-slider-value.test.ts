import { describe, expect, it } from "bun:test";

import { normalizeRangeSliderValue } from "./normalize-range-slider-value";

describe("normalizeRangeSliderValue", () => {
  const marks = [
    { value: 0 },
    { value: 20 },
    { value: 50 },
    { value: 80 },
  ] as const;

  it("enforces minRange by pushing the opposite thumb when pushOnOverlap is true", () => {
    const value = normalizeRangeSliderValue({
      activeThumbIndex: 0,
      current: [30, 50],
      domainMax: 100,
      domainMin: 0,
      max: 100,
      maxRange: Number.POSITIVE_INFINITY,
      min: 0,
      minRange: 20,
      precision: 0,
      pushOnOverlap: true,
      raw: [45, 50],
    });

    expect(value).toEqual([45, 65]);
  });

  it("clamps to a valid minRange pair at the lower boundary when pushOnOverlap is true", () => {
    const value = normalizeRangeSliderValue({
      activeThumbIndex: 1,
      current: [30, 60],
      domainMax: 100,
      domainMin: 0,
      max: 100,
      maxRange: Number.POSITIVE_INFINITY,
      min: 0,
      minRange: 20,
      precision: 0,
      pushOnOverlap: true,
      raw: [30, 5],
    });

    expect(value).toEqual([0, 20]);
  });

  it("clamps to a valid minRange pair at the upper boundary when pushOnOverlap is true", () => {
    const value = normalizeRangeSliderValue({
      activeThumbIndex: 0,
      current: [40, 70],
      domainMax: 100,
      domainMin: 0,
      max: 100,
      maxRange: Number.POSITIVE_INFINITY,
      min: 0,
      minRange: 20,
      precision: 0,
      pushOnOverlap: true,
      raw: [95, 70],
    });

    expect(value).toEqual([80, 100]);
  });

  it("enforces minRange by preventing overlap when pushOnOverlap is false", () => {
    const value = normalizeRangeSliderValue({
      activeThumbIndex: 0,
      current: [30, 50],
      domainMax: 100,
      domainMin: 0,
      max: 100,
      maxRange: Number.POSITIVE_INFINITY,
      min: 0,
      minRange: 20,
      precision: 0,
      pushOnOverlap: false,
      raw: [45, 50],
    });

    expect(value).toEqual([30, 50]);
  });

  it("enforces maxRange by pushing the opposite thumb when pushOnOverlap is true", () => {
    const value = normalizeRangeSliderValue({
      activeThumbIndex: 1,
      current: [10, 30],
      domainMax: 100,
      domainMin: 0,
      max: 100,
      maxRange: 15,
      min: 0,
      minRange: 0,
      precision: 0,
      pushOnOverlap: true,
      raw: [10, 40],
    });

    expect(value).toEqual([25, 40]);
  });

  it("enforces maxRange by keeping current thumb when pushOnOverlap is false", () => {
    const value = normalizeRangeSliderValue({
      activeThumbIndex: 1,
      current: [10, 30],
      domainMax: 100,
      domainMin: 0,
      max: 100,
      maxRange: 15,
      min: 0,
      minRange: 0,
      precision: 0,
      pushOnOverlap: false,
      raw: [10, 40],
    });

    expect(value).toEqual([10, 30]);
  });

  it("rounds and clamps to slider min and max after domain projection", () => {
    const value = normalizeRangeSliderValue({
      activeThumbIndex: 1,
      current: [25, 75],
      domainMax: 200,
      domainMin: -100,
      max: 80,
      maxRange: Number.POSITIVE_INFINITY,
      min: 20,
      minRange: 0,
      precision: 2,
      pushOnOverlap: true,
      raw: [19.994, 80.336],
    });

    expect(value).toEqual([20, 80]);
  });

  it("moves active thumb to next and previous marks for keyboard-like reasons", () => {
    const nextValue = normalizeRangeSliderValue({
      activeThumbIndex: 0,
      current: [20, 80],
      domainMax: 100,
      domainMin: 0,
      marks,
      max: 100,
      maxRange: Number.POSITIVE_INFINITY,
      min: 0,
      minRange: 0,
      precision: 0,
      pushOnOverlap: true,
      raw: [21, 80],
      reason: "keyboard",
      restrictToMarks: true,
    });

    const previousValue = normalizeRangeSliderValue({
      activeThumbIndex: 1,
      current: [20, 80],
      domainMax: 100,
      domainMin: 0,
      marks,
      max: 100,
      maxRange: Number.POSITIVE_INFINITY,
      min: 0,
      minRange: 0,
      precision: 0,
      pushOnOverlap: true,
      raw: [20, 79],
      reason: "input-change",
      restrictToMarks: true,
    });

    expect(nextValue).toEqual([50, 80]);
    expect(previousValue).toEqual([20, 50]);
  });

  it("snaps to nearest marks for pointer-like reasons and keeps thumbs distinct", () => {
    const snappedValue = normalizeRangeSliderValue({
      activeThumbIndex: 0,
      current: [20, 80],
      domainMax: 100,
      domainMin: 0,
      marks,
      max: 100,
      maxRange: Number.POSITIVE_INFINITY,
      min: 0,
      minRange: 0,
      precision: 0,
      pushOnOverlap: true,
      raw: [54, 80],
      restrictToMarks: true,
    });

    const collidedOnLastMark = normalizeRangeSliderValue({
      activeThumbIndex: 0,
      current: [20, 80],
      domainMax: 100,
      domainMin: 0,
      marks,
      max: 100,
      maxRange: Number.POSITIVE_INFINITY,
      min: 0,
      minRange: 0,
      precision: 0,
      pushOnOverlap: true,
      raw: [79, 80],
      restrictToMarks: true,
    });

    expect(snappedValue).toEqual([50, 80]);
    expect(collidedOnLastMark).toEqual([20, 80]);
  });
});
