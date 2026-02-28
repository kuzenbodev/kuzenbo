"use client";

import { Command as CommandPrimitive } from "cmdk";
import type { ComponentProps } from "react";
import { useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";
import { CommandContext } from "./command-context";

const commandEmptyVariants = tv({
  base: "text-center",
  variants: {
    size: {
      xs: "py-4 text-xs",
      sm: "py-5 text-sm",
      md: "py-6 text-sm",
      lg: "py-7 text-sm",
      xl: "py-8 text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type CommandEmptyProps = ComponentProps<typeof CommandPrimitive.Empty> &
  VariantProps<typeof commandEmptyVariants>;

const CommandEmpty = ({ className, size, ...props }: CommandEmptyProps) => {
  const { size: rootSize } = useContext(CommandContext);
  const resolvedSize: InputSize = size ?? rootSize ?? "md";

  return (
    <CommandPrimitive.Empty
      className={cn(commandEmptyVariants({ size: resolvedSize }), className)}
      data-size={resolvedSize}
      data-slot="command-empty"
      {...props}
    />
  );
};

export { CommandEmpty };
