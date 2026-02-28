import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useResolvedBreadcrumbSize } from "./breadcrumb-size-context";

const breadcrumbPageVariants = tv({
  base: "text-foreground font-normal",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "text-sm",
      md: "text-sm",
      sm: "text-xs",
      xl: "text-base",
      xs: "text-xs",
    },
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
