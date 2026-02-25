import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
export type ContextMenuGroupProps = ContextMenuPrimitive.Group.Props;

const ContextMenuGroup = ({ ...props }: ContextMenuGroupProps) => (
  <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
);

export { ContextMenuGroup };
