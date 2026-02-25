import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
export type ContextMenuSubProps = ContextMenuPrimitive.SubmenuRoot.Props;

const ContextMenuSub = ({ ...props }: ContextMenuSubProps) => (
  <ContextMenuPrimitive.SubmenuRoot data-slot="context-menu-sub" {...props} />
);

export { ContextMenuSub };
