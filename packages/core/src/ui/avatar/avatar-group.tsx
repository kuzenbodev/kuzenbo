"use client";

import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";
export type AvatarGroupProps = ComponentProps<"div">;

const AvatarGroup = ({ className, ...props }: AvatarGroupProps) => (
  <div
    className={cn(
      "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
      className
    )}
    data-slot="avatar-group"
    {...props}
  />
);

export { AvatarGroup };
