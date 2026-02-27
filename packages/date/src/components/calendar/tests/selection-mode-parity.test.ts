import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "bun:test";

import { useDatesState } from "../../../hooks";

describe("selection mode parity", () => {
  it("supports allowDeselect in single mode", () => {
    const hook = renderHook(() =>
      useDatesState<"single">({
        allowDeselect: true,
        selectionMode: "single",
      })
    );

    act(() => {
      hook.result.current.onDateChange("2026-02-10");
    });

    expect(hook.result.current._value).toBe("2026-02-10");

    act(() => {
      hook.result.current.onDateChange("2026-02-10");
    });

    expect(hook.result.current._value).toBe(null);
  });

  it("supports allowSingleDateInRange and sorted range semantics", () => {
    const disallowSingle = renderHook(() =>
      useDatesState<"range">({
        allowSingleDateInRange: false,
        selectionMode: "range",
      })
    );

    act(() => {
      disallowSingle.result.current.onDateChange("2026-03-10");
    });
    act(() => {
      disallowSingle.result.current.onDateChange("2026-03-10");
    });

    expect(disallowSingle.result.current._value).toEqual([null, null]);

    const allowSingle = renderHook(() =>
      useDatesState<"range">({
        allowSingleDateInRange: true,
        selectionMode: "range",
      })
    );

    act(() => {
      allowSingle.result.current.onDateChange("2026-03-10");
    });
    act(() => {
      allowSingle.result.current.onDateChange("2026-03-10");
    });

    expect(allowSingle.result.current._value).toEqual([
      "2026-03-10",
      "2026-03-10",
    ]);

    act(() => {
      allowSingle.result.current.onDateChange("2026-03-20");
    });
    act(() => {
      allowSingle.result.current.onDateChange("2026-03-12");
    });

    expect(allowSingle.result.current._value).toEqual([
      "2026-03-12",
      "2026-03-20",
    ]);
  });

  it("supports partial range hover previews", () => {
    const hook = renderHook(() =>
      useDatesState<"range">({
        selectionMode: "range",
      })
    );

    act(() => {
      hook.result.current.onDateChange("2026-04-10");
    });
    act(() => {
      hook.result.current.onHoveredDateChange?.("2026-04-13");
    });

    expect(hook.result.current.getControlProps("2026-04-11").inRange).toBe(
      true
    );
    expect(hook.result.current.getControlProps("2026-04-10").firstInRange).toBe(
      true
    );
    expect(hook.result.current.getControlProps("2026-04-13").lastInRange).toBe(
      true
    );
  });
});
