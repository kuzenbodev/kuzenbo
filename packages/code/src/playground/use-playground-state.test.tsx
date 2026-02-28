import { describe, expect, it } from "bun:test";

import { act, renderHook } from "@testing-library/react";

import { definePlaygroundControls } from "./playground-control-model";
import { usePlaygroundState } from "./use-playground-state";

const controls = definePlaygroundControls([
  {
    defaultValue: "filled",
    initialValue: "filled",
    options: ["filled", "outline", "subtle"],
    prop: "variant",
    type: "segmented",
  },
  {
    defaultValue: "md",
    initialValue: "md",
    prop: "size",
    type: "size",
  },
  {
    defaultValue: "Action",
    initialValue: "Action",
    prop: "children",
    type: "string",
  },
] as const);

describe("usePlaygroundState", () => {
  it("injects state into preview props", () => {
    const { result } = renderHook(() =>
      usePlaygroundState({
        controls,
      })
    );

    const injected = result.current.getPreviewProps({ id: "preview-1" });

    expect(injected).toEqual({
      children: "Action",
      id: "preview-1",
      size: "md",
      variant: "filled",
    });
  });

  it("supports setting values with typed props", () => {
    const { result } = renderHook(() =>
      usePlaygroundState({
        controls,
      })
    );

    act(() => {
      result.current.setValue("variant", "subtle");
      result.current.setValue("children", "Custom label");
    });

    expect(result.current.state.variant).toBe("subtle");
    expect(result.current.state.children).toBe("Custom label");
  });

  it("resets state to initial control values", () => {
    const { result } = renderHook(() =>
      usePlaygroundState({
        controls,
      })
    );

    act(() => {
      result.current.setValue("variant", "outline");
      result.current.setValue("children", "Modified");
    });

    expect(result.current.state.variant).toBe("outline");
    expect(result.current.state.children).toBe("Modified");

    act(() => {
      result.current.reset();
    });

    expect(result.current.state).toEqual({
      children: "Action",
      size: "md",
      variant: "filled",
    });
  });
});
