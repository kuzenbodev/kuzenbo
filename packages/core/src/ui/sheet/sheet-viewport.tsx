"use client";

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { cn } from "tailwind-variants";

export type SheetViewportProps = SheetPrimitive.Viewport.Props;

const SheetViewport = ({ className, ...props }: SheetViewportProps) => (
  <SheetPrimitive.Viewport
    className={cn("fixed inset-0 z-50", className)}
    data-slot="sheet-viewport"
    {...props}
  />
);

export { SheetViewport };
