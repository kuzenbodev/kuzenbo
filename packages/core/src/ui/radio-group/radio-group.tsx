"use client";

import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { RadioGroupIndicator } from "./radio-group-indicator";
import { RadioGroupItem } from "./radio-group-item";

export type RadioGroupProps<Value = unknown> = RadioGroupPrimitive.Props<Value>;

const RadioGroup = ({ className, ...props }: RadioGroupProps) => (
  <RadioGroupPrimitive
    className={mergeBaseUIClassName<RadioGroupPrimitive.State>(
      "grid w-full gap-2",
      className
    )}
    data-slot="radio-group"
    {...props}
  />
);

RadioGroup.Indicator = RadioGroupIndicator;
RadioGroup.Item = RadioGroupItem;

export type { RadioGroupIndicatorProps } from "./radio-group-indicator";
export type { RadioGroupItemProps } from "./radio-group-item";

export { RadioGroup, RadioGroupIndicator, RadioGroupItem };
