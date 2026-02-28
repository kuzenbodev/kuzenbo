import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import type { ComponentProps } from "react";
import { useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";
import { NavigationMenuContext } from "./navigation-menu-context";

const navigationMenuListVariants = tv({
  base: "group flex flex-1 list-none items-center justify-center",
  variants: {
    size: {
      xs: "gap-0.5",
      sm: "gap-0.5",
      md: "gap-0",
      lg: "gap-0.5",
      xl: "gap-1",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type NavigationMenuListProps = ComponentProps<
  typeof NavigationMenuPrimitive.List
> &
  VariantProps<typeof navigationMenuListVariants> & {
    size?: InputSize;
  };

const NavigationMenuList = ({
  className,
  size,
  ...props
}: NavigationMenuListProps) => {
  const { size: rootSize } = useContext(NavigationMenuContext);
  const resolvedSize: InputSize = size ?? rootSize ?? "md";

  return (
    <NavigationMenuPrimitive.List
      className={cn(
        navigationMenuListVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="navigation-menu-list"
      {...props}
    />
  );
};

export { NavigationMenuList };
