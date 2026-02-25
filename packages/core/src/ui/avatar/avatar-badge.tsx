"use client";

import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";
export type AvatarBadgeProps = ComponentProps<"span">;

const AvatarBadge = ({ className, ...props }: AvatarBadgeProps) => (
  <span
    className={cn(
      "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none",
      "group-data-[size=xs]/avatar:size-1.5 group-data-[size=xs]/avatar:[&>svg]:hidden",
      "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
      "group-data-[size=md]/avatar:size-2.5 group-data-[size=md]/avatar:[&>svg]:size-2",
      "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
      "group-data-[size=xl]/avatar:size-3.5 group-data-[size=xl]/avatar:[&>svg]:size-2.5",
      className
    )}
    data-slot="avatar-badge"
    {...props}
  />
);

export { AvatarBadge };
