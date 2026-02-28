import type { Meta, StoryObj } from "@storybook/react";
import { useCallback } from "react";
import { cn } from "tailwind-variants";

import { ToastProvider } from "../toast-provider";
import { useToast } from "../use-toast";

const ToastDemo = () => {
  const toast = useToast();
  const handleClick = useCallback(
    () => toast.add({ title: "Toast notification" }),
    [toast]
  );
  return (
    <button
      className={cn(
        "border-border bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex h-9 cursor-pointer items-center justify-center rounded-md border px-3 text-sm transition-colors"
      )}
      onClick={handleClick}
      type="button"
    >
      Show Toast
    </button>
  );
};

export const baseMeta: Meta<typeof ToastProvider> = {
  title: "Components/Toast",
  component: ToastProvider,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => <ToastDemo />,
};
