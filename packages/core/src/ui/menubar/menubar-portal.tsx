import type { ComponentProps } from "react";

import { DropdownMenuPortal } from "../dropdown-menu/dropdown-menu";
export type MenubarPortalProps = ComponentProps<typeof DropdownMenuPortal>;

const MenubarPortal = ({ ...props }: MenubarPortalProps) => (
  <DropdownMenuPortal data-slot="menubar-portal" {...props} />
);

export { MenubarPortal };
