import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";
export type ItemDescriptionProps = ComponentProps<"p">;

const ItemDescription = ({ className, ...props }: ItemDescriptionProps) => (
  <p
    className={cn(
      "text-muted-foreground [&>a:hover]:text-primary-foreground line-clamp-2 text-left text-sm leading-normal font-normal group-data-[size=xs]/item:text-xs [&>a]:underline [&>a]:underline-offset-4",
      className
    )}
    data-slot="item-description"
    {...props}
  />
);

export { ItemDescription };
