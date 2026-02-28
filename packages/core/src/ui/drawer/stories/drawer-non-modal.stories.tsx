import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../button/button";
import { Drawer } from "../drawer";

const NonModalDemo = () => (
  <div className="border-border bg-background relative min-h-[36rem] w-[min(100%,56rem)] overflow-hidden rounded-2xl border p-6">
    <Drawer.Root disablePointerDismissal modal={false} swipeDirection="right">
      <Drawer.Trigger render={<Button variant="outline" size="xl" />}>
        Open non-modal drawer
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Viewport className="pointer-events-none">
          <Drawer.Popup className="pointer-events-auto shadow-lg">
            <Drawer.Content>
              <Drawer.Title className="-mt-1.5 mb-1">
                Non-modal drawer
              </Drawer.Title>
              <Drawer.Description className="mb-6">
                This drawer does not trap focus and ignores outside clicks.
              </Drawer.Description>
              <Drawer.Actions>
                <Drawer.Close render={<Button variant="outline" size="xl" />}>
                  Close
                </Drawer.Close>
              </Drawer.Actions>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  </div>
);

const meta: Meta = {
  title: "Components/Drawer/NonModal",
  component: Drawer.Root,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const NonModal: Story = {
  render: () => <NonModalDemo />,
};
