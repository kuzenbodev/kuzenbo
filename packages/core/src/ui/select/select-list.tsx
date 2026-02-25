"use client";

import type { ComponentProps } from "react";

import { Select as SelectPrimitive } from "@base-ui/react/select";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type SelectListProps = ComponentProps<typeof SelectPrimitive.List>;

const SelectList = ({ className, ...props }: SelectListProps) => (
  <SelectPrimitive.List
    className={mergeBaseUIClassName<SelectPrimitive.List.State>(
      undefined,
      className
    )}
    data-slot="select-list"
    {...props}
  />
);

export { SelectList };
