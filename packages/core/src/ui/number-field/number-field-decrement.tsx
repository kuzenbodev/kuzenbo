import type { ComponentProps } from "react";

import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import { MinusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useContext } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { NumberFieldContext } from "./number-field-context";

export type NumberFieldDecrementProps = ComponentProps<
  typeof BaseNumberField.Decrement
> &
  VariantProps<typeof numberFieldDecrementVariants>;

const numberFieldDecrementVariants = tv({
  base: "flex cursor-clickable items-center justify-center border border-input bg-muted text-foreground transition-colors select-none hover:border-ring/70 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    size: {
      xs: "size-6 rounded-l-[min(var(--radius-md),8px)]",
      sm: "size-8 rounded-l-[min(var(--radius-md),10px)]",
      md: "size-9 rounded-l-md",
      lg: "size-10 rounded-l-md",
      xl: "size-11 rounded-l-md",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const getNumberFieldStepperIconSize = (size: InputSize) => {
  if (size === "xs") {
    return 12;
  }

  if (size === "lg") {
    return 15;
  }

  if (size === "xl") {
    return 16;
  }

  return 14;
};

export const NumberFieldDecrement = ({
  className,
  children,
  size,
  ...props
}: NumberFieldDecrementProps) => {
  const { size: contextSize } = useContext(NumberFieldContext);
  const resolvedSize = size ?? contextSize ?? "md";

  return (
    <BaseNumberField.Decrement
      className={mergeBaseUIClassName(
        numberFieldDecrementVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="number-field-decrement"
      {...props}
    >
      {children ?? (
        <HugeiconsIcon
          size={getNumberFieldStepperIconSize(resolvedSize)}
          icon={MinusSignIcon}
        />
      )}
    </BaseNumberField.Decrement>
  );
};
