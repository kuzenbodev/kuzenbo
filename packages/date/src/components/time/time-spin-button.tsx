import type { ComponentProps } from "react";

import { ArrowDown01Icon, ArrowUp01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn, tv } from "tailwind-variants";

import { DateControlButton } from "../internal/date-control-button";

const timeSpinButtonVariants = tv({
  base: "h-4 w-6 rounded-sm border border-border bg-background p-0 text-[10px] text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-[2px]",
});

export type TimeSpinButtonProps = ComponentProps<"button"> & {
  direction: "up" | "down";
};

const TimeSpinButton = ({
  className,
  direction,
  ...props
}: TimeSpinButtonProps) => (
  <DateControlButton
    className={cn(timeSpinButtonVariants(), className)}
    type="button"
    variant="outline"
    size="icon-xs"
    {...props}
  >
    <HugeiconsIcon
      aria-hidden="true"
      className="size-3"
      icon={direction === "up" ? ArrowUp01Icon : ArrowDown01Icon}
      strokeWidth={2}
    />
  </DateControlButton>
);

export { TimeSpinButton };
