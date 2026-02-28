import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";
export type CardActionProps = ComponentProps<"div">;

const CardAction = ({ className, ...props }: CardActionProps) => (
  <div
    className={cn(
      "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
      className
    )}
    data-slot="card-action"
    {...props}
  />
);

export { CardAction };
