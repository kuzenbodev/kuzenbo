import { describe, expect, it, vi } from "bun:test";

import { act, renderHook } from "@testing-library/react";

import { useDisclosure } from "./use-disclosure";

describe("@kuzenbo/hooks/use-disclosure", () => {
  it("handles close correctly", () => {
    const hook = renderHook(() => useDisclosure(true));
    expect(hook.result.current[0]).toBeTruthy();

    act(() => hook.result.current[1].close());
    expect(hook.result.current[0]).toBeFalsy();
  });

  it("handles open correctly", () => {
    const hook = renderHook(() => useDisclosure(false));
    expect(hook.result.current[0]).toBeFalsy();

    act(() => hook.result.current[1].open());
    expect(hook.result.current[0]).toBeTruthy();
  });

  it("handles toggle correctly", () => {
    const hook = renderHook(() => useDisclosure(false));
    expect(hook.result.current[0]).toBeFalsy();

    act(() => hook.result.current[1].toggle());
    expect(hook.result.current[0]).toBeTruthy();

    act(() => hook.result.current[1].toggle());
    expect(hook.result.current[0]).toBeFalsy();
  });

  it("calls onClose when close is called", () => {
    const spy = vi.fn();
    const hook = renderHook(() => useDisclosure(true, { onClose: spy }));
    expect(spy).not.toHaveBeenCalled();

    act(() => hook.result.current[1].close());
    expect(spy).toHaveBeenCalledTimes(1);

    act(() => hook.result.current[1].close());
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("calls onOpen when open is called", () => {
    const spy = vi.fn();
    const hook = renderHook(() => useDisclosure(false, { onOpen: spy }));
    expect(spy).not.toHaveBeenCalled();

    act(() => hook.result.current[1].open());
    expect(spy).toHaveBeenCalledTimes(1);

    act(() => hook.result.current[1].open());
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("calls onOpen and onClose correctly when toggle is called", () => {
    const onClose = vi.fn();
    const onOpen = vi.fn();
    const hook = renderHook(() => useDisclosure(false, { onOpen, onClose }));
    expect(onOpen).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();

    act(() => hook.result.current[1].toggle());
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();

    act(() => hook.result.current[1].toggle());
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);

    act(() => hook.result.current[1].toggle());
    expect(onOpen).toHaveBeenCalledTimes(2);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
