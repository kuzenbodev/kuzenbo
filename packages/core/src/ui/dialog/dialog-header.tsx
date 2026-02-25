import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";

export type DialogHeaderProps = ComponentProps<"div">;

const DialogHeader = ({ className, ...props }: DialogHeaderProps) => (
  <div
    className={cn("flex flex-col gap-2", className)}
    data-slot="dialog-header"
    {...props}
  />
);

export { DialogHeader };
