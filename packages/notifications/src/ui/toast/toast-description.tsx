import type { ComponentProps } from "react";

import { Toast as BaseToast } from "@base-ui/react/toast";
import { cn } from "tailwind-variants";

export type ToastDescriptionProps = ComponentProps<
  typeof BaseToast.Description
>;

export const ToastDescription = ({
  className,
  ...props
}: ToastDescriptionProps) => (
  <BaseToast.Description
    className={cn(
      "text-muted-foreground group-data-[size=xs]/toast-root:text-xs group-data-[size=xs]/toast-root:leading-4 group-data-[size=sm]/toast-root:text-sm group-data-[size=sm]/toast-root:leading-5 group-data-[size=md]/toast-root:text-sm group-data-[size=md]/toast-root:leading-5 group-data-[size=lg]/toast-root:text-sm group-data-[size=lg]/toast-root:leading-5 group-data-[size=xl]/toast-root:text-base group-data-[size=xl]/toast-root:leading-6",
      className
    )}
    data-slot="toast-description"
    {...props}
  />
);
