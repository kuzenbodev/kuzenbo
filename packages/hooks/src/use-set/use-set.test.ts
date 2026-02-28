import { describe, expect, it } from "bun:test";

import { act, renderHook } from "@testing-library/react";

import { useSet } from "./use-set";

describe("@kuzenbo/hooks/use-set", () => {
  it("has correct initial state", () => {
    const hook = renderHook(() => useSet([1, 2]));
    expect(hook.result.current.has(1)).toBeTruthy();
    expect(hook.result.current.has(2)).toBeTruthy();
  });

  it("adds values", () => {
    const hook = renderHook(() => useSet());
    act(() => hook.result.current.add(1));
    act(() => hook.result.current.add(2));
    expect(hook.result.current.has(1)).toBeTruthy();
    expect(hook.result.current.has(2)).toBeTruthy();
  });

  it("deletes values", () => {
    const hook = renderHook(() => useSet([1, 2]));
    act(() => hook.result.current.delete(1));
    expect(hook.result.current.has(1)).toBeFalsy();
    expect(hook.result.current.has(2)).toBeTruthy();
  });

  it("clears set", () => {
    const hook = renderHook(() => useSet([1, 2]));
    act(() => hook.result.current.clear());
    expect(hook.result.current.has(1)).toBeFalsy();
    expect(hook.result.current.has(2)).toBeFalsy();
  });

  it("unions with another set and does not mutate the original set", () => {
    const hook = renderHook(() => useSet([1, 2]));
    const otherSet = new Set([2, 3, 4]);
    const unionResult = hook.result.current.union(otherSet);

    expect(unionResult.has(1)).toBeTruthy();
    expect(unionResult.has(2)).toBeTruthy();
    expect(unionResult.has(3)).toBeTruthy();
    expect(unionResult.has(4)).toBeTruthy();
    expect(unionResult.size).toBe(4);
  });

  it("intersects with another set and does not mutate the original set", () => {
    const hook = renderHook(() => useSet([1, 2, 3]));
    const otherSet = new Set([2, 3, 4, 5]);
    const intersectionResult = hook.result.current.intersection(otherSet);

    expect(intersectionResult.has(1)).toBeFalsy();
    expect(intersectionResult.has(2)).toBeTruthy();
    expect(intersectionResult.has(3)).toBeTruthy();
    expect(intersectionResult.has(4)).toBeFalsy();
    expect(intersectionResult.has(5)).toBeFalsy();
    expect(intersectionResult.size).toBe(2);

    expect(hook.result.current.has(1)).toBeTruthy();
    expect(hook.result.current.has(2)).toBeTruthy();
    expect(hook.result.current.has(3)).toBeTruthy();
    expect(hook.result.current.size).toBe(3);
  });

  it("finds difference with another set", () => {
    const hook = renderHook(() => useSet([1, 2, 3, 4]));
    const otherSet = new Set([3, 4, 5, 6]);
    const differenceResult = hook.result.current.difference(otherSet);

    expect(differenceResult.has(1)).toBeTruthy();
    expect(differenceResult.has(2)).toBeTruthy();
    expect(differenceResult.has(3)).toBeFalsy();
    expect(differenceResult.has(4)).toBeFalsy();
    expect(differenceResult.size).toBe(2);
  });

  it("finds symmetric difference with another set", () => {
    const hook = renderHook(() => useSet([1, 2, 3]));
    const otherSet = new Set([3, 4, 5]);
    const symmetricDifferenceResult =
      hook.result.current.symmetricDifference(otherSet);

    expect(symmetricDifferenceResult.has(1)).toBeTruthy();
    expect(symmetricDifferenceResult.has(2)).toBeTruthy();
    expect(symmetricDifferenceResult.has(3)).toBeFalsy();
    expect(symmetricDifferenceResult.has(4)).toBeTruthy();
    expect(symmetricDifferenceResult.has(5)).toBeTruthy();
    expect(symmetricDifferenceResult.size).toBe(4);
  });
});
