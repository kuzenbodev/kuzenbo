import type { Meta, StoryObj } from "@storybook/react";
import type { CSSProperties } from "react";

import { definePlaygroundControls } from "../../../playground/playground-control-model";
import { PlaygroundShell } from "../playground-shell";

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
    defaultValue: "center",
    initialValue: "center",
    options: ["left", "center", "right"],
    prop: "justify",
    type: "segmented",
  },
  {
    defaultValue: 8,
    initialValue: 8,
    max: 24,
    min: 0,
    prop: "radius",
    step: 1,
    type: "number",
  },
  {
    defaultValue: "Ship release",
    initialValue: "Ship release",
    prop: "children",
    type: "string",
  },
  {
    defaultValue: "#3b82f6",
    initialValue: "#3b82f6",
    prop: "color",
    swatches: ["#3b82f6", "#22c55e", "#f97316", "#ef4444"],
    type: "color",
  },
  {
    defaultValue: "md",
    initialValue: "md",
    prop: "size",
    type: "size",
    values: ["xs", "sm", "md", "lg", "xl"],
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
  lg: 17,
  md: 15,
  sm: 13,
  xl: 19,
  xs: 12,
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
        backgroundColor: isFilled ? color : "transparent",
        borderColor: color,
        borderRadius: radius,
        boxShadow: isOutline ? `0 0 0 1px ${color} inset` : "none",
        color: isFilled ? "#ffffff" : color,
        fontSize: FONT_SIZES[size] ?? FONT_SIZES.md,
        justifyContent: resolveJustifyContent(justify),
        opacity: disabled ? 0.6 : 1,
      }}
      type="button"
    >
      {children}
    </button>
  );
};

interface PlaygroundShellDemoProps {
  codeMode?: "minimal" | "full";
  showCode?: boolean;
}

const TEMPLATE = `<Button\n  {{props}}\n>\n  {{children}}\n</Button>`;

export const PlaygroundShellDemo = ({
  codeMode = "minimal",
  showCode = true,
}: PlaygroundShellDemoProps) => (
  <PlaygroundShell
    codeMode={codeMode}
    controls={controls}
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
  args: {
    codeMode: "minimal",
  },
  component: PlaygroundShellDemo,
  tags: ["autodocs"],
  title: "Code/Playground/PlaygroundShell",
} satisfies Meta<typeof PlaygroundShellDemo>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {};

export const FullOutput: Story = {
  args: {
    codeMode: "full",
  },
};

export const PreviewOnly: Story = {
  args: {
    showCode: false,
  },
};
