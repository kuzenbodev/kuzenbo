"use client";

import type { ComponentProps } from "react";

import { Command as CommandPrimitive } from "cmdk";
import { useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { CommandContext } from "./command-context";

const commandGroupVariants = tv({
  base: "overflow-hidden text-foreground",
  variants: {
    size: {
      xs: "p-0.5 [&_[cmdk-group-heading]]:px-1.5 [&_[cmdk-group-heading]]:py-0.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      sm: "p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      md: "p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      lg: "p-1.5 [&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      xl: "p-2 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type CommandGroupProps = ComponentProps<typeof CommandPrimitive.Group> &
  VariantProps<typeof commandGroupVariants>;

const CommandGroup = ({ className, size, ...props }: CommandGroupProps) => {
  const { size: rootSize } = useContext(CommandContext);
  const resolvedSize: InputSize = size ?? rootSize ?? "md";

  return (
    <CommandPrimitive.Group
      className={cn(commandGroupVariants({ size: resolvedSize }), className)}
      data-size={resolvedSize}
      data-slot="command-group"
      {...props}
    />
  );
};

export { CommandGroup };
