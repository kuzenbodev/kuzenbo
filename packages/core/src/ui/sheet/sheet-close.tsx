"use client";

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { cn } from "tailwind-variants";
export type SheetCloseProps = SheetPrimitive.Close.Props;

const SheetClose = ({ className, ...props }: SheetCloseProps) => (
  <SheetPrimitive.Close
    className={cn("cursor-pointer", className)}
    data-slot="sheet-close"
    {...props}
  />
);

export { SheetClose };
