"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type SelectValueProps = SelectPrimitive.Value.Props;

const SelectValue = ({ className, ...props }: SelectValueProps) => (
  <SelectPrimitive.Value
    className={mergeBaseUIClassName<SelectPrimitive.Value.State>(
      "flex flex-1 text-left",
      className
    )}
    data-slot="select-value"
    {...props}
  />
);

export { SelectValue };
