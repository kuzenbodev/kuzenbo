"use client";

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { cn } from "tailwind-variants";
export type SheetDescriptionProps = SheetPrimitive.Description.Props;

const SheetDescription = ({ className, ...props }: SheetDescriptionProps) => (
  <SheetPrimitive.Description
    className={cn("text-muted-foreground text-sm", className)}
    data-slot="sheet-description"
    {...props}
  />
);

export { SheetDescription };
