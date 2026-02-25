"use client";

import type { ComponentProps } from "react";

import { Select as SelectPrimitive } from "@base-ui/react/select";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type SelectItemTextProps = ComponentProps<
  typeof SelectPrimitive.ItemText
>;

const SelectItemText = ({ className, ...props }: SelectItemTextProps) => (
  <SelectPrimitive.ItemText
    className={mergeBaseUIClassName<SelectPrimitive.ItemText.State>(
      "flex flex-1 shrink-0 gap-2 whitespace-nowrap",
      className
    )}
    data-slot="select-item-text"
    {...props}
  />
);

export { SelectItemText };
