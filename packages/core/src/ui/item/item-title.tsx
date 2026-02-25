import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";
export type ItemTitleProps = ComponentProps<"div">;

const ItemTitle = ({ className, ...props }: ItemTitleProps) => (
  <div
    className={cn(
      "line-clamp-1 flex w-fit items-center gap-2 text-sm leading-snug font-medium underline-offset-4",
      className
    )}
    data-slot="item-title"
    {...props}
  />
);

export { ItemTitle };
