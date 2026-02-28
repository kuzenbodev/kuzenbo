import type { ComponentProps } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import {
  type NavigationListTone,
  type NavigationListVariant,
  useResolvedNavigationListSize,
  useResolvedNavigationListTone,
  useResolvedNavigationListVariant,
} from "./navigation-list-context";

const navigationListContentVariants = tv({
  base: "flex min-w-0 list-none flex-col rounded-lg border",
  variants: {
    size: {
      xs: "gap-0.5 p-1",
      sm: "gap-1 p-1.5",
      md: "gap-1 p-2",
      lg: "gap-1.5 p-2.5",
      xl: "gap-2 p-3",
    },
    tone: {
      surface: "border-border bg-background text-foreground",
      sidebar: "border-sidebar-border bg-sidebar text-sidebar-foreground",
    },
    variant: {
      subtle: "",
      light: "",
      filled: "",
    },
  },
  defaultVariants: {
    size: "md",
    tone: "surface",
    variant: "light",
  },
});

export type NavigationListContentProps = ComponentProps<"ul"> &
  VariantProps<typeof navigationListContentVariants> & {
    size?: UISize;
    tone?: NavigationListTone;
    variant?: NavigationListVariant;
  };

const NavigationListContent = ({
  className,
  size,
  tone,
  variant,
  ...props
}: NavigationListContentProps) => {
  const resolvedSize = useResolvedNavigationListSize(size);
  const resolvedTone = useResolvedNavigationListTone(tone);
  const resolvedVariant = useResolvedNavigationListVariant(variant);

  return (
    <ul
      className={cn(
        navigationListContentVariants({
          size: resolvedSize,
          tone: resolvedTone,
          variant: resolvedVariant,
        }),
        className
      )}
      data-navigation-list="content"
      data-size={resolvedSize}
      data-slot="navigation-list-content"
      data-tone={resolvedTone}
      data-variant={resolvedVariant}
      {...props}
    />
  );
};

export { NavigationListContent };
