"use client";

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
export type SheetPortalProps = SheetPrimitive.Portal.Props;

const SheetPortal = ({ ...props }: SheetPortalProps) => (
  <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
);

export { SheetPortal };
