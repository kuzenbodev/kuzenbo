"use client";

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { cn } from "tailwind-variants";

export type SheetBackdropProps = SheetPrimitive.Backdrop.Props;

const SheetBackdrop = ({ className, ...props }: SheetBackdropProps) => (
  <SheetPrimitive.Backdrop
    className={cn(
      "z-overlay data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0 fixed inset-0 bg-black/10 duration-100 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs",
      className
    )}
    data-slot="sheet-backdrop"
    {...props}
  />
);

export { SheetBackdrop };
