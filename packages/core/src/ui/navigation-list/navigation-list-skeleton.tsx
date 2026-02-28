import type { ComponentProps, CSSProperties } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { Skeleton } from "../skeleton/skeleton";
import {
  useResolvedNavigationListSize,
  useResolvedNavigationListTone,
} from "./navigation-list-context";
import type { NavigationListTone } from "./navigation-list-context";
import { useNavigationListItemContext } from "./navigation-list-item-context";

const navigationListSkeletonVariants = tv({
  base: "flex items-center gap-2 rounded-md px-2",
  defaultVariants: {
    size: "md",
    tone: "surface",
  },
  variants: {
    size: {
      lg: "h-9",
      md: "h-8",
      sm: "h-7",
      xl: "h-10",
      xs: "h-6",
    },
    tone: {
      sidebar: "",
      surface: "",
    },
  },
});

export type NavigationListSkeletonProps = ComponentProps<"div"> & {
  showIcon?: boolean;
  size?: UISize;
  tone?: NavigationListTone;
} & VariantProps<typeof navigationListSkeletonVariants>;

const NavigationListSkeleton = ({
  className,
  showIcon = false,
  size,
  tone,
  ...props
}: NavigationListSkeletonProps) => {
  const itemContext = useNavigationListItemContext();
  const resolvedSize = useResolvedNavigationListSize(size, itemContext.size);
  const resolvedTone = useResolvedNavigationListTone(tone, itemContext.tone);

  return (
    <div
      className={cn(
        navigationListSkeletonVariants({
          size: resolvedSize,
          tone: resolvedTone,
        }),
        className
      )}
      data-size={resolvedSize}
      data-slot="navigation-list-skeleton"
      data-tone={resolvedTone}
      {...props}
    >
      {showIcon ? (
        <Skeleton
          className="size-4 rounded-md"
          data-slot="navigation-list-skeleton-icon"
        />
      ) : null}
      <Skeleton
        className="h-4 max-w-(--navigation-list-skeleton-width) flex-1"
        data-slot="navigation-list-skeleton-text"
        style={
          {
            "--navigation-list-skeleton-width": "100%",
          } as CSSProperties
        }
      />
    </div>
  );
};

export { NavigationListSkeleton };
