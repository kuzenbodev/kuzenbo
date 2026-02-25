import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
export type ContextMenuRadioGroupProps = ContextMenuPrimitive.RadioGroup.Props;

const ContextMenuRadioGroup = ({ ...props }: ContextMenuRadioGroupProps) => (
  <ContextMenuPrimitive.RadioGroup
    data-slot="context-menu-radio-group"
    {...props}
  />
);

export { ContextMenuRadioGroup };
