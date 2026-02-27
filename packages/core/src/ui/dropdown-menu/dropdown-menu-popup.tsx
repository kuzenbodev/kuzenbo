import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { DropdownMenuContext } from "./dropdown-menu-context";
import { DropdownMenuOverlayContext } from "./dropdown-menu-overlay-context";

const dropdownMenuPopupVariants = tv({
  base: "z-overlay max-h-(--available-height) w-(--anchor-width) origin-(--transform-origin) overflow-x-hidden overflow-y-auto bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  variants: {
    size: {
      xs: "min-w-24 rounded-[min(var(--radius-md),8px)] p-0.5",
      sm: "min-w-28 rounded-[min(var(--radius-md),10px)] p-0.5",
      md: "min-w-32 rounded-md p-1",
      lg: "min-w-36 rounded-md p-1.5",
      xl: "min-w-40 rounded-md p-2",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type DropdownMenuPopupVariantProps = VariantProps<
  typeof dropdownMenuPopupVariants
>;

export type DropdownMenuPopupProps = MenuPrimitive.Popup.Props &
  DropdownMenuPopupVariantProps;

const DropdownMenuPopup = ({
  className,
  size,
  ...props
}: DropdownMenuPopupProps) => {
  const { size: rootSize } = useContext(DropdownMenuContext);
  const { size: overlaySize } = useContext(DropdownMenuOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? rootSize ?? "md";

  return (
    <MenuPrimitive.Popup
      className={cn(
        dropdownMenuPopupVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="dropdown-menu-popup"
      {...props}
    />
  );
};

export { DropdownMenuPopup };
