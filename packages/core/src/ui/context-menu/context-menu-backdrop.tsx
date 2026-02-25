import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { cn } from "tailwind-variants";
export type ContextMenuBackdropProps = ContextMenuPrimitive.Backdrop.Props;

const ContextMenuBackdrop = ({
  className,
  ...props
}: ContextMenuBackdropProps) => (
  <ContextMenuPrimitive.Backdrop
    className={cn(className)}
    data-slot="context-menu-backdrop"
    {...props}
  />
);

export { ContextMenuBackdrop };
