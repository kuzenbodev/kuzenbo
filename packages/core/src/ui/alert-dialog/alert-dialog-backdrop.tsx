import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { cn } from "tailwind-variants";

export type AlertDialogBackdropProps = AlertDialogPrimitive.Backdrop.Props;

const AlertDialogBackdrop = ({
  className,
  ...props
}: AlertDialogBackdropProps) => (
  <AlertDialogPrimitive.Backdrop
    className={cn(
      "fixed inset-0 isolate z-50 bg-black/10 duration-100 data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0 supports-backdrop-filter:backdrop-blur-xs",
      className
    )}
    data-slot="alert-dialog-backdrop"
    {...props}
  />
);

export { AlertDialogBackdrop };
