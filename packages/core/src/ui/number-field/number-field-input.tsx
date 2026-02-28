import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import type { ComponentProps } from "react";
import { useContext } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { NumberFieldContext } from "./number-field-context";

const numberFieldInputVariants = tv({
  base: "border-input bg-background text-foreground w-20 border-y text-center tabular-nums transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  variants: {
    size: {
      xs: "h-6 text-xs",
      sm: "h-8 text-sm",
      md: "h-9 text-sm",
      lg: "h-10 text-sm",
      xl: "h-11 text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type NativeNumberFieldInputProps = ComponentProps<typeof BaseNumberField.Input>;
type NativeNumberFieldInputSize = NativeNumberFieldInputProps["size"];

export type NumberFieldInputProps = Omit<NativeNumberFieldInputProps, "size"> &
  VariantProps<typeof numberFieldInputVariants> & {
    htmlSize?: NativeNumberFieldInputSize;
  };

export const NumberFieldInput = ({
  className,
  htmlSize,
  size,
  ...props
}: NumberFieldInputProps) => {
  const { size: contextSize } = useContext(NumberFieldContext);
  const resolvedSize = size ?? contextSize ?? "md";

  return (
    <BaseNumberField.Input
      className={mergeBaseUIClassName(
        numberFieldInputVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="number-field-input"
      size={htmlSize}
      {...props}
    />
  );
};
