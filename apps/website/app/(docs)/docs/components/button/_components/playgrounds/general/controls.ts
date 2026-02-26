import {
  definePlaygroundControls,
  type PlaygroundStateFromControls,
} from "@kuzenbo/code/playground/playground-control-model";

export const controls = definePlaygroundControls([
  {
    type: "select",
    prop: "variant",
    label: "Variant",
    options: ["default", "outline", "secondary", "ghost", "danger", "link"],
    initialValue: "default",
    defaultValue: "default",
  },
  {
    type: "size",
    prop: "size",
    label: "Size",
    values: ["sm", "md", "lg"],
    initialValue: "md",
    defaultValue: "md",
  },
  {
    type: "string",
    prop: "children",
    label: "Label",
    initialValue: "Button",
    defaultValue: "Button",
  },
  {
    type: "boolean",
    prop: "disabled",
    label: "Disabled",
    initialValue: false,
    defaultValue: false,
  },
  {
    type: "boolean",
    prop: "isLoading",
    label: "Loading",
    initialValue: false,
    defaultValue: false,
  },
]);

export type State = PlaygroundStateFromControls<typeof controls>;
