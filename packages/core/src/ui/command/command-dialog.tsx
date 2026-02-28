"use client";

import type { ComponentProps, ReactNode } from "react";
import { cn } from "tailwind-variants";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../dialog/dialog";
export type CommandDialogProps = Omit<
  ComponentProps<typeof Dialog>,
  "children"
> & {
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
  children: ReactNode;
};

const CommandDialog = ({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = false,
  ...props
}: CommandDialogProps) => (
  <Dialog {...props}>
    <DialogHeader className="sr-only">
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>{description}</DialogDescription>
    </DialogHeader>
    <DialogContent
      className={cn("overflow-hidden rounded-xl! p-0", className)}
      showCloseButton={showCloseButton}
    >
      {children}
    </DialogContent>
  </Dialog>
);

export { CommandDialog };
