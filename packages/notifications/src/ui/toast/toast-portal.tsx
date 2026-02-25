import type { ComponentProps } from "react";

import { Toast as BaseToast } from "@base-ui/react/toast";

export type ToastPortalProps = ComponentProps<typeof BaseToast.Portal>;

export const ToastPortal = (props: ToastPortalProps) => (
  <BaseToast.Portal data-slot="toast-portal" {...props} />
);
