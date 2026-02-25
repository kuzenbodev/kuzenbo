import type { ComponentProps } from "react";

import { Toast as BaseToast } from "@base-ui/react/toast";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "tailwind-variants";

export type ToastCloseProps = ComponentProps<typeof BaseToast.Close>;

export const ToastClose = ({
  className,
  children,
  ...props
}: ToastCloseProps) => (
  <BaseToast.Close
    className={cn(
      "absolute flex items-center justify-center rounded border-none bg-transparent text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground group-data-[size=xs]/toast-root:top-1.5 group-data-[size=xs]/toast-root:right-1.5 group-data-[size=xs]/toast-root:h-4 group-data-[size=xs]/toast-root:w-4 group-data-[size=sm]/toast-root:top-2 group-data-[size=sm]/toast-root:right-2 group-data-[size=sm]/toast-root:h-4.5 group-data-[size=sm]/toast-root:w-4.5 group-data-[size=md]/toast-root:top-2 group-data-[size=md]/toast-root:right-2 group-data-[size=md]/toast-root:h-5 group-data-[size=md]/toast-root:w-5 group-data-[size=lg]/toast-root:top-2.5 group-data-[size=lg]/toast-root:right-2.5 group-data-[size=lg]/toast-root:h-5.5 group-data-[size=lg]/toast-root:w-5.5 group-data-[size=xl]/toast-root:top-3 group-data-[size=xl]/toast-root:right-3 group-data-[size=xl]/toast-root:h-6 group-data-[size=xl]/toast-root:w-6 [&>svg]:size-3 group-data-[size=sm]/toast-root:[&>svg]:size-3.5 group-data-[size=md]/toast-root:[&>svg]:size-4 group-data-[size=lg]/toast-root:[&>svg]:size-4 group-data-[size=xl]/toast-root:[&>svg]:size-5",
      className
    )}
    data-slot="toast-close"
    {...props}
  >
    {children ?? (
      <HugeiconsIcon
        className="shrink-0"
        color="currentColor"
        icon={Cancel01Icon}
        strokeWidth={1.5}
      />
    )}
  </BaseToast.Close>
);
