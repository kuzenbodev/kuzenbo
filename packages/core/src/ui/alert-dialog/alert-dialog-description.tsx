import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";
export type AlertDialogDescriptionProps = ComponentProps<
  typeof AlertDialogPrimitive.Description
>;

const AlertDialogDescription = ({
  className,
  ...props
}: AlertDialogDescriptionProps) => (
  <AlertDialogPrimitive.Description
    className={cn(
      "text-muted-foreground *:[a]:hover:text-foreground text-sm text-balance md:text-pretty *:[a]:underline *:[a]:underline-offset-3",
      className
    )}
    data-slot="alert-dialog-description"
    {...props}
  />
);

export { AlertDialogDescription };
