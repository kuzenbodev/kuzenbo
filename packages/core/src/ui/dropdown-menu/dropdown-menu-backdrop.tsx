import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cn } from "tailwind-variants";
export type DropdownMenuBackdropProps = MenuPrimitive.Backdrop.Props;

const DropdownMenuBackdrop = ({
  className,
  ...props
}: DropdownMenuBackdropProps) => (
  <MenuPrimitive.Backdrop
    className={cn(className)}
    data-slot="dropdown-menu-backdrop"
    {...props}
  />
);

export { DropdownMenuBackdrop };
