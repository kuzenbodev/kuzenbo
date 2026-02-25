import type { ComponentProps } from "react";

import { MoreHorizontalCircle01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import { useResolvedBreadcrumbSize } from "./breadcrumb-size-context";

const breadcrumbEllipsisVariants = tv({
  base: "flex items-center justify-center text-muted-foreground",
  variants: {
    size: {
      xs: "size-4 [&>svg]:size-3",
      sm: "size-5 [&>svg]:size-3.5",
      md: "size-5 [&>svg]:size-4",
      lg: "size-6 [&>svg]:size-4",
      xl: "size-7 [&>svg]:size-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type BreadcrumbEllipsisVariantProps = Omit<
  VariantProps<typeof breadcrumbEllipsisVariants>,
  "size"
> & {
  size?: UISize;
};

export type BreadcrumbEllipsisProps = ComponentProps<"span"> &
  BreadcrumbEllipsisVariantProps;

const BreadcrumbEllipsis = ({
  className,
  size,
  ...props
}: BreadcrumbEllipsisProps) => {
  const resolvedSize = useResolvedBreadcrumbSize(size);

  return (
    <span
      aria-hidden="true"
      className={cn(
        breadcrumbEllipsisVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      {...props}
    >
      <HugeiconsIcon icon={MoreHorizontalCircle01Icon} strokeWidth={2} />
      <span className="sr-only">More</span>
    </span>
  );
};

export { BreadcrumbEllipsis };
