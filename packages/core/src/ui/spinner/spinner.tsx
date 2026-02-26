"use client";

import type { ComponentProps } from "react";

import { Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import { useComponentSize } from "../shared/size/size-provider";
import { COMPACT_VISUAL_CLASS_BY_SIZE } from "../shared/size/size-system";

export type SpinnerProps = Omit<ComponentProps<"svg">, "size"> & {
  size?: UISize;
};

const Spinner = ({
  className,
  size: providedSize,
  strokeWidth = 2,
  ...props
}: SpinnerProps) => {
  const size = useComponentSize(providedSize);

  return (
    <HugeiconsIcon
      aria-label="Loading"
      className={cn(
        COMPACT_VISUAL_CLASS_BY_SIZE[size],
        "animate-spin",
        className
      )}
      icon={Loading03Icon}
      role="status"
      strokeWidth={
        typeof strokeWidth === "string" ? Number(strokeWidth) : strokeWidth
      }
      {...props}
    />
  );
};

export { Spinner };
