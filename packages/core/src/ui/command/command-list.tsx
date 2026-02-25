"use client";

import type { ComponentProps } from "react";

import { Command as CommandPrimitive } from "cmdk";
import { useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { CommandContext } from "./command-context";

const commandListVariants = tv({
  base: "no-scrollbar overflow-x-hidden overflow-y-auto outline-none",
  variants: {
    size: {
      xs: "max-h-60 scroll-py-0.5",
      sm: "max-h-64 scroll-py-1",
      md: "max-h-72 scroll-py-1",
      lg: "max-h-80 scroll-py-1.5",
      xl: "max-h-96 scroll-py-2",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type CommandListProps = ComponentProps<typeof CommandPrimitive.List> &
  VariantProps<typeof commandListVariants>;

const CommandList = ({ className, size, ...props }: CommandListProps) => {
  const { size: rootSize } = useContext(CommandContext);
  const resolvedSize: InputSize = size ?? rootSize ?? "md";

  return (
    <CommandPrimitive.List
      className={cn(commandListVariants({ size: resolvedSize }), className)}
      data-size={resolvedSize}
      data-slot="command-list"
      {...props}
    />
  );
};

export { CommandList };
