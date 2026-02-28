import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

import { Button } from "../button/button";
export type AlertDialogActionProps = ComponentProps<typeof Button>;

const AlertDialogAction = ({ className, ...props }: AlertDialogActionProps) => (
  <Button
    className={cn("cursor-clickable", className)}
    data-slot="alert-dialog-action"
    {...props}
  />
);

export { AlertDialogAction };
