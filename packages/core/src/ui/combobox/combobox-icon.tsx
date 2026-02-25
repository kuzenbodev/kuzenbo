"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type ComboboxIconProps = ComboboxPrimitive.Icon.Props;

const ComboboxIcon = ({ className, ...props }: ComboboxIconProps) => (
  <ComboboxPrimitive.Icon
    className={mergeBaseUIClassName<ComboboxPrimitive.Icon.State>(
      "pointer-events-none size-4 text-muted-foreground",
      className
    )}
    data-slot="combobox-icon"
    {...props}
  />
);

export { ComboboxIcon };
