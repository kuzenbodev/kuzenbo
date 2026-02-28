"use client";

import { Command as CommandPrimitive } from "cmdk";
import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";
export type CommandSeparatorProps = ComponentProps<
  typeof CommandPrimitive.Separator
>;

const CommandSeparator = ({ className, ...props }: CommandSeparatorProps) => (
  <CommandPrimitive.Separator
    className={cn("bg-border -mx-1 h-px", className)}
    data-slot="command-separator"
    {...props}
  />
);

export { CommandSeparator };
