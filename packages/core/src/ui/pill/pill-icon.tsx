import type { ComponentProps } from "react";

import { HugeiconsIcon, type HugeiconsProps } from "@hugeicons/react";
import { cn } from "tailwind-variants";

export type PillIconProps = {
  icon: NonNullable<HugeiconsProps["icon"]>;
  className?: string;
} & ComponentProps<typeof HugeiconsIcon>;

export const PillIcon = ({ icon, className, ...props }: PillIconProps) => (
  <HugeiconsIcon
    className={cn(
      "size-3 text-muted-foreground group-data-[size=xs]/badge:size-2.5 group-data-[size=sm]/badge:size-3 group-data-[size=md]/badge:size-3 group-data-[size=lg]/badge:size-3.5 group-data-[size=xl]/badge:size-4",
      className
    )}
    icon={icon}
    {...props}
  />
);
