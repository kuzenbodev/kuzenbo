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
    defaultValue: "horizontal",
    initialValue: "horizontal",
    label: "Orientation",
    options: ["horizontal", "vertical"],
    prop: "orientation",
    type: "segmented",
  },
  {
    defaultValue: "md",
    initialValue: "md",
    label: "Size",
    prop: "size",
    type: "size",
    values: ["xs", "sm", "md", "lg", "xl"],
  },
  {
    defaultValue: true,
    initialValue: true,
    label: "Separator",
    prop: "showSeparator",
    type: "boolean",
  },
  {
    defaultValue: true,
    initialValue: true,
    label: "Status",
    prop: "showStatus",
    type: "boolean",
  },
]);

export type State = PlaygroundStateFromControls<typeof controls>;
