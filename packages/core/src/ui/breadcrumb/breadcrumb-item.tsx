import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useResolvedBreadcrumbSize } from "./breadcrumb-size-context";

const breadcrumbItemVariants = tv({
  base: "inline-flex items-center",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "gap-1.5",
      md: "gap-1",
      sm: "gap-0.5",
      xl: "gap-2",
      xs: "gap-0.5",
    },
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
