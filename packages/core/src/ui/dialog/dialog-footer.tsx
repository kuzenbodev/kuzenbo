"use client";

import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";

import { Button } from "../button/button";
import { DialogClose } from "./dialog-close";

export interface DialogFooterProps extends ComponentProps<"div"> {
  showCloseButton?: boolean;
}

const DialogFooter = ({
  className,
  showCloseButton = false,
  children,
  ...props
}: DialogFooterProps) => (
  <div
    className={cn(
      "-mx-4 mt-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl p-4 sm:flex-row sm:justify-end",
      className
    )}
    data-slot="dialog-footer"
    {...props}
  >
    {children}
    {showCloseButton && (
      <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
    )}
  </div>
);

export { DialogFooter };
