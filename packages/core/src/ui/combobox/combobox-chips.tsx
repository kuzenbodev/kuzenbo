"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import type { ComponentPropsWithRef } from "react";
import { useContext } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { ComboboxContext } from "./combobox-context";

const comboboxChipsVariants = tv({
  base: "border-input focus-within:border-ring focus-within:ring-ring/50 has-aria-invalid:border-danger has-aria-invalid:ring-danger/20 dark:bg-input/30 dark:has-aria-invalid:border-danger/50 dark:has-aria-invalid:ring-danger/40 flex flex-wrap items-center border bg-transparent bg-clip-padding transition-colors focus-within:ring-[3px] has-aria-invalid:ring-[3px] has-data-[slot=combobox-chip]:px-1",
  variants: {
    size: {
      xs: "min-h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 py-0.5 text-xs",
      sm: "min-h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 py-1 text-sm",
      md: "min-h-9 gap-1 rounded-md px-2.5 py-1 text-sm",
      lg: "min-h-10 gap-1.5 rounded-md px-3 py-1.5 text-sm",
      xl: "min-h-11 gap-1.5 rounded-md px-4 py-2 text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type ComboboxChipsProps = ComponentPropsWithRef<
  typeof ComboboxPrimitive.Chips
> &
  ComboboxPrimitive.Chips.Props &
  VariantProps<typeof comboboxChipsVariants>;

const ComboboxChips = ({ className, size, ...props }: ComboboxChipsProps) => {
  const { size: contextSize } = useContext(ComboboxContext);
  const resolvedSize = size ?? contextSize ?? "md";

  return (
    <ComboboxPrimitive.Chips
      className={mergeBaseUIClassName<ComboboxPrimitive.Chips.State>(
        comboboxChipsVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="combobox-chips"
      {...props}
    />
  );
};

export { ComboboxChips };
