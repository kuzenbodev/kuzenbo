import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "bun:test";

import {
  definePlaygroundControls,
  type PlaygroundStateFromControls,
} from "./playground-control-model";
import { definePlaygroundPresets } from "./playground-preset-model";
import { usePlaygroundState } from "./use-playground-state";

const controls = definePlaygroundControls([
  {
    type: "segmented",
    prop: "variant",
    options: ["filled", "outline", "subtle"],
    initialValue: "filled",
    defaultValue: "filled",
  },
  {
    type: "size",
    prop: "size",
    initialValue: "md",
    defaultValue: "md",
  },
  {
    type: "string",
    prop: "children",
    initialValue: "Action",
    defaultValue: "Action",
  },
] as const);

const presets = definePlaygroundPresets<
  PlaygroundStateFromControls<typeof controls>
>([
  {
    id: "dense",
    label: "Dense",
    values: {
      size: "sm",
      variant: "outline",
    },
    locks: ["size"],
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
      id: "preview-1",
      variant: "filled",
      size: "md",
      children: "Action",
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
        presets,
        initialPresetId: "dense",
      })
    );

    act(() => {
      result.current.applyPreset(null);
      result.current.reset();
    });

    expect(result.current.activePresetId).toBe("dense");
    expect(result.current.state).toEqual({
      variant: "outline",
      size: "sm",
      children: "Action",
    });
  });
});
