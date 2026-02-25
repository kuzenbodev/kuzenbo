import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";
export type PopoverHeaderProps = ComponentProps<"div">;

const PopoverHeader = ({ className, ...props }: PopoverHeaderProps) => (
  <div
    className={cn("flex flex-col gap-0.5 text-sm", className)}
    data-slot="popover-header"
    {...props}
  />
);

export { PopoverHeader };
