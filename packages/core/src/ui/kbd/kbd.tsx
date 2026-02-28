"use client";

import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";

import { KbdGroup } from "./kbd-group";
import { useKbdResolvedSize } from "./kbd-size-context";
import type { KbdSize } from "./kbd-size-context";

const kbdVariants = tv({
  base: "bg-muted text-muted-foreground [[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10 pointer-events-none inline-flex w-fit items-center justify-center rounded-sm font-sans font-medium select-none",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "h-6 min-w-6 gap-1 px-1.5 text-sm [&_svg:not([class*='size-'])]:size-3.5",
      md: "h-5 min-w-5 gap-1 px-1 text-xs [&_svg:not([class*='size-'])]:size-3",
      sm: "h-5 min-w-5 gap-0.5 px-1 text-[11px] [&_svg:not([class*='size-'])]:size-3",
      xl: "h-7 min-w-7 gap-1.5 px-2 text-sm [&_svg:not([class*='size-'])]:size-4",
      xs: "h-4 min-w-4 gap-0.5 px-1 text-[10px] [&_svg:not([class*='size-'])]:size-2.5",
    },
  },
});

export type KbdProps = ComponentProps<"kbd"> & {
  size?: KbdSize;
};

const Kbd = ({ className, size, ...props }: KbdProps) => {
  const resolvedSize = useKbdResolvedSize(size);

  return (
    <kbd
      className={cn(kbdVariants({ size: resolvedSize }), className)}
      data-size={resolvedSize}
      data-slot="kbd"
      {...props}
    />
  );
};

Kbd.Group = KbdGroup;

export { Kbd, KbdGroup };

export type { KbdGroupProps, KbdGroupSize } from "./kbd-group";
export type { KbdSize } from "./kbd-size-context";
