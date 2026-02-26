import {
  applyPlaygroundPreset,
  createPlaygroundStateSnapshot,
  setPlaygroundControlValue,
} from "@kuzenbo/code/playground/playground-state-model";
import { expect, test } from "bun:test";

import {
  buttonPlaygroundControls,
  buttonPlaygroundInitialPresetId,
  buttonPlaygroundPresets,
} from "./button-playground.definition";

test("playground starts from default preset", () => {
  const snapshot = createPlaygroundStateSnapshot({
    controls: buttonPlaygroundControls,
    initialPresetId: buttonPlaygroundInitialPresetId,
    presets: buttonPlaygroundPresets,
  });

  expect(snapshot.activePresetId).toBe("default");
  expect(snapshot.values.variant).toBe("default");
  expect(snapshot.values.children).toBe("Button");
});

test("danger preset merges values and locks variant", () => {
  const snapshot = applyPlaygroundPreset(
    createPlaygroundStateSnapshot({
      controls: buttonPlaygroundControls,
      initialPresetId: buttonPlaygroundInitialPresetId,
      presets: buttonPlaygroundPresets,
    }),
    {
      controls: buttonPlaygroundControls,
      presets: buttonPlaygroundPresets,
    },
    "danger"
  );

  expect(snapshot.activePresetId).toBe("danger");
  expect(snapshot.values.variant).toBe("danger");
  expect(snapshot.values.children).toBe("Delete project");
  expect(snapshot.lockedProps.has("variant")).toBe(true);

  const next = setPlaygroundControlValue(snapshot, "variant", "outline");

  expect(next.values.variant).toBe("danger");
});

test("default preset keeps controls editable", () => {
  const snapshot = applyPlaygroundPreset(
    createPlaygroundStateSnapshot({
      controls: buttonPlaygroundControls,
      initialPresetId: buttonPlaygroundInitialPresetId,
      presets: buttonPlaygroundPresets,
    }),
    {
      controls: buttonPlaygroundControls,
      presets: buttonPlaygroundPresets,
    },
    "default"
  );

  const next = setPlaygroundControlValue(snapshot, "variant", "outline");

  expect(next.values.variant).toBe("outline");
});
