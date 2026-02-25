import type { ComponentProps } from "react";

import { Toast as BaseToast } from "@base-ui/react/toast";

export type ToastArrowProps = ComponentProps<typeof BaseToast.Arrow>;

export const ToastArrow = (props: ToastArrowProps) => (
  <BaseToast.Arrow data-slot="toast-arrow" {...props} />
);
