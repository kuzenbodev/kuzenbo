import type { ComponentProps } from "react";

import { DropdownMenuGroup } from "../dropdown-menu/dropdown-menu";
export type MenubarGroupProps = ComponentProps<typeof DropdownMenuGroup>;

const MenubarGroup = ({ ...props }: MenubarGroupProps) => (
  <DropdownMenuGroup data-slot="menubar-group" {...props} />
);

export { MenubarGroup };
