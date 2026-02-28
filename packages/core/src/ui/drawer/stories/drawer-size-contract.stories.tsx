import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../button/button";
import { Drawer } from "../drawer";

const meta: Meta<typeof Drawer.Root> = {
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
  component: Drawer.Root,
  parameters: {
    docs: {
      description: {
        story:
          "Drawer root size cascades to popup/content/typography/actions, while child `size` props override inherited values.",
      },
    },
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  title: "Components/Drawer/SizeContract",
};

export default meta;

type Story = StoryObj<typeof meta>;

export const SizeContract: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <div className="border-border bg-background relative min-h-[36rem] w-[min(100%,56rem)] overflow-hidden rounded-2xl border p-6">
      <Drawer.Root size={args.size}>
        <Drawer.Trigger render={<Button size="xl" variant="outline" />}>
          Open drawer
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Backdrop />
          <Drawer.Viewport className="fixed inset-0 flex items-end justify-center">
            <Drawer.Popup>
              <Drawer.Handle />
              <Drawer.Header>
                <Drawer.Title>Drawer size</Drawer.Title>
                <Drawer.Description>
                  Root `size` controls base density for popup and child slots.
                </Drawer.Description>
              </Drawer.Header>
              <Drawer.Content>
                <Drawer.Actions>
                  <Drawer.Close render={<Button size="xl" variant="outline" />}>
                    Close
                  </Drawer.Close>
                </Drawer.Actions>
              </Drawer.Content>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  ),
};
