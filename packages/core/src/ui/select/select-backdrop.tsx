"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import type { ComponentProps } from "react";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type SelectBackdropProps = ComponentProps<
  typeof SelectPrimitive.Backdrop
>;

const SelectBackdrop = ({ className, ...props }: SelectBackdropProps) => (
  <SelectPrimitive.Backdrop
    className={mergeBaseUIClassName<SelectPrimitive.Backdrop.State>(
      undefined,
      className
    )}
    data-slot="select-backdrop"
    {...props}
  />
);

export { SelectBackdrop };
