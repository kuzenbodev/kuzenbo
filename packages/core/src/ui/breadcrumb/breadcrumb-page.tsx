import type { ComponentProps } from "react";

import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import { useResolvedBreadcrumbSize } from "./breadcrumb-size-context";

const breadcrumbPageVariants = tv({
  base: "font-normal text-foreground",
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-xs",
      md: "text-sm",
      lg: "text-sm",
      xl: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type BreadcrumbPageVariantProps = Omit<
  VariantProps<typeof breadcrumbPageVariants>,
  "size"
> & {
  size?: UISize;
};

export type BreadcrumbPageProps = ComponentProps<"span"> &
  BreadcrumbPageVariantProps;

const BreadcrumbPage = ({ className, size, ...props }: BreadcrumbPageProps) => {
  const resolvedSize = useResolvedBreadcrumbSize(size);

  return (
    <span
      aria-current="page"
      aria-disabled="true"
      className={cn(breadcrumbPageVariants({ size: resolvedSize }), className)}
      data-size={resolvedSize}
      data-slot="breadcrumb-page"
      {...props}
    />
  );
};

export { BreadcrumbPage };
