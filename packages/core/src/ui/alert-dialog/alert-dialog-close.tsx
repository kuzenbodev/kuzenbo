import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { cn } from "tailwind-variants";

export type AlertDialogCloseProps = AlertDialogPrimitive.Close.Props;

const AlertDialogClose = ({ className, ...props }: AlertDialogCloseProps) => (
  <AlertDialogPrimitive.Close
    className={cn("cursor-clickable", className)}
    data-slot="alert-dialog-close"
    {...props}
  />
);

export { AlertDialogClose };
