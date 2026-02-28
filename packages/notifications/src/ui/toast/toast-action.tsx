import { Toast as BaseToast } from "@base-ui/react/toast";
import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

export type ToastActionProps = ComponentProps<typeof BaseToast.Action>;

export const ToastAction = ({ className, ...props }: ToastActionProps) => (
  <BaseToast.Action
    className={cn(
      "cursor-clickable border-border bg-background text-foreground hover:bg-muted focus-visible:border-ring focus-visible:ring-ring/50 inline-flex w-fit shrink-0 items-center justify-center rounded-md border font-medium whitespace-nowrap transition-colors group-data-[size=lg]/toast-root:h-9 group-data-[size=lg]/toast-root:px-3 group-data-[size=lg]/toast-root:text-sm group-data-[size=md]/toast-root:h-8 group-data-[size=md]/toast-root:px-2.5 group-data-[size=md]/toast-root:text-sm group-data-[size=sm]/toast-root:h-7 group-data-[size=sm]/toast-root:px-2.5 group-data-[size=sm]/toast-root:text-xs group-data-[size=xl]/toast-root:h-10 group-data-[size=xl]/toast-root:px-3.5 group-data-[size=xl]/toast-root:text-base group-data-[size=xs]/toast-root:h-6 group-data-[size=xs]/toast-root:px-2 group-data-[size=xs]/toast-root:text-xs focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    data-slot="toast-action"
    {...props}
  />
);
