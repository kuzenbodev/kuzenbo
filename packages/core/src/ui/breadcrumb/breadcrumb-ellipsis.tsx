import { MoreHorizontalCircle01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useResolvedBreadcrumbSize } from "./breadcrumb-size-context";

const breadcrumbEllipsisVariants = tv({
  base: "text-muted-foreground flex items-center justify-center",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "size-6 [&>svg]:size-4",
      md: "size-5 [&>svg]:size-4",
      sm: "size-5 [&>svg]:size-3.5",
      xl: "size-7 [&>svg]:size-5",
      xs: "size-4 [&>svg]:size-3",
    },
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
