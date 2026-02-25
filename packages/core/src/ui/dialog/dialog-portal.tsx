"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

export type DialogPortalProps = DialogPrimitive.Portal.Props;

const DialogPortal = ({ ...props }: DialogPortalProps) => (
  <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
);

export { DialogPortal };
