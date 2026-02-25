"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type SelectIconProps = SelectPrimitive.Icon.Props;

const SelectIcon = ({ className, ...props }: SelectIconProps) => (
  <SelectPrimitive.Icon
    className={mergeBaseUIClassName<SelectPrimitive.Icon.State>(
      "pointer-events-none size-4 text-muted-foreground",
      className
    )}
    data-slot="select-icon"
    {...props}
  />
);

export { SelectIcon };
