import { afterEach, beforeEach, describe, expect, it, vi } from "bun:test";

import { act, renderHook } from "@testing-library/react";

import { useDebouncedState } from "./use-debounced-state";

describe("use-debounced-state", () => {
  let originalWindowSetTimeout: typeof window.setTimeout;
  let originalWindowClearTimeout: typeof window.clearTimeout;
  let setTimeoutSpy: ReturnType<typeof vi.spyOn<typeof window, "setTimeout">>;
  let clearTimeoutSpy: ReturnType<
    typeof vi.spyOn<typeof window, "clearTimeout">
  >;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    originalWindowSetTimeout = window.setTimeout;
    originalWindowClearTimeout = window.clearTimeout;
    window.setTimeout = setTimeout;
    window.clearTimeout = clearTimeout;
    setTimeoutSpy = vi.spyOn(window, "setTimeout");
    clearTimeoutSpy = vi.spyOn(window, "clearTimeout");
  });

  afterEach(() => {
    window.setTimeout = originalWindowSetTimeout;
    window.clearTimeout = originalWindowClearTimeout;
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("should run without errors", () => {
    expect(clearTimeoutSpy).not.toHaveBeenCalled();
    renderHook(() => useDebouncedState("asdf1", 100));
    renderHook(() => useDebouncedState("asdf1", 100, { leading: false }));
    renderHook(() => useDebouncedState("asdf1", 100, { leading: true }));
  });

  it("should debounce value with leading=false", () => {
    expect(setTimeoutSpy).not.toHaveBeenCalled();
    expect(clearTimeoutSpy).not.toHaveBeenCalled();

    const hook = renderHook(() => useDebouncedState("test1", 100));
    expect(hook.result.current[0]).toBe("test1");

    act(() => hook.result.current[1]("test2"));
    expect(hook.result.current[0]).toBe("test1");

    act(() => hook.result.current[1]("test3"));
    expect(hook.result.current[0]).toBe("test1");

    act(() => vi.advanceTimersByTime(100));
    expect(hook.result.current[0]).toBe("test3");

    act(() => hook.result.current[1]((prev) => `${prev}0`));
    expect(hook.result.current[0]).toBe("test3");

    act(() => vi.advanceTimersByTime(100));
    expect(hook.result.current[0]).toBe("test30");

    act(() => hook.unmount());
    expect(hook.result.current[0]).toBe("test30");
  });

  it("should debounce value with leading=true", () => {
    expect(setTimeoutSpy).not.toHaveBeenCalled();
    expect(clearTimeoutSpy).not.toHaveBeenCalled();

    const hook = renderHook(() =>
      useDebouncedState("test1", 100, { leading: true })
    );
    expect(hook.result.current[0]).toBe("test1");

    act(() => hook.result.current[1]("test2"));
    expect(hook.result.current[0]).toBe("test2");

    act(() => hook.result.current[1]("test3"));
    expect(hook.result.current[0]).toBe("test2");

    act(() => vi.advanceTimersByTime(100));
    expect(hook.result.current[0]).toBe("test3");

    act(() => hook.unmount());
    expect(hook.result.current[0]).toBe("test3");
  });
});
