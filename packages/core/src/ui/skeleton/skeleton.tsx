import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

export type SkeletonProps = ComponentProps<"div">;

const Skeleton = ({ className, ...props }: SkeletonProps) => (
  <div
    className={cn("bg-muted animate-pulse rounded-md", className)}
    data-slot="skeleton"
    {...props}
  />
);

export { Skeleton };
