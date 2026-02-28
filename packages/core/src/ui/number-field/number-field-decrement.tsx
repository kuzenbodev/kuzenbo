import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import { MinusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ComponentProps } from "react";
import { useContext } from "react";
import { tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import type { InputSize } from "../input/input";
import { NumberFieldContext } from "./number-field-context";

export type NumberFieldDecrementProps = ComponentProps<
  typeof BaseNumberField.Decrement
> &
  VariantProps<typeof numberFieldDecrementVariants>;

const numberFieldDecrementVariants = tv({
  base: "cursor-clickable border-input bg-muted text-foreground hover:border-ring/70 flex items-center justify-center border transition-colors select-none disabled:pointer-events-none disabled:opacity-50",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "size-10 rounded-l-md",
      md: "size-9 rounded-l-md",
      sm: "size-8 rounded-l-[min(var(--radius-md),10px)]",
      xl: "size-11 rounded-l-md",
      xs: "size-6 rounded-l-[min(var(--radius-md),8px)]",
    },
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
