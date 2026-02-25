import type { ComponentProps } from "react";

import { Toast as BaseToast } from "@base-ui/react/toast";

export type ToastPositionerProps = ComponentProps<typeof BaseToast.Positioner>;

export const ToastPositioner = (props: ToastPositionerProps) => (
  <BaseToast.Positioner data-slot="toast-positioner" {...props} />
);
