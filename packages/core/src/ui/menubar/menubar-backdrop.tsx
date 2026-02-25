import type { ComponentProps } from "react";

import { DropdownMenuBackdrop } from "../dropdown-menu/dropdown-menu";
export type MenubarBackdropProps = ComponentProps<typeof DropdownMenuBackdrop>;

const MenubarBackdrop = ({ ...props }: MenubarBackdropProps) => (
  <DropdownMenuBackdrop data-slot="menubar-backdrop" {...props} />
);

export { MenubarBackdrop };
