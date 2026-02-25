import type { Meta, StoryObj } from "@storybook/react";

import { useCallback } from "react";
import { cn } from "tailwind-variants";

import type { ToastSize } from "../toast";

import { ToastProvider } from "../toast-provider";
import { useToast } from "../use-toast";

const ToastSizeDemo = ({ size }: { size: ToastSize }) => {
  const toast = useToast();
  const handleClick = useCallback(
    () =>
      toast.add({
        description: `Toast surface size: ${size}`,
        title: "Sized toast",
      }),
    [size, toast]
  );

  return (
    <button
      className={cn(
        "inline-flex h-9 cursor-pointer items-center justify-center rounded-md border border-border bg-secondary px-3 text-sm text-secondary-foreground transition-colors hover:bg-secondary/80"
      )}
      onClick={handleClick}
      type="button"
    >
      Show sized toast
    </button>
  );
};

const meta: Meta<typeof ToastProvider> = {
  title: "Toast notification/Sizes",
  component: ToastProvider,
  tags: ["autodocs"],
  args: {
    size: "md",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"] satisfies ToastSize[],
    },
  },
  render: ({ size = "md" }) => (
    <ToastProvider size={size}>
      <ToastSizeDemo size={size} />
    </ToastProvider>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Sizes: Story = {};
