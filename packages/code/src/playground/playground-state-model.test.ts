import { describe, expect, it } from "bun:test";

import { definePlaygroundControls } from "./playground-control-model";
import {
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

  it("creates snapshot from controls and resolves locked props", () => {
    const snapshot = createPlaygroundStateSnapshot({
      controls,
    });

    expect(snapshot.values).toEqual({
      children: "Button",
      color: "blue",
      disabled: false,
      radius: 4,
      size: "md",
    });
    expect(snapshot.lockedProps.has("color")).toBe(true);
  });

  it("does not update locked control values", () => {
    const snapshot = createPlaygroundStateSnapshot({
      controls,
    });

    const controlLevelLockUpdate = setPlaygroundControlValue(
      snapshot,
      "color",
      "red"
    );

    expect(controlLevelLockUpdate.values.color).toBe("blue");
  });

  it("updates unlocked values and keeps deterministic object shape", () => {
    const snapshot = createPlaygroundStateSnapshot({ controls });
    const nextSnapshot = setPlaygroundControlValue(snapshot, "radius", 16);

    expect(nextSnapshot.values).toEqual({
      children: "Button",
      color: "blue",
      disabled: false,
      radius: 16,
      size: "md",
    });
  });

  it("resets state to initial control values", () => {
    const resetSnapshot = resetPlaygroundState({
      controls,
    });

    expect(resetSnapshot.values).toEqual({
      children: "Button",
      color: "blue",
      disabled: false,
      radius: 4,
      size: "md",
    });
  });
});
