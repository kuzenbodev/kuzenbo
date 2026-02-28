"use client";

import { Command as CommandPrimitive } from "cmdk";
import type { ComponentProps } from "react";
import { useContext } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";
import { CommandContext } from "./command-context";

const commandGroupVariants = tv({
  base: "text-foreground overflow-hidden",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "[&_[cmdk-group-heading]]:text-muted-foreground p-1.5 [&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:font-medium",
      md: "[&_[cmdk-group-heading]]:text-muted-foreground p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
      sm: "[&_[cmdk-group-heading]]:text-muted-foreground p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
      xl: "[&_[cmdk-group-heading]]:text-muted-foreground p-2 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:font-medium",
      xs: "[&_[cmdk-group-heading]]:text-muted-foreground p-0.5 [&_[cmdk-group-heading]]:px-1.5 [&_[cmdk-group-heading]]:py-0.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
    },
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
