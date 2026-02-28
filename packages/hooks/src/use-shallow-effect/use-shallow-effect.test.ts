import { beforeEach, describe, expect, it, vi } from "bun:test";

import { renderHook } from "@testing-library/react";

import { useShallowEffect } from "./use-shallow-effect";

describe("@kuzenbo/hooks/use-shallow-effect", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("is called on initial render", () => {
    const spy = vi.fn();
    renderHook(() => useShallowEffect(spy, []));
    expect(spy).toHaveBeenCalledWith();
  });

  it("is called without dependencies", () => {
    const spy = vi.fn();
    const hook = renderHook(() => useShallowEffect(spy));
    expect(spy).toHaveBeenCalledWith();

    hook.rerender();
    hook.rerender();
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it("is called with an empty dependency array", () => {
    const spy = vi.fn();
    const hook = renderHook(() => useShallowEffect(spy, []));
    expect(spy).toHaveBeenCalledWith();
    hook.rerender();
    hook.rerender();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("is called with a non-empty dependency array on rerenders", () => {
    const spy = vi.fn();
    const hook = renderHook(({ cb, deps }) => useShallowEffect(cb, deps), {
      initialProps: { cb: spy, deps: [{ a: 1 }] },
    });
    expect(spy).toHaveBeenCalledWith();

    hook.rerender({ cb: spy, deps: [{ a: 1 }] });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("is called with the same object on rerenders", () => {
    const spy = vi.fn();
    const hook = renderHook(({ cb, deps }) => useShallowEffect(cb, deps), {
      initialProps: { cb: spy, deps: [{ a: 1 }] },
    });
    expect(spy).toHaveBeenCalledWith();

    hook.rerender({ cb: spy, deps: [{ a: 1 }] });
    hook.rerender({ cb: spy, deps: [{ a: 1 }] });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
