import type { Meta, StoryObj } from "@storybook/react";
import { useMemo, useState } from "react";

import { definePlaygroundControls } from "../../../playground/playground-control-model";
import type {
  PlaygroundPropKeyFromControls,
  PlaygroundStateFromControls,
} from "../../../playground/playground-control-model";
import { CodeBlock } from "../../code-block/code-block";
import { PlaygroundControls } from "../playground-controls";

const controls = definePlaygroundControls([
  {
    defaultValue: false,
    initialValue: false,
    prop: "disabled",
    type: "boolean",
  },
  {
    defaultValue: "filled",
    initialValue: "filled",
    options: ["filled", "outline", "ghost"],
    prop: "variant",
    type: "select",
  },
  {
    defaultValue: "left",
    initialValue: "left",
    options: ["left", "center", "right"],
    prop: "align",
    type: "segmented",
  },
  {
    defaultValue: 12,
    initialValue: 12,
    max: 24,
    min: 4,
    prop: "padding",
    step: 2,
    type: "number",
  },
  {
    defaultValue: "Save changes",
    initialValue: "Save changes",
    prop: "label",
    type: "string",
  },
  {
    defaultValue: "#2563eb",
    initialValue: "#2563eb",
    prop: "tone",
    swatches: ["#2563eb", "#0891b2", "#16a34a", "#ea580c"],
    type: "color",
  },
  {
    defaultValue: "md",
    initialValue: "md",
    prop: "size",
    type: "size",
    values: ["xs", "sm", "md", "lg"],
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
    align: "left",
    disabled: false,
    label: "Save changes",
    padding: 12,
    size: "md",
    tone: "#2563eb",
    variant: "filled",
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
  args: {
    lockSize: false,
    lockVariant: false,
  },
  component: PlaygroundControlsDemo,
  tags: ["autodocs"],
  title: "Code/Playground/PlaygroundControls/Default",
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
    lockSize: true,
    lockVariant: true,
  },
};
