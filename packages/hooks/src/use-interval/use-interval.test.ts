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

import { useInterval } from "./use-interval";

const defaultTimeout = 2000;

const callback = vi.fn();
let setIntervalSpy: ReturnType<
  typeof vi.spyOn<typeof globalThis, "setInterval">
>;
let clearIntervalSpy: ReturnType<
  typeof vi.spyOn<typeof globalThis, "clearInterval">
>;

const setupTimer = (timeout: number = defaultTimeout) => ({
  timeout,
  advanceTimerToNextTick: () => vi.advanceTimersByTime(timeout),
});

const setupHook = (
  cb: (...args: unknown[]) => void = callback,
  timeout: number = defaultTimeout
) => renderHook(() => useInterval(cb, timeout));

describe("@kuzenbo/hooks/use-interval", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    setIntervalSpy = vi.spyOn(globalThis, "setInterval");
    clearIntervalSpy = vi.spyOn(globalThis, "clearInterval");
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("initialize", () => {
    const { result } = setupHook();
    const { start, stop, toggle, active } = result.current;

    expectTypeOf(active).toBeBoolean();
    expectTypeOf(start).toBeFunction();
    expectTypeOf(stop).toBeFunction();
    expectTypeOf(toggle).toBeFunction();
  });

  it("should run after timeout exceeded", () => {
    const { advanceTimerToNextTick } = setupTimer();
    const { result } = setupHook();

    advanceTimerToNextTick();
    expect(callback).not.toHaveBeenCalled();
    expect(result.current.active).toBeFalsy();

    act(() => {
      result.current.start();
    });

    expect(setIntervalSpy).toHaveBeenCalledWith(
      expect.any(Function),
      defaultTimeout
    );

    expect(result.current.active).toBeTruthy();

    advanceTimerToNextTick();
    expect(callback).toHaveBeenCalledTimes(1);

    advanceTimerToNextTick();
    expect(callback).toHaveBeenCalledTimes(2);

    advanceTimerToNextTick();
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it("should stop after stop fn call", () => {
    const { advanceTimerToNextTick } = setupTimer();

    const { result } = setupHook();

    advanceTimerToNextTick();
    expect(callback).not.toHaveBeenCalled();
    expect(result.current.active).toBeFalsy();

    act(() => {
      result.current.start();
    });
    expect(setIntervalSpy).toHaveBeenCalledWith(
      expect.any(Function),
      defaultTimeout
    );

    advanceTimerToNextTick();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(result.current.active).toBeTruthy();

    act(() => {
      result.current.stop();
    });

    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);

    expect(result.current.active).toBeFalsy();

    advanceTimerToNextTick();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should toggle between active states", () => {
    const { advanceTimerToNextTick } = setupTimer();

    const { result } = setupHook();
    advanceTimerToNextTick();
    expect(callback).not.toHaveBeenCalled();
    expect(result.current.active).toBeFalsy();

    act(() => {
      result.current.toggle();
    });
    expect(setIntervalSpy).toHaveBeenCalledWith(
      expect.any(Function),
      defaultTimeout
    );

    advanceTimerToNextTick();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(result.current.active).toBeTruthy();

    act(() => {
      result.current.toggle();
    });

    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);

    expect(result.current.active).toBeFalsy();

    advanceTimerToNextTick();
    expect(callback).toHaveBeenCalledTimes(1);

    advanceTimerToNextTick();
    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.toggle();
    });

    expect(setIntervalSpy).toHaveBeenCalledWith(
      expect.any(Function),
      defaultTimeout
    );

    advanceTimerToNextTick();
    expect(callback).toHaveBeenCalledTimes(2);

    advanceTimerToNextTick();
    expect(callback).toHaveBeenCalledTimes(3);
  });
});
