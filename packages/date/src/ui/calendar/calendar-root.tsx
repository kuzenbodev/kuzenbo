"use client";

import type { RootProps } from "react-day-picker";

import { cn } from "tailwind-variants";

export type CalendarRootProps = RootProps;

const CalendarRoot = ({ className, rootRef, ...props }: CalendarRootProps) => (
  <div
    className={cn(className)}
    data-slot="calendar"
    ref={rootRef}
    {...props}
  />
);

export { CalendarRoot };
