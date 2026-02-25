"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "tailwind-variants";

export type DialogTitleProps = DialogPrimitive.Title.Props;

const DialogTitle = ({ className, ...props }: DialogTitleProps) => (
  <DialogPrimitive.Title
    className={cn("text-sm leading-none font-medium", className)}
    data-slot="dialog-title"
    {...props}
  />
);

export { DialogTitle };
