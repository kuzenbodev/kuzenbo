import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
export type ContextMenuPortalProps = ContextMenuPrimitive.Portal.Props;

const ContextMenuPortal = ({ ...props }: ContextMenuPortalProps) => (
  <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
);

export { ContextMenuPortal };
