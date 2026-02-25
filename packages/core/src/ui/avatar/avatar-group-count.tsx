"use client";

import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";
export type AvatarGroupCountProps = ComponentProps<"div">;

const AvatarGroupCount = ({ className, ...props }: AvatarGroupCountProps) => (
  <div
    className={cn(
      "relative flex shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=xs]/avatar-group:size-5 group-has-data-[size=sm]/avatar-group:size-6 group-has-data-[size=md]/avatar-group:size-8 group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=xl]/avatar-group:size-11 group-has-data-[size=xs]/avatar-group:[&>svg]:size-2.5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3 group-has-data-[size=md]/avatar-group:[&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=xl]/avatar-group:[&>svg]:size-5",
      className
    )}
    data-slot="avatar-group-count"
    {...props}
  />
);

export { AvatarGroupCount };
