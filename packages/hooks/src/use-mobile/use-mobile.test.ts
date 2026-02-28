import { afterEach, beforeEach, describe, expect, it } from "bun:test";

import { act, cleanup, renderHook } from "@testing-library/react";

import { useIsMobile } from "./use-mobile";

afterEach(cleanup);

describe("useIsMobile", () => {
  let listeners: (() => void)[];
  let originalMatchMedia: typeof window.matchMedia;
  let originalInnerWidth: number;

  beforeEach(() => {
    listeners = [];
    originalMatchMedia = window.matchMedia;
    originalInnerWidth = window.innerWidth;

    Object.defineProperty(window, "matchMedia", {
      value: (query: string) => ({
        addEventListener: (_event: string, handler: () => void) => {
          listeners.push(handler);
        },
        addListener: () => {
          // do nothing
        },
        dispatchEvent: () => false,
        matches: false,
        media: query,
        onchange: null,
        removeEventListener: (_event: string, handler: () => void) => {
          listeners = listeners.filter((l) => l !== handler);
        },
        removeListener: () => {
          // do nothing
        },
      }),
      writable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, "matchMedia", {
      value: originalMatchMedia,
      writable: true,
    });
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: originalInnerWidth,
      writable: true,
    });
  });

  it("returns false when window width is >= 768", () => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 1024,
      writable: true,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("returns true when window width is < 768", () => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 500,
      writable: true,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("returns false at exactly 768px", () => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 768,
      writable: true,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("returns true at 767px", () => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 767,
      writable: true,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("updates when the media query changes", () => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 1024,
      writable: true,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    act(() => {
      Object.defineProperty(window, "innerWidth", {
        configurable: true,
        value: 500,
        writable: true,
      });
      for (const listener of listeners) {
        listener();
      }
    });

    expect(result.current).toBe(true);
  });

  it("cleans up the event listener on unmount", () => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 1024,
      writable: true,
    });

    const { unmount } = renderHook(() => useIsMobile());
    expect(listeners.length).toBe(1);

    unmount();
    expect(listeners.length).toBe(0);
  });
});
