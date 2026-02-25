import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cn } from "tailwind-variants";
export type DropdownMenuTriggerProps = MenuPrimitive.Trigger.Props;

const DropdownMenuTrigger = ({
  className,
  ...props
}: DropdownMenuTriggerProps) => (
  <MenuPrimitive.Trigger
    className={cn("cursor-pointer", className)}
    data-slot="dropdown-menu-trigger"
    {...props}
  />
);

export { DropdownMenuTrigger };
