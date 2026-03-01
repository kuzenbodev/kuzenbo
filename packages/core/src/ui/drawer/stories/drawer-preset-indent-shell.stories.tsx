import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../button/button";
import { Drawer } from "../drawer";

const PresetIndentShellDemo = () => (
  <Drawer.IndentShell
    indentProps={{
      className:
        "border-border bg-background relative min-h-[36rem] w-[min(100%,56rem)] overflow-hidden rounded-2xl border p-6",
    }}
  >
    <Drawer.BottomSheet
      trigger="Open indented drawer"
      triggerProps={{ render: <Button variant="outline" /> }}
    >
      <Drawer.Title className="mb-1 text-center">Indented shell</Drawer.Title>
      <Drawer.Description className="mb-6 text-center">
        IndentShell wraps provider and shell primitives for page-level
        indentation.
      </Drawer.Description>
      <Drawer.Actions className="justify-center">
        <Drawer.Close render={<Button variant="outline" />}>Close</Drawer.Close>
      </Drawer.Actions>
    </Drawer.BottomSheet>
  </Drawer.IndentShell>
);

const meta: Meta = {
  component: Drawer.Root,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  title: "Components/Drawer/Presets/IndentShell",
};

export default meta;

type Story = StoryObj<typeof meta>;

export const IndentShellPreset: Story = {
  render: () => <PresetIndentShellDemo />,
};
