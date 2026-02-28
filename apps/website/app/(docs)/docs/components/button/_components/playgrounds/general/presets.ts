import { definePlaygroundPresets } from "@kuzenbo/code/playground/playground-preset-model";

export const presets = definePlaygroundPresets([
  {
    id: "default",
    label: "Default",
  },
  {
    id: "danger",
    label: "Danger",
    locks: ["variant"],
    values: {
      children: "Delete project",
      variant: "danger",
    },
  },
  {
    id: "loading",
    label: "Loading",
    locks: ["isLoading"],
    values: {
      children: "Saving changes",
      isLoading: true,
    },
  },
]);

export const initialPresetId = "default";
