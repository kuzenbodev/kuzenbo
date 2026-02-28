import { Toast as BaseToast } from "@base-ui/react/toast";
import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";

export type ToastContentProps = ComponentProps<typeof BaseToast.Content>;

const toastContentVariants = tv({
  base: "grid overflow-hidden transition-opacity duration-250 group-data-[size=lg]/toast-root:gap-1.5 group-data-[size=lg]/toast-root:pr-7 group-data-[size=md]/toast-root:gap-1 group-data-[size=md]/toast-root:pr-6 group-data-[size=sm]/toast-root:gap-1 group-data-[size=sm]/toast-root:pr-6 group-data-[size=xl]/toast-root:gap-2 group-data-[size=xl]/toast-root:pr-8 group-data-[size=xs]/toast-root:gap-0.5 group-data-[size=xs]/toast-root:pr-5 data-behind:pointer-events-none data-behind:opacity-0 data-expanded:pointer-events-auto data-expanded:opacity-100",
});

export const ToastContent = ({ className, ...props }: ToastContentProps) => (
  <BaseToast.Content
    className={cn(toastContentVariants(), className)}
    data-slot="toast-content"
    {...props}
  />
);
