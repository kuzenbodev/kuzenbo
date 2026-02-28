import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../button/button";
import { Drawer } from "../drawer";

const AnatomyBaselineDemo = () => (
  <div className="border-border bg-background relative min-h-[36rem] w-[min(100%,56rem)] overflow-hidden rounded-2xl border p-6">
    <Drawer.Provider>
      <Drawer.IndentBackground className="bg-foreground absolute inset-0" />
      <Drawer.Indent className="p-6">
        <Drawer.Root>
          <Drawer.Trigger render={<Button variant="outline" size="xl" />}>
            Open drawer
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Backdrop className="bg-foreground fixed inset-0 min-h-dvh opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] [--backdrop-opacity:0.2] [--bleed:3rem] data-[ending-style]:opacity-0 data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-[starting-style]:opacity-0 data-[swiping]:duration-0 supports-[-webkit-touch-callout:none]:absolute dark:[--backdrop-opacity:0.7]" />
            <Drawer.Viewport className="fixed inset-0 flex items-end justify-center">
              <Drawer.Popup>
                <Drawer.Handle />
                <Drawer.Content>
                  <Drawer.Title className="mb-1 text-center">
                    Drawer
                  </Drawer.Title>
                  <Drawer.Description className="mb-6 text-center">
                    Base anatomy in Kuzenbo with docs-parity transitions.
                  </Drawer.Description>
                  <Drawer.Actions className="justify-center">
                    <Drawer.Close
                      render={<Button variant="outline" size="xl" />}
                    >
                      Close
                    </Drawer.Close>
                  </Drawer.Actions>
                </Drawer.Content>
              </Drawer.Popup>
            </Drawer.Viewport>
          </Drawer.Portal>
        </Drawer.Root>
      </Drawer.Indent>
    </Drawer.Provider>
  </div>
);

const meta: Meta = {
  component: Drawer.Root,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  title: "Components/Drawer/AnatomyBaseline",
};

export default meta;

type Story = StoryObj<typeof meta>;

export const AnatomyBaseline: Story = {
  render: () => <AnatomyBaselineDemo />,
};
