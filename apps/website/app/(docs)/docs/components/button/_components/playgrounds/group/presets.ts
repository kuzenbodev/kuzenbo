import { definePlaygroundPresets } from "@kuzenbo/code/playground/playground-preset-model";

export const presets = definePlaygroundPresets([
  {
    id: "default",
    label: "Default",
  },
  {
    id: "vertical",
    label: "Vertical",
    locks: ["orientation"],
    values: {
      orientation: "vertical",
    },
  },
  {
    id: "danger",
    label: "Danger",
    locks: ["variant"],
    values: {
      variant: "danger",
    },
  },
  {
    id: "compact",
    label: "Compact",
    locks: ["size"],
    values: {
      size: "sm",
    },
  },
]);

export const initialPresetId = "default";
