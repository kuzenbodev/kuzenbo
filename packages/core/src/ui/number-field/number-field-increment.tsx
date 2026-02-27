import type { ComponentProps } from "react";

import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useContext } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { NumberFieldContext } from "./number-field-context";

export type NumberFieldIncrementProps = ComponentProps<
  typeof BaseNumberField.Increment
> &
  VariantProps<typeof numberFieldIncrementVariants>;

const numberFieldIncrementVariants = tv({
  base: "flex cursor-clickable items-center justify-center border border-input bg-muted text-foreground transition-colors select-none hover:border-ring/70 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    size: {
      xs: "size-6 rounded-r-[min(var(--radius-md),8px)]",
      sm: "size-8 rounded-r-[min(var(--radius-md),10px)]",
      md: "size-9 rounded-r-md",
      lg: "size-10 rounded-r-md",
      xl: "size-11 rounded-r-md",
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

export const NumberFieldIncrement = ({
  className,
  children,
  size,
  ...props
}: NumberFieldIncrementProps) => {
  const { size: contextSize } = useContext(NumberFieldContext);
  const resolvedSize = size ?? contextSize ?? "md";

  return (
    <BaseNumberField.Increment
      className={mergeBaseUIClassName(
        numberFieldIncrementVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="number-field-increment"
      {...props}
    >
      {children ?? (
        <HugeiconsIcon
          size={getNumberFieldStepperIconSize(resolvedSize)}
          icon={Add01Icon}
        />
      )}
    </BaseNumberField.Increment>
  );
};
