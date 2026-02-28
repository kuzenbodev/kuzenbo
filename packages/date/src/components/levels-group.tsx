import type { ComponentProps, ReactNode } from "react";
import { cn, tv } from "tailwind-variants";

const levelsGroupVariants = tv({
  base: "grid gap-3",
});

export type LevelsGroupProps = ComponentProps<"div"> & {
  children?: ReactNode;
  numberOfColumns?: number;
};

export const LevelsGroup = ({
  children,
  className,
  numberOfColumns = 1,
  ...props
}: LevelsGroupProps) => (
  <div
    className={cn(levelsGroupVariants(), className)}
    style={{
      gridTemplateColumns: `repeat(${numberOfColumns}, minmax(0, 1fr))`,
    }}
    {...props}
  >
    {children}
  </div>
);
