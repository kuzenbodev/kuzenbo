import { definePlaygroundPresets } from "@kuzenbo/code/playground/playground-preset-model";

export const presets = definePlaygroundPresets([
  {
    id: "default",
    label: "Default",
  },
  {
    id: "tiny",
    label: "Icon XS",
    locks: ["size"],
    values: {
      size: "icon-xs",
    },
  },
  {
    id: "large",
    label: "Icon XL",
    locks: ["size"],
    values: {
      size: "icon-xl",
    },
  },
  {
    id: "loading",
    label: "Loading",
    locks: ["isLoading"],
    values: {
      isLoading: true,
    },
  },
]);

export const initialPresetId = "default";
