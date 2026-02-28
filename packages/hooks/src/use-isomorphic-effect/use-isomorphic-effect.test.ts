import { describe, expect, it } from "bun:test";

import { useEffect, useLayoutEffect } from "react";

import { useIsomorphicEffect } from "./use-isomorphic-effect";

describe("useIsomorphicEffect", () => {
  it("resolves to useLayoutEffect in a browser environment", () => {
    expect(typeof document).not.toBe("undefined");
    expect(useIsomorphicEffect).toBe(useLayoutEffect);
  });

  it("is a function with the same signature as useEffect", () => {
    expect(typeof useIsomorphicEffect).toBe("function");
    expect(useIsomorphicEffect.length).toBe(useEffect.length);
  });
});
