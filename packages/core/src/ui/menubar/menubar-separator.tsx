import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

import { DropdownMenuSeparator } from "../dropdown-menu/dropdown-menu";
export type MenubarSeparatorProps = ComponentProps<
  typeof DropdownMenuSeparator
>;

const MenubarSeparator = ({ className, ...props }: MenubarSeparatorProps) => (
  <DropdownMenuSeparator
    className={cn("bg-border -mx-1 my-1 h-px", className)}
    data-slot="menubar-separator"
    {...props}
  />
);

export { MenubarSeparator };
