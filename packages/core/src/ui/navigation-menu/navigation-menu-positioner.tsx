import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { cn } from "tailwind-variants";
export type NavigationMenuPositionerProps =
  NavigationMenuPrimitive.Positioner.Props;

const NavigationMenuPositioner = ({
  className,
  side = "bottom",
  sideOffset = 8,
  align = "start",
  alignOffset = 0,
  ...props
}: NavigationMenuPositionerProps) => (
  <NavigationMenuPrimitive.Positioner
    align={align}
    alignOffset={alignOffset}
    className={cn(
      "isolate z-overlay h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)] transition-[top,left,right,bottom] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-[instant]:transition-none data-[side=bottom]:before:top-[-10px] data-[side=bottom]:before:right-0 data-[side=bottom]:before:left-0",
      className
    )}
    data-slot="navigation-menu-positioner"
    side={side}
    sideOffset={sideOffset}
    {...props}
  />
);

export { NavigationMenuPositioner };
