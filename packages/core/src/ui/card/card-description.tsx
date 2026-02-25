import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";
export type CardDescriptionProps = ComponentProps<"div">;

const CardDescription = ({ className, ...props }: CardDescriptionProps) => (
  <div
    className={cn(
      "text-muted-foreground group-data-[size=xs]/card:text-xs group-data-[size=sm]/card:text-sm group-data-[size=md]/card:text-sm group-data-[size=lg]/card:text-sm group-data-[size=xl]/card:text-base",
      className
    )}
    data-slot="card-description"
    {...props}
  />
);

export { CardDescription };
