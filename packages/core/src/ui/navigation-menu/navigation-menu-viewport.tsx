import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { cn } from "tailwind-variants";
export type NavigationMenuViewportProps =
  NavigationMenuPrimitive.Viewport.Props;

const NavigationMenuViewport = ({
  className,
  ...props
}: NavigationMenuViewportProps) => (
  <NavigationMenuPrimitive.Viewport
    className={cn("relative size-full overflow-hidden", className)}
    data-slot="navigation-menu-viewport"
    {...props}
  />
);

export { NavigationMenuViewport };
