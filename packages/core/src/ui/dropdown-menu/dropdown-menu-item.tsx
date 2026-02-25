import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { useContext } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { DropdownMenuContext } from "./dropdown-menu-context";
import { DropdownMenuOverlayContext } from "./dropdown-menu-overlay-context";

const dropdownMenuItemVariants = tv({
  base: "group/dropdown-menu-item relative flex cursor-pointer items-center outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  variants: {
    inset: {
      false: "",
      true: "",
    },
    size: {
      xs: "gap-1 rounded-[min(var(--radius-md),8px)] px-1.5 py-1 text-xs [&_svg:not([class*='size-'])]:size-3",
      sm: "gap-1.5 rounded-[min(var(--radius-md),10px)] px-1.5 py-1 text-sm [&_svg:not([class*='size-'])]:size-3.5",
      md: "gap-2 rounded-sm px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4",
      lg: "gap-2 rounded-md px-2.5 py-2 text-sm [&_svg:not([class*='size-'])]:size-4",
      xl: "gap-2.5 rounded-md px-3 py-2.5 text-base [&_svg:not([class*='size-'])]:size-5",
    },
    variant: {
      danger:
        "text-danger-foreground focus:bg-danger focus:text-danger-foreground dark:focus:bg-danger/20 *:[svg]:text-danger-foreground",
      default: "focus:**:text-accent-foreground",
    },
  },
  defaultVariants: {
    inset: false,
    size: "md",
    variant: "default",
  },
});

export type DropdownMenuItemProps = MenuPrimitive.Item.Props &
  VariantProps<typeof dropdownMenuItemVariants>;

const DropdownMenuItem = ({
  className,
  inset,
  size,
  variant = "default",
  ...props
}: DropdownMenuItemProps) => {
  const { size: rootSize } = useContext(DropdownMenuContext);
  const { size: overlaySize } = useContext(DropdownMenuOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? rootSize ?? "md";

  return (
    <MenuPrimitive.Item
      className={mergeBaseUIClassName<MenuPrimitive.Item.State>(
        dropdownMenuItemVariants({
          inset: Boolean(inset),
          size: resolvedSize,
          variant,
        }),
        className
      )}
      data-inset={inset}
      data-size={resolvedSize}
      data-slot="dropdown-menu-item"
      data-variant={variant}
      {...props}
    />
  );
};

export { DropdownMenuItem, dropdownMenuItemVariants };
