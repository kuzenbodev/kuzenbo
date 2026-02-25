import { useComponentSize } from "../shared/size/size-provider";
import { AlertDialogBackdrop } from "./alert-dialog-backdrop";
import {
  AlertDialogPopup,
  type AlertDialogPopupProps,
  type AlertDialogPopupSize,
} from "./alert-dialog-popup";
import { AlertDialogPortal } from "./alert-dialog-portal";
import { AlertDialogViewport } from "./alert-dialog-viewport";
export type AlertDialogContentProps = AlertDialogPopupProps & {
  size?: AlertDialogPopupSize;
};

const AlertDialogContent = ({
  className,
  size: providedSize,
  ...props
}: AlertDialogContentProps) => {
  const size = useComponentSize(providedSize);

  return (
    <AlertDialogPortal>
      <AlertDialogBackdrop />
      <AlertDialogViewport>
        <AlertDialogPopup
          className={className}
          data-slot="alert-dialog-content"
          size={size}
          {...props}
        />
      </AlertDialogViewport>
    </AlertDialogPortal>
  );
};

export { AlertDialogContent };
