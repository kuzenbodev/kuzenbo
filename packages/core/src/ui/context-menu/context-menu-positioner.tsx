import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { cn } from "tailwind-variants";
export type ContextMenuPositionerProps = ContextMenuPrimitive.Positioner.Props;

const ContextMenuPositioner = ({
  className,
  ...props
}: ContextMenuPositionerProps) => (
  <ContextMenuPrimitive.Positioner
    className={cn("isolate z-overlay outline-none", className)}
    data-slot="context-menu-positioner"
    {...props}
  />
);

export { ContextMenuPositioner };
