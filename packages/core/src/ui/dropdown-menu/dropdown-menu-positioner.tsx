import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cn } from "tailwind-variants";
export type DropdownMenuPositionerProps = MenuPrimitive.Positioner.Props;

const DropdownMenuPositioner = ({
  className,
  ...props
}: DropdownMenuPositionerProps) => (
  <MenuPrimitive.Positioner
    className={cn("z-overlay isolate outline-none", className)}
    data-slot="dropdown-menu-positioner"
    {...props}
  />
);

export { DropdownMenuPositioner };
