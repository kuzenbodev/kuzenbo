"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type ComboboxArrowProps = ComboboxPrimitive.Arrow.Props;

const ComboboxArrow = ({ className, ...props }: ComboboxArrowProps) => (
  <ComboboxPrimitive.Arrow
    className={mergeBaseUIClassName<ComboboxPrimitive.Arrow.State>(
      undefined,
      className
    )}
    data-slot="combobox-arrow"
    {...props}
  />
);

export { ComboboxArrow };
