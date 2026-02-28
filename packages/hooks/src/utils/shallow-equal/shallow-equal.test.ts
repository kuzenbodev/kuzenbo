import { describe, expect, it } from "bun:test";

import { shallowEqual } from "./shallow-equal";

describe("@kuzenbo/hooks/shallow-equal", () => {
  it("correctly compares primitive types", () => {
    expect(shallowEqual(1, 1)).toBeTruthy();
    expect(shallowEqual(-1.0001, -1.0001)).toBeTruthy();
    expect(shallowEqual("test", "test")).toBeTruthy();
    expect(shallowEqual(1, 2)).toBeFalsy();
    expect(shallowEqual()).toBeTruthy();
    expect(shallowEqual(null, null)).toBeTruthy();
  });

  it("correctly compares object and array type", () => {
    const object = { a: 1, b: 2, c: { a: 1 } };
    const list = [1, 2, 3];
    const test = { a: 1 };
    expect(shallowEqual([1, 2, 3], [1, 2, 3])).toBeTruthy();
    expect(shallowEqual([1, 2, 3], list)).toBeTruthy();
    expect(shallowEqual([1, 2, 3, test], [1, 2, 3, test])).toBeTruthy();
    expect(shallowEqual([1, 2, 3, test], [...list, test])).toBeTruthy();
    expect(shallowEqual([1, 2, 3, test], [1, 2, 3, { a: 1 }])).toBeFalsy();
    expect(shallowEqual([1, 2, 3, 4], list)).toBeFalsy();
    expect(shallowEqual(object, object)).toBeTruthy();
    expect(shallowEqual(object, { a: 1, b: 2, c: { a: 1 } })).toBeFalsy();
  });
});
