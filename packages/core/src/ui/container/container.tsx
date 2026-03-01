import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

export type ContainerProps = ComponentProps<"div">;

export const Container = ({ className, style, ...props }: ContainerProps) => (
  <div
    className={cn("mx-auto w-full px-4", className)}
    data-slot="container"
    style={{ maxWidth: "var(--kb-container-max-width, 86rem)", ...style }}
    {...props}
  />
);
