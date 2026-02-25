import { Menu as MenuPrimitive } from "@base-ui/react/menu";
export type DropdownMenuGroupProps = MenuPrimitive.Group.Props;

const DropdownMenuGroup = ({ ...props }: DropdownMenuGroupProps) => (
  <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
);

export { DropdownMenuGroup };
