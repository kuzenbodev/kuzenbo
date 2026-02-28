import type { ComponentProps } from "react";
import { useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import { DropdownMenuPopup } from "../dropdown-menu/dropdown-menu";
import type { InputSize } from "../input/input";
import { MenubarContext } from "./menubar-context";
import { MenubarOverlayContext } from "./menubar-overlay-context";

const menubarPopupVariants = tv({
  base: "bg-popover text-popover-foreground ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 shadow-md ring-1 duration-100",
  variants: {
    size: {
      xs: "min-w-28 rounded-[min(var(--radius-lg),10px)]",
      sm: "min-w-32 rounded-[min(var(--radius-lg),12px)]",
      md: "min-w-36 rounded-lg",
      lg: "min-w-40 rounded-lg",
      xl: "min-w-44 rounded-xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type MenubarPopupProps = ComponentProps<typeof DropdownMenuPopup> &
  VariantProps<typeof menubarPopupVariants> & {
    size?: InputSize;
  };

const MenubarPopup = ({ className, size, ...props }: MenubarPopupProps) => {
  const { size: rootSize } = useContext(MenubarContext);
  const { size: overlaySize } = useContext(MenubarOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? rootSize ?? "md";

  return (
    <DropdownMenuPopup
      className={cn(menubarPopupVariants({ size: resolvedSize }), className)}
      data-size={resolvedSize}
      data-slot="menubar-popup"
      size={resolvedSize}
      {...props}
    />
  );
};

export { MenubarPopup };
