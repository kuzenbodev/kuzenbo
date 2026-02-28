"use client";

import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import type { ComponentProps } from "react";
import { useMemo } from "react";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import type { InputSize } from "../input/input";
import { useComponentSize } from "../shared/size/size-provider";
import { NumberFieldContext } from "./number-field-context";
import { NumberFieldDecrement } from "./number-field-decrement";
import { NumberFieldGroup } from "./number-field-group";
import { NumberFieldIncrement } from "./number-field-increment";
import { NumberFieldInput } from "./number-field-input";
import { NumberFieldScrubArea } from "./number-field-scrub-area";
import { NumberFieldScrubAreaCursor } from "./number-field-scrub-area-cursor";

export type NumberFieldProps = ComponentProps<typeof BaseNumberField.Root> & {
  size?: InputSize;
};

const NumberField = ({
  className,
  children,
  size: providedSize,
  ...props
}: NumberFieldProps) => {
  const size = useComponentSize(providedSize);
  const contextValue = useMemo(() => ({ size }), [size]);

  return (
    <NumberFieldContext.Provider value={contextValue}>
      <BaseNumberField.Root
        className={mergeBaseUIClassName(
          "flex flex-col items-start gap-1",
          className
        )}
        data-size={size}
        data-slot="number-field"
        {...props}
      >
        {children}
      </BaseNumberField.Root>
    </NumberFieldContext.Provider>
  );
};

NumberField.Decrement = NumberFieldDecrement;
NumberField.Group = NumberFieldGroup;
NumberField.Increment = NumberFieldIncrement;
NumberField.Input = NumberFieldInput;
NumberField.ScrubArea = NumberFieldScrubArea;
NumberField.ScrubAreaCursor = NumberFieldScrubAreaCursor;

export type { NumberFieldDecrementProps } from "./number-field-decrement";
export type { NumberFieldGroupProps } from "./number-field-group";
export type { NumberFieldIncrementProps } from "./number-field-increment";
export type { NumberFieldInputProps } from "./number-field-input";
export type { NumberFieldScrubAreaProps } from "./number-field-scrub-area";
export type { NumberFieldScrubAreaCursorProps } from "./number-field-scrub-area-cursor";

export {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
};
