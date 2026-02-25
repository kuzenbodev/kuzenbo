"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type ComboboxSeparatorProps = ComboboxPrimitive.Separator.Props;

const ComboboxSeparator = ({ className, ...props }: ComboboxSeparatorProps) => (
  <ComboboxPrimitive.Separator
    className={mergeBaseUIClassName<ComboboxPrimitive.Separator.State>(
      "-mx-1 my-1 h-px bg-border",
      className
    )}
    data-slot="combobox-separator"
    {...props}
  />
);

export { ComboboxSeparator };
