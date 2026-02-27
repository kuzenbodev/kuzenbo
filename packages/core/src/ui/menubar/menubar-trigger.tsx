import type { ComponentProps } from "react";

import { useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { DropdownMenuTrigger } from "../dropdown-menu/dropdown-menu";
import { MenubarContext } from "./menubar-context";

const menubarTriggerVariants = tv({
  base: "flex cursor-clickable items-center font-medium outline-hidden select-none hover:bg-muted aria-expanded:bg-muted",
  variants: {
    size: {
      xs: "h-5 rounded-[min(var(--radius-md),8px)] px-1.5 text-xs",
      sm: "h-6 rounded-[min(var(--radius-md),10px)] px-1.5 text-xs",
      md: "h-7 rounded-sm px-1.5 text-sm",
      lg: "h-8 rounded-md px-2 text-sm",
      xl: "h-9 rounded-md px-2.5 text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type MenubarTriggerProps = ComponentProps<typeof DropdownMenuTrigger> &
  VariantProps<typeof menubarTriggerVariants> & {
    size?: InputSize;
  };

const MenubarTrigger = ({ className, size, ...props }: MenubarTriggerProps) => {
  const { size: rootSize } = useContext(MenubarContext);
  const resolvedSize: InputSize = size ?? rootSize ?? "md";

  return (
    <DropdownMenuTrigger
      className={cn(menubarTriggerVariants({ size: resolvedSize }), className)}
      data-size={resolvedSize}
      data-slot="menubar-trigger"
      {...props}
    />
  );
};

export { MenubarTrigger };
