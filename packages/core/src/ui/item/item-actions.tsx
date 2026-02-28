import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";
export type ItemActionsProps = ComponentProps<"div">;

const ItemActions = ({ className, ...props }: ItemActionsProps) => (
  <div
    className={cn("flex items-center gap-2", className)}
    data-slot="item-actions"
    {...props}
  />
);

export { ItemActions };
