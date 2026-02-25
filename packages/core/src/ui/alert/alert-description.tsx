import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";
export type AlertDescriptionProps = ComponentProps<"div">;

const AlertDescription = ({ className, ...props }: AlertDescriptionProps) => (
  <div
    className={cn(
      "text-balance text-muted-foreground md:text-pretty group-data-[size=xs]/alert:text-xs group-data-[size=sm]/alert:text-sm group-data-[size=md]/alert:text-sm group-data-[size=lg]/alert:text-sm group-data-[size=xl]/alert:text-base [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
      className
    )}
    data-slot="alert-description"
    {...props}
  />
);

export { AlertDescription };
