import {
  afterEach,
  beforeEach,
  describe,
  expect,
  expectTypeOf,
  it,
  vi,
} from "bun:test";

import { act, renderHook } from "@testing-library/react";

import { useTimeout } from "./use-timeout";

const defaultTimeout = 2000;

const callback = vi.fn();
let setTimeoutSpy: ReturnType<typeof vi.spyOn<typeof window, "setTimeout">>;
let clearTimeoutSpy: ReturnType<typeof vi.spyOn<typeof window, "clearTimeout">>;
let originalWindowSetTimeout: typeof window.setTimeout;
let originalWindowClearTimeout: typeof window.clearTimeout;

const setupTimer = (timeout: number = defaultTimeout) => ({
  timeout,
  advanceTimerToNextTick: () => vi.advanceTimersByTime(timeout),
});

describe("@kuzenbo/hooks/use-timeout", () => {
  beforeEach(() => {
    vi.useFakeTimers();

    originalWindowSetTimeout = window.setTimeout;
    originalWindowClearTimeout = window.clearTimeout;

    // Ensure the hook's `window.*` timers route through Bun fake timers.
    window.setTimeout = setTimeout;
    window.clearTimeout = clearTimeout;

    setTimeoutSpy = vi.spyOn(window, "setTimeout");
    clearTimeoutSpy = vi.spyOn(window, "clearTimeout");
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
    vi.useRealTimers();

    window.setTimeout = originalWindowSetTimeout;
    window.clearTimeout = originalWindowClearTimeout;
  });

  it("initialize", () => {
    const hook = renderHook(() =>
      useTimeout(callback, defaultTimeout, { autoInvoke: false })
    );
    const { start, clear } = hook.result.current;

    expectTypeOf(start).toBeFunction();
    expectTypeOf(clear).toBeFunction();
  });

  it("callback should NOT fire before calling start function, if autoInvoke is false", () => {
    const { timeout, advanceTimerToNextTick } = setupTimer();
    renderHook(() => useTimeout(callback, timeout, { autoInvoke: false }));

    advanceTimerToNextTick();

    expect(callback).not.toHaveBeenCalled();
    expect(setTimeoutSpy).not.toHaveBeenCalled();
    expect(clearTimeoutSpy).not.toHaveBeenCalled();
  });

  it("callback should fire after calling start function, if autoInvoke is false", () => {
    const { timeout, advanceTimerToNextTick } = setupTimer();
    const hook = renderHook(() =>
      useTimeout(callback, timeout, { autoInvoke: false })
    );

    act(() => {
      hook.result.current.start();
    });

    advanceTimerToNextTick();

    expect(callback).toHaveBeenCalledWith();
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), timeout);
  });

  it("callback should fire without calling start when autoInvoke is true", () => {
    const { timeout, advanceTimerToNextTick } = setupTimer();
    renderHook(() => useTimeout(callback, timeout, { autoInvoke: true }));

    advanceTimerToNextTick();

    expect(callback).toHaveBeenCalledWith();
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), timeout);
  });

  it("callback should be called when rerender is triggered before timeout", () => {
    const { timeout, advanceTimerToNextTick } = setupTimer();
    const { rerender, result } = renderHook(() =>
      useTimeout(callback, timeout)
    );

    result.current.start();

    rerender();

    advanceTimerToNextTick();

    expect(callback).toHaveBeenCalledWith();
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), timeout);
  });

  it("timeout is cleared on calling clear", () => {
    const { timeout, advanceTimerToNextTick } = setupTimer(10);
    const hook = renderHook(() =>
      useTimeout(callback, timeout, { autoInvoke: false })
    );

    act(() => {
      hook.result.current.start();
    });

    act(() => {
      hook.result.current.clear();
    });

    advanceTimerToNextTick();

    expect(callback).not.toHaveBeenCalled();
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), timeout);
    expect(clearTimeoutSpy).toHaveBeenCalledWith(expect.anything());
  });

  it("start function passes parameters to callback", () => {
    const { timeout, advanceTimerToNextTick } = setupTimer(10);
    const hook = renderHook(() => useTimeout(callback, timeout));

    const MOCK_CALLBACK_VALUE = "MOCK_CALLBACK_VALUE";
    act(() => {
      hook.result.current.start(MOCK_CALLBACK_VALUE);
    });

    advanceTimerToNextTick();

    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), timeout);
    expect(callback).toHaveBeenCalledWith(MOCK_CALLBACK_VALUE);
  });
});
