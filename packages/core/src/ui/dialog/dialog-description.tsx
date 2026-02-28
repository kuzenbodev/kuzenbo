"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "tailwind-variants";

export type DialogDescriptionProps = DialogPrimitive.Description.Props;

const DialogDescription = ({ className, ...props }: DialogDescriptionProps) => (
  <DialogPrimitive.Description
    className={cn(
      "text-muted-foreground *:[a]:hover:text-foreground text-sm *:[a]:underline *:[a]:underline-offset-3",
      className
    )}
    data-slot="dialog-description"
    {...props}
  />
);

export { DialogDescription };
