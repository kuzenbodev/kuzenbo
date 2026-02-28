"use client";

import type { ComponentProps } from "react";
import { useContext } from "react";
import { cn } from "tailwind-variants";

import { Input } from "../input/input";
import { InputGroupContext } from "./input-group-context";
export type InputGroupInputProps = ComponentProps<typeof Input>;

const InputGroupInput = ({
  className,
  size,
  ...props
}: InputGroupInputProps) => {
  const { size: contextSize } = useContext(InputGroupContext);
  const resolvedSize = size ?? contextSize ?? "md";

  return (
    <Input
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
        className
      )}
      data-slot="input-group-control"
      size={resolvedSize}
      {...props}
    />
  );
};

export { InputGroupInput };
