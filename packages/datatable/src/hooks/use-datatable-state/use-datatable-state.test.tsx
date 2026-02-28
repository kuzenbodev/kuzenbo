import { describe, expect, it } from "bun:test";

import { act, renderHook } from "@testing-library/react";

import { useDatatableState } from "./use-datatable-state";

describe("useDatatableState", () => {
  it("starts at page 1", () => {
    const { result } = renderHook(() => useDatatableState());

    expect(result.current.page).toBe(1);
  });

  it("keeps page >= 1", () => {
    const { result } = renderHook(() => useDatatableState());

    act(() => {
      result.current.setPage(0);
    });

    expect(result.current.page).toBe(1);
  });

  it("updates page when nextPage is valid", () => {
    const { result } = renderHook(() => useDatatableState());

    act(() => {
      result.current.setPage(4);
    });

    expect(result.current.page).toBe(4);
  });
});
