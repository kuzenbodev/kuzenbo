import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cn } from "tailwind-variants";
export type DropdownMenuArrowProps = MenuPrimitive.Arrow.Props;

const DropdownMenuArrow = ({ className, ...props }: DropdownMenuArrowProps) => (
  <MenuPrimitive.Arrow
    className={cn("fill-popover stroke-border", className)}
    data-slot="dropdown-menu-arrow"
    {...props}
  />
);

export { DropdownMenuArrow };
