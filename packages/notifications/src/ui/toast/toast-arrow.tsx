import { Toast as BaseToast } from "@base-ui/react/toast";
import type { ComponentProps } from "react";

export type ToastArrowProps = ComponentProps<typeof BaseToast.Arrow>;

export const ToastArrow = (props: ToastArrowProps) => (
  <BaseToast.Arrow data-slot="toast-arrow" {...props} />
);
