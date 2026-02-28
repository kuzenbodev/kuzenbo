import { afterEach, beforeEach, describe, expect, it, vi } from "bun:test";

import { act, renderHook } from "@testing-library/react";

import { useIdle } from "./use-idle";

describe("@kuzenbo/hooks/use-idle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("correct initial return value", () => {
    const hook = renderHook(() => useIdle(1000));
    expect(hook.result.current).toBeTruthy();
  });

  it("starts the timer immediately instead of waiting for the first event to happen", () => {
    const spy = vi.spyOn(window, "setTimeout");
    expect(spy).not.toHaveBeenCalled();

    const hook = renderHook(() =>
      useIdle(1000, { initialState: false, events: ["click", "keydown"] })
    );

    expect(hook.result.current).toBeFalsy();
    expect(spy).toHaveBeenCalledTimes(1);
    act(() => {
      vi.advanceTimersByTime(1001);
    });
    expect(hook.result.current).toBeTruthy();
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("returns correct value on firing keydown event", () => {
    const hook = renderHook(() => useIdle(1000));

    expect(hook.result.current).toBeTruthy();
    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown"));
    });

    expect(hook.result.current).toBeFalsy();
    act(() => {
      vi.advanceTimersByTime(1001);
    });
    expect(hook.result.current).toBeTruthy();
  });

  it("correct return value on mouse events", () => {
    const hook = renderHook(() => useIdle(1000));

    expect(hook.result.current).toBeTruthy();
    act(() => {
      document.dispatchEvent(new MouseEvent("mousemove"));
    });

    expect(hook.result.current).toBeFalsy();
    act(() => {
      vi.advanceTimersByTime(1001);
    });
    expect(hook.result.current).toBeTruthy();
  });

  it("correct return value on touch events", () => {
    const hook = renderHook(() => useIdle(1000));
    expect(hook.result.current).toBeTruthy();

    act(() => {
      document.dispatchEvent(new MouseEvent("touchmove"));
    });
    expect(hook.result.current).toBeFalsy();

    act(() => {
      vi.advanceTimersByTime(1001);
    });
    expect(hook.result.current).toBeTruthy();
  });

  it("correct return value on multiple consecutive events", () => {
    const hook = renderHook(() => useIdle(1000));
    expect(hook.result.current).toBeTruthy();

    act(() => {
      document.dispatchEvent(new TouchEvent("touchmove"));
    });
    expect(hook.result.current).toBeFalsy();

    act(() => {
      vi.advanceTimersByTime(1001);
    });
    expect(hook.result.current).toBeTruthy();
    act(() => {
      document.dispatchEvent(new MouseEvent("mousemove"));
    });
    expect(hook.result.current).toBeFalsy();

    act(() => {
      vi.advanceTimersByTime(1001);
    });
    expect(hook.result.current).toBeTruthy();
  });
});
