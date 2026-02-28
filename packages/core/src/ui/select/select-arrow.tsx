"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import type { ComponentProps } from "react";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type SelectArrowProps = ComponentProps<typeof SelectPrimitive.Arrow>;

const SelectArrow = ({ className, ...props }: SelectArrowProps) => (
  <SelectPrimitive.Arrow
    className={mergeBaseUIClassName<SelectPrimitive.Arrow.State>(
      undefined,
      className
    )}
    data-slot="select-arrow"
    {...props}
  />
);

export { SelectArrow };
