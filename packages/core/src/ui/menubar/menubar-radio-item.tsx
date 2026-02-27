import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { MenubarContext } from "./menubar-context";
import { MenubarOverlayContext } from "./menubar-overlay-context";

const menubarRadioItemVariants = tv({
  slots: {
    indicator:
      "pointer-events-none absolute flex items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
    root: "relative flex cursor-clickable items-center rounded-md outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  },
  variants: {
    size: {
      xs: {
        indicator: "left-1 size-3 [&_svg:not([class*='size-'])]:size-3",
        root: "gap-1 rounded-[min(var(--radius-md),8px)] py-1 pr-1.5 pl-6 text-xs [&_svg:not([class*='size-'])]:size-3",
      },
      sm: {
        indicator: "left-1 size-3.5 [&_svg:not([class*='size-'])]:size-3.5",
        root: "gap-1.5 rounded-[min(var(--radius-md),10px)] py-1 pr-1.5 pl-6.5 text-sm [&_svg:not([class*='size-'])]:size-3.5",
      },
      md: {
        indicator: "left-1.5 size-4 [&_svg:not([class*='size-'])]:size-4",
        root: "gap-1.5 py-1 pr-1.5 pl-7 text-sm [&_svg:not([class*='size-'])]:size-4",
      },
      lg: {
        indicator: "left-2 size-4 [&_svg:not([class*='size-'])]:size-4",
        root: "gap-2 py-1.5 pr-2 pl-8 text-sm [&_svg:not([class*='size-'])]:size-4",
      },
      xl: {
        indicator: "left-2.5 size-5 [&_svg:not([class*='size-'])]:size-5",
        root: "gap-2.5 py-2 pr-2.5 pl-9 text-base [&_svg:not([class*='size-'])]:size-5",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type MenubarRadioItemProps = MenuPrimitive.RadioItem.Props &
  VariantProps<typeof menubarRadioItemVariants>;

const MenubarRadioItem = ({
  className,
  children,
  size,
  ...props
}: MenubarRadioItemProps) => {
  const { size: rootSize } = useContext(MenubarContext);
  const { size: overlaySize } = useContext(MenubarOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? rootSize ?? "md";
  const { indicator, root } = menubarRadioItemVariants({
    size: resolvedSize,
  });

  return (
    <MenuPrimitive.RadioItem
      className={cn(root(), className)}
      data-size={resolvedSize}
      data-slot="menubar-radio-item"
      {...props}
    >
      <span className={indicator()}>
        <MenuPrimitive.RadioItemIndicator>
          <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  );
};

export { MenubarRadioItem };
