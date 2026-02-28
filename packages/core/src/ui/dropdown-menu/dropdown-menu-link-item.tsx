import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { useContext } from "react";
import { tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import type { InputSize } from "../input/input";
import { DropdownMenuContext } from "./dropdown-menu-context";
import { DropdownMenuOverlayContext } from "./dropdown-menu-overlay-context";

const dropdownMenuLinkItemVariants = tv({
  base: "group/dropdown-menu-link-item cursor-clickable focus:bg-accent focus:text-accent-foreground relative flex items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  defaultVariants: {
    inset: false,
    size: "md",
    variant: "default",
  },
  variants: {
    inset: {
      false: "",
      true: "",
    },
    size: {
      lg: "gap-2 rounded-md px-2.5 py-2 text-sm [&_svg:not([class*='size-'])]:size-4",
      md: "gap-2 rounded-sm px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4",
      sm: "gap-1.5 rounded-[min(var(--radius-md),10px)] px-1.5 py-1 text-sm [&_svg:not([class*='size-'])]:size-3.5",
      xl: "gap-2.5 rounded-md px-3 py-2.5 text-base [&_svg:not([class*='size-'])]:size-5",
      xs: "gap-1 rounded-[min(var(--radius-md),8px)] px-1.5 py-1 text-xs [&_svg:not([class*='size-'])]:size-3",
    },
    variant: {
      danger:
        "text-danger-foreground focus:bg-danger focus:text-danger-foreground dark:focus:bg-danger/20 *:[svg]:text-danger-foreground",
      default: "focus:**:text-accent-foreground",
    },
  },
});

export type DropdownMenuLinkItemProps = MenuPrimitive.LinkItem.Props &
  VariantProps<typeof dropdownMenuLinkItemVariants>;

const DropdownMenuLinkItem = ({
  className,
  inset,
  size,
  variant = "default",
  ...props
}: DropdownMenuLinkItemProps) => {
  const { size: rootSize } = useContext(DropdownMenuContext);
  const { size: overlaySize } = useContext(DropdownMenuOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? rootSize ?? "md";

  return (
    <MenuPrimitive.LinkItem
      className={mergeBaseUIClassName<MenuPrimitive.LinkItem.State>(
        dropdownMenuLinkItemVariants({
          inset: Boolean(inset),
          size: resolvedSize,
          variant,
        }),
        className
      )}
      data-inset={inset}
      data-size={resolvedSize}
      data-slot="dropdown-menu-link-item"
      data-variant={variant}
      {...props}
    />
  );
};

export { DropdownMenuLinkItem, dropdownMenuLinkItemVariants };
