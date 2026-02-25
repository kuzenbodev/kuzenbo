import { describe, expect, it } from "bun:test";

import {
  definePlaygroundControls,
  type PlaygroundStateFromControls,
} from "./playground-control-model";
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
    type: "boolean",
    prop: "disabled",
    initialValue: false,
    defaultValue: false,
  },
  {
    type: "size",
    prop: "size",
    initialValue: "md",
    defaultValue: "md",
  },
  {
    type: "number",
    prop: "radius",
    initialValue: 4,
    defaultValue: 2,
  },
  {
    type: "string",
    prop: "children",
    initialValue: "Button",
    defaultValue: "Button",
  },
  {
    type: "color",
    prop: "color",
    initialValue: "blue",
    defaultValue: "blue",
    locked: true,
  },
] as const);

const presets = definePlaygroundPresets<
  PlaygroundStateFromControls<typeof controls>
>([
  {
    id: "compact",
    label: "Compact",
    values: {
      size: "sm",
      radius: 1,
    },
    locks: ["size"],
  },
  {
    id: "hero",
    label: "Hero",
    values: {
      size: "lg",
      radius: 8,
      children: "Hero button",
    },
    locks: ["children"],
  },
] as const);

describe("playground-state-model", () => {
  it("creates deterministic initial and default state maps", () => {
    const initialState = createPlaygroundInitialState(controls);
    const defaultState = createPlaygroundDefaultState(controls);

    expect(initialState).toEqual({
      disabled: false,
      size: "md",
      radius: 4,
      children: "Button",
      color: "blue",
    });

    expect(defaultState).toEqual({
      disabled: false,
      size: "md",
      radius: 2,
      children: "Button",
      color: "blue",
    });
  });

  it("applies initial preset values and resolves locks", () => {
    const snapshot = createPlaygroundStateSnapshot({
      controls,
      presets,
      initialPresetId: "compact",
    });

    expect(snapshot.activePresetId).toBe("compact");
    expect(snapshot.values).toEqual({
      disabled: false,
      size: "sm",
      radius: 1,
      children: "Button",
      color: "blue",
    });
    expect(snapshot.lockedProps.has("size")).toBe(true);
    expect(snapshot.lockedProps.has("color")).toBe(true);
  });

  it("does not update locked control values", () => {
    const snapshot = createPlaygroundStateSnapshot({
      controls,
      presets,
      initialPresetId: "compact",
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
      disabled: false,
      size: "md",
      radius: 16,
      children: "Button",
      color: "blue",
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
      disabled: true,
      size: "lg",
      radius: 8,
      children: "Hero button",
      color: "blue",
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
      disabled: false,
      size: "sm",
      radius: 1,
      children: "Button",
      color: "blue",
    });
  });
});
