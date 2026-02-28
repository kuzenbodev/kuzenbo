import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";
export type AlertActionProps = ComponentProps<"div">;

const AlertAction = ({ className, ...props }: AlertActionProps) => (
  <div
    className={cn(
      "absolute group-data-[size=lg]/alert:top-2.5 group-data-[size=lg]/alert:right-2.5 group-data-[size=md]/alert:top-2 group-data-[size=md]/alert:right-2 group-data-[size=sm]/alert:top-2 group-data-[size=sm]/alert:right-2 group-data-[size=xl]/alert:top-3 group-data-[size=xl]/alert:right-3 group-data-[size=xs]/alert:top-1.5 group-data-[size=xs]/alert:right-1.5",
      className
    )}
    data-slot="alert-action"
    {...props}
  />
);

export { AlertAction };
