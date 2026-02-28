import { definePlaygroundControls } from "@kuzenbo/code/playground/playground-control-model";
import type { PlaygroundStateFromControls } from "@kuzenbo/code/playground/playground-control-model";

export const controls = definePlaygroundControls([
  {
    defaultValue: "default",
    initialValue: "default",
    label: "Variant",
    options: ["default", "outline", "secondary", "ghost", "danger", "link"],
    prop: "variant",
    type: "select",
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
    defaultValue: "Button",
    initialValue: "Button",
    label: "Label",
    prop: "children",
    type: "string",
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
