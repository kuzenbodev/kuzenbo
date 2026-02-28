import type { ComponentProps, ReactNode } from "react";
import { cn } from "tailwind-variants";

export type PillStatusProps = {
  children: ReactNode;
  className?: string;
} & ComponentProps<"div">;

export const PillStatus = ({
  children,
  className,
  ...props
}: PillStatusProps) => (
  <div
    className={cn(
      "flex items-center gap-2 border-r pr-2 font-medium group-data-[size=lg]/badge:gap-2 group-data-[size=lg]/badge:pr-2.5 group-data-[size=md]/badge:gap-2 group-data-[size=md]/badge:pr-2 group-data-[size=sm]/badge:gap-1.5 group-data-[size=sm]/badge:pr-2 group-data-[size=xl]/badge:gap-2.5 group-data-[size=xl]/badge:pr-3 group-data-[size=xs]/badge:gap-1 group-data-[size=xs]/badge:pr-1.5",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
