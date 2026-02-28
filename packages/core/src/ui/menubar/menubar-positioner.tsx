import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

import { DropdownMenuPositioner } from "../dropdown-menu/dropdown-menu";
export type MenubarPositionerProps = ComponentProps<
  typeof DropdownMenuPositioner
>;

const MenubarPositioner = ({ className, ...props }: MenubarPositionerProps) => (
  <DropdownMenuPositioner
    className={cn(className)}
    data-slot="menubar-positioner"
    {...props}
  />
);

export { MenubarPositioner };
