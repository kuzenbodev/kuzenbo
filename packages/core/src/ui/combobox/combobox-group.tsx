"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type ComboboxGroupProps = ComboboxPrimitive.Group.Props;

const ComboboxGroup = ({ className, ...props }: ComboboxGroupProps) => (
  <ComboboxPrimitive.Group
    className={mergeBaseUIClassName<ComboboxPrimitive.Group.State>(
      undefined,
      className
    )}
    data-slot="combobox-group"
    {...props}
  />
);

export { ComboboxGroup };
