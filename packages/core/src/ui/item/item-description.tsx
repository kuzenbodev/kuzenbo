import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";
export type ItemDescriptionProps = ComponentProps<"p">;

const ItemDescription = ({ className, ...props }: ItemDescriptionProps) => (
  <p
    className={cn(
      "line-clamp-2 text-left text-sm leading-normal font-normal text-muted-foreground group-data-[size=xs]/item:text-xs [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary-foreground",
      className
    )}
    data-slot="item-description"
    {...props}
  />
);

export { ItemDescription };
