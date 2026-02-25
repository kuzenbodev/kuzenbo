"use client";

import type { ComponentProps } from "react";

export type CalendarWeekNumberProps = ComponentProps<"td">;

const CalendarWeekNumber = ({
  children,
  ...props
}: CalendarWeekNumberProps) => (
  <td {...props}>
    <div className="flex size-(--cell-size) items-center justify-center text-center group-data-[size=xs]/calendar:text-[0.7rem] group-data-[size=sm]/calendar:text-[0.75rem] group-data-[size=md]/calendar:text-[0.8rem] group-data-[size=lg]/calendar:text-sm group-data-[size=xl]/calendar:text-base">
      {children}
    </div>
  </td>
);

export { CalendarWeekNumber };
