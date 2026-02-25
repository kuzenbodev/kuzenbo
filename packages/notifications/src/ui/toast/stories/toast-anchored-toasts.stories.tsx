import type { Meta, StoryObj } from "@storybook/react";

import { useCallback, useMemo, useRef } from "react";
import { cn } from "tailwind-variants";

import { createToastManager, Toast, useToastManager } from "../toast";

const AnchoredToastList = () => {
  const { toasts } = useToastManager();

  return (
    <Toast.Portal>
      <Toast.Viewport className="!inset-0 !right-0 !bottom-0 !mx-0 !h-full !w-full !sm:right-0 !sm:bottom-0 !sm:w-full">
        {toasts.map((toast) => (
          <Toast.Positioner key={toast.id} toast={toast}>
            <Toast.Root toast={toast}>
              <Toast.Arrow className="data-[side=bottom]:-top-1 data-[side=left]:right-[-6px] data-[side=left]:rotate-90 data-[side=right]:left-[-6px] data-[side=right]:-rotate-90 data-[side=top]:-bottom-1 data-[side=top]:rotate-180">
                <span className="block h-2 w-2 rotate-45 border border-border border-r-0 border-b-0 bg-popover" />
              </Toast.Arrow>
              <Toast.Content>
                <Toast.Description />
              </Toast.Content>
            </Toast.Root>
          </Toast.Positioner>
        ))}
      </Toast.Viewport>
    </Toast.Portal>
  );
};

const AnchoredToastDemo = () => {
  const toastManager = useMemo(() => createToastManager(), []);
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const handleClick = useCallback(() => {
    toastManager.add({
      description: "Copied to clipboard.",
      positionerProps: {
        anchor: anchorRef.current,
        side: "top",
        sideOffset: 8,
      },
      timeout: 2500,
    });
  }, [toastManager]);

  return (
    <Toast toastManager={toastManager}>
      <button
        className={cn(
          "inline-flex h-9 cursor-pointer items-center justify-center rounded-md border border-border bg-secondary px-3 text-sm text-secondary-foreground transition-colors hover:bg-secondary/80"
        )}
        onClick={handleClick}
        ref={anchorRef}
        type="button"
      >
        Show anchored toast
      </button>
      <AnchoredToastList />
    </Toast>
  );
};

const meta: Meta<typeof Toast> = {
  title: "Toast notification/AnchoredToasts",
  component: Toast,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        story:
          "Anchors toasts to the trigger using Toast.Positioner and Toast.Arrow.",
      },
    },
  },
  render: () => <AnchoredToastDemo />,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AnchoredToasts: Story = {};
