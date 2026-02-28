"use client";

import type { ComponentProps } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { tv, type VariantProps } from "tailwind-variants";

import { useComponentSize } from "../shared/size/size-provider";
import { useTextareaDefaultProps } from "./use-textarea-default-props";

const textareaVariants = tv({
  base: "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 disabled:bg-input/50 aria-invalid:border-danger aria-invalid:ring-danger/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-danger/50 dark:aria-invalid:ring-danger/40 flex field-sizing-content w-full border bg-transparent shadow-xs transition-colors outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-[3px]",
  variants: {
    size: {
      xs: "min-h-12 rounded-[min(var(--radius-md),8px)] px-2 py-1 text-xs",
      sm: "min-h-14 rounded-[min(var(--radius-md),10px)] px-2.5 py-1.5 text-sm",
      md: "min-h-16 rounded-md px-2.5 py-2 text-base md:text-sm",
      lg: "min-h-18 rounded-md px-3 py-2.5 text-base md:text-sm",
      xl: "min-h-20 rounded-md px-4 py-2.5 text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type TextareaProps = ComponentProps<typeof TextareaAutosize> &
  VariantProps<typeof textareaVariants>;

const Textarea = (incomingProps: TextareaProps) => {
  const {
    className,
    rows = 3,
    size: providedSize,
    ...props
  } = useTextareaDefaultProps(incomingProps);
  const size = useComponentSize(providedSize);

  return (
    <TextareaAutosize
      className={textareaVariants({
        className,
        size,
      })}
      data-size={size}
      data-slot="textarea"
      minRows={rows}
      {...props}
    />
  );
};

export { Textarea };
