import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../button/button";
import { Drawer } from "../drawer";

const PresetSidePanelDemo = () => (
  <div className="border-border bg-background relative min-h-[36rem] w-[min(100%,56rem)] overflow-hidden rounded-2xl border p-6">
    <Drawer.SidePanel
      side="right"
      trigger="Open preset side panel"
      triggerProps={{ render: <Button variant="outline" /> }}
    >
      <Drawer.Title className="-mt-1.5 mb-1">Drawer</Drawer.Title>
      <Drawer.Description className="mb-6">
        Preset side panel maps side to swipe direction automatically.
      </Drawer.Description>
      <Drawer.Actions>
        <Drawer.Close render={<Button variant="outline" />}>Close</Drawer.Close>
      </Drawer.Actions>
    </Drawer.SidePanel>
  </div>
);

const meta: Meta = {
  component: Drawer.Root,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  title: "Components/Drawer/Presets/SidePanel",
};

export default meta;

type Story = StoryObj<typeof meta>;

export const SidePanelPreset: Story = {
  render: () => <PresetSidePanelDemo />,
};
