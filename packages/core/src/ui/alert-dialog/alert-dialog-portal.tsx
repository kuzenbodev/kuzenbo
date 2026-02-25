import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
export type AlertDialogPortalProps = AlertDialogPrimitive.Portal.Props;

const AlertDialogPortal = ({ ...props }: AlertDialogPortalProps) => (
  <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
);

export { AlertDialogPortal };
