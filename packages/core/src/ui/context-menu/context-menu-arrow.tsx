import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { cn } from "tailwind-variants";
export type ContextMenuArrowProps = ContextMenuPrimitive.Arrow.Props;

const ContextMenuArrow = ({ className, ...props }: ContextMenuArrowProps) => (
  <ContextMenuPrimitive.Arrow
    className={cn("fill-popover stroke-border", className)}
    data-slot="context-menu-arrow"
    {...props}
  />
);

export { ContextMenuArrow };
