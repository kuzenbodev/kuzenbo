"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type ComboboxBackdropProps = ComboboxPrimitive.Backdrop.Props;

const ComboboxBackdrop = ({ className, ...props }: ComboboxBackdropProps) => (
  <ComboboxPrimitive.Backdrop
    className={mergeBaseUIClassName<ComboboxPrimitive.Backdrop.State>(
      undefined,
      className
    )}
    data-slot="combobox-backdrop"
    {...props}
  />
);

export { ComboboxBackdrop };
