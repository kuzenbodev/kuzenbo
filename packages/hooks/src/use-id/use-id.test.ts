import { describe, expect, expectTypeOf, it } from "bun:test";

import { renderHook } from "@testing-library/react";

import { useId } from "./use-id";

describe("use-id", () => {
  it("returns static id", () => {
    const view = renderHook(() => useId("test-id"));
    expect(view.result.current).toBe("test-id");
  });

  it("returns random id if static id is not provided", () => {
    const view = renderHook(() => useId());
    expectTypeOf(view.result.current).toBeString();
    expect(view.result.current).toContain("mantine");
    expect(
      view.result.current !== renderHook(() => useId()).result.current
    ).toBeTruthy();
  });
});
