"use client";

import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";

export type MarqueeItemProps = ComponentProps<"div">;

export const MarqueeItem = ({ className, ...props }: MarqueeItemProps) => (
  <div className={cn("mx-2 shrink-0 object-contain", className)} {...props} />
);
