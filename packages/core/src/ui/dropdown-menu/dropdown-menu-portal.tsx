import { Menu as MenuPrimitive } from "@base-ui/react/menu";
export type DropdownMenuPortalProps = MenuPrimitive.Portal.Props;

const DropdownMenuPortal = ({ ...props }: DropdownMenuPortalProps) => (
  <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
);

export { DropdownMenuPortal };
