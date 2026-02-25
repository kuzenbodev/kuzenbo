"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";

export type ComboboxValueProps = ComboboxPrimitive.Value.Props;

const ComboboxValue = ({ ...props }: ComboboxValueProps) => (
  <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />
);

export { ComboboxValue };
