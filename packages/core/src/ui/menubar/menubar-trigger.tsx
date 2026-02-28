import type { ComponentProps } from "react";
import { useContext } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { DropdownMenuTrigger } from "../dropdown-menu/dropdown-menu";
import type { InputSize } from "../input/input";
import { MenubarContext } from "./menubar-context";

const menubarTriggerVariants = tv({
  base: "cursor-clickable hover:bg-muted aria-expanded:bg-muted flex items-center font-medium outline-hidden select-none",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "h-8 rounded-md px-2 text-sm",
      md: "h-7 rounded-sm px-1.5 text-sm",
      sm: "h-6 rounded-[min(var(--radius-md),10px)] px-1.5 text-xs",
      xl: "h-9 rounded-md px-2.5 text-base",
      xs: "h-5 rounded-[min(var(--radius-md),8px)] px-1.5 text-xs",
    },
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
