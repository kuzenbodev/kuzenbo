"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type ComboboxPositionerProps = ComboboxPrimitive.Positioner.Props;

const ComboboxPositioner = ({
  className,
  ...props
}: ComboboxPositionerProps) => (
  <ComboboxPrimitive.Positioner
    className={mergeBaseUIClassName<ComboboxPrimitive.Positioner.State>(
      "isolate z-overlay",
      className
    )}
    data-slot="combobox-positioner"
    {...props}
  />
);

export { ComboboxPositioner };
