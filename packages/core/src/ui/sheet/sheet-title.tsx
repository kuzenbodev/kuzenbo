"use client";

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { cn } from "tailwind-variants";
export type SheetTitleProps = SheetPrimitive.Title.Props;

const SheetTitle = ({ className, ...props }: SheetTitleProps) => (
  <SheetPrimitive.Title
    className={cn("text-base font-medium text-foreground", className)}
    data-slot="sheet-title"
    {...props}
  />
);

export { SheetTitle };
