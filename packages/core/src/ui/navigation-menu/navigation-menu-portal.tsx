import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
export type NavigationMenuPortalProps = NavigationMenuPrimitive.Portal.Props;

const NavigationMenuPortal = ({ ...props }: NavigationMenuPortalProps) => (
  <NavigationMenuPrimitive.Portal
    data-slot="navigation-menu-portal"
    {...props}
  />
);

export { NavigationMenuPortal };
