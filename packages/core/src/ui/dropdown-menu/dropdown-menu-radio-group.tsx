import { Menu as MenuPrimitive } from "@base-ui/react/menu";
export type DropdownMenuRadioGroupProps = MenuPrimitive.RadioGroup.Props;

const DropdownMenuRadioGroup = ({ ...props }: DropdownMenuRadioGroupProps) => (
  <MenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
);

export { DropdownMenuRadioGroup };
