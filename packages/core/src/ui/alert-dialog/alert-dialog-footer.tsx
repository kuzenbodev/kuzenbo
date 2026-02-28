import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";
export type AlertDialogFooterProps = ComponentProps<"div">;

const AlertDialogFooter = ({ className, ...props }: AlertDialogFooterProps) => (
  <div
    className={cn(
      "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl p-4 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
      className
    )}
    data-slot="alert-dialog-footer"
    {...props}
  />
);

export { AlertDialogFooter };
