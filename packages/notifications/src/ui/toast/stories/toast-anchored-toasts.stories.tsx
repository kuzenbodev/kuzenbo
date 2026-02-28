import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useMemo, useRef } from "react";
import { cn } from "tailwind-variants";

import { createToastManager, Toast, useToastManager } from "../toast";

const AnchoredToastList = () => {
  const { toasts } = useToastManager();

  return (
    <Toast.Portal>
      <Toast.Viewport className="!sm:right-0 !sm:bottom-0 !sm:w-full !inset-0 !right-0 !bottom-0 !mx-0 !h-full !w-full">
        {toasts.map((toast) => (
          <Toast.Positioner key={toast.id} toast={toast}>
            <Toast.Root toast={toast}>
              <Toast.Arrow className="data-[side=bottom]:-top-1 data-[side=left]:right-[-6px] data-[side=left]:rotate-90 data-[side=right]:left-[-6px] data-[side=right]:-rotate-90 data-[side=top]:-bottom-1 data-[side=top]:rotate-180">
                <span className="border-border bg-popover block h-2 w-2 rotate-45 border border-r-0 border-b-0" />
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
          "border-border bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex h-9 cursor-pointer items-center justify-center rounded-md border px-3 text-sm transition-colors"
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
