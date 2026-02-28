import { definePlaygroundPresets } from "@kuzenbo/code/playground/playground-preset-model";

export const presets = definePlaygroundPresets([
  {
    id: "default",
    label: "Default",
  },
  {
    id: "tiny",
    label: "XS",
    locks: ["size"],
    values: {
      size: "xs",
    },
  },
  {
    id: "large",
    label: "XL",
    locks: ["size"],
    values: {
      size: "xl",
    },
  },
  {
    id: "danger",
    label: "Danger",
    locks: ["variant"],
    values: {
      children: "Delete workspace",
      variant: "danger",
    },
  },
]);

export const initialPresetId = "default";
