import type { Meta, StoryObj } from "@storybook/react";
import { useMemo, useState } from "react";

import {
  definePlaygroundControls,
  type PlaygroundPropKeyFromControls,
  type PlaygroundStateFromControls,
} from "../../../playground/playground-control-model";
import { CodeBlock } from "../../code-block/code-block";
import { PlaygroundControls } from "../playground-controls";

const controls = definePlaygroundControls([
  {
    type: "boolean",
    prop: "disabled",
    initialValue: false,
    defaultValue: false,
  },
  {
    type: "select",
    prop: "variant",
    options: ["filled", "outline", "ghost"],
    initialValue: "filled",
    defaultValue: "filled",
  },
  {
    type: "segmented",
    prop: "align",
    options: ["left", "center", "right"],
    initialValue: "left",
    defaultValue: "left",
  },
  {
    type: "number",
    prop: "padding",
    min: 4,
    max: 24,
    step: 2,
    initialValue: 12,
    defaultValue: 12,
  },
  {
    type: "string",
    prop: "label",
    initialValue: "Save changes",
    defaultValue: "Save changes",
  },
  {
    type: "color",
    prop: "tone",
    initialValue: "#2563eb",
    defaultValue: "#2563eb",
    swatches: ["#2563eb", "#0891b2", "#16a34a", "#ea580c"],
  },
  {
    type: "size",
    prop: "size",
    values: ["xs", "sm", "md", "lg"],
    initialValue: "md",
    defaultValue: "md",
  },
] as const);

type ControlsState = PlaygroundStateFromControls<typeof controls>;

interface PlaygroundControlsDemoProps {
  lockVariant?: boolean;
  lockSize?: boolean;
}

const PlaygroundControlsDemo = ({
  lockVariant = false,
  lockSize = false,
}: PlaygroundControlsDemoProps) => {
  const [state, setState] = useState<ControlsState>({
    disabled: false,
    variant: "filled",
    align: "left",
    padding: 12,
    label: "Save changes",
    tone: "#2563eb",
    size: "md",
  });

  const lockedProps = useMemo(() => {
    const nextLocked = new Set<
      PlaygroundPropKeyFromControls<typeof controls>
    >();

    if (lockVariant) {
      nextLocked.add("variant");
    }

    if (lockSize) {
      nextLocked.add("size");
    }

    return nextLocked;
  }, [lockSize, lockVariant]);

  return (
    <div className="space-y-3">
      <PlaygroundControls
        controls={controls}
        lockedProps={lockedProps.size > 0 ? lockedProps : undefined}
        onChange={(prop, value) => {
          setState((currentState) => ({
            ...currentState,
            [prop]: value,
          }));
        }}
        state={state}
      />

      <CodeBlock
        code={JSON.stringify(state, null, 2)}
        language="json"
        toolbar={
          <div className="text-muted-foreground px-3 py-2 text-xs">
            Current playground state
          </div>
        }
      />
    </div>
  );
};

const meta = {
  title: "Code/Playground/PlaygroundControls/Default",
  component: PlaygroundControlsDemo,
  tags: ["autodocs"],
  args: {
    lockVariant: false,
    lockSize: false,
  },
} satisfies Meta<typeof PlaygroundControlsDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLockedVariant: Story = {
  args: {
    lockVariant: true,
  },
};

export const WithLockedVariantAndSize: Story = {
  args: {
    lockVariant: true,
    lockSize: true,
  },
};
