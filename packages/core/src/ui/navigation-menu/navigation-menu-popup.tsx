import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { NavigationMenuContext } from "./navigation-menu-context";
import { NavigationMenuOverlayContext } from "./navigation-menu-overlay-context";

const navigationMenuPopupVariants = tv({
  base: "xs:w-(--popup-width) relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) bg-popover text-popover-foreground shadow ring-1 ring-foreground/10 transition-all ease-[cubic-bezier(0.22,1,0.36,1)] outline-none data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[ending-style]:duration-150 data-[starting-style]:scale-90 data-[starting-style]:opacity-0",
  variants: {
    size: {
      xs: "rounded-[min(var(--radius-md),8px)]",
      sm: "rounded-[min(var(--radius-md),10px)]",
      md: "rounded-lg",
      lg: "rounded-xl",
      xl: "rounded-xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type NavigationMenuPopupProps = NavigationMenuPrimitive.Popup.Props &
  VariantProps<typeof navigationMenuPopupVariants> & {
    size?: InputSize;
  };

const NavigationMenuPopup = ({
  className,
  size,
  ...props
}: NavigationMenuPopupProps) => {
  const { size: rootSize } = useContext(NavigationMenuContext);
  const { size: overlaySize } = useContext(NavigationMenuOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? rootSize ?? "md";

  return (
    <NavigationMenuPrimitive.Popup
      className={cn(
        navigationMenuPopupVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="navigation-menu-popup"
      {...props}
    />
  );
};

export { NavigationMenuPopup };
