"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";

export type ComboboxCollectionProps = ComboboxPrimitive.Collection.Props;

const ComboboxCollection = ({ ...props }: ComboboxCollectionProps) => (
  <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
);

export { ComboboxCollection };
