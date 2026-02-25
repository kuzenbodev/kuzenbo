"use client";

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { cn } from "tailwind-variants";
export type SheetTriggerProps = SheetPrimitive.Trigger.Props;

const SheetTrigger = ({ className, ...props }: SheetTriggerProps) => (
  <SheetPrimitive.Trigger
    className={cn("cursor-pointer", className)}
    data-slot="sheet-trigger"
    {...props}
  />
);

export { SheetTrigger };
