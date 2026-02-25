"use client";

import type { ComponentProps } from "react";

import { Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Command as CommandPrimitive } from "cmdk";
import { useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { CommandContext, CommandItemContext } from "./command-context";

const commandItemVariants = tv({
  slots: {
    indicator:
      "ml-auto opacity-0 group-has-[[data-slot=command-shortcut]]/command-item:hidden group-data-[checked=true]/command-item:opacity-100 data-[selected=true]:*:[svg]:text-foreground",
    root: "group/command-item relative flex cursor-pointer items-center rounded-sm outline-hidden select-none data-[selected=true]:bg-muted data-[selected=true]:text-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [[data-slot=dialog-content]_&]:rounded-lg!",
  },
  variants: {
    size: {
      xs: {
        indicator: "size-3",
        root: "gap-1 px-1.5 py-1 text-xs [&_svg:not([class*='size-'])]:size-3",
      },
      sm: {
        indicator: "size-3.5",
        root: "gap-1.5 px-2 py-1 text-sm [&_svg:not([class*='size-'])]:size-3.5",
      },
      md: {
        indicator: "size-4",
        root: "gap-2 px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4",
      },
      lg: {
        indicator: "size-4",
        root: "gap-2 px-2.5 py-2 text-sm [&_svg:not([class*='size-'])]:size-4",
      },
      xl: {
        indicator: "size-5",
        root: "gap-2.5 px-3 py-2.5 text-base [&_svg:not([class*='size-'])]:size-5",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type CommandItemProps = ComponentProps<typeof CommandPrimitive.Item> &
  VariantProps<typeof commandItemVariants>;

const CommandItem = ({
  className,
  children,
  size,
  ...props
}: CommandItemProps) => {
  const { size: rootSize } = useContext(CommandContext);
  const resolvedSize: InputSize = size ?? rootSize ?? "md";
  const { indicator, root } = commandItemVariants({ size: resolvedSize });

  return (
    <CommandPrimitive.Item
      className={cn(root(), className)}
      data-size={resolvedSize}
      data-slot="command-item"
      {...props}
    >
      <CommandItemContext.Provider value={{ size: resolvedSize }}>
        {children}
      </CommandItemContext.Provider>
      <HugeiconsIcon
        className={indicator()}
        icon={Tick02Icon}
        strokeWidth={2}
      />
    </CommandPrimitive.Item>
  );
};

export { CommandItem };
