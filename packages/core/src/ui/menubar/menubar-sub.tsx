import type { ComponentProps } from "react";

import { DropdownMenuSub } from "../dropdown-menu/dropdown-menu";
export type MenubarSubProps = ComponentProps<typeof DropdownMenuSub>;

const MenubarSub = ({ ...props }: MenubarSubProps) => (
  <DropdownMenuSub data-slot="menubar-sub" {...props} />
);

export { MenubarSub };
