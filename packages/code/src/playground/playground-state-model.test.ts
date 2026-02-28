import { describe, expect, it } from "bun:test";

import { definePlaygroundControls } from "./playground-control-model";
import type { PlaygroundStateFromControls } from "./playground-control-model";
import { definePlaygroundPresets } from "./playground-preset-model";
import {
  applyPlaygroundPreset,
  createPlaygroundDefaultState,
  createPlaygroundInitialState,
  createPlaygroundStateSnapshot,
  resetPlaygroundState,
  setPlaygroundControlValue,
} from "./playground-state-model";

const controls = definePlaygroundControls([
  {
    defaultValue: false,
    initialValue: false,
    prop: "disabled",
    type: "boolean",
  },
  {
    defaultValue: "md",
    initialValue: "md",
    prop: "size",
    type: "size",
  },
  {
    defaultValue: 2,
    initialValue: 4,
    prop: "radius",
    type: "number",
  },
  {
    defaultValue: "Button",
    initialValue: "Button",
    prop: "children",
    type: "string",
  },
  {
    defaultValue: "blue",
    initialValue: "blue",
    locked: true,
    prop: "color",
    type: "color",
  },
] as const);

const presets = definePlaygroundPresets<
  PlaygroundStateFromControls<typeof controls>
>([
  {
    id: "compact",
    label: "Compact",
    locks: ["size"],
    values: {
      radius: 1,
      size: "sm",
    },
  },
  {
    id: "hero",
    label: "Hero",
    locks: ["children"],
    values: {
      children: "Hero button",
      radius: 8,
      size: "lg",
    },
  },
] as const);

describe("playground-state-model", () => {
  it("creates deterministic initial and default state maps", () => {
    const initialState = createPlaygroundInitialState(controls);
    const defaultState = createPlaygroundDefaultState(controls);

    expect(initialState).toEqual({
      children: "Button",
      color: "blue",
      disabled: false,
      radius: 4,
      size: "md",
    });

    expect(defaultState).toEqual({
      children: "Button",
      color: "blue",
      disabled: false,
      radius: 2,
      size: "md",
    });
  });

  it("applies initial preset values and resolves locks", () => {
    const snapshot = createPlaygroundStateSnapshot({
      controls,
      initialPresetId: "compact",
      presets,
    });

    expect(snapshot.activePresetId).toBe("compact");
    expect(snapshot.values).toEqual({
      children: "Button",
      color: "blue",
      disabled: false,
      radius: 1,
      size: "sm",
    });
    expect(snapshot.lockedProps.has("size")).toBe(true);
    expect(snapshot.lockedProps.has("color")).toBe(true);
  });

  it("does not update locked control values", () => {
    const snapshot = createPlaygroundStateSnapshot({
      controls,
      initialPresetId: "compact",
      presets,
    });

    const lockedUpdate = setPlaygroundControlValue(snapshot, "size", "lg");
    const controlLevelLockUpdate = setPlaygroundControlValue(
      snapshot,
      "color",
      "red"
    );

    expect(lockedUpdate.values.size).toBe("sm");
    expect(controlLevelLockUpdate.values.color).toBe("blue");
  });

  it("updates unlocked values and keeps deterministic object shape", () => {
    const snapshot = createPlaygroundStateSnapshot({ controls, presets });
    const nextSnapshot = setPlaygroundControlValue(snapshot, "radius", 16);

    expect(nextSnapshot.values).toEqual({
      children: "Button",
      color: "blue",
      disabled: false,
      radius: 16,
      size: "md",
    });
  });

  it("merges preset values into current state and updates lock set", () => {
    const initialSnapshot = createPlaygroundStateSnapshot({
      controls,
      presets,
    });
    const withCustomValue = setPlaygroundControlValue(
      initialSnapshot,
      "disabled",
      true
    );
    const withPreset = applyPlaygroundPreset(
      withCustomValue,
      { controls, presets },
      "hero"
    );

    expect(withPreset.activePresetId).toBe("hero");
    expect(withPreset.values).toEqual({
      children: "Hero button",
      color: "blue",
      disabled: true,
      radius: 8,
      size: "lg",
    });
    expect(withPreset.lockedProps.has("children")).toBe(true);
    expect(withPreset.lockedProps.has("color")).toBe(true);
    expect(withPreset.lockedProps.has("size")).toBe(false);
  });

  it("resets state with optional preset override", () => {
    const resetSnapshot = resetPlaygroundState(
      {
        controls,
        presets,
      },
      "compact"
    );

    expect(resetSnapshot.activePresetId).toBe("compact");
    expect(resetSnapshot.values).toEqual({
      children: "Button",
      color: "blue",
      disabled: false,
      radius: 1,
      size: "sm",
    });
  });
});
