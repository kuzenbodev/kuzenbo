"use client";

import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";
export type InputGroupTextProps = ComponentProps<"span">;

const InputGroupText = ({ className, ...props }: InputGroupTextProps) => (
  <span
    className={cn(
      "flex items-center gap-2 text-inherit text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-[1em]",
      className
    )}
    {...props}
  />
);

export { InputGroupText };
