import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { useContext } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { dropdownMenuLinkItemVariants } from "../dropdown-menu/dropdown-menu-link-item";
import type { InputSize } from "../input/input";
import { MenubarContext } from "./menubar-context";
import { MenubarOverlayContext } from "./menubar-overlay-context";

const menubarLinkItemVariants = tv({
  base: "group/menubar-link-item cursor-clickable focus:bg-accent focus:text-accent-foreground data-[disabled]:opacity-50",
  extend: dropdownMenuLinkItemVariants,
  variants: {
    variant: {
      danger: "*:[svg]:!text-danger-foreground",
      default: "focus:**:text-accent-foreground",
    },
  },
});

export type MenubarLinkItemProps = MenuPrimitive.LinkItem.Props &
  VariantProps<typeof menubarLinkItemVariants>;

const MenubarLinkItem = ({
  className,
  inset,
  size,
  variant = "default",
  ...props
}: MenubarLinkItemProps) => {
  const { size: rootSize } = useContext(MenubarContext);
  const { size: overlaySize } = useContext(MenubarOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? rootSize ?? "md";

  return (
    <MenuPrimitive.LinkItem
      className={mergeBaseUIClassName<MenuPrimitive.LinkItem.State>(
        menubarLinkItemVariants({
          inset: Boolean(inset),
          size: resolvedSize,
          variant,
        }),
        className
      )}
      data-inset={inset}
      data-size={resolvedSize}
      data-slot="menubar-link-item"
      data-variant={variant}
      {...props}
    />
  );
};

export { MenubarLinkItem };
