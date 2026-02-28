import type { ComponentProps } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useResolvedBreadcrumbSize } from "./breadcrumb-size-context";

const breadcrumbListVariants = tv({
  base: "text-muted-foreground flex flex-wrap items-center break-words",
  variants: {
    size: {
      xs: "gap-1 text-xs sm:gap-1.5",
      sm: "gap-1.5 text-xs sm:gap-2",
      md: "gap-1.5 text-sm sm:gap-2.5",
      lg: "gap-2 text-sm sm:gap-3",
      xl: "gap-2.5 text-base sm:gap-3.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type BreadcrumbListVariantProps = Omit<
  VariantProps<typeof breadcrumbListVariants>,
  "size"
> & {
  size?: UISize;
};

export type BreadcrumbListProps = ComponentProps<"ol"> &
  BreadcrumbListVariantProps;

const BreadcrumbList = ({ className, size, ...props }: BreadcrumbListProps) => {
  const resolvedSize = useResolvedBreadcrumbSize(size);

  return (
    <ol
      className={cn(breadcrumbListVariants({ size: resolvedSize }), className)}
      data-size={resolvedSize}
      data-slot="breadcrumb-list"
      {...props}
    />
  );
};

export { BreadcrumbList };
