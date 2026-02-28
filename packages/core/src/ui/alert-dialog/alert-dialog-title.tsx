import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";
export type AlertDialogTitleProps = ComponentProps<
  typeof AlertDialogPrimitive.Title
>;

const AlertDialogTitle = ({ className, ...props }: AlertDialogTitleProps) => (
  <AlertDialogPrimitive.Title
    className={cn(
      "text-sm font-medium sm:group-data-[size=md]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
      className
    )}
    data-slot="alert-dialog-title"
    {...props}
  />
);

export { AlertDialogTitle };
