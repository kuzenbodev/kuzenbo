import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

import { Button } from "../button/button";
import { useGlobalUISize } from "../shared/size/size-provider";
export type AlertDialogCancelProps = AlertDialogPrimitive.Close.Props &
  Pick<ComponentProps<typeof Button>, "variant" | "size">;

const AlertDialogCancel = ({
  className,
  variant = "outline",
  size: providedSize,
  ...props
}: AlertDialogCancelProps) => {
  const globalSize = useGlobalUISize();
  const size = providedSize ?? globalSize ?? "md";

  return (
    <AlertDialogPrimitive.Close
      className={cn("cursor-clickable", className)}
      data-slot="alert-dialog-cancel"
      render={<Button size={size} variant={variant} />}
      {...props}
    />
  );
};

export { AlertDialogCancel };
