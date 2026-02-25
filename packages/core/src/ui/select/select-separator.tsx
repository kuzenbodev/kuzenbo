"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type SelectSeparatorProps = SelectPrimitive.Separator.Props;

const SelectSeparator = ({ className, ...props }: SelectSeparatorProps) => (
  <SelectPrimitive.Separator
    className={mergeBaseUIClassName<SelectPrimitive.Separator.State>(
      "pointer-events-none -mx-1 my-1 h-px bg-border",
      className
    )}
    data-slot="select-separator"
    {...props}
  />
);

export { SelectSeparator };
