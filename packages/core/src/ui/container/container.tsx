import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";

export type ContainerProps = ComponentProps<"div">;

export const Container = ({ className, ...props }: ContainerProps) => (
  <div
    className={cn("mx-auto w-full max-w-[86rem] px-4", className)}
    data-slot="container"
    {...props}
  />
);
