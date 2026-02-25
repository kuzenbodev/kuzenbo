import type { ComponentProps } from "react";

import { DropdownMenuArrow } from "../dropdown-menu/dropdown-menu";
export type MenubarArrowProps = ComponentProps<typeof DropdownMenuArrow>;

const MenubarArrow = ({ ...props }: MenubarArrowProps) => (
  <DropdownMenuArrow data-slot="menubar-arrow" {...props} />
);

export { MenubarArrow };
