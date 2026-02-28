"use client";

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { cn } from "tailwind-variants";
export type SheetTitleProps = SheetPrimitive.Title.Props;

const SheetTitle = ({ className, ...props }: SheetTitleProps) => (
  <SheetPrimitive.Title
    className={cn("text-foreground text-base font-medium", className)}
    data-slot="sheet-title"
    {...props}
  />
);

export { SheetTitle };
