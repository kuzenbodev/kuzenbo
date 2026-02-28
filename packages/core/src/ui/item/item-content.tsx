import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";
export type ItemContentProps = ComponentProps<"div">;

const ItemContent = ({ className, ...props }: ItemContentProps) => (
  <div
    className={cn(
      "flex flex-1 flex-col gap-1 group-data-[size=xs]/item:gap-0 [&+[data-slot=item-content]]:flex-none",
      className
    )}
    data-slot="item-content"
    {...props}
  />
);

export { ItemContent };
