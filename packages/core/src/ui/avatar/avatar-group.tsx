"use client";

import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";
export type AvatarGroupProps = ComponentProps<"div">;

const AvatarGroup = ({ className, ...props }: AvatarGroupProps) => (
  <div
    className={cn(
      "group/avatar-group *:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2",
      className
    )}
    data-slot="avatar-group"
    {...props}
  />
);

export { AvatarGroup };
