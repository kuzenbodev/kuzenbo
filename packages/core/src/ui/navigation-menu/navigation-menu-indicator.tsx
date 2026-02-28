import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import type { ComponentProps } from "react";
import { useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import type { InputSize } from "../input/input";
import { NavigationMenuContext } from "./navigation-menu-context";

const navigationMenuIndicatorVariants = tv({
  slots: {
    arrow: "bg-border relative rotate-45 shadow-md",
    root: "z-inline top-full flex items-end justify-center overflow-hidden opacity-0 transition-opacity duration-200 data-popup-open:opacity-100",
  },
  variants: {
    size: {
      xs: {
        arrow: "top-[55%] h-1.5 w-1.5 rounded-tl-[2px]",
        root: "h-1",
      },
      sm: {
        arrow: "top-[58%] h-2 w-2 rounded-tl-sm",
        root: "h-1.5",
      },
      md: {
        arrow: "top-[60%] h-2 w-2 rounded-tl-sm",
        root: "h-1.5",
      },
      lg: {
        arrow: "top-[62%] h-2.5 w-2.5 rounded-tl-sm",
        root: "h-2",
      },
      xl: {
        arrow: "top-[64%] h-3 w-3 rounded-tl-sm",
        root: "h-2.5",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type NavigationMenuIndicatorProps = ComponentProps<
  typeof NavigationMenuPrimitive.Icon
> &
  VariantProps<typeof navigationMenuIndicatorVariants> & {
    size?: InputSize;
  };

const NavigationMenuIndicator = ({
  className,
  size,
  ...props
}: NavigationMenuIndicatorProps) => {
  const { size: rootSize } = useContext(NavigationMenuContext);
  const resolvedSize: InputSize = size ?? rootSize ?? "md";
  const { arrow, root } = navigationMenuIndicatorVariants({
    size: resolvedSize,
  });

  return (
    <NavigationMenuPrimitive.Icon
      className={mergeBaseUIClassName<NavigationMenuPrimitive.Icon.State>(
        cn(root()),
        className
      )}
      data-size={resolvedSize}
      data-slot="navigation-menu-indicator"
      {...props}
    >
      <div className={arrow()} />
    </NavigationMenuPrimitive.Icon>
  );
};

export { NavigationMenuIndicator };
