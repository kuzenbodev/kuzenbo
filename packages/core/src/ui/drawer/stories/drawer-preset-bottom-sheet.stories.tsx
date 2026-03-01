import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../button/button";
import { Drawer } from "../drawer";

const PresetBottomSheetDemo = () => (
  <div className="border-border bg-background relative min-h-[36rem] w-[min(100%,56rem)] overflow-hidden rounded-2xl border p-6">
    <Drawer.BottomSheet
      trigger="Open preset bottom sheet"
      triggerProps={{ render: <Button variant="outline" /> }}
    >
      <Drawer.Title className="mb-1 text-center">Notifications</Drawer.Title>
      <Drawer.Description className="mb-6 text-center">
        Preset wrappers reduce setup while keeping primitives available.
      </Drawer.Description>
      <Drawer.Actions className="justify-center">
        <Drawer.Close render={<Button variant="outline" />}>Close</Drawer.Close>
      </Drawer.Actions>
    </Drawer.BottomSheet>
  </div>
);

const meta: Meta = {
  component: Drawer.Root,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  title: "Components/Drawer/Presets/BottomSheet",
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BottomSheetPreset: Story = {
  render: () => <PresetBottomSheetDemo />,
};
