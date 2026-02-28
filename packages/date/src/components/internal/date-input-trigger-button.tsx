import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { InputGroup } from "@kuzenbo/core/ui/input-group";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "tailwind-variants";

export type DateInputTriggerButtonProps = Omit<
  ComponentProps<typeof InputGroup.Button>,
  "children"
> & {
  children?: ReactNode;
};

const DateInputTriggerButton = ({
  children = (
    <HugeiconsIcon
      aria-hidden="true"
      className="pointer-events-none size-3.5"
      icon={ArrowDown01Icon}
      strokeWidth={2}
    />
  ),
  className,
  ...props
}: DateInputTriggerButtonProps) => (
  <InputGroup.Button
    className={cn(
      "text-muted-foreground hover:bg-muted hover:text-foreground h-7 w-7 rounded-md border border-transparent",
      className
    )}
    size="icon-xs"
    variant="ghost"
    {...props}
  >
    {children}
  </InputGroup.Button>
);

export { DateInputTriggerButton };
