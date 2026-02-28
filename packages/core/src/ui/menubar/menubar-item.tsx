import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { useContext } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { dropdownMenuItemVariants } from "../dropdown-menu/dropdown-menu-item";
import type { InputSize } from "../input/input";
import { MenubarContext } from "./menubar-context";
import { MenubarOverlayContext } from "./menubar-overlay-context";

const menubarItemVariants = tv({
  base: "group/menubar-item cursor-clickable focus:bg-accent focus:text-accent-foreground data-[disabled]:opacity-50",
  extend: dropdownMenuItemVariants,
  variants: {
    variant: {
      danger: "*:[svg]:!text-danger-foreground",
      default: "focus:**:text-accent-foreground",
    },
  },
});

export type MenubarItemProps = MenuPrimitive.Item.Props &
  VariantProps<typeof menubarItemVariants>;

const MenubarItem = ({
  className,
  inset,
  size,
  variant = "default",
  ...props
}: MenubarItemProps) => {
  const { size: rootSize } = useContext(MenubarContext);
  const { size: overlaySize } = useContext(MenubarOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? rootSize ?? "md";

  return (
    <MenuPrimitive.Item
      className={mergeBaseUIClassName<MenuPrimitive.Item.State>(
        menubarItemVariants({
          inset: Boolean(inset),
          size: resolvedSize,
          variant,
        }),
        className
      )}
      data-inset={inset}
      data-size={resolvedSize}
      data-slot="menubar-item"
      data-variant={variant}
      {...props}
    />
  );
};

export { MenubarItem };
