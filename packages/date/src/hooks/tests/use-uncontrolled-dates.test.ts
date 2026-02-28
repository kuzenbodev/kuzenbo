import { describe, expect, it } from "bun:test";

import { renderHook } from "@testing-library/react";

import { useUncontrolledDates } from "../../hooks";

type HookConfig = Parameters<typeof useUncontrolledDates>[0];
type HookResult = readonly [unknown, unknown, boolean];

const hookDefaults: Omit<HookConfig, "selectionMode"> = {
  defaultValue: undefined,
  onChange: () => null,
  value: undefined,
};

const singleValue = "2024-03-10";
const rangeValue: [string, string] = ["2024-03-10", "2024-03-14"];
const multipleValue = ["2024-03-09", "2024-03-10", "2024-03-11"];

const setupHook = (
  config: Pick<HookConfig, "selectionMode"> & Partial<HookConfig>
) =>
  renderHook<HookResult, HookConfig>(
    (innerConfig) => useUncontrolledDates(innerConfig),
    {
      initialProps: {
        ...hookDefaults,
        ...config,
      },
    }
  );

describe("useUncontrolledDates", () => {
  it("returns empty values per selection mode without defaults", () => {
    const singleHook = setupHook({ selectionMode: "single" });
    expect(singleHook.result.current[0]).toBe(null);

    const multipleHook = setupHook({ selectionMode: "multiple" });
    expect(multipleHook.result.current[0]).toEqual([]);

    const rangeHook = setupHook({ selectionMode: "range" });
    expect(rangeHook.result.current[0]).toEqual([null, null]);
  });

  it("returns default values in uncontrolled mode", () => {
    const singleHook = setupHook({
      defaultValue: singleValue,
      selectionMode: "single",
    });
    expect(singleHook.result.current[0]).toBe(singleValue);

    const multipleHook = setupHook({
      defaultValue: multipleValue,
      selectionMode: "multiple",
    });
    expect(multipleHook.result.current[0]).toEqual(multipleValue);

    const rangeHook = setupHook({
      defaultValue: rangeValue,
      selectionMode: "range",
    });
    expect(rangeHook.result.current[0]).toEqual(rangeValue);
  });

  it("returns controlled values when provided", () => {
    const singleHook = setupHook({
      selectionMode: "single",
      value: singleValue,
    });
    expect(singleHook.result.current[0]).toBe(singleValue);

    const multipleHook = setupHook({
      selectionMode: "multiple",
      value: multipleValue,
    });
    expect(multipleHook.result.current[0]).toEqual(multipleValue);

    const rangeHook = setupHook({
      selectionMode: "range",
      value: rangeValue,
    });
    expect(rangeHook.result.current[0]).toEqual(rangeValue);
  });

  it("resets uncontrolled value when changing selection mode", () => {
    const hook = setupHook({
      defaultValue: singleValue,
      selectionMode: "single",
    });

    hook.rerender({
      ...hookDefaults,
      defaultValue: multipleValue,
      selectionMode: "multiple",
    });
    expect(hook.result.current[0]).toEqual(multipleValue);

    hook.rerender({
      ...hookDefaults,
      selectionMode: "single",
    });
    expect(hook.result.current[0]).toBe(null);
  });

  it("defaults to single mode when selectionMode is omitted", () => {
    const hook = renderHook(() =>
      useUncontrolledDates({
        defaultValue: singleValue,
        onChange: () => null,
      })
    );

    expect(hook.result.current[0]).toBe(singleValue);
  });
});
