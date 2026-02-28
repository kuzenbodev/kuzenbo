import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";

import { Button } from "../../button/button";
import { Drawer } from "../drawer";

const ActionSheetSeparateDestructiveDemo = () => {
  const [open, setOpen] = useState(false);
  const closeActionSheet = useCallback(() => {
    setOpen(false);
  }, []);
  const actions = [
    "Unfollow",
    "Mute",
    "Add to Favorites",
    "Add to Close Friends",
    "Restrict",
  ];

  return (
    <div className="border-border bg-background relative min-h-[36rem] w-[min(100%,56rem)] overflow-hidden rounded-2xl border p-6">
      <Drawer.Root onOpenChange={setOpen} open={open}>
        <Drawer.Trigger render={<Button variant="outline" size="xl" />}>
          Open action sheet
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Backdrop className="bg-foreground fixed inset-0 min-h-dvh opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] [--backdrop-opacity:0.4] data-[ending-style]:opacity-0 data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-[starting-style]:opacity-0 data-[swiping]:duration-0 supports-[-webkit-touch-callout:none]:absolute dark:[--backdrop-opacity:0.7]" />
          <Drawer.Viewport className="fixed inset-0 flex items-end justify-center">
            <Drawer.Popup className="pointer-events-none box-border flex w-full max-w-[28rem] [transform:translateY(var(--drawer-swipe-movement-y))] flex-col gap-3 px-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] outline-none focus-visible:outline-none data-[ending-style]:[transform:translateY(calc(100%+1rem))] data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-[starting-style]:[transform:translateY(calc(100%+1rem))] data-[swiping]:select-none">
              <Drawer.Content className="bg-card text-card-foreground outline-border pointer-events-auto overflow-hidden rounded-2xl outline outline-1">
                <Drawer.Title className="sr-only">Profile actions</Drawer.Title>
                <Drawer.Description className="sr-only">
                  Choose an action for this user.
                </Drawer.Description>
                <ul
                  aria-label="Profile actions"
                  className="divide-border m-0 list-none divide-y p-0"
                >
                  {actions.map((action, index) => (
                    <li key={action}>
                      {index === 0 ? (
                        <Drawer.Close className="sr-only">
                          Close action sheet
                        </Drawer.Close>
                      ) : null}
                      <button
                        className="text-foreground hover:bg-muted focus-visible:bg-muted block w-full border-0 bg-transparent px-5 py-4 text-center text-base select-none focus-visible:outline-none"
                        onClick={closeActionSheet}
                        type="button"
                      >
                        {action}
                      </button>
                    </li>
                  ))}
                </ul>
              </Drawer.Content>
              <div className="bg-card outline-border pointer-events-auto overflow-hidden rounded-2xl outline-1">
                <button
                  className="text-danger-foreground hover:bg-muted focus-visible:bg-muted block w-full border-0 bg-transparent px-5 py-4 text-center text-base select-none focus-visible:outline-none"
                  onClick={closeActionSheet}
                  type="button"
                >
                  Block user
                </button>
              </div>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};

const meta: Meta = {
  component: Drawer.Root,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  title: "Components/Drawer/ActionSheetSeparateDestructive",
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ActionSheetSeparateDestructive: Story = {
  render: () => <ActionSheetSeparateDestructiveDemo />,
};
