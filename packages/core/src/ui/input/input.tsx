"use client";

import type { ComponentProps } from "react";

import { Input as InputPrimitive } from "@base-ui/react/input";
import { tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { useComponentSize } from "../shared/size/size-provider";
import { useInputDefaultProps } from "./use-input-default-props";

const inputVariants = tv({
  base: "w-full min-w-0 border border-input bg-transparent transition-colors outline-none file:inline-flex file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-danger aria-invalid:ring-[3px] aria-invalid:ring-danger/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-danger/50 dark:aria-invalid:ring-danger/40",
  variants: {
    size: {
      xs: "h-6 rounded-[min(var(--radius-md),8px)] px-2 py-0.5 text-xs file:h-5 file:text-xs",
      sm: "h-8 rounded-[min(var(--radius-md),10px)] px-2.5 py-1 text-sm file:h-6 file:text-xs",
      md: "h-9 rounded-md px-2.5 py-1 text-base file:h-7 file:text-sm md:text-sm",
      lg: "h-10 rounded-md px-3 py-1.5 text-base file:h-8 file:text-sm md:text-sm",
      xl: "h-11 rounded-md px-4 py-1.5 text-base file:h-8 file:text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type InputVariantProps = Omit<VariantProps<typeof inputVariants>, "size"> & {
  size?: UISize;
};
type NativeInputProps = ComponentProps<typeof InputPrimitive>;
type NativeInputSize = NativeInputProps["size"];

export type InputSize = UISize;

export type InputProps = Omit<NativeInputProps, "size"> &
  InputVariantProps & {
    htmlSize?: NativeInputSize;
  };

const Input = (incomingProps: InputProps) => {
  const {
    className,
    htmlSize,
    size: providedSize,
    type,
    ...props
  } = useInputDefaultProps(incomingProps);
  const size = useComponentSize(providedSize);

  return (
    <InputPrimitive
      className={mergeBaseUIClassName<InputPrimitive.State>(
        inputVariants({ size }),
        className
      )}
      data-size={size}
      data-slot="input"
      size={htmlSize}
      type={type}
      {...props}
    />
  );
};

export { Input };
