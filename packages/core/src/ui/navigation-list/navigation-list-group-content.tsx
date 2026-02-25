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

const navigationListGroupContentVariants = tv({
  base: "flex list-none flex-col",
  variants: {
    size: {
      xs: "gap-0.5",
      sm: "gap-0.5",
      md: "gap-1",
      lg: "gap-1",
      xl: "gap-1.5",
    },
    tone: {
      surface: "",
      sidebar: "",
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

export type NavigationListGroupContentProps = ComponentProps<"ul"> &
  VariantProps<typeof navigationListGroupContentVariants> & {
    size?: UISize;
    tone?: NavigationListTone;
    variant?: NavigationListVariant;
  };

const NavigationListGroupContent = ({
  className,
  size,
  tone,
  variant,
  ...props
}: NavigationListGroupContentProps) => {
  const resolvedSize = useResolvedNavigationListSize(size);
  const resolvedTone = useResolvedNavigationListTone(tone);
  const resolvedVariant = useResolvedNavigationListVariant(variant);

  return (
    <ul
      className={cn(
        navigationListGroupContentVariants({
          size: resolvedSize,
          tone: resolvedTone,
          variant: resolvedVariant,
        }),
        className
      )}
      data-size={resolvedSize}
      data-slot="navigation-list-group-content"
      data-tone={resolvedTone}
      data-variant={resolvedVariant}
      {...props}
    />
  );
};

export { NavigationListGroupContent };
