import type { ComponentProps } from "react";

import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import {
  type NavigationListTone,
  useResolvedNavigationListSize,
  useResolvedNavigationListTone,
} from "./navigation-list-context";
import { useNavigationListItemContext } from "./navigation-list-item-context";

const navigationListBadgeVariants = tv({
  base: "pointer-events-none absolute right-1 flex items-center justify-center rounded-md px-1 font-medium tabular-nums select-none group-data-[collapsible=true]/navigation-list-item:right-8",
  variants: {
    size: {
      xs: "top-0.5 h-4 min-w-4 text-[10px]",
      sm: "top-1 h-5 min-w-5 text-[11px]",
      md: "top-1.5 h-5 min-w-5 text-xs",
      lg: "top-2 h-6 min-w-6 text-xs",
      xl: "top-2.5 h-7 min-w-7 text-sm",
    },
    tone: {
      surface:
        "text-muted-foreground peer-hover/navigation-list-link:text-foreground peer-data-active/navigation-list-link:text-foreground",
      sidebar:
        "text-sidebar-foreground peer-hover/navigation-list-link:text-sidebar-accent-foreground peer-data-active/navigation-list-link:text-sidebar-accent-foreground",
    },
  },
  defaultVariants: {
    size: "md",
    tone: "surface",
  },
});

export type NavigationListBadgeProps = ComponentProps<"div"> & {
  size?: UISize;
  tone?: NavigationListTone;
} & VariantProps<typeof navigationListBadgeVariants>;

const NavigationListBadge = ({
  className,
  size,
  tone,
  ...props
}: NavigationListBadgeProps) => {
  const itemContext = useNavigationListItemContext();
  const resolvedSize = useResolvedNavigationListSize(size, itemContext.size);
  const resolvedTone = useResolvedNavigationListTone(tone, itemContext.tone);

  return (
    <div
      className={cn(
        navigationListBadgeVariants({
          size: resolvedSize,
          tone: resolvedTone,
        }),
        itemContext.variant === "filled" &&
          resolvedTone === "surface" &&
          "peer-data-active/navigation-list-link:text-primary-foreground",
        itemContext.variant === "filled" &&
          resolvedTone === "sidebar" &&
          "peer-data-active/navigation-list-link:text-sidebar-primary-foreground",
        className
      )}
      data-size={resolvedSize}
      data-slot="navigation-list-badge"
      data-tone={resolvedTone}
      {...props}
    />
  );
};

export { NavigationListBadge };
