import { describe, expect, it, vi } from "bun:test";

import { renderHook } from "@testing-library/react";

import { useLogger } from "./use-logger";

describe("@kuzenbo/hooks/use-logger", () => {
  it("logs mount and unmount events", () => {
    const log = vi.spyOn(console, "log").mockReturnValue();
    const data = { foo: "bar" };
    const hook = renderHook(() => useLogger("Test", [data]));
    expect(log).toHaveBeenCalledWith("Test mounted", data);
    hook.unmount();
    expect(log).toHaveBeenLastCalledWith("Test unmounted");
    expect(log).toHaveBeenCalledTimes(2);
    log.mockRestore();
  });

  it("logs mount, unmount and update events", () => {
    const log = vi.spyOn(console, "log").mockReturnValue();
    let data = { foo: "bar" };
    const hook = renderHook(() => useLogger("Test", [data]));
    expect(log).toHaveBeenCalledWith("Test mounted", data);
    data = { foo: "newBar" };
    hook.rerender();
    expect(log).toHaveBeenCalledWith("Test updated", data);
    hook.unmount();
    expect(log).toHaveBeenLastCalledWith("Test unmounted");
    expect(log).toHaveBeenCalledTimes(3);
    log.mockRestore();
  });

  it("logs mount, unmount and rerenders without update events", () => {
    const log = vi.spyOn(console, "log").mockReturnValue();
    const data = { foo: "bar" };
    const hook = renderHook(() => useLogger("Test", [data]));
    expect(log).toHaveBeenCalledWith("Test mounted", data);
    hook.rerender();
    hook.unmount();
    expect(log).toHaveBeenLastCalledWith("Test unmounted");
    expect(log).toHaveBeenCalledTimes(2);
    log.mockRestore();
  });
});
