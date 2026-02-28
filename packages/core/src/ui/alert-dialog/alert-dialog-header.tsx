import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";
export type AlertDialogHeaderProps = ComponentProps<"div">;

const AlertDialogHeader = ({ className, ...props }: AlertDialogHeaderProps) => (
  <div
    className={cn(
      "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=md]/alert-dialog-content:place-items-start sm:group-data-[size=md]/alert-dialog-content:text-left sm:group-data-[size=md]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
      className
    )}
    data-slot="alert-dialog-header"
    {...props}
  />
);

export { AlertDialogHeader };
