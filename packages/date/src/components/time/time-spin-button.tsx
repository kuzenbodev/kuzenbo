import { ArrowDown01Icon, ArrowUp01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ActionIcon } from "@kuzenbo/core/ui/action-icon";
import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";

const timeSpinButtonVariants = tv({
  base: "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground h-4 w-6 rounded-sm border p-0 text-[10px] focus-visible:ring-[2px]",
});

export type TimeSpinButtonProps = ComponentProps<"button"> & {
  direction: "up" | "down";
};

const TimeSpinButton = ({
  className,
  direction,
  ...props
}: TimeSpinButtonProps) => (
  <ActionIcon
    className={cn(timeSpinButtonVariants(), className)}
    type="button"
    variant="outline"
    size="xs"
    {...props}
  >
    <HugeiconsIcon
      aria-hidden="true"
      className="size-3"
      icon={direction === "up" ? ArrowUp01Icon : ArrowDown01Icon}
      strokeWidth={2}
    />
  </ActionIcon>
);

export { TimeSpinButton };
