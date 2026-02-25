import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "bun:test";

import { useCompleteLegendHighlightState } from "../shared/hooks/use-complete-legend-highlight-state";

describe("useCompleteLegendHighlightState", () => {
  it("tracks highlight state and clears it when highlight support is disabled", () => {
    const { result, rerender } = renderHook(
      ({ enableLegendHighlight, highlightScopeKey, withLegend }) =>
        useCompleteLegendHighlightState({
          enableLegendHighlight,
          highlightScopeKey,
          withLegend,
        }),
      {
        initialProps: {
          enableLegendHighlight: true,
          highlightScopeKey: "scope-a",
          withLegend: true,
        },
      }
    );

    expect(result.current.highlightedSeriesName).toBeNull();
    expect(result.current.isAnySeriesHighlighted).toBe(false);
    expect(result.current.isSeriesHighlighted("revenue")).toBe(true);

    act(() => {
      result.current.onHighlightChange?.("revenue");
    });

    expect(result.current.highlightedSeriesName).toBe("revenue");
    expect(result.current.isAnySeriesHighlighted).toBe(true);
    expect(result.current.isSeriesHighlighted("revenue")).toBe(true);
    expect(result.current.isSeriesHighlighted("Revenue")).toBe(true);
    expect(result.current.isSeriesHighlighted("target")).toBe(false);

    rerender({
      enableLegendHighlight: false,
      highlightScopeKey: "scope-b",
      withLegend: true,
    });

    expect(result.current.highlightedSeriesName).toBeNull();
    expect(result.current.isAnySeriesHighlighted).toBe(false);
    expect(result.current.onHighlightChange).toBeUndefined();
    expect(result.current.isSeriesHighlighted("target")).toBe(true);

    rerender({
      enableLegendHighlight: true,
      highlightScopeKey: "scope-c",
      withLegend: false,
    });

    expect(result.current.highlightedSeriesName).toBeNull();
    expect(result.current.isAnySeriesHighlighted).toBe(false);
    expect(result.current.onHighlightChange).toBeUndefined();
  });

  it("resets highlighted state when the highlight scope key changes", () => {
    const { result, rerender } = renderHook(
      ({ highlightScopeKey }) =>
        useCompleteLegendHighlightState({
          enableLegendHighlight: true,
          highlightScopeKey,
          withLegend: true,
        }),
      {
        initialProps: {
          highlightScopeKey: "scope-a",
        },
      }
    );

    act(() => {
      result.current.onHighlightChange?.("revenue");
    });

    expect(result.current.highlightedSeriesName).toBe("revenue");
    expect(result.current.isAnySeriesHighlighted).toBe(true);

    rerender({
      highlightScopeKey: "scope-a",
    });

    expect(result.current.highlightedSeriesName).toBe("revenue");
    expect(result.current.isAnySeriesHighlighted).toBe(true);

    rerender({
      highlightScopeKey: "scope-b",
    });

    expect(result.current.highlightedSeriesName).toBeNull();
    expect(result.current.isAnySeriesHighlighted).toBe(false);
  });
});
