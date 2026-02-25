"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { useContext } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { ComboboxChipRemove } from "./combobox-chip-remove";
import { ComboboxContext } from "./combobox-context";

const comboboxChipVariants = tv({
  base: "flex w-fit items-center justify-center gap-1 rounded-sm bg-muted font-medium whitespace-nowrap text-foreground has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pr-0",
  variants: {
    size: {
      xs: "h-5 px-1 text-[11px]",
      sm: "h-[calc(--spacing(5.25))] px-1.5 text-xs",
      md: "h-[calc(--spacing(5.25))] px-1.5 text-xs",
      lg: "h-6 px-2 text-xs",
      xl: "h-7 px-2.5 text-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type ComboboxChipProps = ComboboxPrimitive.Chip.Props &
  VariantProps<typeof comboboxChipVariants> & {
    showRemove?: boolean;
  };

const ComboboxChip = ({
  className,
  children,
  size,
  showRemove = true,
  ...props
}: ComboboxChipProps) => {
  const { size: contextSize } = useContext(ComboboxContext);
  const resolvedSize = size ?? contextSize ?? "md";

  return (
    <ComboboxPrimitive.Chip
      className={mergeBaseUIClassName<ComboboxPrimitive.Chip.State>(
        comboboxChipVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="combobox-chip"
      {...props}
    >
      {children}
      {showRemove && <ComboboxChipRemove size={resolvedSize} />}
    </ComboboxPrimitive.Chip>
  );
};

export { ComboboxChip };
