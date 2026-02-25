import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { cn } from "tailwind-variants";
export type NavigationMenuBackdropProps =
  NavigationMenuPrimitive.Backdrop.Props;

const NavigationMenuBackdrop = ({
  className,
  ...props
}: NavigationMenuBackdropProps) => (
  <NavigationMenuPrimitive.Backdrop
    className={cn(className)}
    data-slot="navigation-menu-backdrop"
    {...props}
  />
);

export { NavigationMenuBackdrop };
