import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useResolvedPaginationSize } from "./pagination-size-context";

const paginationContentVariants = tv({
  base: "flex items-center",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "gap-1",
      md: "gap-0.5",
      sm: "gap-0.5",
      xl: "gap-1",
      xs: "gap-0.5",
    },
  },
});

type PaginationContentVariantProps = Omit<
  VariantProps<typeof paginationContentVariants>,
  "size"
> & {
  size?: UISize;
};

export type PaginationContentProps = ComponentProps<"ul"> &
  PaginationContentVariantProps;

const PaginationContent = ({
  className,
  size,
  ...props
}: PaginationContentProps) => {
  const resolvedSize = useResolvedPaginationSize(size);

  return (
    <ul
      className={cn(
        paginationContentVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="pagination-content"
      {...props}
    />
  );
};

export { PaginationContent };
