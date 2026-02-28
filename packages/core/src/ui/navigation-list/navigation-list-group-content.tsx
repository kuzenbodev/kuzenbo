import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import {
  useResolvedNavigationListSize,
  useResolvedNavigationListTone,
  useResolvedNavigationListVariant,
} from "./navigation-list-context";
import type {
  NavigationListTone,
  NavigationListVariant,
} from "./navigation-list-context";

const navigationListGroupContentVariants = tv({
  base: "flex list-none flex-col",
  defaultVariants: {
    size: "md",
    tone: "surface",
    variant: "light",
  },
  variants: {
    size: {
      lg: "gap-1",
      md: "gap-1",
      sm: "gap-0.5",
      xl: "gap-1.5",
      xs: "gap-0.5",
    },
    tone: {
      sidebar: "",
      surface: "",
    },
    variant: {
      filled: "",
      light: "",
      subtle: "",
    },
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
