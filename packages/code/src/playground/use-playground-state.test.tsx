import { describe, expect, it } from "bun:test";

import { act, renderHook } from "@testing-library/react";

import { definePlaygroundControls } from "./playground-control-model";
import type { PlaygroundStateFromControls } from "./playground-control-model";
import { definePlaygroundPresets } from "./playground-preset-model";
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

const presets = definePlaygroundPresets<
  PlaygroundStateFromControls<typeof controls>
>([
  {
    id: "dense",
    label: "Dense",
    locks: ["size"],
    values: {
      size: "sm",
      variant: "outline",
    },
  },
] as const);

describe("usePlaygroundState", () => {
  it("injects state into preview props", () => {
    const { result } = renderHook(() =>
      usePlaygroundState({
        controls,
        presets,
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
        presets,
      })
    );

    act(() => {
      result.current.setValue("variant", "subtle");
      result.current.setValue("children", "Custom label");
    });

    expect(result.current.state.variant).toBe("subtle");
    expect(result.current.state.children).toBe("Custom label");
  });

  it("applies presets and prevents updates to locked props", () => {
    const { result } = renderHook(() =>
      usePlaygroundState({
        controls,
        presets,
      })
    );

    act(() => {
      result.current.applyPreset("dense");
    });

    expect(result.current.activePresetId).toBe("dense");
    expect(result.current.isLocked("size")).toBe(true);
    expect(result.current.state.size).toBe("sm");

    act(() => {
      result.current.setValue("size", "lg");
    });

    expect(result.current.state.size).toBe("sm");
  });

  it("resets state and supports clearing active preset", () => {
    const { result } = renderHook(() =>
      usePlaygroundState({
        controls,
        initialPresetId: "dense",
        presets,
      })
    );

    act(() => {
      result.current.applyPreset(null);
      result.current.reset();
    });

    expect(result.current.activePresetId).toBe("dense");
    expect(result.current.state).toEqual({
      children: "Action",
      size: "sm",
      variant: "outline",
    });
  });
});
