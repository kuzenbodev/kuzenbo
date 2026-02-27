"use client";

import type { ComponentProps } from "react";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { ArrowUp01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useContext } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { SelectOverlayContext } from "./select-overlay-context";

const selectScrollUpButtonVariants = tv({
  base: "top-0 z-raised flex w-full cursor-clickable items-center justify-center bg-popover",
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

type SelectScrollUpButtonVariantProps = VariantProps<
  typeof selectScrollUpButtonVariants
>;

export type SelectScrollUpButtonProps = ComponentProps<
  typeof SelectPrimitive.ScrollUpArrow
> &
  SelectScrollUpButtonVariantProps;

const SelectScrollUpButton = ({
  className,
  size,
  ...props
}: SelectScrollUpButtonProps) => {
  const { size: overlaySize } = useContext(SelectOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? "md";

  return (
    <SelectPrimitive.ScrollUpArrow
      className={mergeBaseUIClassName<SelectPrimitive.ScrollUpArrow.State>(
        selectScrollUpButtonVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="select-scroll-up-button"
      {...props}
    >
      <HugeiconsIcon icon={ArrowUp01Icon} strokeWidth={2} />
    </SelectPrimitive.ScrollUpArrow>
  );
};

export { SelectScrollUpButton };
