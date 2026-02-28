import { describe, expect, it } from "bun:test";

import { renderHook } from "@testing-library/react";

import { useCompleteShellRuntime } from "../shared/hooks/use-complete-shell-runtime";

describe("useCompleteShellRuntime", () => {
  const series = [{ label: "Revenue", name: "revenue" }] as const;
  const data = [{ month: "Jan", revenue: 1200 }] as const;

  it("derives shell runtime defaults, color vars, and tooltip formatter bridge", () => {
    const { result } = renderHook(() =>
      useCompleteShellRuntime({
        chartRootProps: undefined,
        responsiveContainerProps: { height: 320, width: 640 },
        series,
        valueFormatter: (value, key) => `${key}:${value}`,
      })
    );

    expect(result.current.rootAutoSize).toBe("container");
    expect(result.current.usesAutoSizeContainer).toBe(true);
    expect(result.current.getSeriesColorVar("revenue")).toBe(
      "var(--color-revenue)"
    );
    expect(
      result.current.tooltipValueFormatter?.(1200, "revenue", data[0])
    ).toBe("revenue:1200");

    const { result: noneAutoSizeResult } = renderHook(() =>
      useCompleteShellRuntime({
        chartRootProps: { autoSize: "none" },
        responsiveContainerProps: { height: 320, width: 640 },
        series,
        valueFormatter: (value, key) => `${key}:${value}`,
      })
    );

    expect(noneAutoSizeResult.current.rootAutoSize).toBe("none");
    expect(noneAutoSizeResult.current.usesAutoSizeContainer).toBe(false);
  });

  it("disables tooltip value formatter bridge when valueFormatter is absent", () => {
    const { result } = renderHook(() =>
      useCompleteShellRuntime({
        chartRootProps: undefined,
        responsiveContainerProps: undefined,
        series,
        valueFormatter: undefined,
      })
    );

    expect(result.current.rootAutoSize).toBe("none");
    expect(result.current.usesAutoSizeContainer).toBe(false);
    expect(result.current.tooltipValueFormatter).toBeUndefined();
  });
});
