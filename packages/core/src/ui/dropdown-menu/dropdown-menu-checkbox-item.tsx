import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { DropdownMenuContext } from "./dropdown-menu-context";
import { DropdownMenuOverlayContext } from "./dropdown-menu-overlay-context";

const dropdownMenuCheckboxItemVariants = tv({
  slots: {
    indicator:
      "pointer-events-none absolute flex items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
    root: "relative flex cursor-pointer items-center rounded-md outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  },
  variants: {
    size: {
      xs: {
        indicator: "right-1.5 size-3 [&_svg:not([class*='size-'])]:size-3",
        root: "gap-1 rounded-[min(var(--radius-md),8px)] py-1 pr-6 pl-1.5 text-xs [&_svg:not([class*='size-'])]:size-3",
      },
      sm: {
        indicator: "right-2 size-3.5 [&_svg:not([class*='size-'])]:size-3.5",
        root: "gap-1.5 rounded-[min(var(--radius-md),10px)] py-1 pr-7 pl-2 text-sm [&_svg:not([class*='size-'])]:size-3.5",
      },
      md: {
        indicator: "right-2 size-4 [&_svg:not([class*='size-'])]:size-4",
        root: "gap-1.5 py-1 pr-8 pl-1.5 text-sm [&_svg:not([class*='size-'])]:size-4",
      },
      lg: {
        indicator: "right-2.5 size-4 [&_svg:not([class*='size-'])]:size-4",
        root: "gap-2 py-1.5 pr-9 pl-2 text-sm [&_svg:not([class*='size-'])]:size-4",
      },
      xl: {
        indicator: "right-3 size-5 [&_svg:not([class*='size-'])]:size-5",
        root: "gap-2.5 py-2 pr-10 pl-2.5 text-base [&_svg:not([class*='size-'])]:size-5",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type DropdownMenuCheckboxItemVariantProps = VariantProps<
  typeof dropdownMenuCheckboxItemVariants
>;

export type DropdownMenuCheckboxItemProps = MenuPrimitive.CheckboxItem.Props &
  DropdownMenuCheckboxItemVariantProps;

const DropdownMenuCheckboxItem = ({
  className,
  children,
  checked,
  size,
  ...props
}: DropdownMenuCheckboxItemProps) => {
  const { size: rootSize } = useContext(DropdownMenuContext);
  const { size: overlaySize } = useContext(DropdownMenuOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? rootSize ?? "md";
  const { indicator, root } = dropdownMenuCheckboxItemVariants({
    size: resolvedSize,
  });

  return (
    <MenuPrimitive.CheckboxItem
      checked={checked}
      className={cn(root(), className)}
      data-size={resolvedSize}
      data-slot="dropdown-menu-checkbox-item"
      {...props}
    >
      <span
        className={indicator()}
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <MenuPrimitive.CheckboxItemIndicator>
          <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  );
};

export { DropdownMenuCheckboxItem };
