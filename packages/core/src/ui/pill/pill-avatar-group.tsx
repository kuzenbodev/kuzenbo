import type { ComponentProps, ReactNode } from "react";

import { cn } from "tailwind-variants";

export type PillAvatarGroupProps = {
  children: ReactNode;
  className?: string;
} & ComponentProps<"div">;

export const PillAvatarGroup = ({
  children,
  className,
  ...props
}: PillAvatarGroupProps) => (
  <div
    className={cn(
      "flex items-center -space-x-1 group-data-[size=xs]/badge:-space-x-0.5 group-data-[size=sm]/badge:-space-x-0.5 group-data-[size=md]/badge:-space-x-1 group-data-[size=lg]/badge:-space-x-1.5 group-data-[size=xl]/badge:-space-x-1.5",
      "[&>*:not(:first-of-type)]:[mask-image:radial-gradient(circle_9px_at_-4px_50%,transparent_99%,white_100%)]",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
