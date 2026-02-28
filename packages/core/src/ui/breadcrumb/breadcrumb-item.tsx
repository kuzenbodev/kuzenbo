import type { ComponentProps } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useResolvedBreadcrumbSize } from "./breadcrumb-size-context";

const breadcrumbItemVariants = tv({
  base: "inline-flex items-center",
  variants: {
    size: {
      xs: "gap-0.5",
      sm: "gap-0.5",
      md: "gap-1",
      lg: "gap-1.5",
      xl: "gap-2",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type BreadcrumbItemVariantProps = Omit<
  VariantProps<typeof breadcrumbItemVariants>,
  "size"
> & {
  size?: UISize;
};

export type BreadcrumbItemProps = ComponentProps<"li"> &
  BreadcrumbItemVariantProps;

const BreadcrumbItem = ({ className, size, ...props }: BreadcrumbItemProps) => {
  const resolvedSize = useResolvedBreadcrumbSize(size);

  return (
    <li
      className={cn(breadcrumbItemVariants({ size: resolvedSize }), className)}
      data-size={resolvedSize}
      data-slot="breadcrumb-item"
      {...props}
    />
  );
};

export { BreadcrumbItem };
