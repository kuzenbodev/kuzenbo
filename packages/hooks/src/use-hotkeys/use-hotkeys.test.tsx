import { describe, expect, it, vi } from "bun:test";

import { renderHook } from "@testing-library/react";

import { useHotkeys } from "./use-hotkeys";

const dispatchEvent = (data: KeyboardEventInit) => {
  const event = new KeyboardEvent("keydown", data);
  document.documentElement.dispatchEvent(event);
};

describe("@kuzenbo/hooks/use-hotkey", () => {
  it("should listen to document events", () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys([["shift+ctrl+S", handler]]));
    dispatchEvent({ shiftKey: true, ctrlKey: true, key: "S" });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("should not fire when keys mismatch", () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys([["alt+L", handler]]));
    dispatchEvent({ metaKey: true, key: "L" });
    expect(handler).not.toHaveBeenCalled();
  });

  it("should not fire when event is no exact match", () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys([["mod+P", handler]]));
    dispatchEvent({ metaKey: true, altKey: true, key: "P" });
    expect(handler).not.toHaveBeenCalled();
  });

  it("correctly handles space key", () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys([["shift+space", handler]]));
    dispatchEvent({ shiftKey: true, key: "space" });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("correctly handles [plus] key", () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys([["shift+[plus]", handler]]));
    dispatchEvent({ shiftKey: true, key: "+" });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("correctly handles physical key assignments like Digit1", () => {
    const handler = vi.fn();
    renderHook(() =>
      useHotkeys([["Digit1", handler, { usePhysicalKeys: true }]])
    );
    dispatchEvent({ code: "Digit1" });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("correctly ignores unclear numerical assignments when usePhyiscalKeys is true", () => {
    const handler = vi.fn();
    renderHook(() =>
      useHotkeys([["1", handler, { usePhysicalKeys: true }]], [], true)
    );
    dispatchEvent({ code: "Numpad1" });
    expect(handler).not.toHaveBeenCalled();
  });

  it("correctly assumes physical keys when usePhysicalKeys is true", () => {
    const handler = vi.fn();
    renderHook(() =>
      useHotkeys([["A", handler, { usePhysicalKeys: true }]], [], true)
    );
    dispatchEvent({ code: "KeyA" });
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
