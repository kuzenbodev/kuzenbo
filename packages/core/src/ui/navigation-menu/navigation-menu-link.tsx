import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { NavigationMenuContext } from "./navigation-menu-context";
import { NavigationMenuOverlayContext } from "./navigation-menu-overlay-context";

const navigationMenuLinkVariants = tv({
  base: "flex flex-col transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 in-data-[slot=navigation-menu-content]:rounded-md data-active:bg-muted/50 data-active:hover:bg-muted data-active:focus:bg-muted",
  variants: {
    size: {
      xs: "gap-1 rounded-[min(var(--radius-md),8px)] p-1.5 text-xs [&_svg:not([class*='size-'])]:size-3",
      sm: "gap-1.5 rounded-[min(var(--radius-md),10px)] p-2 text-sm [&_svg:not([class*='size-'])]:size-3.5",
      md: "gap-2 rounded-lg p-2 text-sm [&_svg:not([class*='size-'])]:size-4",
      lg: "gap-2 rounded-lg p-2.5 text-sm [&_svg:not([class*='size-'])]:size-4",
      xl: "gap-2.5 rounded-lg p-3 text-base [&_svg:not([class*='size-'])]:size-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type NavigationMenuLinkProps = NavigationMenuPrimitive.Link.Props &
  VariantProps<typeof navigationMenuLinkVariants> & {
    size?: InputSize;
  };

const NavigationMenuLink = ({
  className,
  size,
  ...props
}: NavigationMenuLinkProps) => {
  const { size: rootSize } = useContext(NavigationMenuContext);
  const { size: overlaySize } = useContext(NavigationMenuOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? rootSize ?? "md";

  return (
    <NavigationMenuPrimitive.Link
      className={cn(
        navigationMenuLinkVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="navigation-menu-link"
      {...props}
    />
  );
};

export { NavigationMenuLink };
