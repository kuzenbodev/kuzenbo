"use client";

import type { ComponentProps } from "react";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useContext } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { SelectOverlayContext } from "./select-overlay-context";

const selectScrollDownButtonVariants = tv({
  base: "bottom-0 z-raised flex w-full cursor-clickable items-center justify-center bg-popover",
  variants: {
    size: {
      xs: "py-0.5 [&_svg:not([class*='size-'])]:size-3",
      sm: "py-1 [&_svg:not([class*='size-'])]:size-3.5",
      md: "py-1 [&_svg:not([class*='size-'])]:size-4",
      lg: "py-1.5 [&_svg:not([class*='size-'])]:size-4",
      xl: "py-2 [&_svg:not([class*='size-'])]:size-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type SelectScrollDownButtonVariantProps = VariantProps<
  typeof selectScrollDownButtonVariants
>;

export type SelectScrollDownButtonProps = ComponentProps<
  typeof SelectPrimitive.ScrollDownArrow
> &
  SelectScrollDownButtonVariantProps;

const SelectScrollDownButton = ({
  className,
  size,
  ...props
}: SelectScrollDownButtonProps) => {
  const { size: overlaySize } = useContext(SelectOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? "md";

  return (
    <SelectPrimitive.ScrollDownArrow
      className={mergeBaseUIClassName<SelectPrimitive.ScrollDownArrow.State>(
        selectScrollDownButtonVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="select-scroll-down-button"
      {...props}
    >
      <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} />
    </SelectPrimitive.ScrollDownArrow>
  );
};

export { SelectScrollDownButton };
