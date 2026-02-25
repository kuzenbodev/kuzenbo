import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";
export type ItemGroupProps = ComponentProps<"div">;

const ItemGroup = ({ className, ...props }: ItemGroupProps) => (
  <div
    className={cn(
      "group/item-group flex w-full flex-col gap-4 has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2",
      className
    )}
    data-slot="item-group"
    role="list"
    {...props}
  />
);

export { ItemGroup };
