import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { cn } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import { useComponentSize } from "../shared/size/size-provider";

export type AlertDialogPopupSize = UISize;
export type AlertDialogPopupProps = AlertDialogPrimitive.Popup.Props & {
  size?: AlertDialogPopupSize;
};

const AlertDialogPopup = ({
  className,
  size: providedSize,
  ...props
}: AlertDialogPopupProps) => {
  const size = useComponentSize(providedSize);

  return (
    <AlertDialogPrimitive.Popup
      className={cn(
        "group/alert-dialog-content fixed top-1/2 left-1/2 z-overlay grid w-full -translate-x-1/2 -translate-y-1/2 rounded-xl bg-background ring-1 ring-foreground/10 duration-100 outline-none data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[size=xs]:max-w-xs data-[size=xs]:gap-1.5 data-[size=xs]:p-2 data-[size=sm]:max-w-sm data-[size=sm]:gap-2 data-[size=sm]:p-3 data-[size=md]:max-w-xs data-[size=md]:gap-3 data-[size=md]:p-4 data-[size=lg]:max-w-xl data-[size=lg]:gap-3.5 data-[size=lg]:p-5 data-[size=xl]:max-w-2xl data-[size=xl]:gap-4 data-[size=xl]:p-6 data-[size=md]:sm:max-w-lg",
        className
      )}
      data-size={size}
      data-slot="alert-dialog-popup"
      {...props}
    />
  );
};

export { AlertDialogPopup };
