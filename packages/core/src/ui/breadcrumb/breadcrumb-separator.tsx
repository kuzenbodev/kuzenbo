import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ComponentProps } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useResolvedBreadcrumbSize } from "./breadcrumb-size-context";

const breadcrumbSeparatorVariants = tv({
  base: "text-muted-foreground inline-flex items-center",
  variants: {
    size: {
      xs: "[&>svg]:size-3",
      sm: "[&>svg]:size-3.5",
      md: "[&>svg]:size-3.5",
      lg: "[&>svg]:size-4",
      xl: "[&>svg]:size-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type BreadcrumbSeparatorVariantProps = Omit<
  VariantProps<typeof breadcrumbSeparatorVariants>,
  "size"
> & {
  size?: UISize;
};

export type BreadcrumbSeparatorProps = ComponentProps<"li"> &
  BreadcrumbSeparatorVariantProps;

const BreadcrumbSeparator = ({
  children,
  className,
  size,
  ...props
}: BreadcrumbSeparatorProps) => {
  const resolvedSize = useResolvedBreadcrumbSize(size);

  return (
    <li
      aria-hidden="true"
      className={cn(
        breadcrumbSeparatorVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="breadcrumb-separator"
      role="presentation"
      {...props}
    >
      {children ?? <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />}
    </li>
  );
};

export { BreadcrumbSeparator };
