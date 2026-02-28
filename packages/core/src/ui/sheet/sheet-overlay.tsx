"use client";

import { SheetBackdrop } from "./sheet-backdrop";
import type { SheetBackdropProps } from "./sheet-backdrop";
export type SheetOverlayProps = SheetBackdropProps;

const SheetOverlay = ({ className, ...props }: SheetOverlayProps) => (
  <SheetBackdrop className={className} data-slot="sheet-overlay" {...props} />
);

export { SheetOverlay };
