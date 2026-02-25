"use client";

import type { ComponentProps } from "react";

import { Command as CommandPrimitive } from "cmdk";
import { cn } from "tailwind-variants";
export type CommandSeparatorProps = ComponentProps<
  typeof CommandPrimitive.Separator
>;

const CommandSeparator = ({ className, ...props }: CommandSeparatorProps) => (
  <CommandPrimitive.Separator
    className={cn("-mx-1 h-px bg-border", className)}
    data-slot="command-separator"
    {...props}
  />
);

export { CommandSeparator };
