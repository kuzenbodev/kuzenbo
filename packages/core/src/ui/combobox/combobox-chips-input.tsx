"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type ComboboxChipsInputProps = ComboboxPrimitive.Input.Props;

const ComboboxChipsInput = ({
  className,
  ...props
}: ComboboxChipsInputProps) => (
  <ComboboxPrimitive.Input
    className={mergeBaseUIClassName<ComboboxPrimitive.Input.State>(
      "min-w-16 flex-1 outline-none",
      className
    )}
    data-slot="combobox-chip-input"
    {...props}
  />
);

export { ComboboxChipsInput };
