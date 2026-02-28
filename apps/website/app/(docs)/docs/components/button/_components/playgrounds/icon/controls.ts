import { definePlaygroundControls } from "@kuzenbo/code/playground/playground-control-model";
import type { PlaygroundStateFromControls } from "@kuzenbo/code/playground/playground-control-model";

export const controls = definePlaygroundControls([
  {
    defaultValue: "outline",
    initialValue: "outline",
    label: "Variant",
    options: ["default", "outline", "secondary", "ghost", "danger"],
    prop: "variant",
    type: "select",
  },
  {
    defaultValue: "icon",
    initialValue: "icon",
    label: "Size",
    prop: "size",
    type: "size",
    values: ["icon-xs", "icon-sm", "icon", "icon-lg", "icon-xl"],
  },
  {
    defaultValue: false,
    initialValue: false,
    label: "Disabled",
    prop: "disabled",
    type: "boolean",
  },
  {
    defaultValue: false,
    initialValue: false,
    label: "Loading",
    prop: "isLoading",
    type: "boolean",
  },
]);

export type State = PlaygroundStateFromControls<typeof controls>;
