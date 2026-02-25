import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  MinusSignIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "tailwind-variants";

export interface PillDeltaProps {
  className?: string;
  delta: number;
}

export const PillDelta = ({ className, delta }: PillDeltaProps) => {
  const sizeClasses =
    "size-3 group-data-[size=xs]/badge:size-2.5 group-data-[size=sm]/badge:size-3 group-data-[size=md]/badge:size-3 group-data-[size=lg]/badge:size-3.5 group-data-[size=xl]/badge:size-4";

  if (!delta) {
    return (
      <HugeiconsIcon
        className={cn(sizeClasses, "text-muted-foreground", className)}
        icon={MinusSignIcon}
      />
    );
  }

  if (delta > 0) {
    return (
      <HugeiconsIcon
        className={cn(sizeClasses, "text-success-foreground", className)}
        icon={ArrowUp01Icon}
      />
    );
  }

  return (
    <HugeiconsIcon
      className={cn(sizeClasses, "text-danger-foreground", className)}
      icon={ArrowDown01Icon}
    />
  );
};
