import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";
export type AlertDescriptionProps = ComponentProps<"div">;

const AlertDescription = ({ className, ...props }: AlertDescriptionProps) => (
  <div
    className={cn(
      "text-muted-foreground [&_a]:hover:text-foreground text-balance group-data-[size=lg]/alert:text-sm group-data-[size=md]/alert:text-sm group-data-[size=sm]/alert:text-sm group-data-[size=xl]/alert:text-base group-data-[size=xs]/alert:text-xs md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4",
      className
    )}
    data-slot="alert-description"
    {...props}
  />
);

export { AlertDescription };
