import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { useContext, useMemo } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";
import { NavigationMenuContext } from "./navigation-menu-context";
import { NavigationMenuOverlayContext } from "./navigation-menu-overlay-context";

const navigationMenuContentVariants = tv({
  base: "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:ring-foreground/10 group-data-[viewport=false]/navigation-menu:data-closed:animate-out group-data-[viewport=false]/navigation-menu:data-closed:fade-out-0 group-data-[viewport=false]/navigation-menu:data-closed:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-open:animate-in group-data-[viewport=false]/navigation-menu:data-open:fade-in-0 group-data-[viewport=false]/navigation-menu:data-open:zoom-in-95 data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out h-full w-auto ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[viewport=false]/navigation-menu:rounded-lg group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:ring-1 group-data-[viewport=false]/navigation-menu:duration-300 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "p-2",
      md: "p-1.5",
      sm: "p-1",
      xl: "p-2.5",
      xs: "p-0.5",
    },
  },
});

export type NavigationMenuContentProps = NavigationMenuPrimitive.Content.Props &
  VariantProps<typeof navigationMenuContentVariants> & {
    size?: InputSize;
  };

const NavigationMenuContent = ({
  className,
  size,
  ...props
}: NavigationMenuContentProps) => {
  const { size: rootSize } = useContext(NavigationMenuContext);
  const { size: overlaySize } = useContext(NavigationMenuOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? rootSize ?? "md";
  const contextValue = useMemo(() => ({ size: resolvedSize }), [resolvedSize]);

  return (
    <NavigationMenuOverlayContext.Provider value={contextValue}>
      <NavigationMenuPrimitive.Content
        className={cn(
          navigationMenuContentVariants({ size: resolvedSize }),
          className
        )}
        data-size={resolvedSize}
        data-slot="navigation-menu-content"
        {...props}
      />
    </NavigationMenuOverlayContext.Provider>
  );
};

export { NavigationMenuContent };
