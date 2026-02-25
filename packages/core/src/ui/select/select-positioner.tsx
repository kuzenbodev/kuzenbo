"use client";

import type { ComponentProps } from "react";

import { Select as SelectPrimitive } from "@base-ui/react/select";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type SelectPositionerProps = ComponentProps<
  typeof SelectPrimitive.Positioner
>;

const SelectPositioner = ({ className, ...props }: SelectPositionerProps) => (
  <SelectPrimitive.Positioner
    className={mergeBaseUIClassName<SelectPrimitive.Positioner.State>(
      "isolate z-50",
      className
    )}
    data-slot="select-positioner"
    {...props}
  />
);

export { SelectPositioner };
