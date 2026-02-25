import type { ComponentProps, CSSProperties } from "react";

import { cn } from "tailwind-variants";
export type AspectRatioProps = ComponentProps<"div"> & { ratio: number };

const AspectRatio = ({ ratio, className, ...props }: AspectRatioProps) => (
  <div
    className={cn("relative aspect-(--ratio)", className)}
    data-slot="aspect-ratio"
    style={
      {
        "--ratio": ratio,
      } as CSSProperties
    }
    {...props}
  />
);

export { AspectRatio };
