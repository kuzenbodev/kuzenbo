import {
  AlertDialogBackdrop,
  type AlertDialogBackdropProps,
} from "./alert-dialog-backdrop";
export type AlertDialogOverlayProps = AlertDialogBackdropProps;

const AlertDialogOverlay = ({
  className,
  ...props
}: AlertDialogOverlayProps) => (
  <AlertDialogBackdrop
    className={className}
    data-slot="alert-dialog-overlay"
    {...props}
  />
);

export { AlertDialogOverlay };
