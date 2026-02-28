import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Button } from "../../button/button";
import { Drawer } from "../drawer";

const IndentEffectWithPortalContainerDemo = () => {
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(
    null
  );

  return (
    <Drawer.Provider>
      <div
        className="relative w-[min(100%,56rem)] overflow-hidden rounded-2xl [--bleed:3rem]"
        ref={setPortalContainer}
      >
        <Drawer.IndentBackground className="bg-foreground absolute inset-0" />
        <Drawer.Indent className="p-6">
          <div className="flex min-h-[320px] items-center justify-center">
            <Drawer.Root modal={false}>
              <Drawer.Trigger render={<Button variant="outline" size="xl" />}>
                Open drawer
              </Drawer.Trigger>
              <Drawer.Portal container={portalContainer}>
                <Drawer.Backdrop className="bg-foreground absolute inset-0 min-h-dvh opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] [--backdrop-opacity:0.2] data-[ending-style]:opacity-0 data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-[starting-style]:opacity-0 data-[swiping]:duration-0" />
                <Drawer.Viewport className="absolute inset-0 flex items-end justify-center">
                  <Drawer.Popup>
                    <Drawer.Handle />
                    <Drawer.Content>
                      <Drawer.Title className="mb-1 text-center">
                        Notifications
                      </Drawer.Title>
                      <Drawer.Description className="mb-6 text-center">
                        Indent state is coordinated by the provider.
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
          </div>
        </Drawer.Indent>
      </div>
    </Drawer.Provider>
  );
};

const meta: Meta = {
  title: "Components/Drawer/IndentEffectWithPortalContainer",
  component: Drawer.Root,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const IndentEffectWithPortalContainer: Story = {
  render: () => <IndentEffectWithPortalContainerDemo />,
};
