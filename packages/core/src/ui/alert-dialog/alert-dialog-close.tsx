import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";

export type AlertDialogCloseProps = AlertDialogPrimitive.Close.Props;

const AlertDialogClose = ({ ...props }: AlertDialogCloseProps) => (
  <AlertDialogPrimitive.Close data-slot="alert-dialog-close" {...props} />
);

export { AlertDialogClose };
