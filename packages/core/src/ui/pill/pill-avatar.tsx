import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar/avatar";

export type PillAvatarProps = ComponentProps<typeof AvatarImage> & {
  fallback?: string;
};

export const PillAvatar = ({
  fallback,
  className,
  ...props
}: PillAvatarProps) => (
  <Avatar
    className={cn(
      "-ml-1 h-4 w-4 group-data-[size=lg]/badge:h-5 group-data-[size=lg]/badge:w-5 group-data-[size=md]/badge:h-4 group-data-[size=md]/badge:w-4 group-data-[size=sm]/badge:h-3.5 group-data-[size=sm]/badge:w-3.5 group-data-[size=xl]/badge:h-6 group-data-[size=xl]/badge:w-6 group-data-[size=xs]/badge:h-3 group-data-[size=xs]/badge:w-3",
      className
    )}
  >
    <AvatarImage {...props} />
    <AvatarFallback>{fallback}</AvatarFallback>
  </Avatar>
);
