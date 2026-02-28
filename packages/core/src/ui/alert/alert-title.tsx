import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";
export type AlertTitleProps = ComponentProps<"div">;

const AlertTitle = ({ className, ...props }: AlertTitleProps) => (
  <div
    className={cn(
      "[&_a]:hover:text-foreground font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3",
      className
    )}
    data-slot="alert-title"
    {...props}
  />
);

export { AlertTitle };
