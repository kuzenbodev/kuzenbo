import {
  definePlaygroundControls,
  type PlaygroundStateFromControls,
} from "@kuzenbo/code/playground/playground-control-model";
import { definePlaygroundPresets } from "@kuzenbo/code/playground/playground-preset-model";

export const buttonPlaygroundControls = definePlaygroundControls([
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

export type ButtonPlaygroundState = PlaygroundStateFromControls<
  typeof buttonPlaygroundControls
>;

export const buttonPlaygroundPresets = definePlaygroundPresets([
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

export const buttonPlaygroundInitialPresetId = "default";

export const buttonPlaygroundTemplate = `import { Button } from "@kuzenbo/core/ui/button";

export function Demo() {
  return (
    <Button
      {{props}}
    >
      {{children}}
    </Button>
  );
}
`;
