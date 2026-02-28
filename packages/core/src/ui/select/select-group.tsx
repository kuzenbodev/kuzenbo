"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { useContext } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import type { InputSize } from "../input/input";
import { SelectOverlayContext } from "./select-overlay-context";

const selectGroupVariants = tv({
  base: "",
  variants: {
    size: {
      xs: "scroll-my-0.5 p-0.5",
      sm: "scroll-my-1 p-1",
      md: "scroll-my-1 p-1",
      lg: "scroll-my-1.5 p-1.5",
      xl: "scroll-my-2 p-2",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type SelectGroupVariantProps = VariantProps<typeof selectGroupVariants>;

export type SelectGroupProps = SelectPrimitive.Group.Props &
  SelectGroupVariantProps;

const SelectGroup = ({ className, size, ...props }: SelectGroupProps) => {
  const { size: overlaySize } = useContext(SelectOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? "md";

  return (
    <SelectPrimitive.Group
      className={mergeBaseUIClassName<SelectPrimitive.Group.State>(
        selectGroupVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="select-group"
      {...props}
    />
  );
};

export { SelectGroup };
