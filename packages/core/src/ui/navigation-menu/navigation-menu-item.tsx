import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import type { ComponentProps } from "react";
import { useContext } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";
import { NavigationMenuContext } from "./navigation-menu-context";

const navigationMenuItemVariants = tv({
  base: "relative",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "",
      md: "",
      sm: "",
      xl: "",
      xs: "",
    },
  },
});

export type NavigationMenuItemProps = ComponentProps<
  typeof NavigationMenuPrimitive.Item
> &
  VariantProps<typeof navigationMenuItemVariants> & {
    size?: InputSize;
  };

const NavigationMenuItem = ({
  className,
  size,
  ...props
}: NavigationMenuItemProps) => {
  const { size: rootSize } = useContext(NavigationMenuContext);
  const resolvedSize: InputSize = size ?? rootSize ?? "md";

  return (
    <NavigationMenuPrimitive.Item
      className={cn(
        navigationMenuItemVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="navigation-menu-item"
      {...props}
    />
  );
};

export { NavigationMenuItem };
