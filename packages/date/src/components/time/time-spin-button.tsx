import type { ComponentProps } from "react";

import { cn, tv } from "tailwind-variants";

const timeSpinButtonVariants = tv({
  base: "inline-flex h-4 w-6 cursor-clickable items-center justify-center rounded-sm border border-border bg-background text-[10px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-[2px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
});

export type TimeSpinButtonProps = ComponentProps<"button"> & {
  direction: "up" | "down";
};

const TimeSpinButton = ({
  className,
  direction,
  ...props
}: TimeSpinButtonProps) => (
  <button
    className={cn(timeSpinButtonVariants(), className)}
    type="button"
    {...props}
  >
    {direction === "up" ? "+" : "-"}
  </button>
);

export { TimeSpinButton };
