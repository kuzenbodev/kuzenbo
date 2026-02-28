import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";
export type AlertDialogMediaProps = ComponentProps<"div">;

const AlertDialogMedia = ({ className, ...props }: AlertDialogMediaProps) => (
  <div
    className={cn(
      "bg-muted mb-2 inline-flex size-10 items-center justify-center rounded-md sm:group-data-[size=md]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-6",
      className
    )}
    data-slot="alert-dialog-media"
    {...props}
  />
);

export { AlertDialogMedia };
