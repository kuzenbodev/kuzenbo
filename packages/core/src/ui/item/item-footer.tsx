import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";
export type ItemFooterProps = ComponentProps<"div">;

const ItemFooter = ({ className, ...props }: ItemFooterProps) => (
  <div
    className={cn(
      "flex basis-full items-center justify-between gap-2",
      className
    )}
    data-slot="item-footer"
    {...props}
  />
);

export { ItemFooter };
