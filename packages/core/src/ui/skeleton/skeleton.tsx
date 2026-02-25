import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";

export type SkeletonProps = ComponentProps<"div">;

const Skeleton = ({ className, ...props }: SkeletonProps) => (
  <div
    className={cn("animate-pulse rounded-md bg-muted", className)}
    data-slot="skeleton"
    {...props}
  />
);

export { Skeleton };
