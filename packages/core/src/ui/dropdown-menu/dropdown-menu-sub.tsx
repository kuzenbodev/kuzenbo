import { Menu as MenuPrimitive } from "@base-ui/react/menu";
export type DropdownMenuSubProps = MenuPrimitive.SubmenuRoot.Props;

const DropdownMenuSub = ({ ...props }: DropdownMenuSubProps) => (
  <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
);

export { DropdownMenuSub };
