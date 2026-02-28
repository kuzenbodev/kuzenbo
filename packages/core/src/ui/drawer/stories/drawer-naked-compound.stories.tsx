import type { Meta, StoryObj } from "@storybook/react";

import { Drawer } from "../drawer";

const NakedCompoundDemo = () => (
  <Drawer.Root>
    <Drawer.Trigger>Open</Drawer.Trigger>
    <Drawer.Portal>
      <Drawer.Backdrop />
      <Drawer.Viewport>
        <Drawer.Popup>
          <Drawer.Handle />
          <Drawer.Content>
            <Drawer.Title>Naked compound drawer</Drawer.Title>
            <Drawer.Description>
              No className overrides. Components use built-in defaults.
            </Drawer.Description>
            <Drawer.Actions>
              <Drawer.Close>Close</Drawer.Close>
            </Drawer.Actions>
          </Drawer.Content>
        </Drawer.Popup>
      </Drawer.Viewport>
    </Drawer.Portal>
  </Drawer.Root>
);

const meta: Meta = {
  component: Drawer.Root,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  title: "Components/Drawer/NakedCompound",
};

export default meta;

type Story = StoryObj<typeof meta>;

export const NakedCompound: Story = {
  render: () => <NakedCompoundDemo />,
};
