import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../button/button";
import { Drawer } from "../drawer";

const SideDrawerRightDemo = () => (
  <div className="relative min-h-[36rem] w-[min(100%,56rem)] overflow-hidden rounded-2xl border border-border bg-background p-6">
    <Drawer.Root swipeDirection="right">
      <Drawer.Trigger render={<Button variant="outline" size="xl" />}>
        Open right drawer
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop className="[--backdrop-opacity:0.2] [--bleed:3rem] fixed inset-0 min-h-dvh bg-foreground opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-[swiping]:duration-0 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] supports-[-webkit-touch-callout:none]:absolute dark:[--backdrop-opacity:0.7]" />
        <Drawer.Viewport>
          <Drawer.Popup>
            <Drawer.Content>
              <Drawer.Title className="-mt-1.5 mb-1">Drawer</Drawer.Title>
              <Drawer.Description className="mb-6">
                Swipe from right to dismiss.
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
  title: "Components/Drawer/SideDrawerRight",
  component: Drawer.Root,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const SideDrawerRight: Story = {
  render: () => <SideDrawerRightDemo />,
};
