"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type ComboboxLabelProps = ComboboxPrimitive.GroupLabel.Props;

const ComboboxLabel = ({ className, ...props }: ComboboxLabelProps) => (
  <ComboboxPrimitive.GroupLabel
    className={mergeBaseUIClassName<ComboboxPrimitive.GroupLabel.State>(
      "px-2 py-1.5 text-xs text-muted-foreground",
      className
    )}
    data-slot="combobox-label"
    {...props}
  />
);

export { ComboboxLabel };
