import { expect, test } from "bun:test";

import {
  buildStateFromPreset,
  getFixedKeys,
  getInitialPresetId,
  getPresetById,
  updateControlState,
} from "@/components/docs-playground/system/state";

import {
  buttonPlaygroundDefinition,
  buttonPlaygroundInitialState,
  type ButtonPlaygroundState,
} from "./button-playground.definition";

test("preset selection resolves expected default preset", () => {
  expect(getInitialPresetId(buttonPlaygroundDefinition.presets)).toBe(
    "default"
  );
});

test("danger preset merges initial and fixed values", () => {
  const dangerPreset = getPresetById(
    buttonPlaygroundDefinition.presets,
    "danger"
  );

  const state = buildStateFromPreset(
    buttonPlaygroundInitialState,
    dangerPreset
  );

  expect(state.variant).toBe("danger");
  expect(state.label).toBe("Delete project");
});

test("fixed keys prevent updates for locked controls", () => {
  const dangerPreset = getPresetById(
    buttonPlaygroundDefinition.presets,
    "danger"
  );
  const state = buildStateFromPreset(
    buttonPlaygroundInitialState,
    dangerPreset
  );
  const fixedKeys = getFixedKeys(dangerPreset);

  const blockedUpdate = updateControlState(
    state,
    "variant",
    "outline",
    fixedKeys
  );
  const allowedUpdate = updateControlState(
    state,
    "label",
    "Archive",
    fixedKeys
  );

  expect(blockedUpdate.variant).toBe("danger");
  expect(allowedUpdate.label).toBe("Archive");
});

test("default preset does not lock controls", () => {
  const defaultPreset = getPresetById(
    buttonPlaygroundDefinition.presets,
    "default"
  );
  const fixedKeys = getFixedKeys(defaultPreset);

  const next = updateControlState<ButtonPlaygroundState, "variant">(
    buttonPlaygroundInitialState,
    "variant",
    "outline",
    fixedKeys
  );

  expect(next.variant).toBe("outline");
});
