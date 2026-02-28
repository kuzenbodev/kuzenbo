"use client";

import type { ComponentProps } from "react";
import { useContext } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { ActionIcon } from "../action-icon/action-icon";
import { Button } from "../button/button";
import type { InputSize } from "../input/input";
import { InputGroupContext } from "./input-group-context";
export type InputGroupButtonProps = Omit<
  ComponentProps<typeof Button>,
  "size" | "type"
> &
  VariantProps<typeof inputGroupButtonVariants> & {
    type?: "button" | "submit" | "reset";
  };

const inputGroupButtonVariants = tv({
  base: "flex items-center gap-2 text-sm shadow-none",
  defaultVariants: {
    size: "xs",
  },
  variants: {
    size: {
      "icon-sm": "size-8 p-0 has-[>svg]:p-0",
      "icon-xs":
        "size-6 rounded-[calc(var(--kb-radius)-5px)] p-0 has-[>svg]:p-0",
      md: "",
      sm: "",
      xs: "h-6 gap-1 rounded-[calc(var(--kb-radius)-5px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
    },
  },
});

const mapInputGroupSizeToButtonSize = (size?: InputSize) => {
  if (size === "xl") {
    return "sm";
  }

  return "xs";
};

const isInputGroupActionIconSize = (
  size: InputGroupButtonProps["size"]
): size is "icon-sm" | "icon-xs" => size === "icon-sm" || size === "icon-xs";

const mapInputGroupActionIconSizeToActionIconSize = (
  size: "icon-sm" | "icon-xs"
) => (size === "icon-sm" ? "sm" : "xs");

const InputGroupButton = ({
  className,
  type = "button",
  variant = "ghost",
  size,
  ...props
}: InputGroupButtonProps) => {
  const { size: contextSize } = useContext(InputGroupContext);
  const resolvedSize = size ?? mapInputGroupSizeToButtonSize(contextSize);
  const sharedProps = {
    className: cn(
      inputGroupButtonVariants({ size: resolvedSize }),
      "cursor-clickable",
      className
    ),
    "data-size": resolvedSize,
    type,
    variant,
    ...props,
  };

  if (isInputGroupActionIconSize(resolvedSize)) {
    return (
      <ActionIcon
        size={mapInputGroupActionIconSizeToActionIconSize(resolvedSize)}
        {...sharedProps}
      />
    );
  }

  return <Button {...sharedProps} size={resolvedSize} />;
};

export { InputGroupButton, inputGroupButtonVariants };
