import type { ComponentProps } from "react";

import { Toast as BaseToast } from "@base-ui/react/toast";
import { cn } from "tailwind-variants";

export type ToastActionProps = ComponentProps<typeof BaseToast.Action>;

export const ToastAction = ({ className, ...props }: ToastActionProps) => (
  <BaseToast.Action
    className={cn(
      "inline-flex w-fit shrink-0 cursor-clickable items-center justify-center rounded-md border border-border bg-background font-medium whitespace-nowrap text-foreground transition-colors hover:bg-muted focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 group-data-[size=xs]/toast-root:h-6 group-data-[size=xs]/toast-root:px-2 group-data-[size=xs]/toast-root:text-xs group-data-[size=sm]/toast-root:h-7 group-data-[size=sm]/toast-root:px-2.5 group-data-[size=sm]/toast-root:text-xs group-data-[size=md]/toast-root:h-8 group-data-[size=md]/toast-root:px-2.5 group-data-[size=md]/toast-root:text-sm group-data-[size=lg]/toast-root:h-9 group-data-[size=lg]/toast-root:px-3 group-data-[size=lg]/toast-root:text-sm group-data-[size=xl]/toast-root:h-10 group-data-[size=xl]/toast-root:px-3.5 group-data-[size=xl]/toast-root:text-base",
      className
    )}
    data-slot="toast-action"
    {...props}
  />
);
