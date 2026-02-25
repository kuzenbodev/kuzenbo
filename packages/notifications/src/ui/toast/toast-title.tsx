import type { ComponentProps } from "react";

import { Toast as BaseToast } from "@base-ui/react/toast";
import { cn } from "tailwind-variants";

export type ToastTitleProps = ComponentProps<typeof BaseToast.Title>;

export const ToastTitle = ({ className, ...props }: ToastTitleProps) => (
  <BaseToast.Title
    className={cn(
      "font-medium group-data-[size=xs]/toast-root:text-xs group-data-[size=xs]/toast-root:leading-4 group-data-[size=sm]/toast-root:text-sm group-data-[size=sm]/toast-root:leading-5 group-data-[size=md]/toast-root:text-sm group-data-[size=md]/toast-root:leading-5 group-data-[size=lg]/toast-root:text-base group-data-[size=lg]/toast-root:leading-6 group-data-[size=xl]/toast-root:text-base group-data-[size=xl]/toast-root:leading-6",
      className
    )}
    data-slot="toast-title"
    {...props}
  />
);
