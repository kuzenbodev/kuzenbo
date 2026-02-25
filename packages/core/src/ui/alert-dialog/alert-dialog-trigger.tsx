import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { cn } from "tailwind-variants";
export type AlertDialogTriggerProps = AlertDialogPrimitive.Trigger.Props;

const AlertDialogTrigger = ({
  className,
  ...props
}: AlertDialogTriggerProps) => (
  <AlertDialogPrimitive.Trigger
    className={cn("cursor-pointer", className)}
    data-slot="alert-dialog-trigger"
    {...props}
  />
);

export { AlertDialogTrigger };
