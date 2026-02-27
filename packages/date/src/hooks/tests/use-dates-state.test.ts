import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "bun:test";

import { useDatesState } from "../../hooks";

describe("useDatesState", () => {
  it("builds and sorts range values", () => {
    const hook = renderHook(() =>
      useDatesState<"range">({
        selectionMode: "range",
      })
    );

    act(() => {
      hook.result.current.onDateChange("2024-03-10");
    });

    expect(hook.result.current._value).toEqual(["2024-03-10", null]);

    act(() => {
      hook.result.current.onDateChange("2024-03-08");
    });

    expect(hook.result.current._value).toEqual(["2024-03-08", "2024-03-10"]);
  });

  it("toggles multiple selections", () => {
    const hook = renderHook(() =>
      useDatesState<"multiple">({
        selectionMode: "multiple",
      })
    );

    act(() => {
      hook.result.current.onDateChange("2024-04-01");
    });

    act(() => {
      hook.result.current.onDateChange("2024-04-02");
    });

    expect(hook.result.current._value).toEqual(["2024-04-01", "2024-04-02"]);

    act(() => {
      hook.result.current.onDateChange("2024-04-01");
    });

    expect(hook.result.current._value).toEqual(["2024-04-02"]);
  });
});
