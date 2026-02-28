import type { ComponentProps } from "react";
import { useContext } from "react";

import { DropdownMenu } from "../dropdown-menu/dropdown-menu";
import { MenubarContext } from "./menubar-context";
export type MenubarMenuProps = ComponentProps<typeof DropdownMenu>;

const MenubarMenu = ({ size, ...props }: MenubarMenuProps) => {
  const { size: rootSize } = useContext(MenubarContext);
  const resolvedSize = size ?? rootSize ?? "md";

  return (
    <DropdownMenu data-slot="menubar-menu" size={resolvedSize} {...props} />
  );
};

export { MenubarMenu };
