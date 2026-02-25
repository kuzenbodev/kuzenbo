import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { cn } from "tailwind-variants";
export type NavigationMenuArrowProps = NavigationMenuPrimitive.Arrow.Props;

const NavigationMenuArrow = ({
  className,
  ...props
}: NavigationMenuArrowProps) => (
  <NavigationMenuPrimitive.Arrow
    className={cn("fill-popover stroke-border", className)}
    data-slot="navigation-menu-arrow"
    {...props}
  />
);

export { NavigationMenuArrow };
