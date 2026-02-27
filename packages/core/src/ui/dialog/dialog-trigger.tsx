"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "tailwind-variants";

export type DialogTriggerProps = DialogPrimitive.Trigger.Props;

const DialogTrigger = ({ className, ...props }: DialogTriggerProps) => (
  <DialogPrimitive.Trigger
    className={cn("cursor-clickable", className)}
    data-slot="dialog-trigger"
    {...props}
  />
);

export { DialogTrigger };
