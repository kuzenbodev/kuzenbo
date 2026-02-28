"use client";

import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group";
import type { ComponentProps } from "react";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type CheckboxGroupProps = ComponentProps<typeof BaseCheckboxGroup>;

export const CheckboxGroup = ({ className, ...props }: CheckboxGroupProps) => (
  <BaseCheckboxGroup
    className={mergeBaseUIClassName<BaseCheckboxGroup.State>(
      "flex flex-col items-start gap-1",
      className
    )}
    data-slot="checkbox-group"
    {...props}
  />
);
