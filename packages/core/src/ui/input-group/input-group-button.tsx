"use client";

import type { ComponentProps } from "react";

import { useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { Button } from "../button/button";
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
  variants: {
    size: {
      xs: "h-6 gap-1 rounded-[calc(var(--kb-radius)-5px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
      sm: "",
      md: "",
      "icon-xs":
        "size-6 rounded-[calc(var(--kb-radius)-5px)] p-0 has-[>svg]:p-0",
      "icon-sm": "size-8 p-0 has-[>svg]:p-0",
    },
  },
  defaultVariants: {
    size: "xs",
  },
});

const mapInputGroupSizeToButtonSize = (size?: InputSize) => {
  if (size === "xl") {
    return "sm";
  }

  return "xs";
};

const InputGroupButton = ({
  className,
  type = "button",
  variant = "ghost",
  size,
  ...props
}: InputGroupButtonProps) => {
  const { size: contextSize } = useContext(InputGroupContext);
  const resolvedSize = size ?? mapInputGroupSizeToButtonSize(contextSize);

  return (
    <Button
      className={cn(
        inputGroupButtonVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      size={resolvedSize}
      type={type}
      variant={variant}
      {...props}
    />
  );
};

export { InputGroupButton, inputGroupButtonVariants };
