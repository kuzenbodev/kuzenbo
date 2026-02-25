import type { ComponentProps } from "react";

import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import { PaginationLink } from "./pagination-link";
import { useResolvedPaginationSize } from "./pagination-size-context";

const paginationPreviousVariants = tv({
  variants: {
    size: {
      xs: "pl-1!",
      sm: "pl-1!",
      md: "pl-1.5!",
      lg: "pl-2!",
      xl: "pl-2.5!",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type PaginationPreviousVariantProps = Omit<
  VariantProps<typeof paginationPreviousVariants>,
  "size"
> & {
  size?: UISize;
};

export type PaginationPreviousProps = Omit<
  ComponentProps<typeof PaginationLink>,
  "size"
> &
  PaginationPreviousVariantProps;

const PaginationPrevious = ({
  className,
  size,
  ...props
}: PaginationPreviousProps) => {
  const resolvedSize = useResolvedPaginationSize(size);

  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn(
        paginationPreviousVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      kind="default"
      size={resolvedSize}
      {...props}
    >
      <HugeiconsIcon
        data-icon="inline-start"
        icon={ArrowLeft01Icon}
        strokeWidth={2}
      />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  );
};

export { PaginationPrevious };
