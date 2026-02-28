"use client";

import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

export type MarqueeFadeProps = ComponentProps<"div"> & {
  side: "left" | "right";
};

export const MarqueeFade = ({
  className,
  side,
  ...props
}: MarqueeFadeProps) => (
  <div
    className={cn(
      "z-raised from-background absolute top-0 bottom-0 h-full w-24 to-transparent",
      side === "left" ? "left-0 bg-linear-to-r" : "right-0 bg-linear-to-l",
      className
    )}
    {...props}
  />
);
