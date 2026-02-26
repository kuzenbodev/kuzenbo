import { definePlaygroundPresets } from "@kuzenbo/code/playground/playground-preset-model";

export const presets = definePlaygroundPresets([
  {
    id: "default",
    label: "Default",
  },
  {
    id: "danger",
    label: "Danger",
    values: {
      variant: "danger",
      children: "Delete project",
    },
    locks: ["variant"],
  },
  {
    id: "loading",
    label: "Loading",
    values: {
      isLoading: true,
      children: "Saving changes",
    },
    locks: ["isLoading"],
  },
]);

export const initialPresetId = "default";
