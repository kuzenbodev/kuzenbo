"use client";

import type { ComponentProps } from "react";
import type { Chevron } from "react-day-picker";

import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "tailwind-variants";

export type CalendarChevronProps = ComponentProps<typeof Chevron>;

const CalendarChevron = ({
  className,
  orientation,
  ...props
}: CalendarChevronProps) => {
  const chevronClassName = cn(
    "size-4 group-data-[size=xs]/calendar:size-3 group-data-[size=sm]/calendar:size-3.5 group-data-[size=lg]/calendar:size-[18px] group-data-[size=xl]/calendar:size-5",
    className
  );

  if (orientation === "left") {
    return (
      <HugeiconsIcon
        className={chevronClassName}
        icon={ArrowLeftIcon}
        strokeWidth={2}
        {...props}
      />
    );
  }

  if (orientation === "right") {
    return (
      <HugeiconsIcon
        className={chevronClassName}
        icon={ArrowRightIcon}
        strokeWidth={2}
        {...props}
      />
    );
  }

  return (
    <HugeiconsIcon
      className={chevronClassName}
      icon={ArrowDownIcon}
      strokeWidth={2}
      {...props}
    />
  );
};

export { CalendarChevron };
