import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test";

import { act, cleanup, renderHook } from "@testing-library/react";

import { useFullscreen } from "./use-fullscreen";

afterEach(cleanup);

const asyncNoop = async (): Promise<void> => {
  await Promise.resolve();
};

describe("useFullscreen", () => {
  let requestFullscreenMock: ReturnType<typeof mock>;
  let exitFullscreenMock: ReturnType<typeof mock>;

  beforeEach(() => {
    requestFullscreenMock = mock(asyncNoop);
    exitFullscreenMock = mock(asyncNoop);

    Object.defineProperty(document, "fullscreenElement", {
      configurable: true,
      value: null,
      writable: true,
    });

    Object.defineProperty(document, "exitFullscreen", {
      configurable: true,
      value: exitFullscreenMock,
      writable: true,
    });

    Object.defineProperty(document.documentElement, "requestFullscreen", {
      configurable: true,
      value: requestFullscreenMock,
      writable: true,
    });
  });

  it("returns ref, toggle, and fullscreen", () => {
    const { result } = renderHook(() => useFullscreen());
    expect(result.current).toHaveProperty("ref");
    expect(result.current).toHaveProperty("toggle");
    expect(result.current).toHaveProperty("fullscreen");
    expect(typeof result.current.ref).toBe("function");
    expect(typeof result.current.toggle).toBe("function");
    expect(typeof result.current.fullscreen).toBe("boolean");
  });

  it("initializes with fullscreen false", () => {
    const { result } = renderHook(() => useFullscreen());
    expect(result.current.fullscreen).toBe(false);
  });

  it("enters fullscreen when toggle is called and not in fullscreen", async () => {
    const { result } = renderHook(() => useFullscreen());

    act(() => {
      result.current.ref(null);
    });

    await act(async () => {
      await result.current.toggle();
    });

    expect(requestFullscreenMock).toHaveBeenCalledTimes(1);
  });

  it("exits fullscreen when toggle is called and in fullscreen", async () => {
    Object.defineProperty(document, "fullscreenElement", {
      configurable: true,
      value: document.documentElement,
      writable: true,
    });

    const { result } = renderHook(() => useFullscreen());

    act(() => {
      result.current.ref(null);
    });

    await act(async () => {
      await result.current.toggle();
    });

    expect(exitFullscreenMock).toHaveBeenCalledTimes(1);
  });

  it("updates fullscreen state when fullscreenchange fires", () => {
    const { result } = renderHook(() => useFullscreen());

    act(() => {
      result.current.ref(null);
    });

    expect(result.current.fullscreen).toBe(false);

    act(() => {
      Object.defineProperty(document, "fullscreenElement", {
        configurable: true,
        value: document.documentElement,
        writable: true,
      });
      document.documentElement.dispatchEvent(
        new Event("fullscreenchange", { bubbles: true })
      );
    });

    expect(result.current.fullscreen).toBe(true);

    act(() => {
      Object.defineProperty(document, "fullscreenElement", {
        configurable: true,
        value: null,
        writable: true,
      });
      document.documentElement.dispatchEvent(
        new Event("fullscreenchange", { bubbles: true })
      );
    });

    expect(result.current.fullscreen).toBe(false);
  });

  it("sets fullscreen to false on fullscreenerror", () => {
    const { result } = renderHook(() => useFullscreen());

    act(() => {
      result.current.ref(null);
    });

    act(() => {
      Object.defineProperty(document, "fullscreenElement", {
        configurable: true,
        value: document.documentElement,
        writable: true,
      });
      document.documentElement.dispatchEvent(
        new Event("fullscreenchange", { bubbles: true })
      );
    });

    expect(result.current.fullscreen).toBe(true);

    const consoleSpy = mock();
    const originalError = console.error;
    console.error = consoleSpy;

    act(() => {
      document.documentElement.dispatchEvent(
        new Event("fullscreenerror", { bubbles: true })
      );
    });

    expect(result.current.fullscreen).toBe(false);
    expect(consoleSpy).toHaveBeenCalled();

    console.error = originalError;
  });

  it("attaches ref to custom element when provided", async () => {
    const div = document.createElement("div");
    const requestSpy = mock(asyncNoop);
    Object.defineProperty(div, "requestFullscreen", {
      configurable: true,
      value: requestSpy,
      writable: true,
    });

    const { result } = renderHook(() => useFullscreen());

    act(() => {
      result.current.ref(div);
    });

    await act(async () => {
      await result.current.toggle();
    });

    expect(requestSpy).toHaveBeenCalledTimes(1);
  });

  it("removes event listeners on unmount", () => {
    const removeSpy = mock(
      document.documentElement.removeEventListener.bind(
        document.documentElement
      )
    );
    Object.defineProperty(document.documentElement, "removeEventListener", {
      configurable: true,
      value: removeSpy,
      writable: true,
    });

    const { result, unmount } = renderHook(() => useFullscreen());

    act(() => {
      result.current.ref(null);
    });

    unmount();

    expect(removeSpy).toHaveBeenCalled();
  });
});
