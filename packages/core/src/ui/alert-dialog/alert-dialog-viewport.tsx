import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { cn } from "tailwind-variants";

export type AlertDialogViewportProps = AlertDialogPrimitive.Viewport.Props;

const AlertDialogViewport = ({
  className,
  ...props
}: AlertDialogViewportProps) => (
  <AlertDialogPrimitive.Viewport
    className={cn(
      "fixed inset-0 z-overlay flex items-center justify-center p-4",
      className
    )}
    data-slot="alert-dialog-viewport"
    {...props}
  />
);

export { AlertDialogViewport };
