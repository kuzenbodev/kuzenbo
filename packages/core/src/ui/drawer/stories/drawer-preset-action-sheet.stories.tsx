import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";

import { Button } from "../../button/button";
import { Drawer } from "../drawer";

const PresetActionSheetDemo = () => {
  const [open, setOpen] = useState(false);
  const closeActionSheet = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <div className="border-border bg-background relative min-h-[36rem] w-[min(100%,56rem)] overflow-hidden rounded-2xl border p-6">
      <Drawer.ActionSheet
        onOpenChange={setOpen}
        open={open}
        trigger="Open preset action sheet"
        triggerProps={{ render: <Button variant="outline" /> }}
        destructiveAction={
          <button
            className="text-danger-foreground hover:bg-muted focus-visible:bg-muted block w-full border-0 bg-transparent px-5 py-4 text-center text-base select-none focus-visible:outline-none"
            onClick={closeActionSheet}
            type="button"
          >
            Block user
          </button>
        }
      >
        <Drawer.Title className="sr-only">Profile actions</Drawer.Title>
        <Drawer.Description className="sr-only">
          Choose an action for this user.
        </Drawer.Description>
        <ul
          aria-label="Profile actions"
          className="divide-border m-0 list-none divide-y p-0"
        >
          {["Unfollow", "Mute", "Add to Favorites"].map((action) => (
            <li key={action}>
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
      </Drawer.ActionSheet>
    </div>
  );
};

const meta: Meta = {
  component: Drawer.Root,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  title: "Components/Drawer/Presets/ActionSheet",
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ActionSheetPreset: Story = {
  render: () => <PresetActionSheetDemo />,
};
