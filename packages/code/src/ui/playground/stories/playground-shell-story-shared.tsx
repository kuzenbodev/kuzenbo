import type { Meta, StoryObj } from "@storybook/react";
import type { CSSProperties } from "react";

import {
  definePlaygroundControls,
  type PlaygroundStateFromControls,
} from "../../../playground/playground-control-model";
import { definePlaygroundPresets } from "../../../playground/playground-preset-model";
import { PlaygroundShell } from "../playground-shell";

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
    prop: "justify",
    options: ["left", "center", "right"],
    initialValue: "center",
    defaultValue: "center",
  },
  {
    type: "number",
    prop: "radius",
    initialValue: 8,
    defaultValue: 8,
    min: 0,
    max: 24,
    step: 1,
  },
  {
    type: "string",
    prop: "children",
    initialValue: "Ship release",
    defaultValue: "Ship release",
  },
  {
    type: "color",
    prop: "color",
    initialValue: "#3b82f6",
    defaultValue: "#3b82f6",
    swatches: ["#3b82f6", "#22c55e", "#f97316", "#ef4444"],
  },
  {
    type: "size",
    prop: "size",
    initialValue: "md",
    defaultValue: "md",
    values: ["xs", "sm", "md", "lg", "xl"],
  },
] as const);

const presets = definePlaygroundPresets<
  PlaygroundStateFromControls<typeof controls>
>([
  {
    id: "outlineLocked",
    label: "Outline locked",
    values: {
      variant: "outline",
      size: "sm",
      color: "#0ea5e9",
      radius: 4,
      children: "Open docs",
    },
    locks: ["variant", "size"],
  },
  {
    id: "filledLarge",
    label: "Filled large",
    values: {
      variant: "filled",
      size: "lg",
      color: "#22c55e",
      radius: 14,
      children: "Ship release",
    },
  },
  {
    id: "ghostCompact",
    label: "Ghost compact",
    values: {
      variant: "ghost",
      size: "xs",
      color: "#ef4444",
      radius: 6,
      children: "Cancel deploy",
    },
  },
] as const);

interface PlaygroundDemoPreviewProps {
  disabled: boolean;
  variant: string;
  justify: string;
  radius: number;
  children: string;
  color: string;
  size: string;
}

const FONT_SIZES: Record<string, number> = {
  xs: 12,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 19,
};

const resolveJustifyContent = (
  justify: string
): CSSProperties["justifyContent"] => {
  if (justify === "left") {
    return "flex-start";
  }

  if (justify === "right") {
    return "flex-end";
  }

  return "center";
};

const PlaygroundDemoPreview = ({
  disabled,
  variant,
  justify,
  radius,
  children,
  color,
  size,
}: PlaygroundDemoPreviewProps) => {
  const isFilled = variant === "filled";
  const isOutline = variant === "outline";

  return (
    <button
      className="inline-flex min-w-56 items-center border px-4 py-2 font-medium"
      data-justify={justify}
      data-size={size}
      data-variant={variant}
      disabled={disabled}
      style={{
        borderColor: color,
        backgroundColor: isFilled ? color : "transparent",
        color: isFilled ? "#ffffff" : color,
        borderRadius: radius,
        justifyContent: resolveJustifyContent(justify),
        fontSize: FONT_SIZES[size] ?? FONT_SIZES.md,
        opacity: disabled ? 0.6 : 1,
        boxShadow: isOutline ? `0 0 0 1px ${color} inset` : "none",
      }}
      type="button"
    >
      {children}
    </button>
  );
};

interface PlaygroundShellDemoProps {
  codeMode?: "minimal" | "full";
  initialPresetId?: "outlineLocked" | "filledLarge" | "ghostCompact" | null;
  showCode?: boolean;
}

const TEMPLATE = `<Button\n  {{props}}\n>\n  {{children}}\n</Button>`;

export const PlaygroundShellDemo = ({
  codeMode = "minimal",
  initialPresetId = null,
  showCode = true,
}: PlaygroundShellDemoProps) => (
  <PlaygroundShell
    codeMode={codeMode}
    controls={controls}
    initialPresetId={initialPresetId}
    presets={presets}
    preview={
      <PlaygroundDemoPreview
        children="Ship release"
        color="#3b82f6"
        disabled={false}
        justify="center"
        radius={8}
        size="md"
        variant="filled"
      />
    }
    showCode={showCode}
    template={TEMPLATE}
  />
);

export const baseMeta = {
  title: "Code/Playground/PlaygroundShell",
  component: PlaygroundShellDemo,
  tags: ["autodocs"],
  args: {
    codeMode: "minimal",
  },
} satisfies Meta<typeof PlaygroundShellDemo>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {};

export const FullOutput: Story = {
  args: {
    codeMode: "full",
  },
};

export const WithLockedPreset: Story = {
  args: {
    initialPresetId: "outlineLocked",
  },
};

export const PreviewOnly: Story = {
  args: {
    showCode: false,
    initialPresetId: "ghostCompact",
  },
};

export const FullOutputWithPreset: Story = {
  args: {
    codeMode: "full",
    initialPresetId: "filledLarge",
  },
};

export const LockedPresetWithoutCode: Story = {
  args: {
    showCode: false,
    initialPresetId: "outlineLocked",
  },
};
