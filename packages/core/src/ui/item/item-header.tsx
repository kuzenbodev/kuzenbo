import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";
export type ItemHeaderProps = ComponentProps<"div">;

const ItemHeader = ({ className, ...props }: ItemHeaderProps) => (
  <div
    className={cn(
      "flex basis-full items-center justify-between gap-2",
      className
    )}
    data-slot="item-header"
    {...props}
  />
);

export { ItemHeader };
