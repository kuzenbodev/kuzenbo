import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";

import { definePlaygroundPresets } from "../../../playground/playground-preset-model";
import { CodeBlock } from "../../code-block/code-block";
import { PlaygroundPresets } from "../playground-presets";

interface DemoPresetState {
  [key: string]: unknown;
  disabled: boolean;
  variant: "filled" | "outline" | "ghost";
  size: "sm" | "md" | "lg";
}

const presets = definePlaygroundPresets<DemoPresetState>([
  {
    id: "outline",
    label: "Outline",
    locks: ["variant"],
    values: {
      disabled: false,
      size: "md",
      variant: "outline",
    },
  },
  {
    id: "filled",
    label: "Filled",
    values: {
      disabled: false,
      size: "lg",
      variant: "filled",
    },
  },
  {
    id: "disabled",
    label: "Disabled",
    locks: ["disabled"],
    values: {
      disabled: true,
      size: "sm",
      variant: "ghost",
    },
  },
] as const);

type DemoPresetId = (typeof presets)[number]["id"];

interface PlaygroundPresetsDemoProps {
  initialPresetId?: DemoPresetId | null;
}

const PlaygroundPresetsDemo = ({
  initialPresetId = null,
}: PlaygroundPresetsDemoProps) => {
  const [activePresetId, setActivePresetId] = useState<DemoPresetId | null>(
    initialPresetId
  );

  useEffect(() => {
    setActivePresetId(initialPresetId);
  }, [initialPresetId]);

  const activePreset = presets.find((preset) => preset.id === activePresetId);

  return (
    <div className="space-y-3">
      <PlaygroundPresets
        activePresetId={activePresetId}
        onPresetChange={setActivePresetId}
        presets={presets}
      />
      <CodeBlock
        code={
          activePreset
            ? JSON.stringify(activePreset.values, null, 2)
            : '{\n  "mode": "custom"\n}'
        }
        language="json"
        toolbar={
          <div className="text-muted-foreground px-3 py-2 text-xs">
            {activePreset
              ? `Active preset: ${activePreset.label}`
              : "Custom values"}
          </div>
        }
      />
    </div>
  );
};

const meta = {
  args: {
    initialPresetId: null,
  },
  component: PlaygroundPresetsDemo,
  tags: ["autodocs"],
  title: "Code/Playground/PlaygroundPresets/Default",
} satisfies Meta<typeof PlaygroundPresetsDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FilledPresetActive: Story = {
  args: {
    initialPresetId: "filled",
  },
};

export const DisabledPresetActive: Story = {
  args: {
    initialPresetId: "disabled",
  },
};
