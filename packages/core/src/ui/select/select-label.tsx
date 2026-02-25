"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { useContext } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { SelectOverlayContext } from "./select-overlay-context";

const selectLabelVariants = tv({
  base: "text-muted-foreground",
  variants: {
    size: {
      xs: "px-1.5 py-0.5 text-xs",
      sm: "px-1.5 py-1 text-xs",
      md: "px-1.5 py-1 text-xs",
      lg: "px-2 py-1.5 text-xs",
      xl: "px-2.5 py-1.5 text-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type SelectLabelVariantProps = VariantProps<typeof selectLabelVariants>;

export type SelectLabelProps = SelectPrimitive.GroupLabel.Props &
  SelectLabelVariantProps;

const SelectLabel = ({ className, size, ...props }: SelectLabelProps) => {
  const { size: overlaySize } = useContext(SelectOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? "md";

  return (
    <SelectPrimitive.GroupLabel
      className={mergeBaseUIClassName<SelectPrimitive.GroupLabel.State>(
        selectLabelVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="select-label"
      {...props}
    />
  );
};

export { SelectLabel };
