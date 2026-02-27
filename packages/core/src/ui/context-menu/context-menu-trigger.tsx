import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { cn } from "tailwind-variants";
export type ContextMenuTriggerProps = ContextMenuPrimitive.Trigger.Props;

const ContextMenuTrigger = ({
  className,
  ...props
}: ContextMenuTriggerProps) => (
  <ContextMenuPrimitive.Trigger
    className={cn("cursor-clickable select-none", className)}
    data-slot="context-menu-trigger"
    {...props}
  />
);

export { ContextMenuTrigger };
