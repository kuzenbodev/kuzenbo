import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";
export type AlertTitleProps = ComponentProps<"div">;

const AlertTitle = ({ className, ...props }: AlertTitleProps) => (
  <div
    className={cn(
      "font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
      className
    )}
    data-slot="alert-title"
    {...props}
  />
);

export { AlertTitle };
