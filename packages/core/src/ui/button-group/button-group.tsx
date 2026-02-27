"use client";

import type { ComponentProps } from "react";

import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import { useComponentSize } from "../shared/size/size-provider";
import { ButtonGroupSeparator } from "./button-group-separator";
import { ButtonGroupSizeContext } from "./button-group-size-context";
import { ButtonGroupText } from "./button-group-text";
export type ButtonGroupProps = ComponentProps<"div"> &
  VariantProps<typeof buttonGroupVariants> & {
    size?: UISize;
  };

const buttonGroupVariants = tv({
  base: "group/button-group flex w-fit items-stretch overflow-hidden *:focus-visible:relative *:focus-visible:z-raised has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-[inherit] [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  variants: {
    orientation: {
      horizontal:
        "*:data-slot:rounded-r-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-[inherit]! [&>[data-slot]~[data-slot]]:rounded-l-none [&>[data-slot]~[data-slot]]:border-l-0",
      vertical:
        "flex-col *:data-slot:rounded-b-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-[inherit]! [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0",
    },
    size: {
      xs: "has-[>[data-slot=button-group]]:gap-1 rounded-[min(var(--radius-md),8px)]",
      sm: "has-[>[data-slot=button-group]]:gap-1 rounded-[min(var(--radius-md),10px)]",
      md: "has-[>[data-slot=button-group]]:gap-2 rounded-md",
      lg: "has-[>[data-slot=button-group]]:gap-2 rounded-md",
      xl: "has-[>[data-slot=button-group]]:gap-2.5 rounded-md",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    size: "md",
  },
});

const ButtonGroup = ({
  className,
  orientation,
  size: providedSize,
  ...props
}: ButtonGroupProps) => {
  const resolvedOrientation = orientation ?? "horizontal";
  const size = useComponentSize(providedSize);

  return (
    <ButtonGroupSizeContext.Provider value={{ size }}>
      <div
        className={cn(
          buttonGroupVariants({ orientation: resolvedOrientation, size }),
          className
        )}
        data-orientation={resolvedOrientation}
        data-size={size}
        data-slot="button-group"
        {...props}
      />
    </ButtonGroupSizeContext.Provider>
  );
};

ButtonGroup.Separator = ButtonGroupSeparator;
ButtonGroup.Text = ButtonGroupText;

export {
  ButtonGroup,
  buttonGroupVariants,
  ButtonGroupSeparator,
  ButtonGroupText,
};

export type { ButtonGroupSeparatorProps } from "./button-group-separator";
export type { ButtonGroupTextProps } from "./button-group-text";
