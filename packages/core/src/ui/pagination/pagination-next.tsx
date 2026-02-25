import type { ComponentProps } from "react";

import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import { PaginationLink } from "./pagination-link";
import { useResolvedPaginationSize } from "./pagination-size-context";

const paginationNextVariants = tv({
  variants: {
    size: {
      xs: "pr-1!",
      sm: "pr-1!",
      md: "pr-1.5!",
      lg: "pr-2!",
      xl: "pr-2.5!",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type PaginationNextVariantProps = Omit<
  VariantProps<typeof paginationNextVariants>,
  "size"
> & {
  size?: UISize;
};

export type PaginationNextProps = Omit<
  ComponentProps<typeof PaginationLink>,
  "size"
> &
  PaginationNextVariantProps;

const PaginationNext = ({ className, size, ...props }: PaginationNextProps) => {
  const resolvedSize = useResolvedPaginationSize(size);

  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn(paginationNextVariants({ size: resolvedSize }), className)}
      data-size={resolvedSize}
      kind="default"
      size={resolvedSize}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <HugeiconsIcon
        data-icon="inline-end"
        icon={ArrowRight01Icon}
        strokeWidth={2}
      />
    </PaginationLink>
  );
};

export { PaginationNext };
