"use client";

import type { ComponentProps } from "react";
import { useContext } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";
import { CommandContext, CommandItemContext } from "./command-context";

const commandShortcutVariants = tv({
  base: "text-muted-foreground group-data-[selected=true]/command-item:text-foreground ml-auto",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "text-xs tracking-widest",
      md: "text-xs tracking-widest",
      sm: "text-xs tracking-wide",
      xl: "text-sm tracking-widest",
      xs: "text-[10px] tracking-wide",
    },
  },
});

export type CommandShortcutProps = ComponentProps<"span"> &
  VariantProps<typeof commandShortcutVariants>;

const CommandShortcut = ({
  className,
  size,
  ...props
}: CommandShortcutProps) => {
  const { size: rootSize } = useContext(CommandContext);
  const { size: itemSize } = useContext(CommandItemContext);
  const resolvedSize: InputSize = size ?? itemSize ?? rootSize ?? "md";

  return (
    <span
      className={cn(commandShortcutVariants({ size: resolvedSize }), className)}
      data-size={resolvedSize}
      data-slot="command-shortcut"
      {...props}
    />
  );
};

export { CommandShortcut };
