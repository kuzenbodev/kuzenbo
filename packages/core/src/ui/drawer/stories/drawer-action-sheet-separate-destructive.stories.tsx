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
    <div className="relative min-h-[36rem] w-[min(100%,56rem)] overflow-hidden rounded-2xl border border-border bg-background p-6">
      <Drawer.Root onOpenChange={setOpen} open={open}>
        <Drawer.Trigger render={<Button variant="outline" size="xl" />}>
          Open action sheet
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Backdrop className="fixed inset-0 min-h-dvh bg-foreground opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] [--backdrop-opacity:0.4] data-[ending-style]:opacity-0 data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-[starting-style]:opacity-0 data-[swiping]:duration-0 supports-[-webkit-touch-callout:none]:absolute dark:[--backdrop-opacity:0.7]" />
          <Drawer.Viewport className="fixed inset-0 flex items-end justify-center">
            <Drawer.Popup className="box-border pointer-events-none flex w-full max-w-[28rem] flex-col gap-3 px-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] outline-none focus-visible:outline-none [transform:translateY(var(--drawer-swipe-movement-y))] transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-[swiping]:select-none data-[starting-style]:[transform:translateY(calc(100%+1rem))] data-[ending-style]:[transform:translateY(calc(100%+1rem))] data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)]">
              <Drawer.Content className="pointer-events-auto overflow-hidden rounded-2xl bg-card text-card-foreground outline outline-1 outline-border">
                <Drawer.Title className="sr-only">Profile actions</Drawer.Title>
                <Drawer.Description className="sr-only">
                  Choose an action for this user.
                </Drawer.Description>
                <ul
                  aria-label="Profile actions"
                  className="m-0 list-none divide-y divide-border p-0"
                >
                  {actions.map((action, index) => (
                    <li key={action}>
                      {index === 0 ? (
                        <Drawer.Close className="sr-only">
                          Close action sheet
                        </Drawer.Close>
                      ) : null}
                      <button
                        className="block w-full border-0 bg-transparent px-5 py-4 text-center text-base text-foreground select-none hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                        onClick={closeActionSheet}
                        type="button"
                      >
                        {action}
                      </button>
                    </li>
                  ))}
                </ul>
              </Drawer.Content>
              <div className="pointer-events-auto overflow-hidden rounded-2xl bg-card outline-1 outline-border">
                <button
                  className="block w-full border-0 bg-transparent px-5 py-4 text-center text-base text-danger-foreground select-none hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
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
  title: "Components/Drawer/ActionSheetSeparateDestructive",
  component: Drawer.Root,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ActionSheetSeparateDestructive: Story = {
  render: () => <ActionSheetSeparateDestructiveDemo />,
};
