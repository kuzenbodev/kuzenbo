import type { ComponentProps } from "react";

import { DropdownMenuRadioGroup } from "../dropdown-menu/dropdown-menu";
export type MenubarRadioGroupProps = ComponentProps<
  typeof DropdownMenuRadioGroup
>;

const MenubarRadioGroup = ({ ...props }: MenubarRadioGroupProps) => (
  <DropdownMenuRadioGroup data-slot="menubar-radio-group" {...props} />
);

export { MenubarRadioGroup };
