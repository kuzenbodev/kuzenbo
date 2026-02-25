"use client";

import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";

export type SpacerOrientation = "horizontal" | "vertical";

export type SpacerProps = ComponentProps<"div"> & {
  orientation?: SpacerOrientation;
  size?: string | number;
};

export const Spacer = ({
  orientation = "horizontal",
  size,
  style = {},
  className,
  ...props
}: SpacerProps) => {
  const computedStyle = {
    ...style,
    ...(orientation === "horizontal" && !size && { flex: 1 }),
    ...(size && {
      width: orientation === "vertical" ? "1px" : size,
      height: orientation === "horizontal" ? "1px" : size,
    }),
  };

  return (
    <div
      className={cn(className)}
      data-slot="spacer"
      style={computedStyle}
      {...props}
    />
  );
};
