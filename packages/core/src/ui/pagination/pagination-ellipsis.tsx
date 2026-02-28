import { MoreHorizontalCircle01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useResolvedPaginationSize } from "./pagination-size-context";

const paginationEllipsisVariants = tv({
  defaultVariants: {
    size: "md",
  },
  slots: {
    icon: "",
    root: "flex items-center justify-center",
  },
  variants: {
    size: {
      lg: {
        icon: "size-4",
        root: "size-9",
      },
      md: {
        icon: "size-4",
        root: "size-8",
      },
      sm: {
        icon: "size-3.5",
        root: "size-7",
      },
      xl: {
        icon: "size-5",
        root: "size-10",
      },
      xs: {
        icon: "size-3",
        root: "size-6",
      },
    },
  },
});

type PaginationEllipsisVariantProps = Omit<
  VariantProps<typeof paginationEllipsisVariants>,
  "size"
> & {
  size?: UISize;
};

export type PaginationEllipsisProps = ComponentProps<"span"> &
  PaginationEllipsisVariantProps;

const PaginationEllipsis = ({
  className,
  size,
  ...props
}: PaginationEllipsisProps) => {
  const resolvedSize = useResolvedPaginationSize(size);
  const { icon, root } = paginationEllipsisVariants({ size: resolvedSize });

  return (
    <span
      aria-hidden
      className={cn(root(), className)}
      data-size={resolvedSize}
      data-slot="pagination-ellipsis"
      {...props}
    >
      <HugeiconsIcon
        className={icon()}
        icon={MoreHorizontalCircle01Icon}
        strokeWidth={2}
      />
      <span className="sr-only">More pages</span>
    </span>
  );
};

export { PaginationEllipsis };
